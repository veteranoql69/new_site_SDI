"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { getFirstTouch } from "@/lib/chat/origin";

const SESSION_KEY = "sdi_chat_session";
const CABLE_URL = `${(process.env.NEXT_PUBLIC_CHATWOOT_BASE_URL || "https://ch.manmec.cl").replace(/^http/, "ws")}/cable`;
const POLL_MS = 4000;
const REPLY_TIMEOUT_MS = 45_000;

export interface Message {
  id: number;
  content: string;
  from: "visitor" | "sdi";
  createdAt: number;
  status?: "sending" | "failed";
}

interface Session {
  contactId: string;
  conversationId: number;
  pubsubToken: string;
}

export type ChatStatus = "identify" | "starting" | "ready";

export interface IdentifyInput {
  name: string;
  phone: string;
  email: string;
}

function readSession(): Session | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as Session) : null;
  } catch {
    return null;
  }
}

function writeSession(session: Session | null) {
  try {
    if (session) localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    else localStorage.removeItem(SESSION_KEY);
  } catch {
    // Sin localStorage la conversación no sobrevive a una recarga, pero funciona.
  }
}

// Une mensajes por id, reemplazando el optimista (id negativo) cuando llega el real.
function mergeMessages(current: Message[], incoming: Message[]): Message[] {
  const byId = new Map(current.map((m) => [m.id, m]));
  for (const message of incoming) {
    const optimistic = current.find(
      (m) => m.id < 0 && m.from === "visitor" && m.status === "sending" && m.content === message.content,
    );
    if (optimistic && message.from === "visitor") byId.delete(optimistic.id);
    byId.set(message.id, message);
  }
  return [...byId.values()].sort((a, b) => a.createdAt - b.createdAt || a.id - b.id);
}

/**
 * Estado del chat propio: identificación del visitante, historial, envío
 * optimista y respuestas en vivo por el websocket de Chatwoot (ActionCable),
 * con consulta periódica como respaldo si el websocket no conecta.
 */
export function useChat(isOpen: boolean) {
  const [session, setSession] = useState<Session | null>(null);
  const [status, setStatus] = useState<ChatStatus>("identify");
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState<{ message: string; field?: string } | null>(null);
  const [awaitingReply, setAwaitingReply] = useState(false);
  const [socketOpen, setSocketOpen] = useState(false);
  const sectionRef = useRef("Sitio");
  const tempId = useRef(-1);

  const resetSession = useCallback(() => {
    writeSession(null);
    setSession(null);
    setMessages([]);
    setStatus("identify");
  }, []);

  // Retoma una conversación anterior guardada en el navegador.
  useEffect(() => {
    const saved = readSession();
    if (saved) {
      setSession(saved);
      setStatus("ready");
    }
  }, []);

  const fetchMessages = useCallback(
    async (current: Session) => {
      const params = new URLSearchParams({
        contact: current.contactId,
        conversation: String(current.conversationId),
      });
      const res = await fetch(`/api/chat/messages?${params}`);
      if (res.status === 410) {
        resetSession();
        return;
      }
      if (!res.ok) return;
      const incoming = (await res.json()) as Message[];
      setMessages((prev) => mergeMessages(prev, incoming));
      if (incoming.at(-1)?.from === "sdi") setAwaitingReply(false);
    },
    [resetSession],
  );

  useEffect(() => {
    if (isOpen && session) void fetchMessages(session);
  }, [isOpen, session, fetchMessages]);

  // Websocket de Chatwoot: mensajes nuevos de la IA o del equipo en vivo.
  useEffect(() => {
    if (!isOpen || !session) return;

    let socket: WebSocket | null = null;
    let closedByUs = false;
    let retry: ReturnType<typeof setTimeout> | undefined;
    const identifier = JSON.stringify({ channel: "RoomChannel", pubsub_token: session.pubsubToken });

    const connect = () => {
      socket = new WebSocket(CABLE_URL);
      socket.onopen = () => socket?.send(JSON.stringify({ command: "subscribe", identifier }));
      socket.onmessage = (event) => {
        const frame = JSON.parse(event.data as string) as {
          type?: string;
          message?: { event?: string; data?: Record<string, unknown> };
        };
        if (frame.type === "confirm_subscription") setSocketOpen(true);
        const payload = frame.message;
        if (!payload?.event || !payload.data) return;

        const data = payload.data;
        if (payload.event === "message.created" && data.conversation_id === session.conversationId) {
          if (data.message_type === 2 || data.private || !data.content) return;
          const message: Message = {
            id: Number(data.id),
            content: String(data.content),
            from: data.message_type === 0 ? "visitor" : "sdi",
            createdAt: Number(data.created_at),
          };
          setMessages((prev) => mergeMessages(prev, [message]));
          if (message.from === "sdi") setAwaitingReply(false);
        }
      };
      socket.onclose = () => {
        setSocketOpen(false);
        if (!closedByUs) retry = setTimeout(connect, 5000);
      };
    };

    connect();
    return () => {
      closedByUs = true;
      clearTimeout(retry);
      socket?.close();
      setSocketOpen(false);
    };
  }, [isOpen, session]);

  // Respaldo: si el websocket no está conectado, se consulta el historial.
  useEffect(() => {
    if (!isOpen || !session || socketOpen) return;
    const timer = setInterval(() => void fetchMessages(session), POLL_MS);
    return () => clearInterval(timer);
  }, [isOpen, session, socketOpen, fetchMessages]);

  useEffect(() => {
    if (!awaitingReply) return;
    const timer = setTimeout(() => setAwaitingReply(false), REPLY_TIMEOUT_MS);
    return () => clearTimeout(timer);
  }, [awaitingReply]);

  const setSection = useCallback((section: string) => {
    sectionRef.current = section;
  }, []);

  const identify = useCallback(async (input: IdentifyInput) => {
    setStatus("starting");
    setError(null);
    try {
      const res = await fetch("/api/chat/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...input, origin: { ...getFirstTouch(), origen_seccion: sectionRef.current } }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError({ message: data.error ?? "No pudimos abrir el chat.", field: data.field });
        setStatus("identify");
        return;
      }
      writeSession(data as Session);
      setSession(data as Session);
      setStatus("ready");
    } catch {
      setError({ message: "Sin conexión. Revisa tu internet e intenta de nuevo." });
      setStatus("identify");
    }
  }, []);

  const send = useCallback(
    async (content: string, retryId?: number) => {
      if (!session) return;
      const id = retryId ?? tempId.current--;
      const optimistic: Message = { id, content, from: "visitor", createdAt: Date.now() / 1000, status: "sending" };
      setMessages((prev) => [...prev.filter((m) => m.id !== id), optimistic]);
      setAwaitingReply(true);

      try {
        const res = await fetch("/api/chat/messages", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ contactId: session.contactId, conversationId: session.conversationId, content }),
        });
        if (res.status === 410) {
          resetSession();
          return;
        }
        if (!res.ok) throw new Error(String(res.status));
        const saved = (await res.json()) as Message;
        setMessages((prev) => mergeMessages(prev.filter((m) => m.id !== id), [saved]));
      } catch {
        setAwaitingReply(false);
        setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, status: "failed" } : m)));
      }
    },
    [session, resetSession],
  );

  return { status, messages, error, awaitingReply, identify, send, setSection, resetSession };
}
