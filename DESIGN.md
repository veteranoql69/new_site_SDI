---
name: SDI Tecnología
description: El sistema de tu proceso, no el de un SaaS. Sitio público con la gramática de una planilla diurna.
colors:
  paper: "#ffffff"
  desk: "#eef0f3"
  grid: "#d6dae0"
  band: "#f3f4f6"
  band-ink: "#586072"
  ink: "#0b1640"
  ink-soft: "#3b4463"
  sdi: "#0b80ee"
  sdi-strong: "#0a62c9"
  sdi-wash: "#e9f3fe"
  mark: "#ffe66b"
  mark-soft: "#fff7cc"
  saas: "#c8281d"
  saas-wash: "#fdeeec"
typography:
  display:
    fontFamily: "Bricolage Grotesque, ui-sans-serif, sans-serif"
    fontSize: "clamp(2.1rem, 5.2vw, 4.4rem)"
    fontWeight: 800
    lineHeight: 1.02
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Bricolage Grotesque, ui-sans-serif, sans-serif"
    fontSize: "clamp(1.9rem, 3.6vw, 3rem)"
    fontWeight: 800
    lineHeight: 1.05
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Bricolage Grotesque, ui-sans-serif, sans-serif"
    fontSize: "1.15rem"
    fontWeight: 700
    lineHeight: 1.3
  body:
    fontFamily: "Schibsted Grotesk, ui-sans-serif, sans-serif"
    fontSize: "0.98rem"
    fontWeight: 400
    lineHeight: 1.625
    fontFeature: "\"tnum\" 1, \"cv11\" 1"
  lede:
    fontFamily: "Schibsted Grotesk, ui-sans-serif, sans-serif"
    fontSize: "1.08rem"
    fontWeight: 400
    lineHeight: 1.625
  cell-header:
    fontFamily: "Schibsted Grotesk, ui-sans-serif, sans-serif"
    fontSize: "0.85rem"
    fontWeight: 600
  band:
    fontFamily: "Schibsted Grotesk, ui-sans-serif, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 500
    letterSpacing: "0.02em"
  label:
    fontFamily: "Schibsted Grotesk, ui-sans-serif, sans-serif"
    fontSize: "0.7rem"
    fontWeight: 600
    letterSpacing: "0.06em"
rounded:
  tag: "2px"
  control: "3px"
spacing:
  cell-x: "16px"
  cell-y: "12px"
  gutter-sm: "2rem"
  gutter-md: "3rem"
  page-x-sm: "16px"
  page-x: "24px"
  section-y-sm: "64px"
  section-y: "96px"
  container: "1240px"
components:
  button-primary:
    backgroundColor: "{colors.sdi-strong}"
    textColor: "{colors.paper}"
    rounded: "{rounded.control}"
    padding: "12px 20px"
    typography: "{typography.cell-header}"
  button-primary-hover:
    backgroundColor: "{colors.ink}"
  button-quiet:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "12px 20px"
  button-quiet-hover:
    textColor: "{colors.sdi-strong}"
  button-submit:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.control}"
    padding: "12px 20px"
  button-submit-hover:
    backgroundColor: "{colors.sdi-strong}"
  sheet-band:
    backgroundColor: "{colors.band}"
    textColor: "{colors.band-ink}"
    typography: "{typography.band}"
  sheet-header-sdi:
    backgroundColor: "{colors.sdi-wash}"
    textColor: "{colors.sdi-strong}"
    typography: "{typography.cell-header}"
    padding: "10px 16px"
  cell-input:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    padding: "12px"
  cell-input-invalid:
    backgroundColor: "{colors.saas-wash}"
  status-label:
    backgroundColor: "{colors.sdi-wash}"
    textColor: "{colors.sdi-strong}"
    typography: "{typography.label}"
    rounded: "{rounded.tag}"
    padding: "2px 6px"
  status-label-offline:
    backgroundColor: "{colors.band}"
    textColor: "{colors.ink}"
  sheet-tab:
    backgroundColor: "{colors.band}"
    textColor: "{colors.band-ink}"
    padding: "10px 16px"
  sheet-tab-active:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
  sheet-tab-saas:
    textColor: "{colors.saas}"
  nav-link:
    textColor: "{colors.ink-soft}"
    rounded: "{rounded.control}"
    padding: "8px 12px"
  nav-link-active:
    backgroundColor: "{colors.sdi-wash}"
    textColor: "{colors.sdi-strong}"
