# Videos de sección, navegación y revisión de páginas internas

## Implementado

- Nutrición animal: gallina acercándose al comedero.
- Núcleos proteicos avícolas: gránulos cayendo a una bandeja.
- Innovación: ADN detrás de GAZAL. Esta ubicación es una decisión editorial; Nassira no había fijado explícitamente un destino para el tercer video.
- Referencia: mensaje de Nassira aportado en la conversación, «alimentación animal», «parte avícola» y «núcleos proteico». Los tres archivos fueron entregados por el usuario el 3 de octubre. Son piezas de marca, no evidencia de instalaciones, composición ni productos disponibles.
- VP9 WebM, alternativas H.264 MP4, sin audio, 1280×720 y 640×360. Los móviles WebM pesan 107–192 KB. Imágenes fijas extraídas de los propios videos. Conversión reproducible con `scripts/encode-section-videos.mjs <directorio de originales>`; hashes, procedencia y pesos en `docs/assets/2026-10-03-section-videos.json`.
- Un video por página, encuadre completo 16:9, reproducción única al estar visible, pausa fuera de pantalla, controles reproducir/pausar/repetir. Espera a que termine la bienvenida; nunca bloquea contenido. Movimiento reducido y ahorro de datos impiden la descarga automática. Ausencia de soporte VP9 selecciona MP4. Una falla conserva la página accesible.
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

## Comprobaciones y límites

- Build, tipos y lint correctos. 27 pruebas pasan; 3 pruebas PHP omitidas. Nueva prueba de pertenencia de rutas al menú, incluidas rutas duplicadas y fichas secundarias.
- QA estático: 22 páginas, 1080 referencias internas, cero incidencias.
- Detector Impeccable: cero hallazgos en la ruta y los dos componentes nuevos/modificados inspeccionados. No acredita calidad visual por sí mismo.
- Revisión visual Chromium a 1440, 768, 390 y 320 px. Reproducción de los tres WebM, encuadre, pausa/repetición, selección móvil y alternativa de movimiento reducido comprobados. Capturas locales en `qa/section-videos-20261003/`.
- Auditoría de páginas internas en escritorio: Empresa, Sostenibilidad, Transferencia y Formulación. Evaluaciones aisladas; no se inyectó overlay porque el navegador ofrece evaluación DOM de solo lectura. No se inició servidor auxiliar de Impeccable. Pestañas de revisión cerradas al concluir.
- Sin pruebas en teléfonos físicos ni Safari real. El paquete PHP/BenzaHosting y los cambios previos de dependencias quedan fuera de esta entrega.
- Actualización de Impeccable solicitada: `npx impeccable update` finalizó sin reconocer una instalación. La skill existente no fue sustituida.
