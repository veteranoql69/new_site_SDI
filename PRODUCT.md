# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**Audiencia principal: pymes chilenas de cualquier rubro** (confirmado 2026-10-06). Son dueños, gerentes o socios que tienen un proceso propio (operativo, financiero, comercial) y hoy lo reparten entre planillas y varios SaaS que no calzan con cómo trabajan. Los procesos van desde los complejos de la medicina hasta los industriales. Cada pyme tiene uno distinto, y en eso está el punto.

Audiencias secundarias, que el sitio sigue atendiendo sin que dominen la portada:

- **Industria y logística:** IoT, telemetría y trazabilidad dentro de la operación.
- **Municipios e ingeniería de tránsito:** conteo y clasificación vehicular (Decreto 30), LPR y visión artificial on-premise.

Quien visita está evaluando a quién encargarle su sistema, y su siguiente paso es conversar con SDI.

## Product Purpose

Presentar a SDI Tecnología como el equipo que le construye a una pyme el sistema de su propio proceso (con IA donde suma), rápido y en reemplazo de los SaaS que hoy paga, y llevar a cada visitante a una conversación con SDI. Éxito = conversaciones iniciadas en el chat del sitio que llegan, con su sección y campaña de origen, al omnicanal interno de SDI.

## Positioning

SDI construye **sistemas a la medida del proceso de cada pyme**, con IA donde aporta. **El sistema lo opera la pyme, no SDI** (confirmado 2026-10-06): SDI lo construye, lo entrega funcionando y lo ajusta cuando el proceso cambia. Las tres líneas técnicas (Agentes de IA, IoT Industrial, Edge Computing con visión de tránsito) pasan a ser **capacidades** que se usan dentro de esos sistemas, no el centro del sitio.

El sitio **no nombra rubros ni clientes particulares** (confirmado 2026-10-06). Lo que muestra es el **rango de procesos** que SDI resuelve: desde procesos complejos como los de la medicina (pacientes, agenda, ficha, seguimiento) hasta los industriales (producción, inventario, despacho, cobranza). La amplitud del rango es el mensaje: si SDI resuelve esos procesos, también resuelve el de la pyme que está mirando.

**Lo que hoy buscan los clientes** (palabras del usuario, 2026-10-06, de los clientes que está atendiendo):

- "Hoy el emprendedor busca que su proceso operativo, financiero, comercial, etc. se vea reflejado en la tecnología de apoyo, y no que yo deba acomodarme a un SaaS existente."
- "Están buscando bajar los costos con un desarrollo de alta velocidad, en cortos plazos, y que reemplace varios SaaS que están pagando hoy."

- "Todos venden agentes IA; nosotros nos preocupamos del proceso, no solo automatizamos WhatsApp o algún canal de redes sociales." (2026-10-06)

**Diferencia frente a la competencia:** el mercado está lleno de proveedores que venden un agente de IA para WhatsApp o redes. SDI no compite ahí. El agente es **una pieza** dentro del sistema del proceso. Un bot que contesta pero no conoce la agenda, el stock ni la cobranza es otra suscripción más. El sitio nunca debe presentar a SDI como "otra empresa de agentes IA": el proceso va primero y los agentes son una capacidad más. **IoT industrial y Edge/visión artificial se mantienen visibles** (menú principal y páginas propias); son capacidades que el resto no ofrece (confirmado 2026-10-06).

De ahí sale la promesa central: **tecnología hecha a la medida del proceso del cliente, construida rápido, que reemplaza varias suscripciones**. Es una diferencia frente al SaaS genérico, no un producto. No se publican plazos, precios ni ahorros concretos mientras no haya casos que los respalden.

- **Productos propios (todavía fuera del sitio):** Mi-Paciente (para clínicas) y TotalSteel.ia (gestión para procesadoras de acero). **No se nombran ni se insinúan en el sitio** hasta que el usuario lo decida (confirmado 2026-10-06).

## Operating Context

