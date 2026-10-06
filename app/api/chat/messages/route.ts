import { NextResponse } from "next/server";

import { ChatwootError, listMessages, sendMessage } from "@/lib/chat/chatwoot-public";
import { clientIp, isRateLimited } from "@/lib/chat/rate-limit";
import { MAX_MESSAGE_LENGTH } from "@/lib/chat/validation";

function parseSession(contactId: unknown, conversationId: unknown) {
  const contact = String(contactId ?? "");
  const conversation = Number(conversationId);
  if (!/^[\w-]{8,64}$/.test(contact) || !Number.isInteger(conversation) || conversation <= 0) return null;
  return { contact, conversation };
}

function errorResponse(error: unknown) {
  // 404 = la conversación o el contacto ya no existen en Chatwoot: el cliente debe empezar de nuevo.
  if (error instanceof ChatwootError && error.status === 404) {
    return NextResponse.json({ error: "La conversación ya no existe." }, { status: 410 });
  }
  console.error("[chat] Error con Chatwoot:", error);
  return NextResponse.json({ error: "No pudimos conectar con el chat." }, { status: 503 });
}

/** Historial de la conversación (también es el respaldo cuando el websocket no conecta). */
export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const session = parseSession(params.get("contact"), params.get("conversation"));
  if (!session) return NextResponse.json({ error: "Sesión inválida." }, { status: 400 });

  if (isRateLimited(`poll:${clientIp(request)}`, 120, 60_000)) {
    return NextResponse.json({ error: "Demasiadas solicitudes." }, { status: 429 });
  }

  try {
    return NextResponse.json(await listMessages(session.contact, session.conversation));
  } catch (error) {
    return errorResponse(error);
  }
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  const session = parseSession(body?.contactId, body?.conversationId);
  if (!session) return NextResponse.json({ error: "Sesión inválida." }, { status: 400 });

  const content = String(body?.content ?? "").trim();
  if (!content) return NextResponse.json({ error: "El mensaje está vacío." }, { status: 400 });
  if (content.length > MAX_MESSAGE_LENGTH) {
    return NextResponse.json({ error: `Máximo ${MAX_MESSAGE_LENGTH} caracteres.` }, { status: 400 });
  }

  if (isRateLimited(`send:${clientIp(request)}`, 20, 60_000)) {
    return NextResponse.json({ error: "Vas muy rápido. Espera un momento." }, { status: 429 });
  }

  try {
    return NextResponse.json(await sendMessage(session.contact, session.conversation, content));
  } catch (error) {
    return errorResponse(error);
  }
}
