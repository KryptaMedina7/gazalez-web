# GAZAL: familias, materiales y consulta

Fecha: 9 de octubre de 2026. Extensión local de la identidad aprobada; publicación Vercel pendiente.

## Resultado y alcance

El recorrido conecta material → requerimiento → consulta. Conserva salvia, marfil y verde profundo, Manrope/Lexend, el encabezado y las aperturas existentes. La escena queda a la izquierda y la lectura a la derecha, con controles debajo; en móvil se apilan. No es una nueva composición global.

- **Familias:** ingredientes para nutrición animal y núcleos proteicos avícolas. Presentan aplicación general, público y solicitud contextual; no constituyen un catálogo de productos específicos ni confirman disponibilidad, composición o suministro.
- **Núcleos:** una escena SVG clara sustituye el diagrama de relaciones previo. Sus cuatro etapas conectan materia prima, requerimiento, dieta completa y documentación sin calcular fórmulas ni proporciones.
- **Valorización:** la misma continuidad de muestras recorre origen, caracterización, alternativas y evaluación; los puntos interactivos amplían antecedentes como volumen y frecuencia.
- **Calidad:** un selector explica identificación, ficha técnica y análisis. Orienta la consulta documental sin inventar descargas ni certificaciones.
- **Contacto:** la familia elegida se conserva en la preparación local del resumen. El destinatario sigue siendo `contacto@empresagazalez.cl`. No se configura envío automático ni WhatsApp.

El ADN, HIDROBAC y los videos de introducción conservan su comportamiento. Los radios y tamaños particulares del nuevo módulo son decisiones locales y no nuevos tokens globales.

## Archivos y rutas

| Archivo | Responsabilidad |
| --- | --- |
| `src/components/ui/material-lab.tsx` | Escena SVG, etapas, reproducción, barra, teclado y puntos de exploración |
| `src/lib/material-lab.mjs` | Progreso e interpolación de muestras y bandejas |
| `src/app/material-lab.css` | Disposición, estilos y adaptación responsive locales |
| `src/components/product-families.tsx` y `src/lib/product-families.mjs` | Familias, imágenes, alcance y enlaces de consulta |
| `src/components/ui/quality-documents.tsx` | Recorrido de antecedentes documentales |
| `src/components/enquiry-form.tsx` | Selección de familia y resumen local |
| `src/components/ui/solution-explorers.tsx` y `src/app/[...slug]/page.tsx` | Integración en las páginas existentes |

Rutas afectadas: `/soluciones/`, `/soluciones/nutricion-animal/`, `/soluciones/nucleos-proteicos/`, `/soluciones/valorizacion-industrial/`, `/calidad-trazabilidad/` y `/contacto/`. Las familias enlazan también al servicio existente `/soluciones/formulacion-tecnica/`; las consultas usan `/contacto/?interes=formulacion&familia=ingredientes` o `familia=nucleos`.

## Fuentes y decisiones aprobadas

El alcance factual procede del contenido aprobado del repositorio y de `PRODUCT.md`. `docs/ANALISIS-COMPETITIVO-2026-10-09.md` aporta referencias de estructura comercial y progresión didáctica; no transfiere catálogos ni capacidades de otras empresas a GAZAL.

El usuario autorizó crear las imágenes provisionales de las dos familias sin rótulos visibles. Son bodegones genéricos generados, no fotografías de productos propios ni de la operación real. Sus prompts y variantes WebP de 640/1200px se registran en `docs/assets/2026-10-09-familias.json`; los archivos están en `public/assets/familias/`. `DESIGN.md` conserva esta excepción acotada y sustituye la prescripción obsoleta del diagrama proteico oscuro por el campo claro actual. Las atribuciones y reglas del resto del sitio se mantienen.

## Verificación

Resultados comunicados y reunidos por la tarea principal sobre la implementación local:

- Lint, comprobación TypeScript y build: correctos. `git diff --check`: sin errores.
- `npm test`: 35 pruebas, 32 aprobadas, 3 omitidas por dependencia PHP, 0 fallidas. La prueba nueva de `trayPose` comprueba que las muestras permanecen sobre sus bandejas durante todos los intervalos de movimiento.
- Auditoría del sitio exportado: 22 páginas, 1122 referencias, 0 incidencias reportadas.
- Chromium a 320, 390, 768 y 1440px: sin desbordamiento horizontal, un H1 y sin imágenes rotas en las cuatro páginas registradas en `qa/familias-20261009/responsive.json`.
- Interacción: Enter selecciona Documentación y Home en la barra vuelve a Materia prima; reproducción normal termina sin bucle; movimiento reducido avanza inmediatamente al siguiente estado; el punto Volumen cambia la explicación de valorización.
- Formulario con datos ficticios: familia incluida en el resumen local, sin envío. Consola de la pestaña comprobada: 0 errores y 0 advertencias.

Capturas y registros: `qa/familias-20261009/`, incluidos `responsive.json`, `interactions.json`, `nucleos-desktop-final.png` y `nucleos-mobile-final.png`. La evidencia corresponde a build local y emulación de viewport; no acredita teléfonos físicos, Safari, FPS medidos ni entrega de correos.

## Pendientes

Publicar y comprobar la versión en Vercel. El hosting oficial PHP no se ha desplegado. Para ampliar la oferta faltan nombres de productos específicos, aplicaciones y condiciones aprobadas, fichas publicables y fotografías propias autorizadas. El envío real necesita proveedor y configuración; WhatsApp necesita un número comercial confirmado. Este registro no afirma despliegue ni commit.
