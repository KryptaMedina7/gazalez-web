# GAZAL — Reforma editorial y UX, 29-09-2026

## Alcance y estado
Implementada en el checkout local de Next.js 16 / React / TypeScript con exportación estática. Sin nuevas dependencias, sin push, sin despliegue y sin regenerar el paquete PHP. Se conservaron las modificaciones ajenas previas de package.json, package-lock.json, releases/gazalez-php-benzahosting.zip y los archivos no versionados de instrucciones/entrega de marca. Esta revisión requiere aprobación editorial antes de publicar; no acredita pruebas en dispositivos físicos.

## Mapa de contenido y rutas
| Decisión | Implementación |
| --- | --- |
| Conservar | Marca GAZAL, archivos aprobados de logo, video del pollito, bosque, explorador conceptual HIDROBAC, correo confirmado y razón social. Todas las rutas de allRoutes permanecen; ninguna redirección. |
| Fusionar | Portada en seis bloques: actividad y público; tres caminos de soluciones; cómo trabajamos; operación y respaldo; HIDROBAC; consulta. Se retiran rail, manifiesto, trazabilidad duplicada y FAQ extensa de portada. |
| Agrupar | /soluciones/ organiza Nutrición animal (nutrición, núcleos y formulación), Valorización industrial e Innovación/biotecnología. Núcleos y formulación siguen con ficha propia y breadcrumb bajo Nutrición. |
| Diferenciar | /innovacion/ presenta líneas y colaboración. /innovacion/hidrobac/ conserva procedencia, licencia, componentes, estado, fuente y contacto específico. |
| Mover | Declaraciones de Nassira y Karim quedan en /empresa/, sin reescribir citas ni cargos. /actualidad/ mantiene sus dos publicaciones y fechas; acceso secundario desde footer e Innovación. |
| Reorganizar | /casos/ sigue disponible como guía de primera conversación, sin simular casos. /sostenibilidad/ distingue prácticas, objetivos y resultados medidos; no repite el módulo animado de transformación. |
| Completar | Las cinco fichas explican audiencia, consulta, antecedentes, evaluación, condiciones y siguiente paso. /calidad-trazabilidad/ distingue fichas, análisis y certificaciones. |
| Retirar del respaldo destacado | Franja de logos CORFO/GORE/GAZAL, al no existir relación específica documentada para cada uno. No se borran assets. La colaboración UdeC queda explicada con su fuente. |

Navegación principal: Soluciones · Innovación · Empresa · Contacto (una sola acción en escritorio). El móvil conserva diálogo, foco y drilldown; Contacto es un enlace directo. Calidad, sostenibilidad y FAQ están en Empresa y footer; casos, actualidad y legales en footer.

## Fundamento factual
- docs/CONTENT-EVIDENCE.md y docs/GAZAL-REFORMA-2026-09-29.md: registro previo de identidad, alcance y contraste con las 19 páginas interiores del sitio corporativo. Las capturas/textos locales de ese contraste están en tmp/gazal-refresh-20260929. Esta tarea no convierte declaraciones corporativas en auditoría independiente.
- El titular/descripcion propuesto por el usuario se apoya en esa declaración existente de recuperación, procesamiento, formulación y foco avícola. No se añadieron volúmenes, plazos, composición, disponibilidad o garantías.
- Declaraciones y cargos: captura aportada por el usuario y componente leadership-voices.tsx ya existente. Texto sin cambios; su carácter es institucional, no reseña de un cliente. La afirmación de trayectoria permanece dentro de la cita atribuida y no se convierte en un indicador editorial.
- Licencia 2025: publicación identificada de Facultad de Agronomía UdeC, enlazada desde src/lib/site.ts (sourceUdec): https://es.linkedin.com/posts/facultad-de-agronom%C3%ADa-udec_felicitamos-con-orgullo-a-nuestros-acad%C3%A9micos-activity-7422318170062954496-X-u- . Se mantiene el titular histórico Gazalez e Hija. No implica venta, exclusividad ni desempeño validado.
- Noticias UdeC, 28-01-2026: https://noticias.udec.cl/novena-version-de-los-premios-ciencia-con-impacto-udec-reconoce-avances-en-transferencia-tecnologica-e-innovacion/ . Reconsultada; es contexto del evento, no prueba de que GAZAL haya ganado un premio. No se trasladan métricas de otras entidades.
- El acceso al sitio corporativo mediante la herramienta web falló en esta revisión. Se trabajó sobre las referencias y snapshots previos identificados; no se afirma una nueva auditoría completa de producción.
- Correo contacto@empresagazalez.cl y razón social Gazalez e Hija SpA conservados conforme a confirmación del usuario.

