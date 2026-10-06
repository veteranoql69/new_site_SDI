---
version: 1
slug: "app-page-tsx"
primary_target: "app/page.tsx"
related_targets: ["app/soluciones/agentes-ia/page.tsx","app/soluciones/iot-industrial/page.tsx","app/soluciones/edge-computing/page.tsx"]
---

## Scope

Sitio público sditecnologia.cl: portada (`app/page.tsx`), las tres páginas de capacidades (`/soluciones/*`), navegación, pie y el chat propio (sobre la API pública de Chatwoot, bandeja #43). Modo: Persuade.

## Audience and job

Dueños y gerentes de pymes chilenas cuyo proceso (operativo, financiero, comercial) hoy vive entre planillas y varios SaaS que no calzan. Deben salir creyendo que SDI "sabe de verdad" y abrir el chat. Sin casos, clientes ni cifras publicables: la prueba es mostrar el proceso convertido en sistema. Evitar: estética de startup de IA, poco serio, demasiado técnico.

## Direction contract

THESIS: Tu proceso ya existe en una planilla; SDI lo convierte en tu sistema frente a tus ojos. Rechaza el hero de titular + tres tarjetas de servicios y la estética neón de IA.

OWN-WORLD: Hoja de cálculo diurna: celdas blancas, líneas de grilla gris frío, banda de encabezados A B C y filas numeradas, barra de fórmula, pestañas de hoja abajo. Tinta azul marino SDI (#0B1640), selección y sistema en azul SDI (#0B80EE), resaltador amarillo (#FFE66B) como marca humana, rojo (#C8281D) reservado solo para lo que se paga en SaaS. Display Bricolage Grotesque, UI y celdas Schibsted Grotesk con cifras tabulares.

STORY: El visitante reconoce su planilla (proceso médico y proceso industrial como filas), ve abajo las pestañas de SaaS que paga, aprieta "Convertir en sistema", ve las filas volverse interfaz y las pestañas fundirse en una. Entiende: a la medida, rápido, reemplaza SaaS. Abre "Habla con SDI".

FIRST VIEWPORT: Hoja a todo el ancho. Barra de fórmula arriba con el H1 como contenido de la celda activa (A1, fila 1 combinada). Grilla con dos bloques de proceso (médico: paciente → agenda → ficha → seguimiento; industrial: orden → producción → inventario → despacho) con columnas "Hoy" y "Con SDI". Pestañas abajo: SaaS en rojo apagado + "Tu sistema". Acción primaria "Habla con SDI" en la barra superior y fija en el borde inferior de la hoja; "Convertir en sistema" sobre la grilla.

FORM: La planilla (4.º de mi lista ordenada; 1.º talonario de copias, 2.º mapa del Metro, 3.º pizarra de proceso). Seed fcaa35c3, reroll 1, assigned. Raises: movimiento único por desplazamiento (ebru); rojo solo para SaaS (vu); revelar quitando (mezzotinta); una fila protagonista por pantalla con aire (ikebana); etiqueta de estado "hoy / con SDI" en cada fila (encurtidos).

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Signature interaction

"Convertir en sistema": las celdas del proceso se retiran (clip/opacity) y en su lugar aparece la interfaz del sistema (lista de pacientes / órdenes con estados); las pestañas de SaaS se desplazan hacia afuera y quedan en una sola pestaña "Tu sistema". Con prefers-reduced-motion: corte directo. Contenido visible por defecto.

## Unresolved

Páginas legales (privacidad y términos). Retiro de la bandeja web #42 una vez en producción el chat propio.
