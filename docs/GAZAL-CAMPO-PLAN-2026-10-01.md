# GAZAL — restauración de movimiento y continuidad visual

Fecha: 1 de octubre de 2026. Trabajo local; no publicado.

## Dirección vigente

La referencia visual vuelve a ser https://www.empresasgazalez.cl/ y su ficha /innovacion/hidrobac/. Se conserva la reforma editorial: actividad y público claros, tres caminos de soluciones, contenido y fuentes verificados, navegación Soluciones / Innovación / Empresa / Contacto y marca comercial GAZAL.

El cambio anterior se alejó de esa referencia al sustituir la cinta de partículas por figuras de pellets/fibras, el proceso por platos/objetos y la distribución de HIDROBAC por una versión compacta. Esas sustituciones quedan descartadas. La ausencia de cortina respondía a una instrucción previa de no animar navegación; la petición actual la restablece. El explorador avanzado del sitio oficial estaba añadido en un bundle propio del hosting y no existía en el código local reformado.

## Qué se recupera y qué se conserva

| Superficie | Intervención |
| --- | --- |
| Hero | Motor original `matter-field.mjs`: ADN de partículas, sin morph a pellet/fibras ni Three.js. Expansión al ancho con scroll nativo, avance reversible y desplazamiento leve detrás de soluciones. |
| De subproducto a solución | Componente de partículas de `1dcd984`, conservando los textos actuales de `processSteps`, las condiciones de evaluación y el acceso a consulta. Se retiran de uso los platos y diagramas experimentales. |
| HIDROBAC portada | Se recupera el componente original y los controles debajo del gráfico. Se quitan las reglas de compactación y envoltorios añadidos. |
| HIDROBAC ficha | Se recupera la escena oficial con Sistema, Matriz, Agua, Bacterias, Raíz y Evidencia. Se integra en React sin duplicar su runtime ni instalar dependencias. |
| Transiciones | Se restaura la cortina verde original. Se conserva la navegación actual, opciones y animaciones del menú hamburguesa. |
| Apertura | Campo y logo aprobado. Se corrige `visibility:hidden` heredado de la intro de video, que anulaba el zoom. Salida de 900 ms; omitir/Escape inmediatos y una vez por sesión. |

No se revierten la arquitectura de información, las fichas, los datos de contacto, las fuentes o el formulario honesto. No se recuperan por defecto manifiestos repetidos, viejas denominaciones comerciales ni afirmaciones distintas de las aprobadas. No se modifica PHP ni el sitio oficial.

## Fuentes y alcance

- Sitio oficial y ficha HIDROBAC inspeccionados en navegador.
- Geometría y estilos del explorador: https://www.empresasgazalez.cl/build/hidrobac-lab.js y https://www.empresasgazalez.cl/build/gazal-overrides.css. Copias de recuperación en `qa/restoration/` (ignoradas por Git); solamente componente y estilos correspondientes integrados.
- Proceso original: `1dcd984:src/components/process.tsx`; geometría existente `process-layout.mjs`.
- HIDROBAC de portada y cortina: componentes de HEAD `4bcf164`, equivalentes a la interacción original. La geometría de portada no se modifica.
- El explorador preserva las aclaraciones originales sobre investigación y evidencia. No se agrega una oferta comercial ni resultados de eficacia.

## Comprobaciones

- `npm run lint`: sin errores ni advertencias.
- `npm run build` y `npm run typecheck`: correctos.
- `npm test`: 17 aprobadas, 3 omitidas correspondientes a PHP sin servidor configurado.
- `npm run qa`: 22 páginas y 1076 referencias internas; ninguna incidencia. Preview conserva noindex.
- Navegador de escritorio: ADN avanza con scroll (progreso 0.561 a 650 px), proceso original seleccionable, explorador HIDROBAC renderizado; navegación a Contacto vuelve a scroll 0 y cortina idle.
- Móvil emulado: a 390 px ADN avanza con scroll (0.390 a 750 px); menú abre, despliega Soluciones y lleva a Nutrición animal con scroll 0. HIDROBAC selecciona Agua (45%) y el control por teclado alcanza 100%. Sin desbordamiento horizontal en portada y ficha HIDROBAC a 320, 390 y 768 px, además de la comprobación de escritorio a 1440 px.
- Intro: capturas secuenciales y estilos calculados confirman visibilidad durante salida y aumento de escala de 1 a 5.92 en las muestras, antes de desaparecer y liberar scroll. Capturas en `qa/restoration/intro-zoom-*.png`.
- Revisión independiente de fuente y capturas: acepta ADN, proceso, HIDROBAC de portada, explorador de escritorio, zoom y evidencia de navegación. Una segunda revisión de capturas legibles acepta HIDROBAC móvil inicial y Agua al 45%; no quedan observaciones materiales abiertas. Capturas móviles válidas: `hidrobac-mobile.png` y `hidrobac-mobile-water.png`.

