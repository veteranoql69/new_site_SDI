"use client";

import { ArrowUp, MessageSquareText, RotateCcw, X } from "lucide-react";
import { useCallback, useEffect, useId, useRef, useState } from "react";

import { WhatsAppIcon } from "@/components/icons/BrandIcons";
import { OPEN_CHAT_EVENT, type OpenChatDetail } from "@/lib/chat/open-chat";
import { type Message, useChat } from "@/lib/chat/use-chat";
import { MAX_MESSAGE_LENGTH } from "@/lib/chat/validation";
import { WHATSAPP, whatsappLink } from "@/lib/site";

const timeFormat = new Intl.DateTimeFormat("es-CL", { hour: "2-digit", minute: "2-digit" });

/** Rótulo de estado, impreso como en una etiqueta: sin spinners ni cromo. */
function StatusLabel({ online, typing }: { online: boolean; typing: boolean }) {
  const label = !online ? "Sin conexión" : typing ? "Escribiendo…" : "En línea";
  const tone = !online ? "bg-band text-ink" : "bg-sdi-wash text-sdi-strong";
  return (
    <span aria-live="polite" className={`rounded-[2px] px-1.5 py-0.5 text-[0.68rem] font-semibold uppercase tracking-[0.06em] ${tone}`}>
      {label}
    </span>
  );
}

function MessageRow({ message, onRetry }: { message: Message; onRetry: (m: Message) => void }) {
  const mine = message.from === "visitor";
  return (
    <li className={`grid grid-cols-[3.25rem_1fr] border-b border-grid ${mine ? "bg-mark-soft" : "bg-paper"}`}>
      <span className="sheet-band flex flex-col items-center justify-start gap-0.5 border-r border-grid px-1 pt-2.5 text-center">
        <span className="font-semibold text-ink">{mine ? "Tú" : "SDI"}</span>
        <span className="text-[0.66rem]">{timeFormat.format(new Date(message.createdAt * 1000))}</span>
      </span>
      <div className="px-3 py-2.5">
        <p className="whitespace-pre-wrap break-words text-[0.93rem] leading-relaxed text-ink">{message.content}</p>
        {message.status === "sending" && <p className="mt-1 text-[0.7rem] uppercase tracking-[0.06em] text-band-ink">Enviando</p>}
        {message.status === "failed" && (
          <button
            type="button"
            onClick={() => onRetry(message)}
            className="mt-1 inline-flex items-center gap-1 text-[0.75rem] font-semibold text-ink underline"
          >
            <RotateCcw size={12} aria-hidden /> No se envió · Reintentar
          </button>
        )}
      </div>
    </li>
  );
}

function IdentifyForm({
  onSubmit,
  starting,
  error,
  section,
}: {
  onSubmit: (input: { name: string; phone: string; email: string }) => void;
  starting: boolean;
  error: { message: string; field?: string } | null;
  section: string;
}) {
  const ids = { name: useId(), phone: useId(), email: useId(), error: useId() };
  const fields = [
    { key: "name", label: "Nombre", type: "text", autoComplete: "name", placeholder: "Tu nombre", required: true },
    { key: "phone", label: "Teléfono", type: "tel", autoComplete: "tel", placeholder: "9 1234 5678", required: true },
    { key: "email", label: "Email", type: "email", autoComplete: "email", placeholder: "opcional", required: false },
  ] as const;

  return (
    <form
      className="flex flex-1 flex-col overflow-y-auto"
      onSubmit={(e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        onSubmit({
          name: String(data.get("name") ?? ""),
          phone: String(data.get("phone") ?? ""),
          email: String(data.get("email") ?? ""),
        });
      }}
    >
      <p className="px-4 pt-4 text-[0.93rem] leading-relaxed text-ink-soft">
        Antes de empezar, ¿con quién hablamos? Así, si se corta, te podemos escribir por WhatsApp.
      </p>
      <div className="mx-4 mt-4 border-t border-l border-grid">
        {fields.map((field) => (
          <div key={field.key} className="grid grid-cols-[6.5rem_1fr] border-r border-b border-grid">
            <label htmlFor={ids[field.key]} className="sheet-band flex items-center border-r border-grid px-2.5 text-[0.8rem]">
              {field.label}
              {field.required && <span aria-hidden className="ml-0.5 text-sdi-strong">*</span>}
            </label>
            <input
              id={ids[field.key]}
              name={field.key}
              type={field.type}
              autoComplete={field.autoComplete}
              placeholder={field.placeholder}
              required={field.required}
              aria-invalid={error?.field === field.key || undefined}
              aria-describedby={error?.field === field.key ? ids.error : undefined}
              className="min-w-0 bg-paper px-2.5 py-2.5 text-[0.95rem] text-ink placeholder:text-band-ink focus:outline-2 focus:-outline-offset-2 focus:outline-sdi aria-[invalid]:bg-saas-wash"
            />
          </div>
        ))}
      </div>
      {error && (
        <p id={ids.error} role="alert" className="mx-4 mt-3 bg-saas-wash px-2 py-1 text-[0.85rem] font-medium text-ink">
          {error.message}
        </p>
      )}
      <div className="mt-auto space-y-3 p-4">
        <button
          type="submit"
          disabled={starting}
          className="w-full rounded-[3px] bg-sdi-strong px-4 py-3 text-[0.95rem] font-semibold text-white transition-colors hover:bg-ink disabled:cursor-wait disabled:opacity-70"
        >
          {starting ? "Abriendo conversación…" : "Empezar conversación"}
        </button>
        <a
          href={whatsappLink(section)}
          target="_blank"
          rel="noopener"
          className="flex items-center justify-center gap-2 text-[0.85rem] font-medium text-ink-soft hover:text-ink"
        >
          <WhatsAppIcon size={15} /> ¿Prefieres WhatsApp? {WHATSAPP.display}
        </a>
      </div>
    </form>
  );
}

