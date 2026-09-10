# Scroll móvil y explorador HIDROBAC

El usuario reportó tirones en Galaxy A51, iPhone 12 Pro Max y, en menor medida, escritorio. Esta revisión sustituye el Canvas móvil de la revisión anterior. Los tiempos CPU históricos no demostraban fluidez en esos teléfonos.

## Cambios

| Antes | Ahora | Motivo |
|---|---|---|
| Geometría y pintado Canvas durante el scroll móvil | Dos capas WebP transparentes, con desplazamiento y fundido | Eliminar el cálculo y rasterizado de partículas por cuadro |
| Máscara animada y variable CSS heredada en móvil | Solo transform y opacity; sin máscara | Reducir trabajo de pintura y recálculo de estilos |
| Seguimiento GSAP con suavizado temporal | Timeline CSS nativa cuando se soportan timeline y range; GSAP sin retraso en otros motores | Acompañar directamente el desplazamiento táctil |
| Canvas de escritorio solicitado desde otro RAF | Dibujo en la actualización de GSAP; máscara aplicada directamente al elemento | Evitar que Canvas quede un cuadro detrás de las capas DOM |
| Matriz HIDROBAC casi plana | Estratos translúcidos, más contraste, mayor separación y entrada de agua escalonada | Hacer más evidente el volumen sin bucles continuos |

Las imágenes se generan desde la geometría matemática existente: `node scripts/render-mobile-matter.mjs`. Se entregan 117518 bytes en vertical o 111086 en horizontal. Cada pareja decodifica menos de 1.5 millones de píxeles. Escritorio selecciona una fuente transparente mínima y conserva la transformación de partículas. No se añadieron dependencias.

Se conservan el contenido factual, los controles accesibles, el modo de movimiento reducido y el recorrido alternativo sin JavaScript. HIDROBAC sigue siendo una representación conceptual sin escala.

## Verificación

- Compilación estática y lint correctos, sin advertencias; siete pruebas pasan, incluida decodificación/transparencia y presupuesto de las imágenes.
- Exportación: 22 páginas, 860 referencias internas, cero incidencias.
- Navegador local: 240, 280, 320, 360, 390, 428, 430, 600, 768, 844 y 1440 px sin desbordamiento horizontal; horizontal 844 × 390.
- En móvil hidratado, Canvas queda en 1 × 1; las imágenes cargan y se selecciona la variante horizontal cuando corresponde.
- En 390 × 844, scroll 780: progreso 0.497, capa formada 0.496, dispersa 0.269. Scroll 1015: capa formada, cierre y progreso en 1. Se verificó retorno al inicio y cambio de breakpoint a escritorio.
- Escritorio: Canvas activo y máscara de 47% a 0% en el recorrido, conservando capas independientes.
- HIDROBAC: selección de agua/bacterias, separar y reunir con Enter; controles de 44 px, estados y texto actualizados.
- Navegación desde HIDROBAC abre su página con scrollY=0. Sin errores ni advertencias de consola observados.
- Se corrigió el contraste del cierre en horizontal con un gradiente estático; no usa blur.

## Alcance y compatibilidad

Pruebas responsive en el navegador de escritorio disponible, no mediciones sobre un A51 ni un iPhone físico. No se certifican 60 FPS, Safari ni latencia táctil. El fallback GSAP y el modo reduced-motion se revisaron en código; no se forzó su ejecución mediante cambios del navegador. La implementación nativa se activa por detección de capacidades, no por modelo ni user-agent.

Referencias de sintaxis: [animation-range](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/animation-range) y [view-timeline-inset](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/view-timeline-inset).
