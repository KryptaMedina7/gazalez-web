# Recuperación del scroll animado móvil

## Estado actual — ADN, 4 de octubre de 2026

El hero actual usa `HeroExperience` y el renderer Three.js de partículas XYZ (`dna-renderer.ts`), con 18.000 muestras en escritorio y 6.000 en vistas compactas. La implementación de 1100 partículas descrita más abajo es histórica; no es el renderer activo de esta portada.

Optimización de fluidez:

- Dibujo conectado al ticker de GSAP, después de actualizar su timeline, en lugar de solicitar otro RAF desde cada actualización. La posición de las partículas y las transformaciones del escenario se presentan en el mismo ciclo. El suscriptor se retira al quedar inactivo, ocultarse o desmontarse.
- Seguimiento de scroll de 0,32 s en escritorio y 0,18 s en móvil. El segundo sustituye el seguimiento directo de eventos táctiles, suavizando sus saltos sin interceptar el desplazamiento nativo.
- Los 12 posibles impulsos del ratón se evalúan una vez por frame y se compactan en slots reutilizables. El shader omite todo el bloque cuando no hay impulsos, siempre en móvil; descarta puntos fuera del radio antes de calcular raíces y calcula la dispersión una sola vez por partícula.
- Se evitan escrituras repetidas de `data-ready` (usado por `:has`) y de progreso cuando su valor no cambia. Se mantienen geometría, densidad, resolución, colores, recorrido, giro axial, inclinación lateral y amplitud de la reacción al puntero.

Validación: build, tipos y lint correctos; 29 pruebas aprobadas y 3 PHP omitidas. La nueva prueba compara numéricamente la influencia empaquetada con la fórmula anterior y comprueba inicio, caducidad y reutilización de buffers. QA estático: 22 páginas, 1098 referencias internas, sin incidencias. Revisión Chromium a 1440×1000, 390×844 y 320×740: giro, salida, regreso, puntero tras detenerse y ausencia de overflow. Capturas en `qa/dna-fluidez-20261004/`.

No se publican cifras de FPS ni porcentajes de mejora: no hay una medición GPU comparable ni validación en A51 o Safari/iPhone físico. La herramienta de navegador no admite `Input.synthesizeScrollGesture`; la revisión se hizo con su scroll nativo disponible. La publicación corresponde a Vercel; el paquete PHP no se regenera en esta entrega.

## Implementación histórica

Esta revisión sustituye la portada móvil estática descrita en `MOTION-REVISION-2026-09-10.md`. El usuario pidió recuperar una transformación cercana a escritorio y corregir el arranque a media página.

## Implementación

- WebGL 1 mueve las 1100 partículas en el vertex shader. Los datos se cargan una sola vez; cada actualización cambia un uniforme y hace un drawArrays. No hay librería 3D adicional.
- Un listener de scroll pasivo solicita como máximo un RAF. No hay bucle continuo, interpolación que quede atrás del gesto ni recálculo de geometría en JS en este camino. Las medidas se almacenan desde ResizeObserver.
- El recorrido corto usa sticky CSS, la altura estable svh y un máximo de 900000 píxeles de superficie. Mantiene el scroll nativo, sin cancelar touchmove o wheel.
- Canvas 2D con 440 partículas y nueve rellenos es la alternativa si WebGL no está disponible. Sin contexto gráfico o con movimiento reducido, permanece la composición estática accesible.
- Se liberan buffers, shaders, observers y listeners. La pérdida de contexto muestra el recurso estático; al restaurarlo se reconstruye el renderer.
- El reset de PageMotion incluye ahora la primera carga, además de cambios de ruta. La restauración automática se desactiva en el head, antes de la hidratación. El asentamiento se cancela ante una interacción real y conserva destinos con hash.

## Verificación

- Build, lint, once pruebas y QA estático correctos: 22 páginas y 859 referencias internas.
- Browser responsive 390 × 844: primera carga y recarga desde scroll 990 vuelven a scrollY=0, h1 a 123px, progreso a 0.
- Motor real observado: `webgl`, Canvas listo, sin advertencias de compilación de shader ni errores de consola. Progresos observados 0 → 0.447 → 1; reversión 1 → 0.645.
- Tras el ajuste de altura, la escena ocupa 766px a 390 × 844, evitando el hueco inferior visto en la primera inspección.
- Sin overflow a 240/320/360/390/428/768 y horizontal 844px. Se verifica adaptación al cambiar de orientación.
- Pruebas del adaptador con dobles del API: una sola subida del buffer durante 101 dibujos, un lote de 1100 puntos por dibujo y liberación del buffer. El fallback dibuja 440 círculos como máximo en nueve rellenos. Estas pruebas no son mediciones GPU.

No se afirman FPS ni latencia táctil de teléfonos físicos. Las verificaciones del navegador se ejecutaron en esta máquina; A51 y iPhone 12 Pro Max requieren comprobación en hardware real. El modo reducido y recuperación de contexto se revisan en código, sin forzar capacidades del navegador.

Referencias del API: [WebGL drawArrays](https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/drawArrays), [bufferData](https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/bufferData), [scrollRestoration](https://developer.mozilla.org/en-US/docs/Web/API/History/scrollRestoration).
