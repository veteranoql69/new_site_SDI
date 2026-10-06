const STAGES = [
  {
    stage: "Nos cuentas tu proceso",
    you: "Nos muestras cómo trabajan hoy: planillas, papeles y los sistemas que pagas.",
    us: "Lo dibujamos contigo, paso a paso, con las personas que lo hacen.",
    get: "El mapa de tu proceso y qué conviene construir primero.",
  },
  {
    stage: "Construimos por partes",
    you: "Pruebas cada parte con tu equipo y nos dices qué no calza.",
    us: "Construimos en entregas cortas, sobre tu proceso y no sobre una plantilla.",
    get: "Partes funcionando que tu equipo ya usa, antes de tener todo listo.",
  },
  {
    stage: "Reemplazamos lo que sobra",
    you: "Decides qué suscripciones y planillas dejar atrás.",
    us: "Migramos tus datos y conectamos lo que se queda, como tu contabilidad.",
    get: "Menos sistemas que pagar y un solo lugar para trabajar.",
  },
  {
    stage: "Lo usa tu equipo",
    you: "Tu equipo opera el sistema en el día a día. Cuando el proceso cambia, nos avisas.",
    us: "Te lo entregamos funcionando y lo ajustamos cuando tu proceso cambia.",
    get: "Un sistema que crece con tu pyme en vez de quedarse corto.",
  },
];

export function HowWeWork() {
  return (
    <section id="como-trabajamos" aria-labelledby="como-trabajamos-title" className="mx-auto max-w-[1240px] px-4 py-16 sm:px-6 sm:py-24">
      <div className="max-w-[46rem]">
        <h2 id="como-trabajamos-title" className="text-balance font-display text-[clamp(1.9rem,3.6vw,3rem)] leading-[1.05] font-extrabold tracking-[-0.03em] text-ink">
          Partimos por tu proceso, no por un catálogo.
        </h2>
        <p className="mt-4 text-[1.08rem] leading-relaxed text-ink-soft">
          Un SaaS te pide que cambies tu forma de trabajar para calzar con él. Nosotros hacemos lo contrario: el sistema se arma sobre cómo opera tu pyme.
        </p>
      </div>

      <div className="sheet mt-10 overflow-hidden">
        <table className="w-full border-collapse text-left">
          <caption className="sr-only">Cómo trabajamos, etapa por etapa</caption>
          <thead className="hidden md:table-header-group">
            <tr className="[&>*]:border-r [&>*]:border-b [&>*]:border-grid">
              <td aria-hidden className="sheet-band w-12 text-center">1</td>
              <th scope="col" className="sheet-band w-[22%] px-4 py-2.5 !text-[0.85rem] !font-semibold !text-ink">Etapa</th>
              <th scope="col" className="sheet-band px-4 py-2.5 !text-[0.85rem] !font-semibold !text-ink">Lo que haces tú</th>
              <th scope="col" className="sheet-band px-4 py-2.5 !text-[0.85rem] !font-semibold !text-ink">Lo que hacemos nosotros</th>
              <th scope="col" className="bg-sdi-wash px-4 py-2.5 text-[0.85rem] font-semibold text-sdi-strong">Lo que recibes</th>
            </tr>
          </thead>
          <tbody>
            {STAGES.map((row, i) => (
              <tr
                key={row.stage}
                className="grid grid-cols-[2.5rem_1fr] border-b border-grid md:table-row md:[&>*]:border-r md:[&>*]:border-b md:[&>*]:border-grid"
              >
                <td aria-hidden className="sheet-band row-span-4 flex items-start justify-center border-r border-grid pt-4 md:table-cell md:pt-0 md:text-center md:align-middle">
                  {i + 2}
                </td>
                <th scope="row" className="px-4 pt-4 pb-1 align-top font-display text-[1.12rem] font-bold text-ink md:py-4">
                  {row.stage}
                </th>
                <td className="px-4 py-1 align-top text-[0.96rem] leading-relaxed text-ink-soft md:py-4">
                  <span className="font-semibold text-band-ink md:hidden">Tú: </span>
                  {row.you}
                </td>
                <td className="px-4 py-1 align-top text-[0.96rem] leading-relaxed text-ink-soft md:py-4">
                  <span className="font-semibold text-band-ink md:hidden">Nosotros: </span>
                  {row.us}
                </td>
                <td className="px-4 pt-1 pb-4 align-top text-[0.96rem] leading-relaxed text-ink md:bg-sdi-wash/40 md:py-4">
                  <span className="font-semibold text-sdi-strong md:hidden">Recibes: </span>
                  {row.get}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
