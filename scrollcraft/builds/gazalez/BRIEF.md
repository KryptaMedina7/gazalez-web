# Gazalez: materia con profundidad

Refinamiento basado en el brief y activos ya entregados. Decisiones de composición propuestas por el implementador dentro del encargo «ve como se puede mejorar la pagina en general». No se realizó una entrevista nueva ni se inventan respuestas del usuario.

## Ocho decisiones

1. Tono: industrial, sereno, científico, inmersivo. Evidencia: identidad y contenido actuales; verdes claros preferidos por el usuario, negro y dorado sutil autorizados posteriormente.
2. Recorrido: conservar portada, introducción, proceso, soluciones, investigación, trazabilidad, voces, preguntas, contacto e instituciones.
3. Energía: entrada legible; pico en la transformación; descanso editorial; interacción explicativa; cierre estable.
4. Recuerdo: la materia dispersa encuentra una nueva estructura. El usuario solicita «inmersividad y capas con animaciones» sin perder calidad móvil.
5. Gesto propio: atravesar planos de materia hasta reunir una cinta ordenada. Es una visualización conceptual, no una simulación física ni una imagen de instalaciones.
6. Rango: ampliar el mundo editorial existente, preservando logo, tipografías, paleta, datos y navegación.
7. Escenas distintas. Una escena breve fijada en la portada; el resto conserva scroll natural y controles accesibles. No se añade un viaje continuo ni un segundo motor de scroll.
8. Activos: símbolo original Gazalez, logo holding, instituciones y diagramas existentes. Se autoran planos geométricos en código; no se necesita generar fotografía ni usar Kie.

## Curva y pico, antes del score

Reconocimiento: texto y propuesta industrial legibles en la entrada.
Asombro: capas próximas cruzan frente a la materia que se organiza. Es el único pico.
Comprensión: introducción quieta y proceso por etapas.
Elección: enlaces directos a soluciones, sin coreografía que retrase la navegación.
Curiosidad: explorador HIDROBAC, con selección de componentes.
Confianza: conexiones de trazabilidad y voces verificadas.
Decisión: contacto estable y destinos claros.

«Es el sitio donde la materia dispersa se convierte en una nueva estructura mientras te acercas».
Silencio intencional: introducción, párrafos, voces y cierre se leen en flujo, sin scroll vacío reservado.

## Gramática y score

Se preserva una gramática propia de catálogo industrial: menú multinivel, portada conceptual, explicación por pasos, directorio, evidencia y consulta. Las ocho gramáticas originales no sustituyen esta estructura ya solicitada: filmic/continuous-world impiden saltos; chaptered altera navegación y apertura; live-surface supone un producto operativo; poster/gallery omiten sustancia; split-stage fija excesiva superficie; cutlist añade intensidad impropia.

| Momento | Dispositivo | Razón |
|---|---|---|
| Portada | Capas + scrub nativo | Profundidad y transformación en un mismo gesto |
| Introducción | Flujo quieto | Explicar sin interrupción |
| Proceso | Morph con controles | Relacionar etapas con su representación |
| Soluciones | Feedback de enlace | Acceso inmediato |
| Investigación | Selección y separación de planos | Distinguir componentes del concepto HIDROBAC |
| Trazabilidad | Dibujo de conexiones | Hacer visible la continuidad |
| Cierre | Flujo estable | Consulta sin demora |

## Contrato de capas y rendimiento

| Plano | Movimiento | Regla |
|---|---|---|
| Fondo | Contornos amplios, desplazamiento mínimo | Mantener contraste; no simular datos |
| Materia central | Cinta con profundidad por tamaño/luz | Mismo progreso compartido, dibujo agrupado por 9 tonos |
| Primer plano | Fragmentos de materia, mayor desplazamiento | En bordes, sin tapar título ni mensaje final |
| Texto | Entrada legible y cierre estable | HTML semántico, móvil separado de escena |

Móvil: cinta vertical y primer plano recortado lateralmente, 1100 partículas; escritorio: 2200. Un RAF solicitado por cambios, sin bucle permanente. Pausa fuera de vista y con documento oculto, límite de píxeles, preferencia de movimiento reducido y composición sin JavaScript.

Registro inicialmente vacío: no existen filas previas contra las cuales exigir diferenciación. El motor de Scrollcraft se conserva instalado íntegro; la implementación adapta su contrato de capas a GSAP/React existentes para evitar dos controladores concurrentes.
