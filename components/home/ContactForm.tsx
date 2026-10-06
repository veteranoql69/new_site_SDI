"use client";

import { Check } from "lucide-react";
import { useId, useState } from "react";

import { getFirstTouch } from "@/lib/chat/origin";
import { MAX_MESSAGE_LENGTH } from "@/lib/chat/validation";

type Field = "name" | "phone" | "email" | "company" | "message";

const FIELDS: { key: Exclude<Field, "message">; label: string; type: string; autoComplete: string; placeholder: string; required: boolean }[] = [
  { key: "name", label: "Nombre", type: "text", autoComplete: "name", placeholder: "Tu nombre", required: true },
  { key: "phone", label: "Teléfono", type: "tel", autoComplete: "tel", placeholder: "9 1234 5678", required: true },
  { key: "email", label: "Email", type: "email", autoComplete: "email", placeholder: "opcional", required: false },
  { key: "company", label: "Empresa", type: "text", autoComplete: "organization", placeholder: "opcional", required: false },
];

/** "Que me contacten": llega a la misma bandeja del omnicanal que el chat. */
export function ContactForm({ section }: { section: string }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState<{ message: string; field?: Field } | null>(null);
  const baseId = useId();
  const id = (field: string) => `${baseId}-${field}`;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    setStatus("sending");
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, origin: { ...getFirstTouch(), origen_seccion: section } }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError({ message: body.error ?? "No pudimos enviar tu mensaje.", field: body.field });
        setStatus("idle");
        return;
      }
      setStatus("sent");
    } catch {
      setError({ message: "Sin conexión. Revisa tu internet e intenta de nuevo." });
      setStatus("idle");
    }
  }

  if (status === "sent") {
    return (
      <div role="status" className="sheet flex flex-col items-start gap-3 p-6">
        <span className="inline-flex size-10 items-center justify-center rounded-[3px] bg-sdi-wash text-sdi-strong">
          <Check size={22} aria-hidden />
        </span>
        <p className="font-display text-[1.35rem] font-bold text-ink">Recibido.</p>
        <p className="max-w-[44ch] text-[0.98rem] leading-relaxed text-ink-soft">
          Te contactamos por teléfono o WhatsApp para conversar de tu proceso.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="sheet" noValidate>
      <div className="sheet-band border-b border-grid px-4 py-2.5 !text-[0.85rem] !font-semibold !text-ink">Que me contacten</div>
      {FIELDS.map((field) => (
        <div key={field.key} className="grid grid-cols-[6.5rem_1fr] border-b border-grid sm:grid-cols-[7.5rem_1fr]">
          <label htmlFor={id(field.key)} className="sheet-band flex items-center border-r border-grid px-3 !text-[0.85rem]">
            {field.label}
            {field.required && <span aria-hidden className="ml-0.5 text-sdi-strong">*</span>}
          </label>
          <input
            id={id(field.key)}
            name={field.key}
            type={field.type}
            autoComplete={field.autoComplete}
            placeholder={field.placeholder}
            required={field.required}
            aria-invalid={error?.field === field.key || undefined}
            aria-describedby={error?.field === field.key ? id("error") : undefined}
            className="min-w-0 bg-paper px-3 py-3 text-[0.98rem] text-ink placeholder:text-band-ink focus:outline-2 focus:-outline-offset-2 focus:outline-sdi aria-[invalid]:bg-saas-wash"
          />
        </div>
      ))}
      <div className="border-b border-grid">
        <label htmlFor={id("message")} className="sheet-band block border-b border-grid px-3 py-2 !text-[0.85rem]">
          ¿Cómo es tu proceso hoy?<span aria-hidden className="ml-0.5 text-sdi-strong">*</span>
        </label>
        <textarea
          id={id("message")}
          name="message"
          rows={4}
          required
          maxLength={MAX_MESSAGE_LENGTH}
          placeholder="Ej.: llevamos la producción en una planilla, la agenda en un SaaS y cobramos con otro."
          aria-invalid={error?.field === "message" || undefined}
          aria-describedby={error?.field === "message" ? id("error") : undefined}
          className="block w-full resize-y bg-paper px-3 py-3 text-[0.98rem] leading-relaxed text-ink placeholder:text-band-ink focus:outline-2 focus:-outline-offset-2 focus:outline-sdi aria-[invalid]:bg-saas-wash"
        />
      </div>
      {/* Honeypot: invisible para personas, tentador para bots. */}
      <div aria-hidden className="absolute -left-[9999px]">
        <label>
          No completar
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 p-4">
        {error ? (
          <p id={id("error")} role="alert" className="bg-saas-wash px-2 py-1 text-[0.88rem] font-medium text-ink">
            {error.message}
          </p>
        ) : (
          <p className="text-[0.82rem] text-band-ink">Tus datos llegan al equipo de SDI solo para responderte.</p>
        )}
        <button
          type="submit"
          disabled={status === "sending"}
          className="rounded-[3px] bg-ink px-5 py-3 text-[0.95rem] font-semibold text-white transition-colors hover:bg-sdi-strong disabled:cursor-wait disabled:opacity-70"
        >
          {status === "sending" ? "Enviando…" : "Enviar"}
        </button>
      </div>
    </form>
  );
}