## Límites y pendientes

No se midieron FPS ni rendimiento físico en A51/iPhone 12/Safari. Movimiento reducido revisado en código, sin certificación de dispositivo. Algunas capturas móviles iniciales fueron escaladas incorrectamente por la herramienta; no se usan como prueba visual. Los archivos de QA documentan la revisión local y no son una publicación.

Los WEBM de gallinas y otros videos siguen pendientes del usuario, fuera de las transiciones de navegación. No hay placeholders públicos. La versión local queda para revisión antes de publicar.

## Ajuste posterior aprobado: salida lateral y controles compactos

- El ADN conserva sus partículas, colores, geometría base y render Canvas 2D. Se forma antes del 58% del scroll, se mantiene hasta el 68% y después se reúne hacia el margen derecho; la caída continúa mientras la sección siguiente cubre el 65% de la escena, evitando un viewport vacío. Las mismas partículas caen fuera del lienzo, sin dibujos ni modelos de pellet. El avance y retroceso son deterministas. No se agregan partículas ni pases de pintado.
- El proceso original mantiene etapas, diagramas, autoplay, pausa y progreso. Se reducen separaciones, altura máxima del gráfico y mínimos artificiales del texto; no se reemplaza la animación.
- HIDROBAC de portada mantiene los controles debajo del gráfico, ahora de tamaño más contenido. La barra de separación tiene relleno y porcentaje real 0–100%, además de Separar/Reunir y selección de componentes.
- Inventario de 16 rutas oficiales: `qa/restoration/official-animation-inventory.json`. La escena avanzada de HIDROBAC es el único bundle adicional encontrado. La conexión animada de trazabilidad, que había perdido su ubicación al retirar un bloque de portada, se recupera en Calidad y trazabilidad con los mismos siete pasos de su contenido actual. No se duplica el proceso de portada en Sostenibilidad ni se reintroducen secciones editoriales repetitivas.
- Se mantiene la cortina de navegación propia de GAZAL. No se copia la transición oficial ni la antigua intro; la apertura de campo sigue vigente. El inventario identifica efectos publicados, no acredita su autoría personal.

Validación de este ajuste: lint y build correctos; 18 pruebas aprobadas y 3 de PHP omitidas; 22 páginas / 1076 referencias internas sin incidencias. La prueba añadida verifica reversibilidad, coordenadas finitas y salida completa de partículas. Capturas locales `dna-release-desktop.png`, `hydro-compact-desktop.png`, `hydro-compact-mobile.png`, `process-compact-mobile.png` y `trace-mobile.png`. En navegador, separación HIDROBAC 100% mediante botón y 0% con Home; trazabilidad móvil completa su conexión y no desborda. Sin publicación ni medición de FPS en teléfonos físicos.

## Profundidad del ADN y ambientación de campo — revisión local posterior

Alcance: prompt de mejora del hero recibido el 1 de octubre y petición directa de crear las imágenes necesarias. La autorización directa permite generar el paisaje estático; se conserva íntegramente la bienvenida. Este ajuste NO se ha publicado ni pusheado.

