# Videos de sección, navegación y revisión de páginas internas

## Implementado

- Nutrición animal: gallina acercándose al comedero.
- Núcleos proteicos avícolas: gránulos cayendo a una bandeja.
- Innovación: ADN detrás de GAZAL. Esta ubicación es una decisión editorial; Nassira no había fijado explícitamente un destino para el tercer video.
- Referencia: mensaje de Nassira aportado en la conversación, «alimentación animal», «parte avícola» y «núcleos proteico». Los tres archivos fueron entregados por el usuario el 3 de octubre. Son piezas de marca, no evidencia de instalaciones, composición ni productos disponibles.
- VP9 WebM y alternativas H.264 MP4, sin audio. Escritorio: 1280×720. Móvil: adaptación vertical 720×1280, con recorte específico de cada acción sobre una extensión desenfocada del video; no estira el logo ni genera metraje nuevo. Los móviles WebM pesan 171–276 KB y los MP4 189–307 KB. El desenfoque está codificado en el archivo, sin filtros en vivo. Posters propios para cada formato; orientación vertical selecciona móvil y horizontal selecciona escritorio al entrar. En pantallas más altas que 9:16, el poster completa el fondo mientras el video conserva su encuadre. Conversión reproducible con `scripts/encode-section-videos.mjs <directorio de originales>`; hashes, procedencia y pesos en `docs/assets/2026-10-03-section-videos.json`.
- Corrección de alcance del usuario: los videos son introducciones a las rutas, no reproductores dentro del contenido. Se muestran en un diálogo de pantalla completa una vez por sección/sesión. Sustituyen la bienvenida genérica en esas tres rutas. Usan encuadre horizontal o adaptación vertical según la orientación del dispositivo; Omitir y entrar y Escape disponibles desde el inicio. El final del clip da paso al contenido con un desvanecimiento de 220 ms. Error, autoplay rechazado, pestaña oculta o inicio lento liberan la página; 2.5 s de espera máxima para arrancar y 6.5 s de límite total, sin duración mínima. Movimiento reducido y ahorro de datos omiten la apertura sin cargar el video. Sin soporte VP9 se selecciona MP4. El diálogo nativo gestiona foco e inertness; el scroll se restaura al cerrar/desmontar. Las ilustraciones propias vuelven a las cabeceras.
- Innovación tiene una sola sección primaria activa aunque su enlace también figure en Soluciones. Bioprocesos pertenece a Innovación; las fichas avícolas a Soluciones. Abrir un grupo secundario usa un verde más suave. Rutas, atajos y menús conservados.
- Breadcrumbs de Transferencia y Proyectos usan nombres de destino en vez de titulares editoriales.

## Revisión independiente de identidad interior — propuesta, no rediseño aplicado

Dos evaluaciones independientes de Impeccable: diseño y evidencia mecánica/navegador. Ambas coinciden: la identidad de marca es coherente; lo repetitivo es la composición, no la cantidad de colores. Las soluciones repiten apertura, franja de audiencia, tres filas técnicas, nota y FAQ. Empresa, Sostenibilidad, Transferencia y Proyectos repiten tres bandas editoriales. Los videos diferencian las aperturas, pero no resuelven por sí solos la estructura del cuerpo.

| Prioridad | Página | Cambio propuesto | Información que se conserva |
| --- | --- | --- | --- |
| P2 | Formulación técnica | Ficha visual breve de preparación de consulta, sin otro formulario obligatorio | Especie, etapa, objetivo, materias primas y análisis existentes |
| P2 | Valorización industrial | Recorrido del material: origen, antecedentes y alternativas; evitar una gran columna vacía | Origen, ubicación, volumen, frecuencia, composición; evaluación caso a caso |
| P2 | Bioprocesos | Mapa compacto biomasa → desafío → alcance de colaboración | Carácter de desarrollo; sin prometer escalamiento ni disponibilidad |
| P2 | Sostenibilidad | Mostrar recuperación y aplicación como posibilidades; separar qué hace falta para medir | Cantidades, proceso, destino y comparación; sin indicadores ficticios |
| P2 | Transferencia y proyectos | Poner la licencia documentada de HIDROBAC/UdeC y su fuente cerca de la apertura; separar proyectos existentes de nuevas consultas | Diferenciar autoría, licencia y evaluación de aplicación |
| P2 | Empresa | Acercar las declaraciones de directores a la introducción y reunir capacidades después | Citas, cargos e identidad legal intactos |

