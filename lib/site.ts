// Puntos de contacto de SDI. Todos llegan al omnicanal interno (IA Leads Funnel).
export const WHATSAPP = {
  display: "+56 9 2612 6483",
  url: "https://wa.me/56926126483",
};

export function whatsappLink(section: string): string {
  const text = `Hola SDI, vengo del sitio web (${section}) y quiero conversar sobre mi proceso.`;
  return `${WHATSAPP.url}?text=${encodeURIComponent(text)}`;
}

// Perfiles de redes. Una red sin URL no se muestra: nada de enlaces muertos.
export const SOCIAL_PROFILES = {
  instagram: "https://www.instagram.com/sditecnologia.ia/",
  tiktok: "",
  linkedin: "https://www.linkedin.com/company/109774287/",
} as const;
