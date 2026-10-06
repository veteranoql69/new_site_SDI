import type { Metadata } from "next";

import { CapabilityPage } from "@/components/capability/CapabilityPage";

export const metadata: Metadata = {
  title: "Agentes de IA conectados a tu proceso | SDI Tecnología",
  description:
    "No un bot más para WhatsApp: agentes de IA dentro del sistema de tu proceso, que responden con tu agenda y tu stock reales y hacen avanzar cada caso.",
};

export default function AgentesIAPage() {
  return (
    <CapabilityPage
      content={{
        section: "Agentes de IA",
        cellRef: "A1",
        title: "Un agente de IA que conoce tu proceso, no solo tu WhatsApp.",
        intro:
          "Cualquiera te vende un bot que contesta WhatsApp. Si ese bot no sabe de tu agenda, tu stock ni tu cobranza, es otra suscripción más. Nosotros lo construimos dentro del sistema de tu proceso: responde con tus datos reales, agenda, califica y cada conversación avanza el caso. Cuando hace falta, le pasa la conversación a una persona.",
        uses: [
          { today: "Consultas que llegan de noche o el fin de semana y nadie contesta.", withSdi: "El agente responde al tiro con la información de tu negocio." },
          { today: "Pacientes o clientes que hay que agendar ida y vuelta por WhatsApp.", withSdi: "Ofrece horas reales de tu agenda y deja la cita confirmada." },
          { today: "Interesados que se pierden en el chat sin que nadie los siga.", withSdi: "Cada conversación queda en tu sistema con su origen y en qué etapa va." },
          { today: "Recordatorios y controles que se hacen a mano.", withSdi: "Avisos automáticos, y tu equipo ve quién respondió y quién no." },
        ],
        flow: [
          { step: "Llega un mensaje", detail: "Por WhatsApp, por la web o por redes." },
          { step: "Un solo buzón", detail: "Todas las conversaciones entran al mismo lugar." },
          { step: "El agente responde", detail: "Consulta los documentos de tu pyme antes de contestar.", core: true },
          { step: "O deriva", detail: "Si hace falta, una persona del equipo toma la conversación." },
          { step: "Queda registrado", detail: "El contacto, su etapa y el historial, en tu sistema." },
        ],
        details: [
          "Aprende de tus documentos: listas de precios, protocolos y preguntas frecuentes.",
          "Una persona puede tomar la conversación en cualquier momento.",
          "Cada respuesta queda guardada junto al historial del contacto.",
          "Habla en el tono de tu pyme, no en el de un robot genérico.",
        ],
        note: "Lo estás viendo funcionar: el chat de esta página lo atiende uno de nuestros agentes.",
      }}
    />
  );
}
