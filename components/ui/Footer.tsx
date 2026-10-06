import Image from "next/image";
import Link from "next/link";

import { WhatsAppIcon } from "@/components/icons/BrandIcons";
import { ChatButton } from "@/components/ui/ChatButton";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { WHATSAPP, whatsappLink } from "@/lib/site";

const LINKS = [
  { name: "Cómo trabajamos", href: "/#como-trabajamos" },
  { name: "Agentes de IA", href: "/soluciones/agentes-ia" },
  { name: "IoT industrial", href: "/soluciones/iot-industrial" },
  { name: "Edge y visión artificial", href: "/soluciones/edge-computing" },
];

export function Footer() {
  return (
    <footer className="border-t border-grid bg-paper">
      <div className="mx-auto grid max-w-[1240px] gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <Link href="/" className="inline-flex items-center gap-2.5">
            <Image src="/logo_oficial.png" alt="" width={36} height={30} style={{ height: 30, width: "auto" }} />
            <span className="font-display text-lg font-bold tracking-[-0.02em] text-ink">SDI Tecnología</span>
          </Link>
          <p className="mt-3 max-w-[38ch] text-[0.95rem] leading-relaxed text-ink-soft">
            Construimos el sistema de tu proceso, del médico al industrial, en reemplazo de las planillas y suscripciones que hoy usas.
          </p>
        </div>

        <nav aria-label="Pie de página">
          <p className="text-[0.8rem] font-semibold tracking-[0.04em] text-band-ink uppercase">Sitio</p>
          <ul className="mt-3 space-y-2">
            {LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-[0.95rem] text-ink-soft hover:text-ink hover:underline">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="text-[0.8rem] font-semibold tracking-[0.04em] text-band-ink uppercase">Contacto</p>
          <div className="mt-3 flex flex-col items-start gap-3">
            <ChatButton section="Pie de página" variant="quiet" className="!px-4 !py-2.5" />
            <a href={whatsappLink("Pie de página")} target="_blank" rel="noopener" className="inline-flex items-center gap-2 text-[0.95rem] text-ink-soft tabular-nums hover:text-ink">
              <WhatsAppIcon size={16} className="text-[#1f9e55]" /> {WHATSAPP.display}
            </a>
            <SocialLinks className="-ml-2.5" />
          </div>
        </div>
      </div>

      <div className="sheet-band border-t border-grid">
        <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-2 px-4 py-2.5 !text-[0.8rem] sm:px-6">
          <span>© {new Date().getFullYear()} SDI Tecnología · Chile</span>
          <span>Listo</span>
        </div>
      </div>
    </footer>
  );
}