- Hero: una sola línea temporal de scroll coordina encuadre, texto, partículas, progreso y salida. El enlace nativo Ver soluciones funciona también al repetir el mismo fragmento; se eliminó la intercepción de Next Link en ese acceso local. El mensaje mantiene opacidad completa hasta 25%; se retira de 25–49% y solo entonces queda inert. La salida usa las partículas originales, reversible, sin nuevas formas de pellet/fibra.
- Canvas 2D: 2200/1100 partículas, nueve bandas ordenadas por profundidad y tres pases pequeños de luz mate. Se mantienen buffers, semilla, presupuesto de píxeles, suspensión fuera de vista/pestaña oculta y limpieza de recursos. El fallback usa la misma pose de apertura; regeneración: `node scripts/generate-matter-opening.mjs`.
- Recorrido: escritorio clamp(480px,90svh,900px); móvil sin extensión ni retención sticky, con escena de hasta 560px que responde al paso por el viewport. El ensayo intermedio de 168.8px extra dejó una franja vacía en tablet y se retiró. La versión final elimina los 820px adicionales originales. Movimiento reducido conserva composición estática.
- Nuevo paisaje de praderas con cultivos: `public/assets/campo/praderas-640.webp` (32700 bytes), `praderas-1600.webp` (141864 bytes), y `social-praderas.jpg`. Fondo del ADN con velo verde estático; sustituye el bosque del componente nature en interiores y en Open Graph. No se atribuye a terrenos o instalaciones de GAZAL.
- Tarjetas: imagen y descripción siempre disponibles, hover limitado al encuadre. En tablet, contenido e imagen en dos columnas dentro de cada tarjeta.
- Proceso: se conservan las cuatro etapas y partículas; luz SVG compartida, transición móvil más gradual, estado activo más legible. Los textos comparten una cuadrícula que reserva la altura máxima. Selección manual o foco en la explicación detienen autoplay; repetición explícita. Altura de texto medida idéntica entre etapas: 265.44px escritorio antes del ajuste tipográfico final; 270.93px móvil en versión final.
- HIDROBAC: se mantienen geometría, capas, selección, slider y reset; retoques acotados de bordes/superficies y color del agua. Su página avanzada no se sustituye.
- Archivos principales: `hero-experience.tsx`, `matter-field.mjs`, `process.tsx`, `hydrobac-explorer.tsx`, `concept-image.tsx`, `card-curtain-reveal.tsx`, `gazal-campo.css`, `gazal-surfaces.css`, reglas puntuales de `globals.css` y recurso social de `site.ts`. Contenido comercial, rutas, contacto, logo y transición de navegación conservados.
- Validación final: build, typecheck y lint correctos; 19 pruebas aprobadas / 3 pruebas PHP omitidas por falta de servidor PHP configurado. QA: 22 páginas, 1080 referencias internas, cero incidencias, preview noindex conservado.
- Navegador local Chromium: sin overflow horizontal ni imágenes rotas en comprobaciones DOM a 320×740, 360×800, 390×844, 768×1024, 1366×768, 1440×900, 1920×1080 y 844×390. Capturas de apertura/mitad/salida antes y después en `qa/campo-depth/`; tarjetas, proceso, HIDROBAC y Empresa también capturados. Se comprobó scroll inverso, CTA Soluciones, selección/pause/repetición, Home/End en slider, menú móvil Empresa y regreso con scroll 0 y un solo canvas. Consola consultada sin advertencias/errores.
- Movimiento reducido emulado: composición estática, sin extensión y proceso seleccionable por teclado sin autoplay. JavaScript deshabilitado temporalmente: mensaje, acciones y fallback visibles, bienvenida no bloqueante. Ambas emulaciones restauradas.
- Límites: no se midieron FPS ni rendimiento de A51/iPhone/Safari físicos. Sin medición comparativa de CPU, ni inyección específica de pérdida del contexto Canvas; la prueba sin JavaScript verifica el respaldo estático, no todos los modos de fallo. Suspensión con documento oculto revisada en fuente, sin ensayo prolongado de pestaña en segundo plano. No se reconstruyó ni publicó el paquete PHP. Los cambios previos de dependencias y releases se preservan.

### Imagen generada: procedencia y prompt

Modo: herramienta integrada image_gen, sin CLI ni nuevo video. Original conservado en la carpeta de imágenes generadas de Codex; versiones WebP/JPEG optimizadas dentro del proyecto.

Prompt utilizado:

> Create one wide 3:2 editorial landscape photograph for a Chilean agricultural biotechnology website. Quiet cultivated countryside of southern Chile, low rolling fields of fresh green pasture and young cereal crops, a few distant sparse trees along field boundaries, soft misted hills on horizon at upper third, subtle furrows and grasses at the bottom edges. Predawn diffused cool light, muted sage and deep eucalyptus greens, no harsh sun or yellow golden grading. Refined natural photographic texture, restrained contrast, calm central negative space. No jungle, no forest canopy, no buildings, no logos, no text, no people, no machinery, no DNA or particles. This is a generic countryside visual, not evidence of any company's property. Will be used as a softly darkened background behind a luminous green particle DNA and also as a rural editorial landscape on inner pages. Detailed yet quiet, believable and spacious.
## ADN interactivo, controles e imágenes específicas — revisión local

