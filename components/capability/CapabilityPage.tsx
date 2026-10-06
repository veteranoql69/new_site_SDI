import { ArrowDown, ArrowRight, Check } from "lucide-react";

import { ContactSection } from "@/components/home/ContactSection";
import { ChatButton } from "@/components/ui/ChatButton";
import { FormulaBar } from "@/components/ui/FormulaBar";

export interface CapabilityContent {
  section: string;
  cellRef: string;
  title: string;
  intro: string;
  uses: { today: string; withSdi: string }[];
  flow: { step: string; detail: string; core?: boolean }[];
  details: string[];
  note?: string;
}

/** Página de una capacidad, con la misma gramática de planilla que la portada. */
export function CapabilityPage({ content }: { content: CapabilityContent }) {
  const { section, cellRef, title, intro, uses, flow, details, note } = content;

  return (
    <>
      <section aria-labelledby="capacidad-title" className="mx-auto max-w-[1240px] px-4 pt-6 sm:px-6 sm:pt-10">
        <div className="sheet">
          <FormulaBar cellRef={cellRef} formula={title} />
          <div className="grid grid-cols-[2rem_1fr] md:grid-cols-[3rem_1fr]">
          <span aria-hidden className="sheet-band flex justify-center border-r border-grid pt-5">1</span>
          <div className="cell-selected px-4 py-6 sm:px-7 sm:py-8">
            <h1 id="capacidad-title" className="max-w-[22ch] text-balance font-display text-[clamp(2rem,4.6vw,3.8rem)] leading-[1.03] font-extrabold tracking-[-0.035em] text-ink">
              {title}
            </h1>
            <p className="mt-5 max-w-[62ch] text-[1.08rem] leading-relaxed text-ink-soft">{intro}</p>
            <div className="mt-7">
              <ChatButton section={section} className="!px-6 !py-3.5 !text-base" />
            </div>
          </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="usos-title" className="mx-auto max-w-[1240px] px-4 py-16 sm:px-6 sm:py-20">
        <h2 id="usos-title" className="font-display text-[clamp(1.6rem,3vw,2.4rem)] font-extrabold tracking-[-0.03em] text-ink">
          Para qué sirve en tu proceso
        </h2>
        <div className="sheet mt-6">
          <table className="w-full border-collapse text-left">
            <caption className="sr-only">Cómo se hace hoy y cómo queda con SDI</caption>
            <thead>
              <tr className="[&>*]:border-b [&>*]:border-grid">
                <th scope="col" className="sheet-band w-1/2 border-r px-4 py-2.5 !text-[0.85rem] !font-semibold !text-ink">Hoy</th>
                <th scope="col" className="bg-sdi-wash px-4 py-2.5 text-[0.85rem] font-semibold text-sdi-strong">Con SDI</th>
              </tr>
            </thead>
            <tbody>
              {uses.map((use) => (
                <tr key={use.today} className="align-top [&>*]:border-b [&>*]:border-grid">
                  <td className="border-r px-4 py-4 text-[0.98rem] leading-relaxed text-ink-soft">{use.today}</td>
                  <td className="px-4 py-4 text-[0.98rem] leading-relaxed text-ink">{use.withSdi}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section aria-labelledby="funciona-title" className="border-y border-grid bg-paper">
        <div className="mx-auto max-w-[1240px] px-4 py-16 sm:px-6 sm:py-20">
          <h2 id="funciona-title" className="font-display text-[clamp(1.6rem,3vw,2.4rem)] font-extrabold tracking-[-0.03em] text-ink">
            Cómo funciona por dentro
          </h2>
          <ol className="mt-8 flex flex-col items-stretch lg:flex-row">
            {flow.map((item, i) => (
              <li key={item.step} className="flex flex-col items-stretch lg:flex-1 lg:flex-row">
                <div className={`flex-1 border border-grid p-4 ${item.core ? "cell-selected bg-sdi-wash" : "bg-paper"}`}>
                  <p className="font-display text-[1.05rem] font-bold text-ink">{item.step}</p>
                  <p className="mt-1.5 text-[0.9rem] leading-relaxed text-ink-soft">{item.detail}</p>
                </div>
                {i < flow.length - 1 && (
                  <span aria-hidden className="flex items-center justify-center py-1.5 text-band-ink lg:px-1.5 lg:py-0">
                    <ArrowDown size={18} className="lg:hidden" />
                    <ArrowRight size={18} className="hidden lg:block" />
                  </span>
                )}
              </li>
            ))}
          </ol>

          <ul className="mt-10 grid gap-x-10 gap-y-3 md:grid-cols-2">
            {details.map((detail) => (
              <li key={detail} className="flex gap-3 text-[0.98rem] leading-relaxed text-ink">
                <Check size={19} aria-hidden className="mt-0.5 shrink-0 text-sdi-strong" />
                {detail}
              </li>
            ))}
          </ul>
          {note && <p className="mt-8 max-w-[70ch] bg-mark-soft px-4 py-3 text-[0.95rem] leading-relaxed text-ink">{note}</p>}
        </div>
      </section>

      <ContactSection section={section} />
    </>
  );
}
