# Adaptación de movimiento móvil — 2026-09-09

La portada conserva la secuencia de escritorio. Hasta 1000px usa texto en flujo seguido de una escena vertical sticky, con expansión del marco, transformación de partículas, mensaje final y progreso. El recorrido adicional es de 340–560px según altura disponible, sin interceptar gestos de desplazamiento. La altura usa svh para evitar saltos por las barras del navegador; el control inferior considera safe-area.

El canvas móvil utiliza 1100 partículas y limita la densidad a 1.5; dibuja al cambiar el progreso o tamaño. Proceso e HIDROBAC observan el gráfico, en lugar de toda la sección, para activar sus secuencias en composiciones verticales. Movimiento reducido omite la secuencia y el tramo extra de scroll.

## Verificación local

- Build y lint correctos; 3 pruebas existentes pasan.
- Exportación: 22 páginas, 858 referencias internas, sin incidencias.
- Viewports 240, 280, 320, 390, 430, 600 y 768 × 844: canvas renderizado y sin desbordamiento horizontal.
- 390 × 844: progreso inicial 0, intermedio 0.272 y cierre 0.9996; escena fijada en y=78 y mensaje final visible. Al retroceder, progreso 0.0909 y mensaje oculto.
- 844 × 390: cierre visible, control accesible y sin desbordamiento. Cambio entre orientación horizontal y vertical sin recargar.
- Menú móvil: Soluciones → Nutrición animal; diálogo cerrado y scrollY=0 al llegar.
- Controles: selección de Formulación, Agua y Bacterias benéficas; estados y descripciones actualizados. Alturas de controles 44px o mayores. Contacto directo abre y cierra.
- 1440 × 900: composición de escritorio restaurada tras resize; secuencia de scroll y cierre conservados. Sin errores ni advertencias capturados en consola.

Pruebas en navegador de escritorio con viewport responsive. No se verificó un teléfono físico, rendimiento FPS en hardware móvil ni la preferencia de movimiento reducido en navegador; esta última se revisó en código. Cambios locales, sin despliegue a Vercel.
