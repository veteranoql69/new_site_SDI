import "server-only";

// Chat propio del sitio sobre la API pública de cliente de Chatwoot.
// Bandeja API "Sitio sditecnologia.cl · chat propio" (#43, cuenta 1): canal del
// omnicanal interno de SDI (IA Leads Funnel), que responde vía webhook.
// El identificador de bandeja no es secreto, pero se mantiene en el servidor
// para que el navegador solo hable con /api/chat.
const BASE_URL = process.env.CHATWOOT_BASE_URL || "https://ch.manmec.cl";
const INBOX_IDENTIFIER = process.env.CHATWOOT_INBOX_IDENTIFIER || "qoSiQoVF3Xc3g6K1ayRHzcAK";

const inboxUrl = `${BASE_URL}/public/api/v1/inboxes/${INBOX_IDENTIFIER}`;

export class ChatwootError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${inboxUrl}${path}`, {
    ...init,
    headers: { "Content-Type": "application/json", ...init?.headers },
    cache: "no-store",
  });
  if (!res.ok) {
    throw new ChatwootError(`Chatwoot respondió ${res.status} en ${path}`, res.status);
  }
  return res.json() as Promise<T>;
}

export interface ChatMessage {
  id: number;
  content: string;
  from: "visitor" | "sdi";
  createdAt: number;
}

interface RawMessage {
  id: number;
  content: string | null;
  message_type: number; // 0 entrante (visitante), 1 saliente (agente/IA), 2 actividad
  created_at: number;
}

// message_type 2 son mensajes de actividad ("conversación asignada a…"): no se muestran.
export function toChatMessage(raw: RawMessage): ChatMessage | null {
  if (raw.message_type === 2 || !raw.content) return null;
  return {
    id: raw.id,
    content: raw.content,
    from: raw.message_type === 0 ? "visitor" : "sdi",
    createdAt: raw.created_at,
  };
}

export interface ChatSession {
  contactId: string;
  conversationId: number;
  pubsubToken: string;
}

export async function startSession(
  contact: { name: string; phone: string; email?: string },
  attributes: Record<string, string>,
): Promise<ChatSession> {
  const created = await request<{ source_id: string; pubsub_token: string }>("/contacts", {
    method: "POST",
    body: JSON.stringify({
      name: contact.name,
      phone_number: contact.phone,
      ...(contact.email ? { email: contact.email } : {}),
      custom_attributes: attributes,
    }),
  });

  const conversation = await request<{ id: number }>(`/contacts/${created.source_id}/conversations`, {
    method: "POST",
    body: JSON.stringify({ custom_attributes: { landing_origen: `sitio-sdi:${attributes.origen_seccion ?? "sitio"}` } }),
  });

  return { contactId: created.source_id, conversationId: conversation.id, pubsubToken: created.pubsub_token };
}

export async function listMessages(contactId: string, conversationId: number): Promise<ChatMessage[]> {
  const raw = await request<RawMessage[]>(`/contacts/${contactId}/conversations/${conversationId}/messages`);
  return raw.map(toChatMessage).filter((m): m is ChatMessage => m !== null);
}

export async function sendMessage(contactId: string, conversationId: number, content: string): Promise<ChatMessage> {
  const raw = await request<RawMessage>(`/contacts/${contactId}/conversations/${conversationId}/messages`, {
    method: "POST",
    body: JSON.stringify({ content }),
  });
  return toChatMessage(raw) ?? { id: raw.id, content, from: "visitor", createdAt: raw.created_at };
}
