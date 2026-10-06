// Punto único de contacto del sitio: cualquier botón abre el chat propio
// indicando desde qué sección se pidió (queda como origen del lead).
export const OPEN_CHAT_EVENT = "sdi:open-chat";

export interface OpenChatDetail {
  section: string;
}

export function openChat(section: string) {
  window.dispatchEvent(new CustomEvent<OpenChatDetail>(OPEN_CHAT_EVENT, { detail: { section } }));
}
