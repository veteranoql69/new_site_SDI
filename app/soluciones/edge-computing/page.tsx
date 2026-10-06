import type { Metadata } from "next";

import { CapabilityPage } from "@/components/capability/CapabilityPage";

export const metadata: Metadata = {
  title: "Edge y visión artificial | SDI Tecnología",
  description:
    "Visión artificial procesada en el lugar: conteo y clasificación vehicular según el Decreto 30, lectura de patentes y control de procesos, sin enviar video a la nube.",
};

export default function EdgeComputingPage() {
  return (
    <CapabilityPage
      content={{
        section: "Edge y visión artificial",
        cellRef: "A1",
        title: "Cámaras que entienden lo que ven, procesando en el lugar.",
        intro:
          "Instalamos el procesamiento junto a las cámaras: el video no sale del lugar y a tu sistema solo llega el resultado, ya sea un conteo, una patente o una alerta.",
        uses: [
          { today: "Conteos vehiculares hechos a mano para un estudio de tránsito.", withSdi: "Conteo y clasificación por categoría y período, según el Decreto 30." },
          { today: "Control de acceso con un guardia anotando patentes.", withSdi: "Lectura automática de patentes y registro de cada entrada y salida." },
          { today: "Encuestas para saber de dónde viene y a dónde va el tráfico.", withSdi: "Matrices origen-destino a partir de las mismas cámaras." },
          { today: "Revisar a ojo un proceso en la línea de producción.", withSdi: "Detección de eventos en la línea y aviso al encargado." },
        ],
        flow: [
          { step: "Cámaras", detail: "Nuevas o las que ya tienes, si la imagen alcanza." },
          { step: "Equipo edge en el lugar", detail: "Procesa el video ahí mismo; no lo sube a la nube.", core: true },
          { step: "Resultado", detail: "Conteos, patentes o alertas: solo datos." },
          { step: "Tu sistema o informe", detail: "Listo para el estudio, el control o la operación." },
        ],
        details: [
          "El video no sale del lugar: más privacidad y mucho menos internet.",
          "Sigue operando aunque se corte la conexión.",
          "Funciona sobre cámaras existentes cuando la calidad de imagen lo permite.",
          "Sin costo recurrente por enviar video a servicios en la nube.",
        ],
      }}
    />
  );
}