export function ChatPanel() {
  const [open, setOpen] = useState(false);
  const [online, setOnline] = useState(true);
  // El botón flotante aparece al dejar atrás el primer pantallazo, que ya tiene su llamado.
  const [pastHero, setPastHero] = useState(false);
  const [draft, setDraft] = useState("");
  const [section, setSectionState] = useState("Sitio");
  const chat = useChat(open);
  const titleId = useId();
  const listRef = useRef<HTMLOListElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const composerRef = useRef<HTMLTextAreaElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const { setSection } = chat;

  const openWith = useCallback(
    (from: string) => {
      setSection(from);
      setSectionState(from);
      setOpen(true);
    },
    [setSection],
  );

  useEffect(() => {
    const onOpen = (e: Event) => openWith((e as CustomEvent<OpenChatDetail>).detail.section);
    window.addEventListener(OPEN_CHAT_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_CHAT_EVENT, onOpen);
  }, [openWith]);

  useEffect(() => {
    const onScroll = () => {
      // En la portada, la hoja ya trae su propio "Habla con SDI": el flotante espera a que salga de pantalla.
      const heroSheet = document.querySelector("[data-hero-sheet]");
      setPastHero(heroSheet ? heroSheet.getBoundingClientRect().bottom < 0 : window.scrollY > window.innerHeight * 0.6);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const update = () => setOnline(navigator.onLine);
    update();
    window.addEventListener("online", update);
    window.addEventListener("offline", update);
    return () => {
      window.removeEventListener("online", update);
      window.removeEventListener("offline", update);
    };
  }, []);

  // Al abrir, el foco va al primer campo útil; Esc cierra y devuelve el foco.
  useEffect(() => {
    if (!open) return;
    const target = chat.status === "ready" ? composerRef.current : panelRef.current?.querySelector<HTMLElement>("input");
    target?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        launcherRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, chat.status]);

  useEffect(() => {
    listRef.current?.lastElementChild?.scrollIntoView({ block: "end" });
  }, [chat.messages.length, chat.awaitingReply, open]);

  const submit = () => {
    const content = draft.trim();
    if (!content || content.length > MAX_MESSAGE_LENGTH) return;
    void chat.send(content);
    setDraft("");
  };

  return (
    <>
      {open && (
        <div
          ref={panelRef}
          role="dialog"
          aria-labelledby={titleId}
          className="fixed inset-0 z-50 flex flex-col border-grid bg-paper shadow-[0_24px_60px_-20px_rgba(11,22,64,0.45)] motion-safe:animate-[chat-in_240ms_var(--ease-out-expo)] sm:inset-auto sm:right-5 sm:bottom-5 sm:h-[min(640px,calc(100dvh-6.5rem))] sm:w-[400px] sm:border"
        >
          <header className="border-b border-grid">
            <div className="flex items-center justify-between gap-3 px-4 py-3">
              <div className="flex items-center gap-2.5">
                <h2 id={titleId} className="font-display text-[1.15rem] font-bold tracking-[-0.01em] text-ink">
                  Habla con SDI
                </h2>
                <StatusLabel online={online} typing={chat.awaitingReply} />
              </div>
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  launcherRef.current?.focus();
                }}
                aria-label="Cerrar chat"
                className="inline-flex size-9 items-center justify-center rounded-[3px] text-ink-soft hover:bg-band hover:text-ink"
              >
                <X size={20} aria-hidden />
              </button>
            </div>
            <p className="sheet-band border-t border-grid px-4 py-2 !text-[0.78rem] !font-normal !tracking-normal">
              Te responde el asistente de SDI al tiro; si hace falta, sigue una persona del equipo.
            </p>
          </header>

          {chat.status !== "ready" ? (
            <IdentifyForm onSubmit={chat.identify} starting={chat.status === "starting"} error={chat.error} section={section} />
          ) : (
            <>
              <ol ref={listRef} aria-live="polite" aria-label="Conversación" className="flex-1 overflow-y-auto">
                {chat.messages.length === 0 && (
                  <li className="px-4 py-5 text-[0.93rem] leading-relaxed text-ink-soft">
                    Cuéntanos cómo funciona hoy tu proceso: qué haces a mano, en qué planillas y qué sistemas pagas.
                  </li>
                )}
                {chat.messages.map((message) => (
                  <MessageRow key={message.id} message={message} onRetry={(m) => void chat.send(m.content, m.id)} />
                ))}
                {chat.awaitingReply && (
                  <li className="grid grid-cols-[3.25rem_1fr] border-b border-grid">
                    <span className="sheet-band flex items-center justify-center border-r border-grid py-2.5 font-semibold text-ink">
                      SDI
                    </span>
                    <span className="px-3 py-2.5 text-[0.78rem] font-semibold uppercase tracking-[0.06em] text-sdi-strong">
                      Escribiendo…
                    </span>
                  </li>
                )}
              </ol>
              <form
                className="flex items-end gap-2 border-t border-grid p-3"
                onSubmit={(e) => {
                  e.preventDefault();
                  submit();
                }}
              >
                <label htmlFor="chat-composer" className="sr-only">
                  Tu mensaje
                </label>
                <textarea
                  id="chat-composer"
                  ref={composerRef}
                  value={draft}
                  rows={1}
                  maxLength={MAX_MESSAGE_LENGTH}
                  onChange={(e) => setDraft(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      submit();
                    }
                  }}
                  placeholder="Escribe tu mensaje"
                  className="max-h-32 min-h-[2.75rem] flex-1 resize-none border border-grid bg-paper px-3 py-2.5 text-[0.95rem] leading-snug text-ink placeholder:text-band-ink [field-sizing:content] focus:outline-2 focus:-outline-offset-2 focus:outline-sdi"
                />
                <button
                  type="submit"
                  disabled={!draft.trim()}
                  aria-label="Enviar mensaje"
                  className="inline-flex size-11 shrink-0 items-center justify-center rounded-[3px] bg-sdi-strong text-white transition-colors hover:bg-ink disabled:bg-band disabled:text-band-ink"
                >
                  <ArrowUp size={20} aria-hidden />
                </button>
              </form>
              <div className="flex items-center justify-between border-t border-grid px-4 py-2 text-[0.78rem] text-band-ink">
                <a href={whatsappLink(section)} target="_blank" rel="noopener" className="inline-flex items-center gap-1.5 hover:text-ink">
                  <WhatsAppIcon size={13} /> Seguir por WhatsApp
                </a>
                <button type="button" onClick={chat.resetSession} className="hover:text-ink">
                  Nueva conversación
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {!open && pastHero && (
        <button
          ref={launcherRef}
          type="button"
          onClick={() => openWith("Botón flotante")}
          className="fixed right-4 bottom-4 z-40 inline-flex items-center gap-2 rounded-[3px] bg-sdi-strong px-4 py-3 text-[0.95rem] font-semibold text-white shadow-[0_10px_30px_-10px_rgba(10,98,201,0.7)] transition-colors hover:bg-ink sm:right-5 sm:bottom-5"
        >
          <MessageSquareText size={19} aria-hidden />
          Habla con SDI
        </button>
      )}
    </>
  );
}
