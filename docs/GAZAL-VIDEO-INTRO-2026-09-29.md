# Bienvenida en video y favicon — 29-09-2026

## Material y entrega
- Video aportado por el usuario: `Pollito_caminando_hacia_la_cámara_20260929123152.mp4`, 1920 × 1080, H.264, 24 fps, seis segundos. SHA-256 original: `2C366B4085F0FBF51B7FE5939785EEEBAA711DC431696641767B8962B08933C7`.
- Escritorio: stream de video original, sin recomprimir, remultiplexado sin audio y con faststart (2.33 MB). Móvil: 960 × 540, H.264 CRF 23, 494 KB. Poster WebP de 34 KB. No se recorta la composición en ninguna orientación.
- Reproduce silenciado e inline. `ended` revela la página con una salida de 180 ms. El scroll queda al principio y las rutas interiores mantienen su destino. Recargar repite la bienvenida; navegación interna no la remonta.
- Omitir/Escape, movimiento reducido, error de reproducción y vigilancia de ocho segundos sin progreso permiten entrar. Sin JavaScript, una regla `noscript` oculta la bienvenida. Se restaura scroll y accesibilidad del fondo al salir.

## Icono
Adaptación cuadrada del símbolo GAZAL generada con la herramienta de imágenes: marfil sobre verde profundo, sin texto, bordes limpios y alto contraste para tamaños pequeños. El original aprobado queda en `assets/gazal-favicon-source.png`; no reemplaza el logo de cabecera. `node scripts/prepare-gazal-icons.mjs` genera PNG de 16/32/48/64 px, ICO multirresolución y Apple Touch de 180 px. Las URLs v2 evitan reutilizar el favicon anterior en caché.

## Verificación local
- Build de producción y TypeScript correctos. ESLint de los archivos modificados correcto.
- Reproducción observada desde 0.78 hasta 5.96 segundos; al terminar desaparece la bienvenida, se restaura el fondo y `scrollY` permanece en cero.
- Viewport móvil 390 × 844: descarga el encode móvil, conserva el encuadre y permite omitir. Sin desbordamiento horizontal.
- Preferencia de movimiento reducido: acceso inmediato sin elemento de video tras montar. Sin errores de consola en ejecución normal.
- Descarga MP4 bloqueada durante QA: el sitio se abre y restaura interacción. JavaScript desactivado: bienvenida oculta y contenido visible.
- ICO validado con cuatro resoluciones. Capturas y secuencia de reproducción locales en `tmp/gazal-video-intro`.

Publicación autorizada por push a Vercel. No modifica el hosting PHP de empresasgazalez.cl. Emulación Chromium; no se afirma prueba física en Safari/iPhone o Samsung.

## Actualización: clip móvil aportado por el usuario
El nuevo `Chick_walking_and_jumping_camera_20260929130718.webm` reemplaza la adaptación horizontal en móviles. Fuente VP8, 1080 × 1920, 24 fps; SHA-256 `6E5195462546DE2481ADF8D5313EBF0D4705BC5A9A58ABAEC15C40C97BE624E8`. Se entrega en H.264 MP4 silenciado, 720 × 1280, faststart, sin recorte, 1.19 MB, con poster vertical de 67 KB. Se elige para anchos hasta 800 px en orientación vertical. Escritorio y orientación horizontal conservan el clip anterior. El nombre nuevo del archivo evita reutilizar el encode móvil horizontal en caché.

Build/TypeScript y ESLint correctos; reproducción vertical comprobada en Chromium a 390 × 844 y salida automática hacia el inicio. Las cifras de 494 KB y 960 × 540 de la primera entrega quedan como antecedentes, no describen el clip móvil vigente.

## Revisión: pantalla completa, favicon transparente y gradientes
La instrucción posterior del usuario reemplaza el encuadre sin recorte: ahora video y poster usan `cover`, con recorte proporcional, sin deformación ni bandas. CSS oculta la barra de scroll desde el primer render; movimiento reducido y `noscript` liberan el scroll. Se conserva el cierre al terminar.

| Before | After | Why |
| --- | --- | --- |
| Video `contain` con franjas | Video y poster `cover`, ocupando el viewport | Llenar la pantalla como solicitó el usuario |
| Favicon marfil sobre cuadro verde | Símbolo GAZAL transparente v3; SVG adapta el tono a pestañas oscuras | Evitar el bloque de fondo y mejorar lectura a escala pequeña |
| Campos planos en proceso, investigación y testimonios | Gradientes estáticos con verdes de marca y salvia | Dar profundidad sin añadir animación continua |

Fuente nueva del favicon: `assets/gazal-favicon-transparent.png`. PNG con alfa comprobado (esquinas transparentes), SVG con máscara alfa y PNG/ICO de respaldo. Cabecera sin cambios. Los gradientes quedan en `src/app/gazal-surfaces.css`; incluyen introducción, transformación, HIDROBAC, testimonios, FAQ, contacto y apertura de páginas interiores.

Verificación de esta revisión: build de producción, TypeScript y ESLint correctos. Chromium a 1440 × 900 y 390 × 844: video `cover` ocupa el viewport sin bandas ni espacio lateral de scrollbar. Al terminar, `scrollY: 0` y scroll restaurado. Movimiento reducido y JavaScript desactivado permiten acceder y desplazar el contenido. Gradientes de HIDROBAC y testimonios inspeccionados en escritorio; página de soluciones inspeccionada en móvil sin desbordamiento horizontal. Favicon revisado a 16/32/48 px sobre fondos claros y oscuros, con alfa real. Capturas locales en `tmp/gazal-video-intro`. No se han probado dispositivos físicos ni Safari/iOS.
