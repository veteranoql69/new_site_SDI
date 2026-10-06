"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { LayoutDashboard, Sheet } from "lucide-react";
import { useState } from "react";

import { ChatButton } from "@/components/ui/ChatButton";
import { FormulaBar } from "@/components/ui/FormulaBar";

type Today = { text: string; saas?: boolean };
type Step = { step: string; today: Today; withSdi: string };

const HEADLINE = "Construimos el sistema de tu proceso.";
const HEADLINE_ACCENT = "No te acomodes a un SaaS.";

const PROCESSES: { title: string; steps: Step[] }[] = [
  {
    title: "Proceso médico",
    steps: [
      { step: "El paciente consulta", today: { text: "WhatsApp y llamadas, sin registro" }, withSdi: "Un agente IA responde y deja al paciente registrado" },
      { step: "Agenda", today: { text: "Agenda online", saas: true }, withSdi: "Agenda propia, conectada a la ficha" },
      { step: "Ficha", today: { text: "Planilla y papel" }, withSdi: "Ficha en el mismo sistema, con su historial" },
      { step: "Seguimiento", today: { text: "Recordatorios a mano" }, withSdi: "Controles y recordatorios automáticos" },
    ],
  },
  {
    title: "Proceso industrial",
    steps: [
      { step: "Cotización y venta", today: { text: "CRM", saas: true }, withSdi: "Cotización y orden en un solo flujo" },
      { step: "Producción", today: { text: "Pizarra y planilla" }, withSdi: "Órdenes de producción con estado en vivo" },
      { step: "Inventario", today: { text: "Planilla que nadie actualiza a tiempo" }, withSdi: "Stock que se descuenta solo" },
      { step: "Despacho y cobranza", today: { text: "Facturación aparte", saas: true }, withSdi: "Despacho, factura y cobranza conectados a tu contabilidad" },
    ],
  },
];

const TABS: { name: string; saas?: boolean }[] = [
  { name: "Agenda online", saas: true },
  { name: "CRM", saas: true },
  { name: "Facturación", saas: true },
  { name: "Inventario.xlsx" },
  { name: "Turnos.xlsx" },
];

// La fila protagonista: el dolor que más se repite en una pyme.
const MARKED_STEP = "Inventario";

const PATIENTS = [
  { who: "M. Rojas", next: "Control postoperatorio · mañana 10:30", state: "Agendado" },
  { who: "J. Pérez", next: "Exámenes recibidos · revisar", state: "Ficha al día" },
  { who: "C. Soto", next: "Recordatorio enviado por WhatsApp", state: "Confirmado" },
];

const ORDERS = [
  { who: "OT-1042", next: "Pedido mayorista · 120 unidades", state: "En producción" },
  { who: "OT-1041", next: "Despacho a Rancagua · hoy", state: "Listo para despacho" },
  { who: "OT-1039", next: "Factura emitida · pago a 30 días", state: "Por cobrar" },
];

const EASE = [0.16, 1, 0.3, 1] as const;
// Columnas de la hoja: número de fila, A (paso), B (hoy), C (con SDI). Banda y tabla comparten medidas.
const COLS = "md:grid-cols-[3rem_24%_33%_1fr]";