## Diseño y movimiento
Se reemplaza la extensión de gradientes de la entrega anterior por fondos neutros. Se conserva un gradiente tenue de apertura en páginas interiores y otro en la visualización HIDROBAC. Soluciones, footer, declaraciones y contacto ya no llevan gradientes. El verde claro plano distingue Cómo trabajamos. El bosque conserva su velo funcional de contraste y movimiento; texto y acciones permanecen visibles, sin reemplazarse por otro eslogan. En móvil se elimina el tramo sticky adicional, conservando la transformación de planos con el scroll natural.

Tokens --gazal-* centralizan los seis valores solicitados y alimentan los alias existentes. Manrope y Lexend no cambian. El tono salvia de diagramas/controles existentes se conserva; se eliminan acentos dorados del recorrido activo usando verdes. No se crea ni modifica ningún asset de identidad.

La intro muestra el clip aprobado una vez por sesión, se omite desde el inicio, no tiene espera mínima y asigna video solo después de comprobar sesión/movimiento reducido. Escape, fin, error y cuatro segundos sin progreso permiten salir. Movimiento reducido lleva directamente al bosque estático. La marca de sesión no contiene datos personales. Sin JavaScript se ofrece contacto por correo y se oculta el preparador.

## Contacto y privacidad
No se encontró endpoint de envío en el sitio Next exportado: enquiry.mjs crea mailto y resumen local. Las dependencias SMTP añadidas previamente al package no constituyen una integración activa. Se conserva el caso B solicitado: Preparar correo, Copiar consulta, abrir aplicación, descargar y editar. Se elimina el selector de archivos. Datos técnicos opcionales; teléfono opcional; motivo normalizado contra lista permitida. No se incorporan analítica, logs de formulario, persistencia de borradores ni llamadas a servicios de envío. Solo el enlace mailto incluye el contenido necesario para componer el mensaje; la URL de navegación no incorpora datos personales.

/privacidad/ describe el funcionamiento local y la marca de sesión; no promete plazos de retención ni certificaciones legales. Las pruebas usan qa@example.com, sin envío real ni documentos.

## Metadatos y entorno
Títulos y descripciones específicos; imagen social conceptual preservada también en internas (la redefinición de openGraph no la pierde). Canonical y sitemap conservan la configuración central de site.url. La compilación local queda noindex conforme a NEXT_PUBLIC_INDEXABLE; producción corporativa requiere configurar explícitamente true al aprobar un despliegue. Robots no es protección de acceso. Sin DNS, dominios o correos cambiados. Se conserva Organization con identidad legal, sin ratings ni certificaciones.

## Archivos principales
- src/app/page.tsx: portada de seis bloques.
- src/lib/content.ts y src/lib/navigation.ts: caminos, fichas y navegación.
- src/app/[...slug]/page.tsx: internas, metadatos, privacidad y contacto.
- src/components/enquiry-form.tsx: preparación honesta, copia y campos opcionales.
- src/components/ui/brand-intro.tsx y hero-experience.tsx: acceso, sesión y bosque.
- src/app/gazal-surfaces.css: superficies, tokens y responsive.
- src/components/shell.tsx, shared.tsx, company-faq.tsx y componentes de menú: accesos y textos.
- scripts/qa.mjs: enlaces, H1, seis bloques y tres caminos. Se sustituyó un check preexistente de hash de un comentario de diseño obsoleto por comprobaciones de estructura editorial. No se ocultaron fallos de enlaces.

