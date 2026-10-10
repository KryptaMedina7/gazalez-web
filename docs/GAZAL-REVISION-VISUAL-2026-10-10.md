# Revisión de páginas y movimiento — 10 de octubre de 2026

## Alcance y criterio

Revisión de las 20 rutas españolas del sitio exportado, servido en localhost:3000, a 1440 × 1000 y 360 × 800. Comprobación adicional de Innovación a 768 × 1000. Se revisaron estructura, imágenes cargadas, desbordamientos, iconos y controles de los módulos. Se mantuvieron contenidos comerciales, rutas, identidad y escenas aprobadas.

Se aplicaron los criterios de review-animations, find-animation-opportunities y Emil: corregir primero, conservar la respuesta inmediata con teclado y proponer movimiento únicamente cuando explique una relación o un cambio de estado. Las propuestas de abajo NO están implementadas.

## Correcciones realizadas

| Prioridad | Antes | Después | Motivo y ubicación |
| --- | --- | --- | --- |
| Alta | Flechas y matraz fragmentados en Bioprocesos. Los nueve trazos Lucide heredaban `stroke-dasharray: 5 6`. | Los iconos tienen trazo continuo; las conexiones conservan su diseño. | El selector alcanzaba todos los SVG descendientes. Ahora apunta al SVG del diagrama: `src/app/section-explorers.css:311`. Se acotó también el selector equivalente de Sostenibilidad para prevenir contaminación de iconos. |
| Media | Preguntas frecuentes ocultaba el marcador nativo sin ofrecer sustituto visual. | Indicador visible de apertura/cierre, sin encogerse en móvil. | `src/components/company-faq.tsx:56`, `src/app/globals.css:4357`. Se conserva `<details>` y su operación nativa con teclado. |
| Media | Núcleos proteicos cambiaba la escena inmediatamente con teclado, pero el texto seguía desplazándose y desvaneciéndose. | Texto y escena responden juntos sin transición con teclado o movimiento reducido. | `src/components/ui/material-lab.tsx:144`. Se limpian transformaciones residuales cuando se interrumpe una transición. |
| Media | Valorización animaba el panel incluso en la primera carga y al seleccionar con teclado. | Primera carga y teclado inmediatos; la selección con puntero conserva las transiciones existentes. | `src/components/ui/recovery-pathways.tsx:69`. Sin dependencias nuevas ni temporizadores añadidos. |

Veredicto de las correcciones: resuelven fallos concretos de legibilidad y coherencia de interacción. No implican una certificación de todas las animaciones ni de rendimiento en dispositivos físicos.

## Páginas recorridas

| Grupo | Rutas | Resultado del recorrido |
| --- | --- | --- |
| Portada y selección | `/`, `/soluciones/` | Sin desbordamiento horizontal ni imágenes cargadas rotas detectados. Se conserva ADN, proceso e HIDROBAC. |
| Soluciones | `/soluciones/nutricion-animal/`, `/soluciones/nucleos-proteicos/`, `/soluciones/formulacion-tecnica/`, `/soluciones/valorizacion-industrial/`, `/soluciones/bioprocesos/` | Mismos controles de layout; correcciones de Bioprocesos y respuesta con teclado indicadas arriba. |
| Innovación | `/innovacion/`, `/innovacion/hidrobac/`, `/innovacion/transferencia-tecnologica/`, `/innovacion/proyectos/` | Sin desbordamiento ni imágenes cargadas rotas detectados. HIDROBAC se conserva. |
| Empresa y contexto | `/empresa/`, `/calidad-trazabilidad/`, `/sostenibilidad/`, `/casos/`, `/actualidad/` | Sin incidencias de layout detectadas en los tamaños revisados. |
| Consulta y legales | `/contacto/`, `/preguntas-frecuentes/`, `/privacidad/`, `/terminos/` | Preparador de correo probado sin envío. Indicadores de preguntas frecuentes corregidos. |

Cada ruta tenía un H1 en los dos tamaños. Esto no equivale a una auditoría editorial exhaustiva ni a revisar cada combinación posible de contenido/estado.

## Oportunidades de movimiento, por orden de utilidad

| Prioridad | Lugar y desencadenante | Propósito y frecuencia | Receta propuesta | Accesibilidad y límite |
| --- | --- | --- | --- | --- |
| 1 | Bioprocesos: seleccionar Biomasa, Desafío o Colaboración. `RelationshipMap`, `src/components/ui/solution-explorers.tsx:226`. | Vincular visualmente el botón elegido con el centro y su explicación. Interacción ocasional, no continua. | Transición de opacidad de la conexión seleccionada y énfasis del nodo durante 220 ms, `var(--ease-out)`. Mantener la geometría y el texto legibles; sin partículas ni bucles. | Teclado y `prefers-reduced-motion`: estado final inmediato. No representar una secuencia de producción: son relaciones de desarrollo. |
| 2 | Calidad: seleccionar un tipo de antecedente. `QualityDocuments`, `src/components/ui/quality-documents.tsx:40`. | Dar continuidad al cambio de ficha, actualmente instantáneo. Interacción ocasional. | Entrada del contenido con opacidad 0.65 → 1 y desplazamiento vertical 4 → 0 px durante 180–220 ms; easing de salida existente. El marco permanece estable. | Teclado y movimiento reducido: sin desplazamiento. No retrasar el acceso ni ocultar la ficha mientras carga. |

