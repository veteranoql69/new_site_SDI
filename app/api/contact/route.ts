import { NextResponse } from "next/server";

import { sendMessage, startSession } from "@/lib/chat/chatwoot-public";
import { clientIp, isRateLimited } from "@/lib/chat/rate-limit";
import { MAX_MESSAGE_LENGTH, cleanName, isValidEmail, normalizePhone } from "@/lib/chat/validation";

const ORIGIN_KEYS = ["origen_seccion", "pagina_entrada", "referrer", "utm_source", "utm_medium", "utm_campaign"] as const;

/**
 * Formulario "que me contacten": crea el contacto y la conversación en la misma
 * bandeja del chat (#43), con el mensaje del formulario como primer mensaje.
 * Así llega al omnicanal interno como cualquier otro lead, sin n8n.
 */
export async function POST(request: Request) {
  if (isRateLimited(`contact:${clientIp(request)}`, 4, 10 * 60_000)) {
    return NextResponse.json({ error: "Ya recibimos varios envíos. Espera unos minutos." }, { status: 429 });
  }

  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body) return NextResponse.json({ error: "Solicitud inválida." }, { status: 400 });

  // Honeypot: un campo invisible que solo completan los bots.
  if (String(body.website ?? "")) return NextResponse.json({ ok: true });

  const name = cleanName(String(body.name ?? ""));
  const phone = normalizePhone(String(body.phone ?? ""));
  const email = String(body.email ?? "").trim();
  const company = String(body.company ?? "").trim().slice(0, 120);
  const message = String(body.message ?? "").trim();

  if (!name) return NextResponse.json({ error: "Escribe tu nombre.", field: "name" }, { status: 400 });
  if (!phone) return NextResponse.json({ error: "Revisa el teléfono: ej. 9 1234 5678.", field: "phone" }, { status: 400 });
  if (email && !isValidEmail(email)) return NextResponse.json({ error: "Revisa el email.", field: "email" }, { status: 400 });
  if (message.length < 10) {
    return NextResponse.json({ error: "Cuéntanos un poco más de tu proceso.", field: "message" }, { status: 400 });
  }
  if (message.length > MAX_MESSAGE_LENGTH) {
    return NextResponse.json({ error: `Máximo ${MAX_MESSAGE_LENGTH} caracteres.`, field: "message" }, { status: 400 });
  }

  const origin = (body.origin ?? {}) as Record<string, unknown>;
  const attributes: Record<string, string> = Object.fromEntries(
    ORIGIN_KEYS.map((key) => [key, String(origin[key] ?? "").slice(0, 300)]).filter(([, value]) => value),
  );
  attributes.canal_sitio = "formulario";

  try {
    const session = await startSession({ name, phone, email: email || undefined }, attributes);
    const content = [`Formulario del sitio${company ? ` · ${company}` : ""}`, "", message].join("\n");
    await sendMessage(session.contactId, session.conversationId, content);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[contact] No se pudo registrar el formulario:", error);
    return NextResponse.json({ error: "No pudimos enviar tu mensaje." }, { status: 503 });
  }
}
