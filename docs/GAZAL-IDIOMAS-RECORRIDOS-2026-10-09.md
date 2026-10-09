# GAZAL — idiomas y recorridos, 2026-10-09

Estado: revisión local, sin publicación en el host PHP oficial y sin commit de esta revisión. Se conserva la identidad GAZAL, la razón social Gazalez e Hija SpA, el contacto confirmado, las atribuciones y los límites de evidencia. Los cambios previos del paquete y ZIP no se atribuyen a este trabajo.

## Idiomas y mantenimiento

El sitio conserva sus rutas españolas sin prefijo y agrega versiones estáticas en inglés (`/en/`) y portugués de Brasil (`/pt/`, etiqueta `pt-BR`). Se mantiene el mismo slug de contenido bajo cada prefijo. Brasil es la variante de trabajo asumida; Nassira debe aprobar la traducción especializada. Las traducciones no agregan afirmaciones comerciales o técnicas.

La fuente editable está en `src/app/(es)`, `src/components` y `src/lib`. `scripts/locales.mjs` genera copias de las rutas y dependencias utilizando `src/i18n/en.json` y `src/i18n/pt.json`. Los resultados se escriben en `src/app/(en)/en`, `src/app/(pt)/pt` y `src/generated-locales`, excluidos del control de versiones. No se deben editar esas copias generadas como fuente.

`next.config.ts` ejecuta `generateLocales()` al cargar la configuración. Después de cambiar fuentes o diccionarios durante desarrollo, regenerar las copias y reiniciar el servidor; una sesión ya abierta no garantiza que las copias estén actualizadas. El selector conserva la ruta de contenido y los parámetros de consulta, incluido `interes`.

## Interacciones y criterio de movimiento

| Antes | Después | Por qué |
| --- | --- | --- |
| La valorización compartía la escena de muestras de nutrición. | `RecoveryPathways` conecta origen, propiedades, alternativas y consulta mediante un mapa ramificado. | Las alternativas industriales requieren evaluación; una secuencia de muestras sugería un recorrido demasiado uniforme. |
| Cambiar de etapa podía revertir una transición interrumpida. | Los trazos GSAP continúan desde su posición actual. | Mantener continuidad cuando el visitante selecciona otra etapa rápidamente. |
| La nutrición ya tenía un laboratorio de muestras y controles propios. | Se conserva MaterialLab y se añade respuesta discreta de lectura de 240ms. | Hacer perceptible el cambio de contexto sin sustituir su lenguaje visual. |
| HIDROBAC cambiaba de capítulo de forma inmediata. | Selección de capítulos con transición de 650ms y `power2.inOut`; detalle de 240ms. | Facilitar el seguimiento del cambio sin alterar la geometría ni el contenido científico. |
| El contenido estaba disponible en español. | Rutas estáticas ES / EN / PT-BR con navegación contextual. | Permitir leer y preparar la misma consulta en los tres idiomas. |

RecoveryPathways anima los trazos durante 650ms con `power2.out` y un desfase de 55ms; los nodos responden en 300ms. Sus ramas son recuperación, procesamiento y aprovechamiento, sujetas a evaluación. El enlace final conserva `interes=subproducto`; una consulta no implica aceptación automática del material. La preferencia de movimiento reducido aplica los estados inmediatamente.

MaterialLab conserva sus muestras, capítulos, recorrido manual y reproducción opcional. HIDROBAC conserva los seis capítulos, la geometría existente y la reproducción solicitada de 14 segundos. El deslizador sigue permitiendo búsqueda inmediata; el movimiento reducido evita la transición interpolada. No se introduce una promesa de composición, rendimiento o disponibilidad comercial.

## Ingredientes y contenido pendiente

La evidencia disponible permite hablar de familias amplias de ingredientes para nutrición animal y núcleos proteicos avícolas. El sitio público [Empresas Gazalez](https://empresasgazalez.cl/) no confirma un catálogo de ingredientes específicos. Las imágenes individuales solicitadas requieren una lista real confirmada; no se inventaron productos para llenar ese vacío. Las imágenes de familia existentes siguen siendo ilustraciones fotográficas provisionales con procedencia registrada en `docs/assets/2026-10-09-familias.json`.

La consulta mantiene el resumen local y el enlace `mailto` existente. Preparar el resumen no equivale a enviarlo; no se envió ningún correo durante la verificación.

## Verificación local y límites

Resultados de la ejecución principal; el build volvió a aprobar después del ajuste final de cabecera:

- Build correcto: 64 páginas generadas por Next, de las cuales 60 son páginas de contenido.
- Lint y comprobación de tipos correctos.
- 35 pruebas aprobadas y 3 pruebas PHP omitidas por dependencia del entorno.
- Auditoría estática: 62 HTML, 3.148 referencias, cero incidencias reportadas.
- Auditoría de idiomas: 40 páginas localizadas, cero incidencias reportadas.
- Navegador local: preparación de consulta EN/PT válida, conservación de ruta e interés al cambiar idioma y funcionamiento del menú móvil.

La cabecera corregida se verificó en navegador con viewport de 320px: `clientWidth`, `scrollWidth` y ancho del cuerpo de 305px; borde derecho del menú en 286,8px. No se detectó desbordamiento horizontal en esa comprobación.

HIDROBAC en portugués se comprobó con viewport de 768px: `clientWidth` y `scrollWidth` de 753px. La selección de Água terminó en 450/1000 y, con movimiento reducido, Matriz pasó inmediatamente a 200/1000. Esta comprobación verifica los estados locales observados, sin afirmar rendimiento físico. No se envió ningún correo.

Capturas en `qa/idiomas-20261009/`: `recovery-es-1440.png`, `recovery-es-390.png`, `contact-en-320-fixed.png` y `hidrobac-pt-768.png`. Se conserva `contact-en-320.png` como evidencia anterior a la corrección. Las capturas acreditan solamente el estado local representado.

Pendientes: aprobación lingüística especializada por Nassira, lista confirmada de ingredientes y publicación si se autoriza. No hay medición física de FPS en Galaxy A51 o iPhone ni verificación de esta revisión en el host PHP oficial. Las comprobaciones locales no sustituyen esas verificaciones.