La mejora adicional de Formulación debería ser de layout antes que de animación: el alto del panel móvil varió entre aproximadamente 355 y 440 px según el antecedente. Revisar el equilibrio entre estabilidad y espacio vacío antes de fijar alturas; no añadir un contenedor grande por defecto.

## Candidatos descartados

- Otra escena grande en Innovación/Proyectos: competiría con HIDROBAC y repetiría explicaciones ya cubiertas por sus selectores.
- Más partículas, fondos en movimiento o entradas al hacer scroll: sumarían estímulos sin aclarar la oferta.
- Animación ornamental en Contacto, Privacidad o Términos: interfiere con tareas de lectura y preparación de consulta.
- Rediseñar ADN, HIDROBAC, el proceso de portada o el footer: no se justifica por los defectos encontrados en esta revisión. Su coste de renderizado requeriría una medición propia antes de prometer mejoras de fluidez.

Veredicto: el sitio no necesita más macroanimaciones. Priorizar las dos mejoras pequeñas anteriores y la estabilidad del contenido; preservar los puntos de mayor protagonismo existentes.

## Comprobaciones

- `npm run build`: correcto, incluida comprobación TypeScript y generación de 64 entradas de compilación.
- `npm run lint`: correcto, sin diagnósticos.
- `npm run typecheck`: correcto, sin errores.
- `npm test`: 38 pruebas; 35 aprobadas, 3 omitidas (PHP), 0 fallidas.
- `npm run qa`: 62 páginas, 4.228 referencias internas, `issues: []`, preview con noindex.
- Navegador: las 20 rutas a 1440 y 360 px; Innovación también a 768 px. No se detectaron desbordamientos del contenido principal ni imágenes cargadas rotas en ese recorrido.
- Selección por teclado: Formulación (cinco opciones), Bioprocesos, Calidad, Transferencia, Proyectos, Empresa, Nutrición animal y Valorización (etapas y tres alternativas). El contenido cambió según la selección en los paneles revisados.
- Núcleos: etapa Documentación por teclado; panel con opacidad 1 y sin transform residual. Con movimiento reducido emulado y selección por puntero, Requerimiento llegó a 100/300 y el texto permaneció estático.
- Preguntas frecuentes: apertura por Enter, seis indicadores presentes, sin desbordamiento a 360 px.
- HIDROBAC: reproducción y acceso a explicación Agua. No se modifica su escena.
- Contacto: datos ficticios locales, motivo preseleccionado por URL, preparación de resumen y foco en el resultado. Mensaje real: «Aún no se ha enviado». No se abrió el cliente de correo ni se enviaron mensajes.
- Consola capturada del tab de auditoría: sin entradas error/warn al consultar el registro.

## Evidencia y limitaciones

Evidencia local en `qa/route-audit-20261010/` (carpeta de QA ignorada por Git): inventarios `desktop-before.json` y `mobile-before.json`, capturas por ruta, `module-checks.json`, `bioprocesos-corregido-1440.png` y `preguntas-corregido-360.png`.

Las capturas completas pueden mostrar la cabecera fija en mitad de la imagen al tomarse después de desplazar la página; se guardaron capturas de viewport para las correcciones. Los recursos diferidos del footer pueden no aparecer hasta entrar en su zona.

No se midieron FPS, Lighthouse ni rendimiento en A51/iPhone físicos. No se hizo una revisión visual completa independiente de las traducciones inglesa y portuguesa; sus páginas entraron en build y comprobación de referencias. No se regeneró ni desplegó el paquete PHP. No se alteraron los cambios previos de dependencias ni los archivos de releases existentes.

## Ajuste posterior: destinos principales de la topbar

Los nombres Soluciones, Innovación y Empresa ahora son enlaces nativos a su página principal. La flecha contigua conserva un botón independiente para desplegar; el hover sobre el grupo sigue abriendo el panel. Flecha abajo desde el nombre abre el submenú y enfoca su primer enlace; Escape devuelve el foco al botón sin desplazar la página. No cambia el menú móvil.

Comprobación local: clic en los tres nombres confirmó `/soluciones/`, `/empresa/` e `/innovacion/`; botón de despliegue, Escape y flecha abajo operativos. Build y lint del componente correctos. QA actualizado: 62 páginas, 4.408 referencias internas y cero incidencias.