---

# Design System: SDI Tecnología

## Overview

**Creative North Star: "La planilla diurna"**

El sitio entero es una hoja de cálculo a la luz del día: celdas blancas sobre un escritorio gris frío, grilla de 1px, banda de columnas A B C, filas numeradas en un canal izquierdo, barra de fórmula con casilla de nombre arriba y pestañas de hoja abajo. El visitante reconoce el lugar donde hoy vive su proceso, y SDI lo convierte en sistema frente a sus ojos. No es una metáfora decorativa: las tablas son tablas reales (`<table>`, `<th scope>`), los formularios son filas de celdas y el chat es una hoja de conversación.

La tinta es el azul marino del logo SDI; la selección y todo lo que es "sistema" usa el azul SDI. Dos colores tienen papeles exclusivos y por eso pesan: el amarillo resaltador es la marca humana (una fila protagonista por pantalla) y el rojo existe solo para nombrar lo que hoy se paga como SaaS. La forma es casi cuadrada (3px), plana, con una sola sombra suave que levanta la hoja principal del escritorio.

Se rechaza explícitamente el hero de titular más tres tarjetas de servicios y la estética neón de "startup de IA".

**Key Characteristics:**
- Gramática de planilla en cada superficie: banda de columnas, canal de números de fila, celda activa con contorno azul y asa.
- Densidad de hoja de trabajo: celdas con 16px horizontales y 12px verticales, divisiones de 1px en `grid`.
- Colores con jurisdicción: azul = sistema/acción, amarillo = marca humana, rojo = SaaS pagado.
- Display Bricolage Grotesque muy pesado y apretado; UI y celdas en Schibsted Grotesk con cifras tabulares.
- Un único movimiento de autor: "Convertir en sistema".

## Colors

Paleta diurna de oficina: papel blanco, gris frío de grilla, tinta azul marino y tres acentos con jurisdicción estricta.

### Primary
- **Azul SDI** (`sdi`): el azul del logo. Contorno de la celda seleccionada y su asa, anillo de foco (`:focus-visible` 2px, offset 2px), borde inferior de la pestaña activa, borde de hover del botón silencioso.
- **Azul SDI profundo** (`sdi-strong`): la versión con contraste para texto y rellenos. Fondo del botón primario "Habla con SDI", texto de la columna "Con SDI", acento del H1, enlaces de acción, asterisco de campo obligatorio, rótulos de estado.
- **Lavado SDI** (`sdi-wash`): fondo de la columna "Con SDI" y de "Lo que recibes", encabezado de los paneles de sistema, enlace de navegación activo, rótulo de estado.

### Secondary
- **Resaltador** (`mark`): el trazo de marcador amarillo sobre una celda. Marca la fila protagonista de cada pantalla (en la portada, "Inventario"; en Capacidades, "El sistema de tu proceso"). También es el color de `::selection`.
- **Resaltador suave** (`mark-soft`): fondo de las filas que escribe el visitante en el chat y de la nota destacada en páginas de capacidad.

### Tertiary
- **Rojo SaaS** (`saas`): solo para lo que la pyme paga hoy como suscripción: las celdas "Hoy" marcadas como SaaS (con el rótulo "suscripción") y las pestañas de SaaS en la base de la hoja.
- **Lavado SaaS** (`saas-wash`): fondo de campos inválidos y del mensaje de error. Es el único uso del rojo fuera de "SaaS", y va solo como lavado, nunca como texto rojo.

### Neutral
- **Tinta SDI** (`ink`): azul marino del logo. Texto principal, titulares, hover del botón primario, fondo del botón de envío.
- **Tinta suave** (`ink-soft`): párrafos, texto de celdas "Hoy", enlaces de navegación en reposo.
- **Tinta de banda** (`band-ink`): números de fila, letras de columna, placeholders, notas al pie, pestañas que no son SaaS.
- **Papel** (`paper`): fondo de celdas, hojas, barra superior, pie y panel de chat.
- **Escritorio** (`desk`): fondo de página sobre el que se apoyan las hojas.
- **Banda** (`band`): banda de encabezados, canal de filas, franja de pestañas, barra de estado del pie.
- **Grilla** (`grid`): todas las líneas de 1px: bordes de hoja, divisiones de celdas, separadores.