## Validación
- npm run build: correcto; 24 páginas generadas por Next, incluidas rutas técnicas.
- npm run lint y npm run typecheck: correctos.
- npm test: 13 pasan, 3 de integración PHP omitidas por no ejecutar ese entorno; ninguna falla.
- npm run qa: 22 documentos index.html y 1015 referencias internas comprobadas; cero incidencias y previewNoindex true. Conteos incluyen páginas técnicas; allRoutes se conserva.
- Chromium local, exportación en http://127.0.0.1:3001: portada, nutrición, HIDROBAC y contacto a 320, 390, 768 y 1440 px, sin overflow horizontal ni imágenes rotas en esas vistas. Se corrigió un desplazamiento superior de 78 px del bosque móvil encontrado en la primera pasada.
- Menú móvil por clic, drilldown y llegada a Nutrición en scrollY=0. Menú desktop con Enter/Escape y retorno de foco visible.
- Formulario: bloqueo de campos vacíos, preparación con datos ficticios, copia real al portapapeles, edición preservando datos y foco en Nombre. Sin input file, sin campos técnicos obligatorios; interes=formulacion preselecciona y interes=constructor cae en general. No se accionó el mailto.
- Movimiento reducido: sin video ni recorrido sticky; scroll habilitado. Fallo de MP4 simulado mediante bloqueo de red: contenido accesible y overlay cerrado. JavaScript desactivado: intro oculta, alternativa de contacto visible. Consola de la revisión normal: sin errores ni advertencias recuperados.
- Contraste calculado para pares base: body/canvas 6.18:1, body/mint 5.32:1, ink/primary 10.44:1, canvas/forest 13.27:1, focus/mint 4.56:1. No se afirma conformidad completa WCAG ni contraste de cada píxel de una foto.
- Capturas finales de apertura, móvil y escritorio: qa/editorial-20260929/index.html (galería), archivos *-viewport.png. Las capturas fullPage iniciales presentaron artefactos de cosido con zonas repetidas; no son la evidencia final. viewport-checks.json registra anchos observados.
- Sin medición de FPS, Lighthouse, CLS ni porcentajes de mejora. No se han probado Samsung A51, Safari/iPhone ni lectores de pantalla físicos. El atajo de zoom del navegador integrado no cambió la escala: ampliación nativa al 200% queda pendiente, aunque el reflujo a 320 px sí se verificó.

## Pendientes concretos de Nassira / publicación futura
1. Fichas y análisis aprobados por solución, condiciones de suministro y fotografías reales autorizadas: limita el detalle comercial y el respaldo operativo, no el acceso a consulta.
2. Documentar relación exacta con CORFO y Gobierno Regional antes de volver a presentar sus logos como respaldo.
3. Estado actual de validación, escalamiento y eventual disponibilidad comercial de HIDROBAC; hasta entonces se mantiene informativo.
4. Revalidar vigencia de declaraciones/cargos de dirección y cobertura logística antes de publicar; no se han inventado actualizaciones.
5. Si se requiere envío real, habilitar una integración con credenciales y protección de abuso. No necesaria para el preparador actual.
6. Verificación física de Safari/iOS, Android y zoom nativo al 200% antes de considerar aceptación completa multidispositivo.
7. La versión PHP requiere portar y verificar estos cambios en una tarea de despliegue posterior. Esta reforma no modifica el sitio corporativo ni Vercel.

## Ampliación visual y publicación autorizada
Solicitud posterior del usuario: añadir imágenes representativas con hover, rehacer gradientes y dar continuidad a páginas interiores; se autoriza subir esta ampliación junto con la reforma editorial. La restricción de no publicar de la primera pasada deja de aplicarse a Vercel; PHP corporativo permanece fuera de alcance.

Tres originales conceptuales generados con la herramienta de imágenes: nutrición (cereales, harinas y gránulos), valorización (fibras que se convierten en material granular), biotecnología (plántula e hidrogel). Fuentes conservadas en assets/solution-visuals. Entregas WebP en public/assets/solutions: 640 px de 40–56 KB y 1200 px de 94–144 KB. No son productos, ensayos ni instalaciones reales. Etiqueta conceptual junto a cada uso, sin cambios de logo ni afirmaciones comerciales.

