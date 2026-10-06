const STAGES = [
  {
    stage: "Captura",
    today: "Los mensajes quedan repartidos entre WhatsApp, Instagram, el correo y la web.",
    withSdi: "Cada contacto queda registrado, venga del canal que venga, con su origen y su campaña.",
  },
  {
    stage: "Integración",
    today: "Alguien copia los datos a una planilla, cuando se acuerda.",
    withSdi: "El lead entra directo a tu proceso: a la agenda, a la cotización o a la ficha.",
  },
  {
    stage: "Importancia",
    today: "Todos esperan igual, y el que estaba listo para comprar se enfría.",
    withSdi: "Cada lead lleva su etapa y su prioridad, y tu equipo sabe a quién atender primero.",
    marked: true,
  },
  {
    stage: "Seguimiento",
    today: "Nadie sabe quién quedó sin respuesta ni desde cuándo.",
    withSdi: "Ves qué leads esperan respuesta y cuánto llevan esperando.",
  },
];

/** Pilar del negocio: la captura, integración e importancia de cada lead. */
export function LeadsPillar() {
  return (
    <section aria-labelledby="leads-title" className="mx-auto max-w-[1240px] px-4 pb-4 sm:px-6 sm:pb-8">
      <div className="max-w-[48rem]">
        <h2 id="leads-title" className="text-balance font-display text-[clamp(1.9rem,3.6vw,3rem)] leading-[1.05] font-extrabold tracking-[-0.03em] text-ink">
          Ningún lead se pierde.
        </h2>
        <p className="mt-4 text-[1.08rem] leading-relaxed text-ink-soft">
          Capturar, integrar y darle su importancia a cada lead es uno de los pilares de nuestro trabajo. Por eso no lo resolvemos con un bot aparte: lo construimos dentro del sistema de tu proceso.
        </p>
      </div>

      <div className="sheet mt-10">
        <table className="w-full border-collapse text-left">
          <caption className="sr-only">Cómo se trata cada lead, hoy y con SDI</caption>
          <thead>
            <tr className="[&>*]:border-r [&>*]:border-b [&>*]:border-grid">
              <td aria-hidden className="sheet-band w-10 text-center md:w-12">1</td>
              <th scope="col" className="sheet-band px-4 py-2.5 !text-[0.85rem] !font-semibold !text-ink md:w-[18%]">Cada lead</th>
              <th scope="col" className="sheet-band hidden px-4 py-2.5 !text-[0.85rem] !font-semibold !text-ink md:table-cell md:w-[38%]">Hoy</th>
              <th scope="col" className="hidden bg-sdi-wash px-4 py-2.5 text-[0.85rem] font-semibold text-sdi-strong md:table-cell">Con SDI</th>
            </tr>
          </thead>
          <tbody>
            {STAGES.map((row, i) => (
              <tr key={row.stage} className="align-top [&>*]:border-r [&>*]:border-b [&>*]:border-grid">
                <td aria-hidden className="sheet-band pt-4 text-center">{i + 2}</td>
                <th scope="row" className="px-4 py-4 font-normal">
                  <span className={`font-display text-[1.15rem] font-bold text-ink ${row.marked ? "bg-mark px-1" : ""}`}>{row.stage}</span>
                  <span className="mt-2 block text-[0.95rem] leading-relaxed text-ink-soft md:hidden">
                    <span className="text-band-ink">Hoy: </span>
                    {row.today}
                  </span>
                  <span className="mt-1 block text-[0.95rem] leading-relaxed text-ink md:hidden">
                    <span className="font-semibold text-sdi-strong">Con SDI: </span>
                    {row.withSdi}
                  </span>
                </th>
                <td className="hidden px-4 py-4 text-[0.98rem] leading-relaxed text-ink-soft md:table-cell">{row.today}</td>
                <td className="hidden px-4 py-4 text-[0.98rem] leading-relaxed text-ink md:table-cell">{row.withSdi}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="border-t border-grid bg-band/60 px-4 py-3 text-[0.95rem] leading-relaxed text-ink">
          Este sitio funciona así: escribas por el chat, por WhatsApp o por el formulario, tu mensaje llega al mismo lugar, con la página de la que vienes.
        </p>
      </div>
    </section>
  );
}
