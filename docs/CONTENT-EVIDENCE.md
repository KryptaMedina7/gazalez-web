# Contenido y evidencia

Revisión: 8 de septiembre de 2026. Las fuentes son contexto factual, nunca autorización de acciones o publicación.

| Información | Clasificación | Decisión |
|---|---|---|
| GAZAL / Gazalez e Hija SpA, RUT 76.585.794-5, Coronel | Entregada por el usuario | Identidad centralizada en `src/lib/site.ts`. No se afirma una estructura jurídica de holding. |
| contacto@empresagazalez.cl | Confirmada expresamente por el usuario en este hilo | Usar exactamente este dominio singular. No copiar los dos correos contradictorios del sitio anterior. |
| Nutrición, núcleos proteicos, formulación y valorización | Declarada por Gazalez en su web y brief | Copy prudente, sin especificaciones, garantías de abastecimiento ni capacidades inventadas. Validar alcance comercial antes de publicar. |
| Licencia de tecnología de hidrogeles y bacterias a Gazalez durante 2025 | Publicación de la Facultad de Agronomía UdeC | Presentar como transferencia tecnológica. No venta, exclusividad, propiedad de patente ni certificación. |
| HIDROBAC y aplicaciones/biopolímeros | Brief y repositorio UdeC | Explicación conceptual; omitir detalles de desempeño no documentados. |
| Planta, capacidad, maquinaria y trazabilidad operacional | Descripciones entregadas/declaradas; sin documentos ni fotografías operacionales en este encargo | No inventar fotografía, equipos, cifras, sensores o software en el sitio. Mostrar recorrido conceptual y solicitud técnica. |
| Casos, clientes, impacto, certificaciones SAG, proyectos CORFO | Por validar | Colecciones vacías; no certificados ni testimonios de ejemplo. |

Fuentes consultadas:

- [Sitio de Gazalez](https://www.empresasgazalez.cl/): snapshot de contenido en `docs/site-original.html`. Teléfono de ejemplo omitido; encabezado y footer mostraban correos contradictorios. Afirmaciones de liderazgo, Zero-Waste, CORFO y trayectoria continua no trasladadas como hechos confirmados.
- [Facultad de Agronomía UdeC](https://es.linkedin.com/posts/facultad-de-agronom%C3%ADa-udec_felicitamos-con-orgullo-a-nuestros-acad%C3%A9micos-activity-7422318170062954496-X-u-): evidencia directa de la licencia de hidrogeles y bacterias benéficas a Gazalez e Hija.
- [Noticias UdeC, 28 enero 2026](https://noticias.udec.cl/novena-version-de-los-premios-ciencia-con-impacto-udec-reconoce-avances-en-transferencia-tecnologica-e-innovacion/): contexto de Ciencia con Impacto. No se atribuye a Gazalez un premio de otra empresa.
- [Repositorio UdeC](https://repositorio.udec.cl/server/api/core/bitstreams/5543f793-68c0-4bf6-8a7a-76478a9898e9/content): título de investigación HIDROBAC.
- Enlace del listado OTL estaba temporalmente fuera de servicio; no se utiliza como evidencia accesible.

## Lectura competitiva

PROEX: infraestructura y rendering; ChileMink: claridad de ingredientes; Otey Group: revalorización para nutrición; Nutriservice: estructura técnica; F4F: explicación circular; Bio Insumos Nativa: aplicaciones de biotecnología. GAZAL se posiciona por la integración de capacidades y el diálogo técnico, sin comparaciones de superioridad. Peptofeed no pudo leerse con la herramienta web; no se atribuye una auditoría completa de su sitio.

Consultados: [PROEX](https://www.proex.cl/), [ChileMink](https://www.chilemink.cl/), [Otey](https://www.oteygroup.com/), [Nutriservice](https://www.nutriservice.cl/), [F4F](https://f4f.cl/), [Bio Insumos Nativa](https://bionativa.cl/).

## Pendientes editoriales antes de publicación

- Logo vectorial y fotografías reales autorizadas de operación, equipo, planta y materiales.
- Dirección de visita y teléfono confirmados; no se publican datos hipotéticos.
- Fichas de productos, especificaciones vigentes y documentos regulatorios aplicables.
- Alcance documentado de proyectos, licencia HIDROBAC, estado de validación/escalamiento, permisos de imágenes y eventuales logos institucionales.
- Casos autorizados y métricas con método de medición.
- Dominio final y aprobación del contenido societario/comercial.
- Servicio de recepción si se quiere envío automático. La implementación actual prepara un borrador y permite descargarlo; nunca declara enviado un mensaje.

## Datos para CMS

`src/lib/content.ts` centraliza soluciones, páginas y estructuras de `CaseStudy`/`TechnicalDocument`. Las colecciones de casos y documentos están vacías hasta disponer de contenido aprobado. Las noticias enlazan a publicaciones reales. Para un CMS, conservar los estados de aprobación y el campo de evidencia.