Petición: respuesta del ADN al mouse, protección del texto, mejoras del selector de etapas y menos repetición de imágenes.

| Antes | Después | Motivo |
| --- | --- | --- |
| ADN solo ligado al scroll | Giro acotado con mouse al inicio, neutral al bajar | Exploración sin interferir con el recorrido |
| Expansión de escena mientras se retiraba el texto | Expansión 49–69%, después de ocultar el texto al 49% | Evitar superposición |
| Etapas en una franja fina | Botones con número, dos niveles de texto y selección opaca; 2 columnas en móvil | Reconocer controles y etapa actual |
| Tres imágenes compartidas por varias fichas | Nuevos recursos para nutrición avícola, formulación y calidad | Relacionar el recurso con la necesidad |

Implementación: HeroExperience + matter-field.mjs conservan Canvas 2D, las cantidades de partículas y los presupuestos de raster. quickTo 550ms power3.out sin loop continuo; solo mouse fino, sin interacción en touch ni movimiento reducido. Se limpia cada listener/tween al desmontar. La salida por scroll y su reversibilidad se conservan. Espigas transparentes en el borde, detrás del ADN; leyenda inferior más contenida. No se modificó HIDROBAC, bienvenida, contenido comercial ni navegación en esta revisión.

Referencias inspeccionadas: https://www.heartgenetics.com/ en navegador y búsqueda del catálogo 21st (Parallax Floating). Implementación propia sobre el canvas existente; sin copiar assets, agregar dependencias ni incorporar Three.js.

Assets generados con la herramienta integrada image_gen (no CLI). Optimizados con Sharp a WebP:
- `public/assets/solutions/poultry-{640,1200}.webp` → /soluciones/nutricion-animal/.
- `public/assets/solutions/formulation-{640,1200}.webp` → /soluciones/formulacion-tecnica/.
- `public/assets/solutions/quality-{640,1200}.webp` → /calidad-trazabilidad/.
- `public/assets/campo/hero-meadow.webp` → borde del hero, 640px con alpha.
- Sostenibilidad usa praderas existentes. Las imágenes son ilustraciones genéricas; no se atribuyen instalaciones ni operaciones reales a la empresa.

Prompts finales:

**poultry**

Create one refined editorial photograph-style illustration for GAZAL animal nutrition website. Wide landscape 3:2. Three healthy adult cream and russet hens foraging in a rolling green pasture, soft morning light, pasture grasses detailed foreground, gentle distant agricultural hills, muted sage greens ivory and earth palette. Elegant natural corporate editorial composition, subjects comfortably inside center 70% with generous breathing room, realistic anatomy. No buildings, people, logos, text, badges, or collage. This is a generic agricultural illustration, not a specific company farm.

**formulation**

Create one premium editorial still-life photograph-style illustration for GAZAL technical animal feed formulation website. Landscape 3:2. Carefully arranged shallow matte ivory ceramic sample dishes containing different ground cereal ingredients, grain and fine plant fibers, a small unbranded laboratory balance and metal sampling spoon subtly behind. Clean pale sage tabletop, soft side daylight, natural muted green ivory brown palette, tactile precision, beautiful photographic composition with breathing room. Not a catalog, no packaging, no company facility, no text, no logos, no charts, no collage.

**quality**

Create one refined editorial macro photograph-style illustration for an agricultural ingredient quality and traceability website. Landscape 3:2. Close crop of one gloved hand using a small steel sampling scoop above a shallow tray of golden cereal grains; three clear plain glass sample vials containing different milled ingredients softly out of focus behind. Sage green neutral laboratory tabletop, soft daylight, ivory and restrained earthy tones, believable physical detail and clean precise composition. No legible labels, no logos, no people faces, no claimed certification or actual facility, no collage.

**hero-meadow**

Create a photographic cutout botanical foreground asset for a refined agricultural website. Transparent background. A small airy cluster of slender meadow grass and three barley seed heads, all growing upward from the bottom right corner, fine natural stems curved gently left, leaving most of the upper and left area empty and fully transparent. Muted sage greens and subdued pale beige seed heads, soft rim light, highly realistic organic detail, graceful sparse silhouette, no flowers, no pots, no soil base, no scenery, no text. Vertical-ish square composition suitable for use as a subtle foreground layer over a dark green countryside hero.

