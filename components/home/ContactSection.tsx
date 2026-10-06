import { MessageSquareText } from "lucide-react";

import { WhatsAppIcon } from "@/components/icons/BrandIcons";
import { ContactForm } from "@/components/home/ContactForm";
import { ChatButton } from "@/components/ui/ChatButton";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { WHATSAPP, whatsappLink } from "@/lib/site";

/** Cierre de página: todos los puntos de contacto activos, a la vista. */
export function ContactSection({ section = "Contacto" }: { section?: string }) {
  return (
    <section id="contacto" aria-labelledby="contacto-title" className="mx-auto max-w-[1240px] px-4 py-16 sm:px-6 sm:py-24">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div>
          <h2 id="contacto-title" className="text-balance font-display text-[clamp(2rem,4vw,3.4rem)] leading-[1.02] font-extrabold tracking-[-0.035em] text-ink">
            Cuéntanos cómo es tu proceso hoy.
          </h2>
          <p className="mt-4 max-w-[46ch] text-[1.08rem] leading-relaxed text-ink-soft">
            Con eso basta para empezar: nos dices qué haces a mano, en qué planillas y qué sistemas pagas. Por donde te acomode.
          </p>

          <ul className="mt-8 border-t border-grid">
            <li className="flex flex-wrap items-center justify-between gap-4 border-b border-grid py-5">
              <div className="flex items-start gap-3">
                <MessageSquareText size={22} aria-hidden className="mt-0.5 text-sdi-strong" />
                <div>
                  <p className="font-display text-[1.15rem] font-bold text-ink">Chat</p>
                  <p className="text-[0.93rem] text-ink-soft">Te responde nuestro asistente al tiro.</p>
                </div>
              </div>
              <ChatButton section={`${section} · chat`}>Abrir chat</ChatButton>
            </li>
            <li className="flex flex-wrap items-center justify-between gap-4 border-b border-grid py-5">
              <div className="flex items-start gap-3">
                <WhatsAppIcon size={21} className="mt-0.5 text-[#1f9e55]" />
                <div>
                  <p className="font-display text-[1.15rem] font-bold text-ink">WhatsApp</p>
                  <p className="text-[0.93rem] text-ink-soft tabular-nums">{WHATSAPP.display}</p>
                </div>
              </div>
              <a
                href={whatsappLink(section)}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center justify-center gap-2 rounded-[3px] border border-grid bg-paper px-5 py-3 text-[0.95rem] font-semibold text-ink transition-colors hover:border-sdi hover:text-sdi-strong"
              >
                Escribir por WhatsApp
              </a>
            </li>
            <li className="flex flex-wrap items-center justify-between gap-4 border-b border-grid py-5">
              <div>
                <p className="font-display text-[1.15rem] font-bold text-ink">Redes</p>
                <p className="text-[0.93rem] text-ink-soft">Síguenos y escríbenos por mensaje directo.</p>
              </div>
              <SocialLinks />
            </li>
          </ul>
        </div>

        <ContactForm section={`${section} · formulario`} />
      </div>
    </section>
  );
}
