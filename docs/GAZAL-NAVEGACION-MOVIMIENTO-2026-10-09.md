# GAZAL — navegación, movimiento e introducciones

## Cambios y criterio

| Antes | Ahora | Motivo |
|---|---|---|
| Selector de idioma nativo, ajeno al tema | Desplegable marfil/verde, nombres de idioma y selección actual | Coherencia visual, teclado y foco explícito |
| Cabecera sticky con enfoque susceptible a reposicionamiento | Cabecera fija con espacio equivalente y altura compartida de 76/70 px | Abrir controles conserva la posición del documento |
| Categorías en cápsula | Barra horizontal con separadores y paneles por hover, clic o teclado | Dirección solicitada tomando Mistral como referencia |
| Selección de etapa adelantada a la escena | Un cursor continuo para muestra, barra, decimal y énfasis de etapas | La interfaz comunica el mismo momento del recorrido |
| Separación de HIDROBAC instantánea | Transición de 850 ms, interrumpible, con barra ligada a la misma posición | Recuperar la lectura de la separación sin cambiar la geometría |
| Cierre con puntos | Cuatro planos de montañas verdes; tres se desplazan con scroll | Identidad de campo y profundidad sin movimiento constante |
| Introducciones anteriores/adaptadas | Seis originales 1080p, horizontales y verticales | Utilizar las nuevas piezas aprobadas |

Se conserva el menú móvil, la cortina de navegación, el ADN, el contenido comercial y las rutas ES/EN/PT. Los puntos de páginas informativas se conservan; se retiran del cierre de portada y de las bandas de consulta. No se agregan dependencias.

## Vídeos

Nutrición animal usa la gallina; Núcleos proteicos avícolas usa los pellets; Innovación usa el ADN. Cada sección elige su archivo horizontal o vertical según orientación al entrar. WebM VP9 lossless, 24 fps, 4 segundos, 1920×1080 o 1080×1920. Los seis hashes de vídeo decodificado coinciden con el original. El manifiesto `assets/section-videos-20261009.json` registra fuente, dimensiones, bytes y hash; `scripts/section-videos-1080.mjs` reproduce el proceso.

La preservación exacta requiere entre 21,4 y 32,1 MiB por WebM. Sólo se solicita el vídeo elegido cuando corresponde mostrar la intro; no se precargan los seis. MP4 original como alternativa de compatibilidad. Sin audio automático. Omitir y Escape funcionan desde el inicio; un inicio lento, fallo, ahorro de datos o movimiento reducido permiten acceder al contenido. No se afirma una mejora de transferencia: estos archivos priorizan la calidad exacta solicitada.

## Estructura y SEO

Se contrastó el repositorio con GitHub y se añadió `scripts/qa-seo.mjs` para inspeccionar el HTML exportado. Resultado: 60 páginas comerciales en tres idiomas, 60 alcanzables desde sus portadas, títulos únicos dentro de cada idioma, un H1, descripción, canonical coherente, alternativas recíprocas ES/EN/PT, imagen social y atributos alt. Las 60 rutas figuran en el sitemap. La comprobación general revisa 62 HTML y 4108 referencias internas sin destinos ausentes.

Vercel sigue siendo preview con noindex y robots de exclusión deliberados. El canonical conserva el dominio oficial configurado. Antes de trasladar la versión al hosting oficial se debe publicar también el conjunto de rutas traducidas y activar la indexación de producción mediante la configuración existente. Robots no es protección de acceso. Esta revisión no prueba posicionamiento, indexación efectiva ni resultados de Search Console.

## Comprobación

- Build, lint y TypeScript: correctos.
- Pruebas: 35 aprobadas, 3 de PHP omitidas por el entorno; ninguna fallida.
- Navegador Chromium: anchos de 320, 390, 768 y 1440 px; menús, idioma, transición interna, llegada al inicio, progreso intermedio y footer.
- HIDROBAC muestra valores intermedios durante la separación; los controles de núcleos también recorren valores intermedios en vez de saltar al destino.
- Clic de puntero en idiomas comprobado a scrollY 1000: permanece en 1000 tras abrir. La cabecera fija evita la reposición observada con sticky.
- Revisión de teclado: ArrowDown abre y enfoca un enlace; salir con el puntero conserva el panel si contiene el foco; Escape devuelve el foco; elegir el idioma actual devuelve el foco al disparador.
- Capturas locales: `qa/navigation-20261009/` (cabecera, idiomas, laboratorio, HIDROBAC, footer y vídeo vertical).
- Detector Impeccable ejecutado una vez: 11 avisos consultivos de escala documentada, sin hallazgos no consultivos. Revisión independiente encontró dos casos de foco, corregidos y comprobados.

No se midió FPS en un A51/iPhone físico ni se certificó Safari/Firefox. Los fallbacks y movimiento reducido están implementados; las pruebas de tamaño no equivalen a pruebas en esos dispositivos. No se modificó ni desplegó el hosting PHP oficial.

## Referencias

- Dirección de cabecera: https://mistral.ai/ (distribución horizontal, adaptada a GAZAL).
- Referencia de cierre indicada por el usuario: https://insertit.cl/; los SVG de montañas son propios de esta implementación.
- Vídeos: seis MP4 entregados por el usuario el 9 de octubre de 2026; no se generó ni reconstruyó su contenido.

No se cambian datos societarios, correo, hechos comerciales ni catálogo. Las imágenes por ingrediente siguen dependiendo de disponer de nombres de ingredientes confirmados; no se inventan productos.
