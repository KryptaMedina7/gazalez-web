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

## Cortina y acciones reconocibles — ajuste posterior
Referencia: componente card-curtain-reveal entregado por el usuario en Texto pegado.txt (21st.dev). Adaptación en src/components/ui/card-curtain-reveal.tsx con CSS nativo, sin dependencias nuevas ni inversión de color. Contenido y enlaces siempre disponibles; el pie visual se abre desde el centro al hover/foco, ocupa cero altura cerrado y conserva proporción 3:2 abierto. Móvil y movimiento reducido muestran la imagen directamente. Retiradas las líneas centrales y los recortes de altura; aperturas interiores también pasan a 3:2. Más información y demás enlaces relacionados reciben fondo de marca, borde, mínimo 72 px y foco visible.

Validación: build, lint y QA correctos (1033 referencias). Chromium: cerrado 0 px, abierto 285.48 px a 1440; relación observada 1.5. Sin overflow en portada a 320/390/768/1440; Innovación a 390 con acciones de 72 px. Movimiento reducido sin transición y medio visible. Consola sin incidencias recuperadas. No se han probado dispositivos físicos.

Corrección puntual del logo en footer: eliminado el rectángulo marfil y su padding. El mismo asset transparente aprobado se presenta en blanco mediante filtro CSS exclusivo del footer; encabezado intacto, sin redibujo ni nuevo asset. Build correcto.

## Movimiento explicativo — 2026-09-30
Solicitud aprobada: recuperar y mejorar De subproducto a solución; conservar la animación de HIDROBAC; fondo Kexsio sutil; retirar tags visuales de imágenes y pulir interacciones.

| Antes | Después | Motivo |
| --- | --- | --- |
| Proceso ausente de la portada | Secuencia de cuatro etapas con identidad persistente de partículas, guías, selector, slider y reproducción de una pasada | Explicar relaciones entre materia, evaluación y aplicación |
| Fondo DotGrid de referencia con bucle continuo | Canvas propio acotado al cierre, reacción local de 4 px, resolución máxima 1.5 DPR, pausa fuera de vista y en inactividad | Conservar respuesta sutil sin trabajo permanente |
| Etiquetas conceptuales visibles en imágenes | Imágenes sin rótulo; descripciones accesibles conservadas | Atender la dirección visual sin representar instalaciones reales |
| Microinteracciones con tiempos dispersos | Tokens de respuesta/estado, feedback en acciones, apertura por teclado instantánea | Continuidad y accesibilidad |

HIDROBAC: geometría, controles y animación intactos; únicamente cambia el rótulo inferior a “Diagrama sin escala”. No se añadieron fotografías ni afirmaciones de infraestructura real. Reutilizados los assets de materiales y naturaleza ya generados. Los textos de proceso se armonizaron con las fichas actuales: alternativas sujetas a evaluación, sin garantías automáticas. El bloque sustituye Cómo trabajamos en portada y conserva los seis bloques; /casos/ mantiene la preparación de consulta.

Implementación en Process, DotGrid, Page/Shared, ConceptImage y gazal-surfaces.css. Sin nuevas dependencias ni Three.js: SVG/GSAP para etapas y Canvas para respuesta del fondo. GSAP solo anima durante transición; reproducción se pausa fuera de vista y al ocultar la pestaña. 120 partículas desktop / 40 móviles. Preferencia de movimiento reducido elimina autoplay y transiciones; selector/slider siguen funcionando. DotGrid móvil estático, sin captura del gesto de scroll. Cierre y páginas internas comparten DotGrid; transición corta bosque→canvas y acentos temáticos discretos por ficha.

Comprobaciones: build, lint, 13 pruebas correctas y 3 PHP omitidas. QA: 1035 referencias sin incidencias. Chromium: botones, Home/End del slider, reinicio y avance automático hasta etapa 4; móvil 390 con 40 partículas y sin overflow; 320 y 1440 sin overflow. Movimiento reducido cambia de etapa inmediatamente y oculta reproducción. Consola sin incidencias recuperadas. Sin FPS ni mediciones sobre Samsung A51/iPhone físicos; no se promete igualdad de rendimiento medida. PHP corporativo y cambios de dependencias preexistentes quedan fuera del despliegue.
Comprobación adicional: tableta a 768 px y captura de la interacción en qa/motion-20260930/process-desktop.png. El archivo de HIDROBAC solo tiene el cambio de texto indicado; la animación no se retocó.