Fortalezas: acciones específicas, continuidad verde/tipográfica y límites comerciales claros. El valle de atención está entre apertura y contacto, por la sucesión de filas de igual peso. Heurísticas de la revisión A: 22/32 en ocho criterios aplicables (eficiencia avanzada y recuperación de formularios fuera de alcance); es juicio de revisión, no certificación. No se necesita otra librería ni animar cada bloque.

## Interacciones didácticas propuestas tras la aclaración

No implementadas todavía. Mantener una pieza principal por página, compacta, disponible por clic/toque/teclado; el texto esencial permanece visible y movimiento reducido muestra los mismos estados sin transición. Usar SVG, CSS y GSAP existentes, sin WebGL adicional ni reproducción continua.

| Subpágina | Pieza e interacción propuesta | Qué permite comprender |
| --- | --- | --- |
| Nutrición animal | Escena avícola con tres puntos seleccionables: aplicación, etapa y dieta; un trazo breve conecta el punto con su explicación | Qué considera la consulta nutricional, sin sugerir dietas ni resultados automáticos |
| Núcleos proteicos | Diagrama de incorporación a una dieta completa; al seleccionar materia prima, requerimiento o documentación se destaca su relación | El aporte se evalúa dentro de una dieta, no se publica una proporción universal |
| Formulación | Mesa de antecedentes: especie, etapa, objetivo, materias primas y análisis; cada selección muestra por qué se solicita | Preparar la conversación; no calcula fórmulas ni guarda datos |
| Valorización | Recorrido SVG controlado por pasos: origen, caracterización, evaluación de alternativa; la muestra se reorganiza al cambiar etapa | Evaluación de posibilidades, no promesa de aceptación o proceso único |
| Bioprocesos | Mapa de relaciones entre biomasa, pregunta de desarrollo y colaboración; selección ilumina solo las conexiones relevantes | La línea está en desarrollo y necesita definir alcance |
| Sostenibilidad | Diagrama de recuperación/aplicación condicional, más panel de antecedentes para medir | Diferencia entre oportunidad y resultado medido, sin contadores inventados |
| Transferencia/proyectos | Recorrido de investigación, licencia y evaluación; el vínculo HIDROBAC/UdeC abre su evidencia | Una licencia no demuestra validación comercial; no marcar etapas no confirmadas como completadas |
| Empresa | Composición editorial de personas y actividad; revelar capacidades relacionadas al seleccionar cada ámbito | Quiénes son y qué conectan; citas y cargos sin reescritura |

Priorizar Formulación, Valorización y Transferencia: tienen tareas y diferencias claras que la interacción puede explicar. HIDROBAC, calidad y directorio de soluciones conservan los módulos aprobados. Las FAQs mantienen sus acordeones y la información de contacto sigue directa.

## Comprobaciones y límites

- Build, tipos y lint correctos. 28 pruebas pasan; 3 pruebas PHP omitidas. Pruebas de pertenencia de rutas al menú y asignación de las tres introducciones.
- QA estático: 22 páginas, 1077 referencias internas, cero incidencias.
- Detector Impeccable: cero hallazgos en la ruta y los dos componentes nuevos/modificados inspeccionados. No acredita calidad visual por sí mismo.
- Primera integración: revisión Chromium a 1440, 768, 390 y 320 px, capturas históricas en `qa/section-videos-20261003/`. Tras la corrección a introducciones: revisión a 1440 y 390 px, fin automático, botón Omitir, Escape, foco al contenido, scroll en cero tras navegación, no repetición por sesión y movimiento reducido sin src de video. Error de recurso simulado: salida automática y contenido utilizable. Capturas actuales en `qa/section-intros-20261003/`. No se declara prueba exhaustiva de navegadores.
- Auditoría de páginas internas en escritorio: Empresa, Sostenibilidad, Transferencia y Formulación. Evaluaciones aisladas; no se inyectó overlay porque el navegador ofrece evaluación DOM de solo lectura. No se inició servidor auxiliar de Impeccable. Pestañas de revisión cerradas al concluir.
- Sin pruebas en teléfonos físicos ni Safari real. El paquete PHP/BenzaHosting y los cambios previos de dependencias quedan fuera de esta entrega.
- Adaptación vertical: ffprobe confirma 720×1280, cuatro segundos y una única pista de video en los seis archivos móviles (VP9 y H.264). Inspección de los cuatro segundos de cada escena y navegador Chromium emulado a 320×740, 360×800 y 390×844; logos y acciones conservados, controles utilizables, cierre libera scroll, sin overflow. Capturas en `qa/portrait-intros/`. Se conserva la versión horizontal de escritorio.
- Actualización de Impeccable solicitada: `npx impeccable update` finalizó sin reconocer una instalación. La skill existente no fue sustituida.
