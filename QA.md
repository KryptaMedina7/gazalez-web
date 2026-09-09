# Verificación local — GAZAL

Fecha: 2026-09-09. Exportación estática local; no se publicó en producción.

## Comprobaciones automáticas

- `npm run build`: compilación, TypeScript y exportación correctos.
- `npm run lint`: sin errores ni advertencias.
- `npm run typecheck`: correcto.
- `npm run test`: 3 pruebas aprobadas del resumen comercial y enlaces de correo, incluidos tipos no reconocidos e inyección de cabeceras.
- `npm run qa`: 21 documentos index exportados, 797 referencias internas y destinos del menú, sin archivos/enlaces internos faltantes. Son 19 rutas de contenido y las salidas auxiliares del generador.
- `npm audit`: 0 vulnerabilidades reportadas.
- Logo: SHA-256 coincide con el original entregado: `4BA5290920DF95B847515D67C292AEAC7D9893CB5C100FA01A2CF5531C0FC40D`.
- Búsqueda de credenciales 21st en archivos del proyecto: 0 coincidencias. Clave en entorno del usuario de Windows, fuera del proyecto.

## Navegador

Se utilizó el navegador de Codex contra el servidor estático en localhost:3000.

- Antes de los extras: revisión de las 19 rutas en 390/768/1024/1440/1920 px y revisión adicional de páginas representativas en 240/280/320/430/600 px. Evidencia en `qa/browser-checks.json` y `qa/final-narrow-checks.json`.
- Después de los extras: 38 comprobaciones de rutas, las 19 en 390 y 1440 px. Tamaño real confirmado, un h1, sin desbordamiento horizontal ni imágenes rotas detectadas. `qa/motion-routes-checks.json`.
- Portada y menú: 240/280/320/390/430/600/768/1024/1440/1920 px; tamaño real confirmado y ningún enlace desborda su contenedor. `qa/motion-responsive-checks.json`.
- Paisaje 844×390: menú sin desbordamiento horizontal, contenido desplazable verticalmente para llegar a todos los enlaces.
- Menú: apertura por teclado inmediata, Escape cierra y devuelve el foco; tres ciclos rápidos de apertura/cierre terminan sin modal residual ni bloqueo del body.
- Bienvenida: visible al entrar y al refrescar la misma pestaña; retirada después de su breve presentación, según la última solicitud.
- Hero: transformación comprobada de escala 1.035 a 1 y traslación final corta tras scroll nativo. No hay pinning ni bloqueo. `qa/motion-scroll-checks.json`.
- Transición de ruta: GSAP deja las tres capas completamente fuera del viewport al concluir, con pointer-events desactivados. Se comprobó la navegación y el estado final; las mediciones del navegador no capturan cada fotograma intermedio.
- Dock móvil: correo confirmado, cierre por Escape y retorno del foco. Los enlaces colapsados usan `inert`.
- Formulario revisado antes de los extras: validación, preparación, edición que conserva datos y nueva consulta que limpia campos. No se envió correo. El enlace de descarga y su contenido TXT se inspeccionaron; el evento de descarga del navegador no se pudo confirmar.
- Consola de la pasada de animación y rutas: sin errores o advertencias capturados.

## Revisión visual

Capturas limpias de viewport en `qa/motion-home-desktop.png`, `qa/motion-menu-desktop.png`, `qa/motion-menu-mobile.png`, `qa/motion-intro.png`, más las capturas finales de formulario y páginas representativas. Las capturas antiguas de página completa tienen artefactos de unión; las conclusiones visuales usan capturas de viewport.

La revisión independiente previa encontró cuatro problemas, corregidos: conservación del borrador, acceso a Aplicaciones industriales, etiquetas decorativas redundantes y legibilidad de ayuda/resumen móvil. El cierre visual y las nuevas animaciones se revisaron en este hilo; no se atribuye a un revisor independiente la validación de los extras.

## Límites y pendientes reales

- Movimiento reducido revisado en código: CSS oculta introducción/cortinas; Motion y GSAP respetan la preferencia; proceso no avanza por scroll si está activa. La herramienta de navegador no expone emulación de esa preferencia: no se afirma una prueba de runtime en ese modo.
- No se hizo auditoría WCAG completa, medición formal de FPS/Core Web Vitals, prueba en dispositivos físicos, envío de correo ni validación de hosting/DNS.
- No se confirmaron perfiles sociales oficiales; el componente muestra solamente el correo comercial confirmado.
- El formulario prepara un borrador y un archivo local; no tiene backend de envío automático.
- La salida mantiene `noindex` hasta configurar y validar una publicación.


## Pasada final de navegación ampliada

Revisión detallada en `docs/ANIMATION-REVIEW.md`. Incluye dropdowns con 18 destinos únicos, drilldown con retorno y enlaces nativos, corrección de superposición a 240px, llegada arriba desde una posición inferior, transformación en cuatro estados y secuencia de investigación. Evidencia en `qa/refresh-*.png` y `qa/refresh-*.json`. La nueva configuración de Vercel está documentada en `docs/VERCEL.md`; no existe URL publicada todavía.

## Gazalez: contenido y navegación (2026-09-09)

- Build, lint y 3 pruebas existentes correctos. Exportación: 22 páginas, 858 referencias internas verificadas, sin incidencias.
- No quedan menciones visibles a la marca GAZAL en el HTML exportado.
- Footer Inicio → Empresa: scrollY 6576.8 → 0. Topbar Empresa → HIDROBAC: 2138.4 → 0. Hamburguesa móvil HIDROBAC → Nutrición animal: 2359.2 → 0; diálogo desmontado.
- Inicio sin desbordamiento a 240, 390 y 1024 px; revisión visual de escritorio a 1440px. No se afirma una matriz de todos los dispositivos.
- Logos originales cargados, logo Gazalez Holding Group SVG integrado, dos declaraciones directivas visibles, FAQ abre respuestas y tiene enlaces desde navegación/footer.
- Hero: expansión a --hero-reveal:0% comprobada mediante scroll; móvil conserva opacidad 1 en el texto. HIDROBAC cambia entre estados 0/1/2 y sus descripciones; cinco conexiones de trazabilidad completan su dibujo.
- Consola sin errores ni advertencias capturadas durante la comprobación final. Reduced motion implementado, no emulado.
- Vercel sigue preparado sin publicación ni URL externa de preview.
