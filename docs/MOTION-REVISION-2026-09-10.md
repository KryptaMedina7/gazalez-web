# Revisión tras el reporte de tirones y capas superpuestas

Esta revisión sustituye la propuesta móvil documentada en `MOBILE-PERFORMANCE-2026-09-10.md`. El usuario continuó observando defectos, por lo que ese informe no debe interpretarse como validación de fluidez en teléfonos físicos.

## Cambios verificables

| Antes | Ahora |
|---|---|
| Dos texturas de partículas fundidas; imagen doble durante la transición | Una textura formada, sin fundido ni imagen fantasma |
| Escena móvil sticky de 766 px con 464 px adicionales de recorrido (390 × 844) | Escena relativa de 675 px y contenedor de igual altura, sin recorrido adicional |
| Timeline móvil nativa o fallback GSAP con scroll | Desplazamiento normal; parallax CSS opcional en dos planos, sin importación móvil de ScrollTrigger ni contexto Canvas |
| 117518 bytes de imágenes verticales seleccionadas | 54012 bytes, una sola imagen; 50864 bytes en horizontal |
| Proceso automático al pasar, 120 partículas animadas | En móvil, 40 partículas visibles/animadas y reproducción a petición |
| Entradas de listas y texto coinciden con el scroll móvil | Listas estables; conexión de trazabilidad breve. Se conservan interacciones explícitas |
| Menú con animaciones y blur por letra | Animaciones por palabra, sin blur |
| Elementos HIDROBAC desplazados sobre el mismo volumen | Tres planos independientes con separación real, selección directa y deslizador continuo |

HIDROBAC no representa una escala física. Se preserva la información de la tecnología y su estado. Las nuevas superficies ayudan a distinguir componentes; no ilustran un mecanismo químico ni una eficacia medida.

## Evidencia

- Build estático, lint y nueve pruebas correctos. Dos pruebas nuevas comprueban espacios entre los planos separados, límites del diagrama, extremos del control y reversibilidad.
- QA: 22 páginas, 859 referencias internas, sin incidencias.
- Navegador: portada sin overflow a 240/280/320/360/390/428/600/768/1024/1440 px; horizontal 844 × 390. Controles de componentes de 44 px.
- En móvil: Canvas 1 × 1, una sola capa de imagen, stage relativo y altura igual a su contenedor. Sin reserva de pinning ni máscara animada.
- HIDROBAC: botón separar/reunir, selección directa de bacterias sobre el diagrama, selección de agua, slider con Home/End/flechas y restablecer. Centros finales 450/270/90 en viewBox 540 × 550; al reiniciar vuelve a cero y selecciona hidrogel.
- Menú móvil: despliegue de Soluciones y navegación a Nutrición animal con scrollY=0.
- Revisión de presencia de h1 y overflow en 19 rutas interiores a 390 px (empresa, soluciones y sus cinco detalles, innovación y sus tres detalles, sostenibilidad, casos, actualidad, calidad, contacto, FAQ y legales). Sin errores/advertencias de consola observados.
- Proceso móvil: selección de Formulación, texto y estado actualizados, 40 partículas visibles.

## Alcance

Se verificaron estados, geometría y comportamiento responsive en el navegador de escritorio disponible. No hay acceso a un Galaxy A51 o iPhone 12 Pro Max físico, ni mediciones de FPS/latencia táctil en esos equipos. No se afirma una certificación de todos los dispositivos. La eliminación del scroll retenido y del trabajo automático móvil reduce los factores identificados, pero la percepción en los equipos reportados requiere comprobación allí.

El modo reduced-motion conserva contenido y controles y elimina las transiciones. La alternativa sin soporte de view timelines conserva la misma escena móvil con desplazamiento normal; no añade un motor JS de reemplazo. Ambos caminos se revisaron en código, sin emulación de Safari ni modificación de capacidades del navegador.