Validación: build, lint y typecheck correctos; 20 pruebas aprobadas, 3 PHP omitidas. QA estático: 22 páginas, 1080 referencias internas, sin incidencias. Prueba nueva: respuesta finita, acotada y reversible al cursor; ignorada en touch y durante salida. Navegador local: captura distinta a izquierda/derecha al inicio; capturas idénticas después de bajar y mover el cursor. Movimiento reducido estático verificado. Selección de etapa por Enter y click; anchos 320/390 sin desbordamiento en botones o contenido. Nuevas imágenes cargadas en nutrición 390, formulación 1440 y calidad 768. Capturas en `qa/hero-interactive/`. No se midieron FPS ni se probaron teléfonos físicos/Safari; no se regeneró ni publicó la entrega PHP. Sin push/deploy en esta revisión.

## Interacción al pausar el scroll

Petición posterior: permitir explorar el ADN durante el recorrido, hasta que se recoge y desaparece. La interacción ya no queda limitada al inicio. El mouse se habilita 180ms después del último cambio de scroll o scrub, si el progreso es menor al 70%. Durante el desplazamiento se vuelve suavemente a neutral. El área activa sigue el recorte real de la escena; el texto permanece protegido. La influencia se atenúa entre 64–70% para evitar un salto al entrar en la recogida. Al subir y detenerse antes de esa fase se recupera la interacción. Sin cambios en touch, movimiento reducido, cantidad de partículas ni recursos gráficos.

Validación: build, lint, typecheck, 20 tests aprobados / 3 PHP omitidos, QA 22 páginas y 1080 referencias sin incidencias. En navegador de escritorio, scroll activo deshabilita el cursor; tras detenerse al 59.6% se habilita y las capturas izquierda/derecha difieren. Al 88.5% permanece deshabilitado y mover el cursor produce capturas idénticas. Capturas `qa/hero-interactive/paused-mid-{left,right}.png`. Sin publicación.

## Ajuste de reactividad del ADN — 2 de octubre

Mayor giro horizontal, paralaje por profundidad e inclinación vertical a lo largo de la cinta. La respuesta usa 280ms con salida suave en lugar de 550ms. Se conserva la misma geometría neutral, el recorte que protege el texto y la prioridad del scroll: interacción al detenerse antes del 70%, atenuación entre 64–70% y salida sin influencia del cursor. No se agregan partículas, dependencias ni cambios en touch o movimiento reducido.

Validación: build, lint, typecheck y QA de 22 páginas / 1080 referencias correctos. 20 pruebas aprobadas y 3 PHP omitidas. Navegador local a 1440×900: giro visible en ambos extremos, texto despejado, cursor suspendido durante scroll y habilitado tras detenerse al 68.1%; deshabilitado al 86.8%. Consola sin errores ni advertencias. Capturas en `qa/hero-interactive/reactive-{left,right,mid}.png`. Sin medición de FPS ni prueba en teléfonos físicos. La entrega PHP no se modifica.

## Doble hélice y fondos informativos — 2 de octubre

Petición posterior al ajuste de sensibilidad: mantener la interacción durante toda la salida, formar un ADN reconocible con las mismas partículas e incorporar puntos muy sutiles en páginas informativas. Referencias visuales consultadas con navegador: https://www.heartgenetics.com/ y https://insertit.cl/. Implementación propia en Canvas 2D y GSAP, sin Three.js ni nuevas dependencias.

| Antes | Después | Motivo |
| --- | --- | --- |
| Cinta única durante toda la secuencia | Las mismas partículas forman dos hebras opuestas y 22 uniones; transición 8–48% escritorio / 3–30% compacto | Hacer reconocible la doble hélice antes de caer |
| Cursor deshabilitado desde el 70% | Disponible al pausar hasta completar la salida; respuesta acotada durante recogida y caída | Mantener interacción sin impedir que las partículas desaparezcan |
| Fondos informativos lisos | Puntos verdes de 1.1px y 16% de opacidad base, reacción local y sin movimiento autónomo | Aportar profundidad sin competir con la lectura |

