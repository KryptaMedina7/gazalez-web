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
