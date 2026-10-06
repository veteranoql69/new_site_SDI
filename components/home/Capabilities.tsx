import { ArrowRight } from "lucide-react";
import Link from "next/link";

const CAPABILITIES = [
  {
    name: "El sistema de tu proceso",
    use: "La base de todo: ventas, agenda, producción, inventario y cobranza en un solo lugar, hecho a la medida de cómo trabajas.",
    href: "/#como-trabajamos",
    linkLabel: "Cómo lo hacemos",
    marked: true,
  },
  {
    name: "IoT industrial",
    use: "Sensores en máquinas, bodegas o cámaras de frío que alimentan tu sistema mientras la operación ocurre.",
    href: "/soluciones/iot-industrial",
  },
  {
    name: "Edge y visión artificial",
    use: "Cámaras que cuentan, leen patentes o revisan un proceso, procesando en el lugar sin mandar video a la nube. Incluye conteo vehicular según el Decreto 30.",
    href: "/soluciones/edge-computing",
  },
  {
    name: "Agentes de IA",
    use: "Atienden por WhatsApp, web y redes, pero conectados a tu sistema: responden con tu agenda y tu stock reales, y cada conversación avanza tu proceso. El chat de este sitio es uno.",
    href: "/soluciones/agentes-ia",
  },
];

export function Capabilities() {
  return (
    <section id="capacidades" aria-labelledby="capacidades-title" className="border-y border-grid bg-paper">
      <div className="mx-auto max-w-[1240px] px-4 py-16 sm:px-6 sm:py-24">
        <div className="max-w-[46rem]">
          <h2 id="capacidades-title" className="text-balance font-display text-[clamp(1.9rem,3.6vw,3rem)] leading-[1.05] font-extrabold tracking-[-0.03em] text-ink">
            Todos venden un agente de IA. Nosotros partimos por tu proceso.
          </h2>
          <p className="mt-4 text-[1.05rem] leading-relaxed text-ink-soft">
            Un bot que contesta WhatsApp pero no sabe de tu agenda, tu stock ni tu cobranza es otra suscripción más. Primero está el sistema de tu proceso; lo demás se suma ahí, solo donde ayuda.
          </p>
        </div>

        <div className="sheet mt-10">
          <table className="w-full border-collapse text-left">
            <caption className="sr-only">El sistema de tu proceso y las capacidades que se le suman</caption>
            <thead>
              <tr className="[&>*]:border-r [&>*]:border-b [&>*]:border-grid">
                <td aria-hidden className="sheet-band w-10 text-center md:w-12">1</td>
                <th scope="col" className="sheet-band px-4 py-2.5 !text-[0.85rem] !font-semibold !text-ink md:w-[26%]">Capacidad</th>
                <th scope="col" className="sheet-band hidden px-4 py-2.5 !text-[0.85rem] !font-semibold !text-ink md:table-cell">
                  Qué hace dentro de tu sistema
                </th>
                <td className="sheet-band w-12 md:w-40" />
              </tr>
            </thead>
            <tbody>
              {CAPABILITIES.map((cap, i) => (
                <tr key={cap.href} className="group align-top [&>*]:border-r [&>*]:border-b [&>*]:border-grid">
                  <td aria-hidden className="sheet-band pt-5 text-center">{i + 2}</td>
                  <th scope="row" className="px-4 py-4 font-normal">
                    <span className={`font-display text-[1.25rem] font-bold text-ink ${cap.marked ? "bg-mark px-1" : ""}`}>{cap.name}</span>
                    <span className="mt-2 block text-[0.95rem] leading-relaxed text-ink-soft md:hidden">{cap.use}</span>
                  </th>
                  <td className="hidden px-4 py-4 text-[0.98rem] leading-relaxed text-ink-soft md:table-cell">{cap.use}</td>
                  <td className="p-0">
                    <Link
                      href={cap.href}
                      aria-label={`${cap.linkLabel ?? "Cómo funciona"}: ${cap.name}`}
                      className="flex h-full min-h-14 items-start justify-center gap-1.5 px-3 pt-5 text-[0.88rem] font-semibold text-sdi-strong transition-colors hover:bg-sdi-wash md:justify-start"
                    >
                      <span className="hidden md:inline">{cap.linkLabel ?? "Cómo funciona"}</span>
                      <ArrowRight size={17} aria-hidden className="transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
