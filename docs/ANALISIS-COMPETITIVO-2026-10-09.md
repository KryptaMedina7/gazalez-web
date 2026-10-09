# GAZAL: referencias comerciales e interacción didáctica

Fecha: 9 de octubre de 2026. Análisis y propuestas; no implementa ni publica cambios al sitio.

## Conclusión

Conservar ADN, HIDROBAC, identidad, videos y arquitectura editorial aprobados. La siguiente mejora debe conectar la personalidad visual con una oferta verificable, documentación accesible y un contacto más directo. Una web puede ayudar a captar y convertir consultas; esta revisión no determina posiciones de mercado ni garantiza liderazgo comercial.

## Referencias inspeccionadas

- [Nutripec, portada](https://nutripec.cl/): contenidos públicos de abastecimiento, logística, asesoría, públicos atendidos y contacto. Sus afirmaciones son declaraciones de la empresa, no capacidades auditadas aquí.
- [Nutripec, productos](https://nutripec.cl/productos/): revisión visual y enlaces del DOM; materias primas identificadas, características, observaciones, cotización por WhatsApp y fichas PDF. Tres enlaces rotulados «Ficha técnica» no tenían destino en el DOM observado: Prime, Subprime y alimento de salmón. No se verificó el contenido de cada PDF ni se enviaron consultas.
- [Bühler, alimentación animal](https://www.buhlergroup.com/global/es/industries/Animal-feed.html).
- [Bühler, premezclas y concentrados](https://www.buhlergroup.com/global/es/industries/Animal-feed/Premix-Concentrates.html): inspección en navegador y apertura de Mezcla en su cadena de proceso. Cada etapa relaciona explicación, imagen y tecnología pertinente.
- [Bühler, alimento balanceado](https://www.buhlergroup.com/global/es/industries/Animal-feed/Mixed-Feed.html).
- [Bühler, legumbres](https://www.buhlergroup.com/global/es/industries/Pulses/Beans.html): lectura de aplicaciones, procesos y descargas.
- [Bühler, biorrefinería](https://www.buhlergroup.com/global/en/industries/Biorefinery.html): presentación del aprovechamiento de componentes y corrientes secundarias, acompañada de un caso identificado. Se usa como referencia editorial, no como oferta atribuible a GAZAL.
- [HIDROBAC oficial](https://www.empresasgazalez.cl/innovacion/hidrobac/): interacción en Agua y Raíz; inspección del SVG y los controles.
- [Núcleos proteicos, GAZAL Vercel](https://gazalez-web.vercel.app/soluciones/nucleos-proteicos/): introducción y contenido actual; contrastado con el repositorio.

Los errores iniciales de extracción de algunas páginas se resolvieron mediante navegador. No se consideran fallas públicas de esos sitios. Las referencias de buscador pueden tener una fecha de rastreo anterior.

## Qué aprender y qué mejorar

### Nutripec

Su fortaleza comunicacional es la concreción: el comprador identifica una materia prima, consulta su descripción y encuentra cómo cotizarla. GAZAL organiza bien sus áreas, pero las especificaciones y condiciones de sus soluciones se remiten en gran medida a una conversación posterior. Eso protege frente a afirmaciones no confirmadas, aunque deja trabajo al comprador que busca evaluar proveedores.

Propuesta: presentar las familias efectivamente comercializadas por GAZAL, con nombre preciso, aplicación confirmada, fotografía propia cuando exista, documentación vigente y acción específica. Empezar con pocas fichas completas. No copiar el catálogo, composiciones, garantías, especies o disponibilidad de Nutripec. Una descarga debe existir; si se entrega bajo consulta, el botón debe decirlo.

### Bühler

La referencia útil es el recorrido de decisión: aplicación → materia prima → etapa → solución → evidencia/contacto. Su cadena interactiva revela información contextual en lugar de acumular texto. Las páginas de legumbres y biorrefinería también conectan materiales con usos y documentación.

Para GAZAL: un recorrido corto por necesidad, enlaces contextuales a fichas y un caso documentado cuando esté disponible. No trasladar su catálogo de maquinaria, ingeniería de plantas, automatización, capacidades ni servicios globales. Tampoco copiar una interfaz extensa de diez etapas en móvil.

## HIDROBAC: mecanismo observado

El explorador público contiene un SVG con viewBox 0 0 900 600; no contiene canvas ni video dentro de ese módulo. El componente local `src/components/ui/hydrobac-lab.jsx` está documentado como restaurado del sitio oficial y montado en la ruta HIDROBAC.

Su apariencia volumétrica utiliza elipses, transparencias, gradientes, superposición y cambios de escala/posición. En la implementación local, un progreso normalizado entre 0 y 1 gobierna todas las partes mediante interpolación y ventanas de avance. La reproducción completa dura 14 segundos; se puede detener o saltar a Sistema, Matriz, Agua, Bacterias, Raíz y Evidencia. Las zonas interactivas abren explicaciones.

Lo eficaz es la continuidad: se sigue reconociendo el mismo sistema mientras se descompone, recibe elementos y cambia de escala hacia la raíz. La interacción explica relaciones. Ese lenguaje puede reutilizarse sin convertir todas las páginas en copias de HIDROBAC.

Para un módulo nuevo usaría SVG con una timeline GSAP detenida/controlada por progreso. Una única fuente de progreso para barra, escena y etiquetas; animación solo durante cambios o reproducción solicitada; pausa fuera de pantalla y al ocultar la pestaña. En móvil, controles táctiles y etiquetas fuera de la ilustración; teclado y movimiento reducido deben conservar todos los estados. No hace falta otra dependencia ni otro motor 3D.

## Propuesta prioritaria: Núcleos proteicos

Nombre provisional: «Un aporte dentro de una dieta completa», conservando el mensaje actual.

1. Vista conjunta: bandejas de muestras ilustradas y contexto avícola discreto, sin representar instalaciones reales.
2. Materia prima: las muestras se separan suavemente y se destacan composición y antecedentes disponibles. Las categorías concretas requieren validación del equipo.
3. Requerimiento: la escena conecta las muestras con especie, etapa y objetivo. No calcula necesidades ni recomienda una dosis.
4. Dieta completa: los elementos se reúnen visualmente para mostrar que la evaluación considera el conjunto, sin atribuir proporciones físicas reales a la ilustración.
5. Documentación y consulta: el visitante puede solicitar la ficha aplicable y abrir Contacto con el motivo permitido preseleccionado.

Controles: Anterior/Siguiente, barra arrastrable, acceso directo a etapas y reproducción opcional. En pantallas pequeñas, escena compacta seguida de explicación; sin desplazamiento horizontal obligatorio ni hover exclusivo. Sustituye el diagrama actual en su espacio, no suma otro gran bloque al final.

## Otras interacciones, en orden

| Before | After | Why |
| --- | --- | --- |
| Núcleos: selector de relaciones y explicación textual | Escena continua de muestras, requerimiento y dieta; mismo contenido respaldado | Prioridad 1: relación directa entre comprensión técnica y consulta comercial |
| Valorización: muestras SVG que se reorganizan entre tres estados | Muestra que se abre a antecedentes y alternativas condicionadas; ramificaciones legibles | Prioridad 2: explicar por qué cada subproducto exige evaluación, sin prometer un proceso universal |
| Calidad: información sobre documentación y trazabilidad | Recorrido por documento, identificación y aplicación, basado en documentos publicables | Prioridad 3: hacer tangible el respaldo; depende de evidencia autorizada |

No modificaría ahora HIDROBAC, el ADN ni sus videos. Evitaría una nueva introducción obligatoria para cada ruta, un simulador de formulación sin respaldo y animaciones que sustituyan la información esencial.

## Prioridades comerciales adicionales

1. Catálogo acotado y verificable: productos/familias, aplicaciones y fichas vigentes aprobadas por Nassira. Reutilizar rutas existentes cuando correspondan.
2. Evidencia cercana a la oferta: fotos reales autorizadas, documentos y un caso con desafío, intervención, alcance y resultados solo si están medidos. Conservar la diferencia entre licencia HIDROBAC, validación y comercialización.
3. Contacto: el código actual utiliza preparación de correo (`enquiry-form.tsx` y `lib/enquiry.mjs`), no envío servidor. Un envío real reduciría pasos, pero necesita integración y configuración; un WhatsApp comercial requiere número confirmado. No simular recepción ni prometer tiempos de respuesta desconocidos.
4. Contenido que responda preguntas de compra: cómo solicitar una ficha, qué antecedentes entregar, qué se evalúa en una materia prima. Aprovechar las rutas de nutrición, núcleos y formulación antes de crear páginas redundantes.
5. Medición: si se decide habilitar analítica, registrar consultas iniciadas y entregadas por canal, descargas y uso del explorador; no datos personales. No hay métricas de conversión auditadas en esta revisión.

## Datos que requieren confirmación antes de publicar

- Familias comercializadas, nombres técnicos y aplicaciones admitidas.
- Fichas aprobadas, vigencia, especificaciones, presentaciones y condiciones que se puedan hacer públicas.
- Fotografías y casos autorizados; documentación y prácticas de calidad publicables.
- Canal comercial y funcionamiento de recepción de consultas.

## Alcance de la comprobación

Revisión de contenidos públicos, navegación de escritorio e interacciones indicadas, más lectura del código local. No es auditoría exhaustiva de accesibilidad, SEO, todos los enlaces, rendimiento, teléfonos físicos ni conversión comercial. No se ejecutaron builds porque no se modificó la aplicación. No se enviaron formularios, correos ni mensajes. No se hizo commit, push ni despliegue.