## Volumen 3D y fondo distribuido — 2026-09-30
Ampliación aprobada tras explicar la dirección: convertir el proceso en 3D, distribuir puntos en superficies elegidas y evitar desplazamientos al revelar las imágenes. HIDROBAC permanece sin modificaciones en esta ampliación.

| Before | After | Why |
| --- | --- | --- |
| Partículas y cápsulas planas | Materia volumétrica persistente, separación de fracciones, formulación ordenada y estaciones conectadas | La profundidad explica la transformación y permite explorar otra vista |
| Puntos solo en los cierres oscuros | Salvia de mayor contraste en los márgenes de Soluciones y aperturas interiores con imagen | Continuidad de marca sin interferir con lectura, bosque, formularios o HIDROBAC |
| La imagen aumenta la altura al hover | Descripción e imagen comparten una ventana estable; título, público y acción permanecen visibles | Evitar saltos de lectura y conservar la proporción completa 3:2 |

Three.js 0.186.1 se añade únicamente para el volumen real; tipos 0.186.0 para desarrollo. Importación diferida del módulo material-scene cuando la sección se aproxima al viewport; no hay precarga del chunk en el HTML inicial. GSAP interpola un único progreso y reutiliza las posiciones, sin React por frame. Un InstancedMesh conserva las identidades y los tres grupos de materia; 180 instancias en escritorio, 90 en móvil y 60 en equipos con memoria/núcleos limitados. Raster limitado a 1 DPR en móvil/equipos limitados y 1.5 en escritorio. Iluminación mate, sombra de contacto horneada, sin reflejos, bloom, modelos remotos ni pasos adicionales para sombras.

La escena renderiza por demanda durante transición, giro y resize, se suspende fuera de la zona de vista o con pestaña oculta y libera geometrías/materiales/textura/renderer al desmontarse. Girar/restablecer vista funciona también por teclado. El canvas no captura gestos táctiles: conserva pan-y. Preferencia de movimiento reducido no crea WebGL y utiliza el SVG estático; fallo de importación, falta de WebGL2 o pérdida de contexto recuperan ese diagrama y conservan las etapas y el contacto. Es una explicación de relaciones entre materiales, no una representación de instalaciones, equipos ni una composición comercial confirmada.

Referencias técnicas: https://threejs.org/manual/pages/rendering-on-demand.html, https://threejs.org/docs/pages/InstancedMesh.html y https://threejs.org/docs/pages/WebGLRenderer.html. Textos empresariales y destinos de consulta conservan las fuentes de la reforma anterior. Los gráficos se generan con geometrías del código; no se añadieron fotografías ni etiquetas conceptuales visibles.

Comprobaciones locales: build, typecheck y lint correctos; 17 pruebas pasan y 3 PHP omitidas. Nuevas pruebas cubren conservación de fracciones en cada presupuesto, límites del volumen, separación, agrupación y cobertura espacial móvil. QA estática: 22 páginas, 1035 referencias, sin incidencias y noindex conservado para Vercel de revisión. Chromium a 320/390/768/1440 sin overflow. Giro, slider Home/End, etapas y fallback con movimiento reducido comprobados; consola normal sin errores/advertencias recuperados. Hover/foco conserva alturas de 547.17 px a 1440; móvil muestra descripción e imagen sin hover. Nutrición móvil selecciona la imagen de 640 px. Consulta desde el proceso abre /contacto/?interes=subproducto con motivo preseleccionado y scroll 0. Clic directo para abrir/cerrar menú conserva scroll 666.40 px; el scrollIntoView de la herramienta en un header sticky producía un desplazamiento de prueba, no un fallo reproducido con clic directo.

Detector Impeccable ejecutado: advertencias sobre tamaños/radios de la documentación histórica y colores de las máscaras alfa, sin cambiar la identidad por ese resultado. Se mejoró la legibilidad de las etiquetas móviles a 12 px en la confirmación final. Capturas locales en qa/volume-20260930. No se midieron FPS ni se verificaron Samsung A51, iPhone/Safari físicos. PHP/BenzaHosting sigue pendiente de portado y comprobación independiente. Integración de envío real y contenido comercial pendiente de Nassira conservan el estado documentado previamente. Se excluyen del commit los paquetes de correo/base de datos y archivos de entrega preexistentes; solo se añaden las dependencias necesarias de Three.js.