Rutas con fondo: Preguntas frecuentes, Actualidad, Contacto, Privacidad y Términos. Canvas decorativo, sin capturar clics; estático con movimiento reducido y sin reacción al tacto. Máximo de dos millones de píxeles de raster. La hélice compacta tiene menos vueltas y reserva espacio inferior para el texto. Se conservan conteo de partículas, presupuestos de raster del hero, navegación, contenido y animaciones de HIDROBAC.

Validación: build y tipos correctos; 21 pruebas aprobadas y 3 PHP omitidas; QA de 22 páginas y 1081 referencias sin incidencias. Comprobación visual a 1440, 390 y 320px: formación, retorno, reacción al cursor al 85.1% durante caída, puntos interactivos y acordeón utilizable. Puntos estáticos con movimiento reducido; consola sin errores. Evidencia local en `qa/hero-interactive/`: `double-helix.png`, `helix-falling.png`, `helix-mobile.png`, `faq-subtle-dots.png`. Sin medición de FPS ni prueba de teléfonos físicos/Safari. Entrega PHP no regenerada.

## Análisis de Heartgenetics — revisión posterior de la silueta

Se inspeccionaron el sitio en navegador, su bundle público y la imagen de origen. Hallazgo: la referencia no calcula una doble hélice paramétrica como la actual de GAZAL. Convierte una imagen de ADN en partículas: `TextureLoader`, lectura de píxeles con `getImageData`, filtro de intensidad, `InstancedBufferGeometry` y `RawShaderMaterial`. Usa Three.js/WebGL y una cámara de perspectiva. La forma reconocible procede de la imagen, no de una rotación de un modelo molecular.

Fuentes verificadas:
- https://www.heartgenetics.com/
- https://www.heartgenetics.com/files/litespeed/js/7aaf431eb3757f4ba6e1ff0bfa633573.js?ver=5363c
- https://www.heartgenetics.com/files/themes/heartgenetics2022/assets/third-party/hg-interactive-particles/images/sample-01.png (320×180 px)

El puntero alimenta una textura de interacción de 64×64: un historial de posiciones con fuerza calculada según desplazamiento entre eventos, vida de 120 actualizaciones y radio proporcional a esa fuerza. El shader aplica desplazamientos locales X/Y/Z y variación de tamaño. La estela se desvanece y las partículas vuelven a la imagen. No debe confundirse con rotación global del ADN ni con una duración fija en segundos. Existen imágenes específicas para orientación vertical. No se copiaron esos assets al producto.

Diagnóstico local: `matter-field.mjs:47` define vueltas uniformes; `:126` y `:129` proyectan la hélice con eje recto y amplitud constante. El campo usa profundidad para tamaño/color, pero no una perspectiva completa. Las hebras de pocas filas y las uniones regulares se leen como ondas o espirales. El puntero cambia la fase global, no una región cercana al cursor. Decisión de revisión: rehacer la representación antes de seguir intensificando ese giro.

Dirección recomendada: una silueta propia de ADN, con perspectiva oblicua, dos hebras de volumen claro, uniones y espacio negativo bien resueltos; muestrearla en partículas con posiciones de reposo estables. Mantener Canvas 2D y GSAP, como pidió el usuario, con perturbación local amortiguada y dependiente de velocidad. El scroll fija la pose base; el puntero agrega un desplazamiento transitorio que no cambia el progreso ni impide la salida. Recorrido: ADN legible desde la apertura, encuadre que acompaña el scroll sin tapar texto, recogida lateral y caída de las mismas partículas. En móvil, encuadre propio y recorrido por scroll sin exigir hover. Validar silueta quieta y reacción local antes de conectar la salida. Rendimiento por medir; no prometer equivalencia visual exacta con su WebGL usando el presupuesto actual.

Esta revisión es análisis y recomendación: no modifica ni publica otra versión del hero. Las capturas y scripts de referencia se guardan en `qa/heartgenetics-reference/` (ignorado por Git); no se incorporan dependencias o código de terceros al sitio.

## Colección de imágenes sin repetición entre aperturas

La revisión anterior diferenciaba tres fichas, pero dejaba once aperturas usando los recursos de portada o compartiéndolos entre sí. Se sustituyó la selección por categorías por un mapa explícito de 14 rutas, cada una con su propia imagen. Las tres imágenes originales de Nutrición, Valorización y Biotecnología quedan exclusivamente en las tarjetas de portada; las praderas del hero no se reutilizan en aperturas internas.

