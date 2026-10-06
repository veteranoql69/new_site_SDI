const FIRST_TOUCH_KEY = "sdi_first_touch";
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign"] as const;

/**
 * Origen de la primera visita de la sesión: página de entrada, referrer y UTM.
 * Se guarda en sessionStorage para no perderlo al navegar entre páginas.
 */
export function getFirstTouch(): Record<string, string> {
  try {
    const saved = sessionStorage.getItem(FIRST_TOUCH_KEY);
    if (saved) return JSON.parse(saved) as Record<string, string>;
  } catch {
    // sessionStorage no disponible o con datos corruptos: se recalcula.
  }

  const params = new URLSearchParams(window.location.search);
  const entries: [string, string][] = [
    ["pagina_entrada", window.location.pathname],
    ["referrer", document.referrer],
    ...UTM_KEYS.map((key): [string, string] => [key, params.get(key) ?? ""]),
  ];
  const firstTouch = Object.fromEntries(entries.filter(([, value]) => value));

  try {
    sessionStorage.setItem(FIRST_TOUCH_KEY, JSON.stringify(firstTouch));
  } catch {
    // Sin sessionStorage solo se pierde la persistencia entre páginas.
  }
  return firstTouch;
}