La marca de WhatsApp usa su verde propio (#1f9e55) solo en el ícono de WhatsApp; es color de marca de terceros, no parte de la paleta.

### Named Rules
**The Red Means Paid Rule.** `saas` se usa únicamente para nombrar lo que hoy se paga como SaaS. Nunca para alertas, énfasis, botones ni decoración. Los errores usan `saas-wash` con texto en `ink`.

**The One Highlighter Rule.** El amarillo `mark` marca una sola fila protagonista por pantalla. Si dos cosas llevan resaltador, ninguna es protagonista.

**The Blue Is the System Rule.** Selección, foco, acción y todo lo que pertenece a "Con SDI" va en azul SDI. El azul no se usa como decoración neutra.

## Typography

**Display Font:** Bricolage Grotesque (pesos 500/700/800, con ui-sans-serif)
**Body Font:** Schibsted Grotesk (pesos 400/500/600/700, con ui-sans-serif), cargadas con next/font
**Label/Mono Font:** la misma Schibsted Grotesk, con `font-feature-settings: "tnum" 1, "cv11" 1` en todo el cuerpo para cifras tabulares.

**Character:** Un display grotesco con carácter, pesado y con interletrado negativo, que suena a persona; frente a una sans de interfaz sobria y tabular que suena a celda. Juntas: alguien que sabe, escribiendo en la planilla.

### Hierarchy
- **Display** (800, clamp(2.1rem, 5.2vw, 4.4rem), 1.02, -0.035em): el H1 dentro de la celda seleccionada. En páginas de capacidad baja a clamp(2rem, 4.6vw, 3.8rem) con máximo 22ch.
- **Headline** (800, clamp(1.9rem, 3.6vw, 3rem), 1.05, -0.03em): títulos de sección. Contacto usa una variante mayor (hasta 3.4rem); subsecciones de capacidad, clamp(1.6rem, 3vw, 2.4rem).
- **Title** (700, 1.05 a 1.25rem): títulos de fila y bloque dentro de la hoja (nombre del proceso, etapa, capacidad, punto de contacto, encabezado del chat).
- **Body** (400, 0.93 a 0.98rem, 1.625): texto de celdas y del chat. Lede de sección a 1.08rem, máximo 46 a 62ch.
- **Cell header** (600, 0.85rem): encabezados de columna ("Paso", "Hoy", "Con SDI") y etiquetas de campo.
- **Band** (500, 0.75rem, 0.02em): letras de columna y números de fila.
- **Label** (600, 0.68 a 0.75rem, 0.06em, MAYÚSCULAS): rótulos de estado impresos ("En línea", "Escribiendo…", "Enviando", "suscripción", "Ejemplo") y encabezados de columna del pie.

### Named Rules
**The Printed Status Rule.** Los estados se imprimen como rótulos pequeños en mayúsculas sobre un lavado plano (radio 2px). Sin spinners, puntos pulsantes ni cromo animado.

**The Tabular Figures Rule.** Toda cifra (horas, teléfonos, números de fila, códigos de orden) se compone con cifras tabulares; ya vienen activas desde `body`.

## Layout

Contenedor centrado de 1240px con márgenes de 16px (24px desde `sm`). Las secciones respiran 64px verticales (96px desde `sm`); la hoja de portada arranca a 24 a 40px de la barra superior.

Cada bloque de contenido es una hoja (`.sheet`): papel con borde de grilla. Dentro, el canal de números de fila mide 2rem en móvil y 3rem desde `md`. La hoja de portada usa columnas fijas número | A 24% | B 33% | C resto, compartidas entre la banda de columnas y la tabla. Las celdas llevan 16px horizontales y 12px verticales; encabezados 10px.

Responsive: en móvil la tabla se convierte en filas apiladas que conservan el canal numerado, y cada valor lleva su prefijo ("Hoy:", "Con SDI:", "Tú:", "Recibes:") en lugar de la columna. La numeración de filas es continua dentro de cada hoja (la fila 1 es la celda del titular).

La barra superior es fija (64px, papel al 95% con desenfoque leve). Las pestañas de la hoja de portada quedan fijas al borde inferior mientras la hoja está a la vista, con "Habla con SDI" a la derecha. El botón flotante del chat aparece solo cuando la hoja de portada ya salió de pantalla.

## Elevation & Depth

Sistema plano: la profundidad la dan las líneas de grilla y el contraste papel sobre escritorio, no las sombras. Hay una sombra suave y ambiental, siempre teñida con la tinta marina, reservada para lo que flota sobre el escritorio.

### Shadow Vocabulary
- **Hoja levantada** (`box-shadow: 0 1px 2px rgba(11,22,64,0.06), 0 20px 50px -30px rgba(11,22,64,0.35)`): solo la hoja principal de la portada.
- **Botón primario** (`box-shadow: 0 1px 2px rgba(11,22,64,0.2), 0 4px 12px -4px rgba(10,98,201,0.5)`): botón azul de acción.
- **Panel de chat** (`box-shadow: 0 24px 60px -20px rgba(11,22,64,0.45)`): el diálogo flotante.
- **Lanzador de chat** (`box-shadow: 0 10px 30px -10px rgba(10,98,201,0.7)`): el botón flotante "Habla con SDI".

### Named Rules
**The Lines Before Shadows Rule.** Una superficie nueva se separa con borde de 1px en `grid`, no con sombra. La sombra queda para la hoja protagonista y lo que flota (chat).

## Shapes

Forma casi cuadrada de planilla. Botones, enlaces de navegación y controles usan 3px; rótulos de estado y chips de estado, 2px. Hojas, celdas, tablas, campos y paneles de sistema van sin radio. Todas las divisiones son de 1px en `grid`.

La celda seleccionada es el gesto de forma del sistema: contorno interior de 2px en azul SDI con el asa de relleno de 7×7px en la esquina inferior derecha (relleno azul, borde de 1.5px en papel, desplazada 4px hacia afuera). La pestaña activa se marca con borde inferior de 2px en azul SDI y bordes laterales de grilla.

## Components

### Buttons
Directos y planos, con la presencia justa de un botón de barra de herramientas.
- **Shape:** esquinas casi rectas (3px).
- **Primary ("Habla con SDI", "Convertir en sistema", "Empezar conversación"):** relleno `sdi-strong`, texto blanco, 600, 0.95rem, 12px × 20px, ícono de 18px a la izquierda, sombra de botón primario. Hover pasa a `ink`; active baja 1px.
- **Quiet:** papel con borde de grilla y texto `ink`; hover cambia borde a `sdi` y texto a `sdi-strong`. Se usa en el pie y en "Escribir por WhatsApp".
- **Submit de formulario:** relleno `ink`, hover a `sdi-strong` (la inversa del primario). Deshabilitado: opacidad 70% y cursor de espera.
- **Ícono:** 40 a 44px cuadrados, 3px; hover con fondo `band`.
"Habla con SDI" es el llamado a la acción del sitio y siempre abre el chat indicando la sección de origen.

### Chips
- **Status label:** rótulo impreso en mayúsculas (label), 2px, `sdi-wash` con `sdi-strong`; sin conexión pasa a `band` con `ink`.
- **Estado de fila del sistema:** mismo lavado azul, 0.75rem 600, sin mayúsculas ("Agendado", "En producción").

### Cards / Containers
No hay tarjetas: hay hojas.
- **Corner Style:** sin radio.
- **Background:** `paper` sobre `desk`.
- **Shadow Strategy:** plana; solo la hoja de portada lleva la sombra de hoja levantada.
- **Border:** 1px `grid`, con divisiones internas de 1px.
- **Internal Padding:** celdas de 16px × 12px; celda de titular 28px × 32px desde `sm`.

### Inputs / Fields
- **Style:** el formulario es una hoja: cada campo es una fila con la etiqueta en la banda (6.5 a 7.5rem, `band`, 0.85rem) y el campo en una celda de papel sin borde propio ni radio. Obligatorio = asterisco en `sdi-strong`.
- **Focus:** contorno interior de 2px en `sdi`, igual que la celda seleccionada.
- **Error / Disabled:** campo inválido con fondo `saas-wash`; mensaje de error en `saas-wash` con texto `ink`, nunca texto rojo.

### Navigation
- **Barra superior:** fija, 64px, papel al 95% con borde inferior de grilla; logo oficial más "SDI Tecnología" en display 700. Enlaces 0.92rem 500 en `ink-soft`, 3px; hover con fondo `band`, activo con `sdi-wash` y `sdi-strong`. "Habla con SDI" a la derecha.
- **Móvil:** menú desplegable bajo la barra, filas separadas por grilla, y "Habla con SDI" a todo el ancho. Esc cierra; navegar lo cierra.
- **Pie:** papel, tres columnas, encabezados de columna como label en `band-ink`; termina en una barra de estado de planilla (`band`) con "© … · Chile" y "Listo".

### Barra de fórmula
Casilla de nombre (64 a 80px, referencia de celda como "A1", 600), el signo ƒx en `band-ink` y el contenido de la celda activa (el titular) en `ink-soft`, truncado. Encabeza cada hoja protagonista (portada y capacidades). Es decorativa para lectores de pantalla.

### Pestañas de hoja
Franja `band` con borde superior de grilla, fija al borde inferior de la hoja de portada. Pestaña activa en papel con borde inferior azul de 2px; pestañas de SaaS en `saas`; pestañas de archivos (`.xlsx`) en `band-ink`. "Tu sistema" espera en cursiva atenuada hasta que se convierte en la única pestaña activa. A la derecha, "Habla con SDI" compacto.

### Convertir en sistema (movimiento de autor)
El único movimiento coreografiado del sitio. Al apretarlo: las celdas del proceso se retiran con `clip-path: inset(0 0 100% 0)` y opacidad (0.45s); entra la interfaz del sistema (paneles "Clínica · Pacientes" y "Planta · Órdenes", con estados) subiendo 12px desde opacidad 0 (0.5s); las pestañas de SaaS y planillas salen deslizándose 48px a la derecha con escalonado de 0.04s; "Tu sistema" se reacomoda (layout, 0.4s, retardo 0.2s) y queda como única pestaña activa. Curva `cubic-bezier(0.16, 1, 0.3, 1)`. Con `prefers-reduced-motion`: corte directo (duración 0). El contenido de la planilla es visible por defecto y el botón alterna (`aria-pressed`).

### Chat
Panel propio de 400px (pantalla completa en móvil), papel con borde de grilla y sombra de panel; entra con `chat-in` (240ms, opacidad y 10px) solo con `motion-safe`. Encabezado con "Habla con SDI" en display y el status label; debajo, una banda con la promesa de respuesta. Antes de conversar pide nombre, teléfono y email en filas de hoja. La conversación es una hoja: cada mensaje es una fila con canal izquierdo (quién y hora en banda) y el texto en la celda; las filas del visitante van en `mark-soft`. Pie del panel con "Seguir por WhatsApp" y "Nueva conversación".

### Puntos de contacto
La sección de contacto lista, entre líneas de grilla, chat (abre el panel), WhatsApp (número en cifras tabulares y botón silencioso) y redes, junto al formulario "Que me contacten". Los íconos de redes (Instagram, TikTok, LinkedIn, SVG propios) se muestran solo cuando existe su URL; si no hay ninguna, el bloque no se renderiza.

## Do's and Don'ts

### Do:
- **Do** construir cada bloque de contenido como hoja: papel, borde de 1px en `grid`, banda de encabezados y canal de números de fila (2rem móvil, 3rem `md`).
- **Do** poner el titular de cada página protagonista dentro de una celda seleccionada (contorno de 2px `sdi` con asa) bajo una barra de fórmula.
- **Do** reservar `saas` para lo que hoy se paga como SaaS, y marcar con `mark` una sola fila protagonista por pantalla.
- **Do** usar `sdi-strong` para texto y rellenos azules y `sdi` para contornos, foco y asas.
- **Do** imprimir los estados como rótulos de 0.68 a 0.75rem, 600, mayúsculas, 0.06em, sobre lavado plano con radio de 2px.
- **Do** mantener radios de 3px en controles y 0 en hojas, celdas y campos.
- **Do** cortar en seco cualquier movimiento con `prefers-reduced-motion`.
- **Do** llevar todo llamado a conversar a "Habla con SDI", que abre el chat con su sección de origen.

### Don't:
- **Don't** usar `saas` en errores, alertas, énfasis o botones; los errores van en `saas-wash` con texto `ink`.
- **Don't** resaltar con `mark` más de una fila protagonista en la misma pantalla.
- **Don't** armar el hero de titular más tres tarjetas de servicios, ni tarjetas redondeadas con sombra para agrupar contenido.
- **Don't** usar la estética neón de IA (gradientes, brillos, fondos oscuros) ni spinners o puntos pulsantes para estados.
- **Don't** agregar un segundo movimiento coreografiado; "Convertir en sistema" es el único.
- **Don't** publicar un ícono de red social sin URL real.