Se generaron once ilustraciones nuevas con image_gen integrado, sin alterar hechos comerciales, animaciones, controles ni textos editoriales. Temas: ingredientes proteicos, subproductos de maíz, extractos vegetales, observación de cereales, raíces e hidrogel, transferencia, ensayos agrícolas, camino rural, suelo y cobertura, panorama de soluciones y consulta técnica. No representan instalaciones, equipo humano o resultados reales de GAZAL. Se mantienen textos alternativos descriptivos, sin etiquetas visibles nuevas.

Archivos y prompts: `docs/assets/2026-10-01-image-collection.json` registra cada prompt completo, origen generado y dos salidas WebP en `public/assets/solutions/` (640 y 1200 px). Los móviles pesan 26–63 KB; los de escritorio 61–171 KB. La carga por página sigue siendo una imagen adaptada al dispositivo.

Validación: build, lint y typecheck correctos. QA: 22 páginas / 1080 referencias sin incidencias. Inventario de HTML compilado: 14 aperturas internas, 14 imágenes únicas, cero reutilizaciones de las tres imágenes de portada. Evidencia en `qa/image-variety/route-inventory.json`. Revisión visual de Innovación en escritorio, HIDROBAC móvil y Empresa tablet. No se publica ni se regenera el paquete PHP en esta revisión.

## ADN de partículas con Three.js — implementación aprobada, 2 de octubre

Tras consultar si Three.js permitiría acercarse a la referencia, el usuario respondió «entonces dale». Esta aprobación sustituye la recomendación anterior de conservar Canvas 2D para el hero. Se mantiene la estructura editorial, el recorrido GSAP, la intro rural, las otras animaciones y los fondos informativos existentes.

| Antes | Ahora | Motivo |
| --- | --- | --- |
| Hélice paramétrica que se leía como espiral | Silueta original muestreada desde una ilustración, con dos hebras gruesas y uniones visibles desde el inicio | Reconocimiento del ADN sin esperar a una transformación |
| Giro global con el cursor | Perturbación local dependiente de velocidad, estela de 12 muestras y retorno de 850ms | Respuesta más cercana al gesto y al carácter de la referencia |
| Pintado Canvas de bandas | Un Points de Three.js, posiciones inmutables y deformación en shader | Evitar recalcular y dibujar miles de partículas en JavaScript |

Se generó un asset propio con image_gen integrado; no se copió imagen ni código de Heartgenetics. Fuente y prompt exacto: `docs/assets/2026-10-02-dna.json`. Original: `assets/dna/gazal-dna-source.png`. El script `scripts/build-dna-particles.mjs` produce un buffer de 144.000 bytes y dos placas WebP transparentes de menos de 100KB. Presupuesto: 18.000 partículas en escritorio y 6.000 en compacto, con prefijo aleatorizado reproducible que conserva toda la figura. Three.js ya estaba instalado; no se modifican dependencias.

El renderizado se solicita por scroll, resize o estela activa; duerme en reposo, fuera de vista y con documento oculto. El cursor se habilita 180ms después de detener el scroll, incluso durante la recogida y caída hasta completar la salida. No captura gestos táctiles. Movimiento reducido utiliza la placa estática sin crear el renderer. Si falla el recurso o WebGL no está disponible, se conserva esa alternativa. La pérdida de contexto tiene manejador de respaldo; no se simuló una pérdida real de GPU.

Verificación final local: build, lint y typecheck correctos; 25 pruebas aprobadas y 3 PHP omitidas. QA estático: 22 páginas, 1080 referencias, cero incidencias. Navegador Chromium a 320, 390, 768 y 1440px sin desbordamiento horizontal. Se comprobó reacción local, retorno exacto al reposo por comparación de capturas, respuesta al pausar al 83,4% del recorrido, regreso al subir, versión móvil y movimiento reducido. Se bloqueó la petición `particles.bin` mediante CDP y se verificó que la placa seguía visible y la página utilizable. Consola normal sin errores ni advertencias. Evidencia: `qa/dna-three/` (ignorada por Git), incluyendo escritorio, reacción, móvil, movimiento reducido y respaldo en tablet.

Limitaciones: no se midieron FPS ni se probaron Galaxy A51, iPhone físico o Safari. Las comprobaciones responsive no equivalen a una certificación de rendimiento en esos dispositivos. La entrega PHP y los cambios de backend/dependencias que ya estaban en el directorio se conservan fuera de esta publicación.
