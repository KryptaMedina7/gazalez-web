# Footer rural — 9 octubre 2026

Reemplaza las siluetas geométricas rechazadas por dos ilustraciones transparentes generadas con la herramienta integrada de imágenes: cordillera lejana y praderas en primer plano. El paisaje es decorativo; no representa instalaciones de GAZAL. Prompts y procedencia: [manifest](assets/footer-rural-20261009.json).

- `src/components/ui/footer-landscape.tsx`: dos planos, imágenes responsivas diferidas y desplazamiento vertical ligado al scroll (-18/28px → 0). Movimiento reducido sin transformaciones.
- `src/app/gazal-navigation-landscape.css`: composición sin deformar las imágenes, encuadre móvil y fundido hacia el fondo forest del footer. Logo, textos, enlaces y datos legales conservados.
- `public/assets/footer/`: cuatro WebP con transparencia; ambos planos suman 127.348 bytes en móvil y 461.566 en escritorio. No dependencias nuevas.
- `DESIGN.md` y `.impeccable/design.json`: descripción del patrón actualizada.

## Validación local

Build, lint y typecheck correctos. `npm run qa`: 62 páginas y 4.228 referencias internas, sin incidencias. Detector de Impeccable sobre el componente: sin hallazgos. No se añaden pruebas unitarias para este cambio visual reversible.

Navegador Chromium de Codex, export estático local: 360, 390, 768 y 1440px, sin desbordamiento horizontal; fuentes de imagen compactas y de escritorio cargadas correctamente. Scroll modifica los dos planos; `prefers-reduced-motion: reduce` deja ambos con `transform: none`. Sin errores de consola en la página revisada. Capturas en `qa/footer-rural-v2/` (evidencia local, ignorada por Git). Esto no certifica FPS en teléfonos físicos.

La revisión es específica del footer compartido; no modifica los demás componentes ni vuelve a certificar todo el sitio.

## Ajuste solicitado: respuesta al llegar al final y color entre etapas

El paisaje pasa después de los enlaces y antes de los datos legales, para permanecer visible al llegar al final incluso en móvil. Los planos recorren 50/120px en escritorio y 30/69px en móvil. Al alcanzar el borde inferior se comprimen 20/11px y vuelven a cero con amortiguación; el gesto se rearma al subir 65px. No se interceptan eventos wheel/touch ni se modifica el scroll nativo. Movimiento reducido desactiva ambos efectos. Referencias: componente `InsyFooter.tsx` del proyecto local InsertIT y el cierre de [Mistral](https://mistral.ai/).

| Antes | Después | Motivo |
| --- | --- | --- |
| El paisaje terminaba su recorrido antes del final | Paisaje al cierre con parallax y rebote acotado | Responder al gesto final sin mover enlaces |
| El énfasis cambiaba por separado en cada tarjeta | Una superficie viaja entre las opciones en 380ms | Mostrar continuidad entre etapas |

`StageHighlight` se reutiliza en Process, MaterialLab, RecoveryPathways e HydrobacExplorer de portada. El teclado y movimiento reducido posicionan la superficie inmediatamente; ResizeObserver adapta las filas móviles. No se alteran figuras ni contenido de HIDROBAC. Las escenas y barras mantienen sus controladores previos.

Build, lint, typecheck y QA de 62 páginas correctos. Suite: 35 pruebas aprobadas, 3 de PHP omitidas. Revisión visual local de las selecciones y footer a 390/1440px, navegación por teclado, recolocación al cambiar ancho y modo de movimiento reducido. Capturas en `qa/footer-stage-motion/`. La comprobación usa navegador, no teléfonos físicos.
