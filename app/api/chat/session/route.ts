import { NextResponse } from "next/server";

import { ChatwootError, startSession } from "@/lib/chat/chatwoot-public";
import { clientIp, isRateLimited } from "@/lib/chat/rate-limit";
import { cleanName, isValidEmail, normalizePhone } from "@/lib/chat/validation";

const ORIGIN_KEYS = ["origen_seccion", "pagina_entrada", "referrer", "utm_source", "utm_medium", "utm_campaign"] as const;

/** Identifica al visitante y abre su conversación en la bandeja del sitio. */
export async function POST(request: Request) {
  if (isRateLimited(`session:${clientIp(request)}`, 5, 10 * 60_000)) {
    return NextResponse.json({ error: "Demasiados intentos. Espera unos minutos." }, { status: 429 });
  }

  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body) return NextResponse.json({ error: "Solicitud inválida." }, { status: 400 });

  const name = cleanName(String(body.name ?? ""));
  const phone = normalizePhone(String(body.phone ?? ""));
  const email = String(body.email ?? "").trim();

  if (!name) return NextResponse.json({ error: "Escribe tu nombre.", field: "name" }, { status: 400 });
  if (!phone) return NextResponse.json({ error: "Revisa el teléfono: ej. 9 1234 5678.", field: "phone" }, { status: 400 });
  if (email && !isValidEmail(email)) {
    return NextResponse.json({ error: "Revisa el email.", field: "email" }, { status: 400 });
  }

  const origin = (body.origin ?? {}) as Record<string, unknown>;
  const attributes: Record<string, string> = Object.fromEntries(
    ORIGIN_KEYS.map((key) => [key, String(origin[key] ?? "").slice(0, 300)]).filter(([, value]) => value),
  );
  attributes.canal_sitio = "chat";

  try {
    const session = await startSession({ name, phone, email: email || undefined }, attributes);
    return NextResponse.json(session);
  } catch (error) {
    console.error("[chat] No se pudo abrir la sesión:", error);
    const status = error instanceof ChatwootError && error.status < 500 ? 502 : 503;
    return NextResponse.json({ error: "No pudimos abrir el chat." }, { status });
  }
}