- **IA Leads Funnel es la herramienta interna de SDI, no un producto del sitio.** Es el omnicanal desde donde SDI ve sus redes y cómo atienden los agentes: comentarios de redes sociales automatizados, WhatsApp y el chat del sitio. No se presenta ni se vende en el sitio.
- **Varios puntos de contacto activos** (confirmado 2026-10-06), y todos llegan al omnicanal interno:
  - **Chat propio del sitio:** interfaz propia sobre la API pública de Chatwoot (bandeja API #43). Lo atiende un agente IA y después el equipo. Antes de conversar pide nombre, teléfono y email (opcional).
  - **WhatsApp:** +56 9 2612 6483 (bandeja #15, también canal del omnicanal).
  - **Formulario:** para quien prefiere que lo contacten. Crea el contacto y la conversación en la bandeja #43 con origen `formulario`, sin n8n.
  - **Redes sociales:** Instagram, TikTok y LinkedIn de SDI. Solo se muestran las que tengan URL real; un ícono sin enlace no se publica.
- Cada punto de contacto registra la sección de origen, la página de entrada, el referrer y los UTM.
- Se miden la página de entrada, el referrer y los UTM en la primera visita de la sesión.
- Idioma: español de Chile.

## Capabilities and Constraints

- Next.js 16 (App Router) + Tailwind v4, páginas estáticas. Sin base de datos propia: **no se reintroduce n8n**; el chat y el formulario escriben en Chatwoot por la API pública.
- Rutas actuales: `/`, `/soluciones/agentes-ia`, `/soluciones/iot-industrial`, `/soluciones/edge-computing`.
- Despliegue: push a `main` construye la imagen en GHCR; el redespliegue en Portainer es manual.
- **Por decidir:** cuándo y cómo entran Mi-Paciente y TotalSteel.ia al sitio; si el chat sigue siendo el widget de Chatwoot o pasa a ser un chat propio sobre la API de Chatwoot (propuesto 2026-10-06, porque el widget se nota como plugin); páginas legales (privacidad y términos), que hoy no existen aunque el chat recoge datos personales.

## Brand Commitments

- Nombre: **SDI Tecnología**. Logo oficial en `public/logo_oficial.png` (actualizado 2026-03-27).
- Voz: cercana y directa, tuteo ("Te respondemos al tiro"), en español de Chile.

## Evidence on Hand

- **No hay clientes, casos, testimonios, métricas ni logos de clientes publicables** (confirmado 2026-10-05). Los casos se publicarán cuando Mi-Paciente y TotalSteel.ia estén en producción. Hasta entonces el sitio no debe inventar ni insinuar pruebas: nada de cifras de resultados, logos de "confían en nosotros", testimonios ni nombres de clientes.
- Imágenes en `public/images/`: ilustraciones genéricas, sin capturas reales de producto. Dos están duplicadas (`ai-hero.png` = `iot-hero.png`; `ai-multi-agent.png` = `edge-inference.png`).
- Los textos actuales incluyen afirmaciones técnicas que habría que revisar antes de destacarlas ("latencia cero", "24 VEH / MIN" en una interfaz de ejemplo).

## Product Principles

1. **Contacto por donde le acomode al visitante.** Chat, WhatsApp, formulario o redes: todos siempre a mano, y todos terminan en el mismo omnicanal con su origen identificado.
2. **Concreto por sobre promesas.** Lo que SDI ya construye pesa más que las frases genéricas; nada que no exista se presenta como existente.
3. **Cada pyme reconoce su proceso.** Del proceso médico al industrial, el visitante tiene que ver rápido que el suyo cabe en ese rango, sin que el sitio se parta en una marca por rubro.
4. **Tu proceso manda.** La tecnología se construye sobre cómo opera el cliente, no al revés; el sitio lo muestra partiendo del proceso del visitante, no del catálogo de tecnologías.
5. **Prueba honesta.** Sin casos todavía, la credibilidad sale de la especificidad técnica y de mostrar cómo funciona, no de prueba social inventada.