| Before | After | Why |
| --- | --- | --- |
| Tres columnas solo de texto | Imágenes con apertura de recorte, escala y opacidad al hover | Reconocer visualmente el ámbito sin ocultar información |
| Aperturas interiores solo tipográficas | Imagen temática y texto en dos columnas; apilados en móvil | Conservar el mundo natural de la portada en las fichas |
| Gradiente diagonal general | Fondo uniforme y fundido limitado al borde de imagen | Evitar cortes de color sin relación con el contenido |
| Fondos verdes de bloque | Transiciones al color canvas en ambos extremos | Continuidad entre Cómo trabajamos, HIDROBAC y sus vecinos |

Hover CSS de 320 ms, sin eventos de movimiento continuo ni nuevas dependencias. Espacio de imagen reservado: columnas mantienen 645.61 px en la prueba de hover. Teclado revela sin transición; móvil y movimiento reducido muestran la imagen completa. Las imágenes de portada cargan diferidas; las de apertura de ficha cargan sin diferir y usan source de 640 px en móvil.

ConceptImage y PageIntro comparten el tratamiento; nutrición, núcleos, formulación, valorización, bioprocesos, Innovación/HIDROBAC/transferencia/proyectos, Empresa, Soluciones, Calidad y Sostenibilidad reciben una visual pertinente. Contacto y páginas legales conservan lectura prioritaria.

Validación de la ampliación: build y lint correctos; 13 pruebas pasan y tres PHP omitidas. QA estática: 1031 referencias sin incidencias. Hover observado en navegador, sin cambio de altura; Bioprocesos a 1440 y Nutrición a 390 revisados visualmente, fuente móvil 640 px confirmada. Sin nuevas mediciones en hardware físico; permanecen las limitaciones anteriores.

Comprobación final de la ampliación: Bioprocesos a 320 px, portada y Nutrición a 390 px, Innovación a 768 px y Nutrición a 1440 px sin desbordamiento horizontal. Foco por teclado en el enlace de nutrición revela su imagen; prefers-reduced-motion elimina las transiciones. En móvil se utiliza la imagen de 640 px y no se requiere hover. Consola sin errores ni advertencias recuperados. Build final y QA de 1031 referencias correctos. Capturas en qa/visual-solutions: hover-desktop.png, nutrition-desktop-final.png y nutrition-mobile-final.png. Los archivos de paquete, ZIP PHP e instrucciones locales preexistentes quedan fuera del commit de esta reforma.

Ajuste posterior solicitado: en escritorio la imagen queda completamente oculta (clip al 50% y opacidad cero). Dos líneas horizontales juntas se separan hasta los bordes, revelando la imagen en 420 ms al hover o foco. Se conserva el espacio para evitar saltos de texto. Móvil y movimiento reducido mantienen la imagen completa. Build correcto y estados cerrado/abierto comprobados en Chromium; captura aperture-desktop.png. Este ajuste sustituye el recorte parcial anterior.

## Ritmo de color y recorridos — ampliación aprobada
Salvia sólido en Cómo trabajamos, marfil en Soluciones y Respaldo, verde pálido en HIDROBAC con un gradiente localizado, bosque en consulta y footer. Logo aprobado intacto sobre superficie clara en footer. Imagen de soluciones pasa bajo el título y su reserva de altura en escritorio baja a 100–158 px; se conserva la apertura entre líneas sin desplazar contenido. Título y flecha responden juntos, sin atenuar otras opciones. Respaldo usa columnas desiguales y separador; fichas técnicas incorporan una superficie salvia. Enlaces relacionados incluyen orientación y el cierre lleva motivo preseleccionado según solución, sin nuevos hechos comerciales.

Validación: build y lint correctos; 13 pruebas pasan, 3 PHP omitidas. Nutrición sin overflow a 320/390/768/1440 px; portada revisada a 1440. Consola sin incidencias recuperadas. Colores computados del cierre: texto #F7F8F3 sobre #163024; se conserva el contraste base medido anteriormente. No se afirma prueba en hardware físico. Se mantiene el alcance GitHub/Vercel; paquete PHP y cambios de dependencias preexistentes excluidos.