function SystemPane({ title, rows }: { title: string; rows: typeof PATIENTS }) {
  return (
    <section aria-label={title} className="border border-grid bg-paper">
      <header className="flex items-center justify-between border-b border-grid bg-sdi-wash px-4 py-2.5">
        <h3 className="font-display text-base font-bold text-ink">{title}</h3>
        <span className="text-[0.72rem] font-semibold uppercase tracking-[0.06em] text-sdi-strong">Ejemplo</span>
      </header>
      <ul>
        {rows.map((row) => (
          <li key={row.who} className="grid grid-cols-[5.5rem_1fr] items-center gap-3 border-b border-grid px-4 py-3 last:border-b-0 sm:grid-cols-[5.5rem_1fr_auto]">
            <span className="text-[0.92rem] font-semibold text-ink">{row.who}</span>
            <span className="text-[0.88rem] text-ink-soft">{row.next}</span>
            <span className="col-start-2 justify-self-start rounded-[2px] bg-sdi-wash px-2 py-0.5 text-[0.75rem] font-semibold text-sdi-strong sm:col-start-auto">
              {row.state}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function TodayCell({ today, marked }: { today: Today; marked: boolean }) {
  if (today.saas) {
    return (
      <span className="inline-flex flex-wrap items-baseline gap-x-2 text-saas">
        <span className="font-medium">{today.text}</span>
        <span className="text-[0.7rem] font-semibold uppercase tracking-[0.06em]">suscripción</span>
      </span>
    );
  }
  return <span className={marked ? "bg-mark px-1 [box-decoration-break:clone]" : ""}>{today.text}</span>;
}

/**
 * La portada como planilla: el proceso de una pyme en filas, lo que hoy usa en
 * pestañas, y "Convertir en sistema" que retira las celdas y deja el sistema.
 */
export function ProcessSheet() {
  const [asSystem, setAsSystem] = useState(false);
  const reduceMotion = useReducedMotion();
  const t = (duration: number, delay = 0) => (reduceMotion ? { duration: 0 } : { duration, delay, ease: EASE });

  let rowNumber = 3;

  return (
    <section data-hero-sheet aria-labelledby="hero-title" className="mx-auto max-w-[1240px] px-4 pt-6 pb-16 sm:px-6 sm:pt-10">
      <div className="sheet shadow-[0_1px_2px_rgba(11,22,64,0.06),0_20px_50px_-30px_rgba(11,22,64,0.35)]">
        <FormulaBar cellRef="A1" formula={`${HEADLINE} ${HEADLINE_ACCENT}`} />

        {/* Banda de columnas. */}
        <div aria-hidden className={`sheet-band grid grid-cols-[2rem_1fr] border-b border-grid text-center ${COLS}`}>
          <span className="border-r border-grid py-1" />
          <span className="border-r border-grid py-1">A</span>
          <span className="hidden border-r border-grid py-1 md:block">B</span>
          <span className="hidden py-1 md:block">C</span>
        </div>

        {/* Fila 1: la celda combinada y seleccionada que contiene la promesa. */}
        <div className="grid grid-cols-[2rem_1fr] border-b border-grid md:grid-cols-[3rem_1fr]">
          <span aria-hidden className="sheet-band flex justify-center border-r border-grid pt-5">1</span>
          <div className="cell-selected px-4 py-6 sm:px-7 sm:py-8">
            <h1 id="hero-title" className="text-balance font-display text-[clamp(2.1rem,5.2vw,4.4rem)] leading-[1.02] font-extrabold tracking-[-0.035em] text-ink">
              {HEADLINE} <span className="text-sdi-strong">{HEADLINE_ACCENT}</span>
            </h1>
            <p className="mt-5 max-w-[62ch] text-[1.08rem] leading-relaxed text-ink-soft sm:text-[1.15rem]">
              Del proceso médico al industrial: lo que hoy tu pyme reparte entre planillas y varias suscripciones, en un solo sistema hecho a la medida de cómo trabajas y construido rápido. Lo opera tu equipo.
            </p>
            <button
              type="button"
              onClick={() => setAsSystem((v) => !v)}
              aria-pressed={asSystem}
              aria-controls="hoja-procesos"
              className="mt-7 inline-flex items-center gap-2 rounded-[3px] bg-sdi-strong px-5 py-3.5 text-base font-semibold text-white shadow-[0_1px_2px_rgba(11,22,64,0.2),0_4px_12px_-4px_rgba(10,98,201,0.5)] transition-colors hover:bg-ink"
            >
              {asSystem ? <Sheet size={18} aria-hidden /> : <LayoutDashboard size={18} aria-hidden />}
              {asSystem ? "Volver a la planilla" : "Convertir en sistema"}
            </button>
          </div>
        </div>

        <div id="hoja-procesos" aria-live="polite">
          <AnimatePresence mode="wait" initial={false}>
            {!asSystem ? (
              <motion.div key="planilla" exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }} transition={t(0.45)}>
                {/* Escritorio: la hoja como tabla real. */}
                <table className="hidden w-full table-fixed border-collapse text-left md:table">
                  <caption className="sr-only">Dos procesos de ejemplo: cómo se hacen hoy y cómo quedan con SDI</caption>
                  <colgroup>
                    <col className="w-12" />
                    <col className="w-[24%]" />
                    <col className="w-[33%]" />
                    <col />
                  </colgroup>
                  <thead>
                    <tr className="[&>*]:border-r [&>*]:border-b [&>*]:border-grid">
                      <td aria-hidden className="sheet-band text-center">2</td>
                      <th scope="col" className="px-4 py-2.5 text-[0.85rem] font-semibold text-ink">Paso</th>
                      <th scope="col" className="px-4 py-2.5 text-[0.85rem] font-semibold text-ink">Hoy</th>
                      <th scope="col" className="bg-sdi-wash px-4 py-2.5 text-[0.85rem] font-semibold text-sdi-strong">Con SDI</th>
                    </tr>
                  </thead>
                  {PROCESSES.map((process) => (
                    <tbody key={process.title}>
                      <tr className="[&>*]:border-r [&>*]:border-b [&>*]:border-grid">
                        <td aria-hidden className="sheet-band text-center">{rowNumber++}</td>
                        <th colSpan={3} scope="colgroup" className="bg-band/60 px-4 py-2 font-display text-[1.05rem] font-bold text-ink">
                          {process.title}
                        </th>
                      </tr>
                      {process.steps.map((step) => (
                        <tr key={step.step} className="text-[0.98rem] [&>*]:border-r [&>*]:border-b [&>*]:border-grid">
                          <td aria-hidden className="sheet-band text-center">{rowNumber++}</td>
                          <th scope="row" className="px-4 py-3 font-semibold text-ink">{step.step}</th>
                          <td className="px-4 py-3 text-ink-soft">
                            <TodayCell today={step.today} marked={step.step === MARKED_STEP} />
                          </td>
                          <td className="px-4 py-3 text-ink">{step.withSdi}</td>
                        </tr>
                      ))}
                    </tbody>
                  ))}
                </table>

                {/* Móvil: la misma hoja, con cada paso apilado en su fila numerada. */}
                <div className="md:hidden">
                  <div className="grid grid-cols-[2rem_1fr] border-b border-grid">
                    <span aria-hidden className="sheet-band flex items-center justify-center border-r border-grid">2</span>
                    <p className="px-3 py-2 text-[0.8rem] font-semibold text-ink">
                      Paso · Hoy · <span className="text-sdi-strong">Con SDI</span>
                    </p>
                  </div>
                  {(() => {
                    let mobileRow = 3;
                    return PROCESSES.map((process) => (
                      <div key={process.title}>
                        <div className="grid grid-cols-[2rem_1fr] border-b border-grid">
                          <span aria-hidden className="sheet-band flex items-center justify-center border-r border-grid">{mobileRow++}</span>
                          <h2 className="bg-band/60 px-3 py-2 font-display text-base font-bold text-ink">{process.title}</h2>
                        </div>
                        <dl>
                          {process.steps.map((step) => (
                            <div key={step.step} className="grid grid-cols-[2rem_1fr] border-b border-grid">
                              <span aria-hidden className="sheet-band flex justify-center border-r border-grid pt-3">{mobileRow++}</span>
                              <div className="px-3 py-3">
                                <dt className="font-semibold text-ink">{step.step}</dt>
                                <dd className="mt-1 text-[0.93rem] text-ink-soft">
                                  <span className="text-band-ink">Hoy: </span>
                                  <TodayCell today={step.today} marked={step.step === MARKED_STEP} />
                                </dd>
                                <dd className="mt-1 text-[0.93rem] text-ink">
                                  <span className="font-semibold text-sdi-strong">Con SDI: </span>
                                  {step.withSdi}
                                </dd>
                              </div>
                            </div>
                          ))}
                        </dl>
                      </div>
                    ));
                  })()}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="sistema"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={t(0.5, 0.05)}
                className="bg-desk/60 p-4 sm:p-6"
              >
                <p className="mb-4 max-w-[60ch] text-[0.98rem] leading-relaxed text-ink-soft">
                  Las mismas filas, ahora como sistema: una sola base, y cada área ve lo suyo.{" "}
                  <span className="text-band-ink">(Datos de ejemplo.)</span>
                </p>
                <div className="grid gap-4 lg:grid-cols-2">
                  <SystemPane title="Clínica · Pacientes" rows={PATIENTS} />
                  <SystemPane title="Planta · Órdenes" rows={ORDERS} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Pestañas de la hoja, fijas al borde inferior mientras la hoja está a la vista:
            lo que hoy se paga se va cuando entra tu sistema. */}
        <div className="sticky bottom-0 z-10 flex items-stretch border-t border-grid bg-band">
          <div className="flex min-w-0 flex-1 items-stretch gap-px overflow-x-auto">
            <AnimatePresence initial={false} mode="popLayout">
              {!asSystem && (
                <motion.span
                  key="procesos"
                  className="border-x border-b-2 border-x-grid border-b-sdi bg-paper px-4 py-2.5 text-[0.85rem] font-semibold whitespace-nowrap text-ink"
                  exit={{ opacity: 0 }}
                  transition={t(0.2)}
                >
                  Procesos
                </motion.span>
              )}
              {!asSystem &&
                TABS.map((tab, i) => (
                  <motion.span
                    key={tab.name}
                    exit={{ opacity: 0, x: 48 }}
                    transition={t(0.35, i * 0.04)}
                    className={`flex items-center px-4 text-[0.85rem] whitespace-nowrap ${tab.saas ? "text-saas" : "text-band-ink"}`}
                  >
                    {tab.name}
                  </motion.span>
                ))}
              <motion.span
                key="tu-sistema"
                layout={!reduceMotion}
                transition={t(0.4, 0.2)}
                className={`flex items-center px-4 text-[0.85rem] whitespace-nowrap ${
                  asSystem ? "border-x border-b-2 border-x-grid border-b-sdi bg-paper font-semibold text-sdi-strong" : "text-band-ink/80 italic"
                }`}
              >
                Tu sistema
              </motion.span>
            </AnimatePresence>
          </div>
          <ChatButton section="Portada · hoja" className="!m-1 shrink-0 !px-3.5 !py-2 !text-[0.88rem]" />
        </div>
      </div>
    </section>
  );
}