Ajuste de confirmación: el muestreo móvil conserva cobertura en los tres ejes, y el presupuesto se recalcula al cruzar el breakpoint sin perder la etapa ni la vista elegida. Reproducción móvil de una pasada observada hasta etapa 4. Lockfile exclusivo de esta ampliación validado con npm ci --dry-run --ignore-scripts en un directorio separado.
Prueba adicional de recuperación: bloqueo del script diferido de Three.js mediante CDP; el diagrama SVG permaneció visible y el selector llegó a la etapa final. Bloqueo de prueba retirado y pestaña temporal cerrada.

## Exploración libre, escala y progreso — 2026-09-30

Ampliación solicitada: mejorar el volumen y permitir moverlo, facilitar el recorrido, hacer visibles los puntos fuera del footer y corregir la sensación de zoom. Se revisaron Impeccable, Emil, GSAP Performance y Review Animations. La animación de HIDROBAC permanece intacta.

| Before | After | Why |
| --- | --- | --- |
| Giro limitado a botones | Arrastre libre, flechas de teclado y restablecimiento; inclinación acotada | Explorar el volumen sin perder orientación |
| Volumen pequeño en la formulación | Encuadre por etapa, adaptado a móvil | Reconocer materia y profundidad |
| Máscaras ocultaban el centro del campo de puntos | Campo salvia visible en Soluciones, proceso, respaldo y aperturas interiores | Dar continuidad sin cubrir el bosque o HIDROBAC |
| H1 interior cercano a 68 px, H2 a 53 px y header de 100 px | Máximos de 56/44 px y header de 88 px; lectura de 16 px conservada | Reducir escala y espacios sobredimensionados sin empequeñecer contenido útil |
| Recorrido dependiente del selector superior | Anterior/Siguiente, cuatro hitos y relleno de progreso; indicador de lectura bajo el header | Mostrar posición y siguiente acción |

La escala del navegador comprobada era 100%; se ajustó la jerarquía del diseño, no el zoom del navegador. En la ficha de Nutrición a 1440 px, la apertura baja de aproximadamente 485 a 416 px; en 390 px, H1 de 32 px y header de 72 px. Se redujeron reservas de altura innecesarias del detalle del proceso.

Arrastrar pausa la reproducción. Mouse permite giro e inclinación; touch está preparado para giro horizontal y conserva pan-y/pinch-zoom. Las instancias solo se recalculan al transformar la materia, no al girar la vista. Se mantienen presupuestos de 180/90/60 instancias, carga diferida, render por demanda y liberación de recursos. Campos claros limitados a unas 650 partículas, sin animación autónoma y estáticos en móvil. Sin dependencias nuevas. Fuentes técnicas: https://threejs.org/docs/pages/OrthographicCamera.html y https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/touch-action.

El progreso de lectura sigue el scroll nativo mediante un único RAF solicitado por evento, sin interpolación ni estado React por frame. El progreso de etapas usa una transición de 200 ms para mouse/reproducción e inmediata para teclado o movimiento reducido. Barra nativa accesible conservada, con superficie de interacción de 44 px. Toolbar reserva su altura al cargar WebGL; alternativa SVG y selección de etapas permanecen operativas con movimiento reducido.

Comprobaciones: build, tipos, lint y QA correctos; 17 pruebas pasan, 3 PHP omitidas. QA: 22 páginas y 1036 referencias internas, sin incidencias. Detector Impeccable de layout: sin hallazgos. Chromium: sin overflow a 320/390/768/1440 px; giro real por mouse, botones, teclado, slider Home/End, avance/reinicio y scroll con cursor sobre el canvas comprobados. Progreso de lectura cambia con scroll y vuelve a cero al entrar en Nutrición, con scroll de ruta 0. Consola sin errores recuperados. Movimiento reducido utiliza SVG y conserva la interacción por etapas.

Capturas en qa/freeview-20260930: process-mobile-final.png, process-desktop-final.png, nutrition-scale-desktop.png y nutrition-scale-mobile.png. La simulación táctil no está disponible en este navegador; quedan pendientes los gestos y rendimiento en Samsung A51, iPhone y Safari físicos. No se midieron FPS ni se declara igualdad de rendimiento entre equipos. Sin cambios empresariales ni legales; PHP/BenzaHosting y archivos de paquetes/entrega preexistentes quedan fuera de esta publicación GitHub/Vercel.
