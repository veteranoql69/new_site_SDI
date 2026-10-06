import type { Metadata } from "next";

import { CapabilityPage } from "@/components/capability/CapabilityPage";

export const metadata: Metadata = {
  title: "IoT industrial para tu pyme | SDI Tecnología",
  description:
    "Sensores en máquinas, bodegas y cámaras de frío que envían sus datos directo a tu sistema, con alertas cuando algo sale de rango.",
};

export default function IoTIndustrialPage() {
  return (
    <CapabilityPage
      content={{
        section: "IoT industrial",
        cellRef: "A1",
        title: "Tu operación midiendo sola, directo en tu sistema.",
        intro:
          "Conectamos sensores a máquinas, bodegas, cámaras de frío o vehículos para que los datos lleguen solos a tu sistema. Nadie tiene que anotarlos en una planilla ni revisar a mano si algo se salió de rango.",
        uses: [
          { today: "La temperatura de la cámara de frío se anota a mano dos veces al día.", withSdi: "Un sensor la registra todo el día y avisa si sale de rango." },
          { today: "Una máquina se detiene y te enteras cuando la línea ya paró.", withSdi: "Monitoreo de su estado y aviso temprano al encargado." },
          { today: "El inventario se cuenta a mano y siempre va atrasado.", withSdi: "Lecturas que actualizan el stock en tu sistema." },
          { today: "No sabes dónde va un despacho hasta que el chofer llama.", withSdi: "Ubicación y estado del despacho, a la vista." },
        ],
        flow: [
          { step: "Sensor en terreno", detail: "Temperatura, energía, vibración, nivel o ubicación." },
          { step: "Equipo en tu planta", detail: "Reúne las lecturas y las envía de forma segura." },
          { step: "Tu sistema", detail: "Guarda, compara con los rangos y genera alertas.", core: true },
          { step: "Tu equipo", detail: "Recibe el aviso y ve el historial para decidir." },
        ],
        details: [
          "Protocolos industriales estándar, como MQTT y CoAP.",
          "Alertas cuando un valor sale del rango que tú defines.",
          "Los datos quedan en tu sistema, no en una plataforma ajena.",
          "Se integra con el resto de tu proceso: producción, inventario y despacho.",
        ],
      }}
    />
  );
}
