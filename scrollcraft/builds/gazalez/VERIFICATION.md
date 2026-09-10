# Verificación y procedencia

Fuente: https://github.com/nateherkai/scroll-craft, revisión `0b816225945e45380397d6a0487efa3c98916858`, licencia MIT. Skill completa instalada en `C:/Users/BenjaminPetit/.codex/skills/scroll-craft`; clon completo en `C:/Users/BenjaminPetit/.codex/references/scroll-craft`. El preflight confirmó Node, ffmpeg completo, Playwright y Chrome. Kie no está configurado y no es necesario: no se generó fotografía ni video.

El sitio conserva Next.js, Motion y GSAP. Se aplican la planificación de profundidad, separación móvil, ritmo y verificación de Scrollcraft; su motor independiente no se carga junto a GSAP. No se añadieron dependencias al cliente ni medios pesados. La carpeta de planificación se excluye del paquete CLI de Vercel.

## Revisión de movimiento

| Before | After | Why |
|---|---|---|
| Cinta aislada sobre un fondo plano | Fondo de contornos, cinta central y fragmentos próximos con desplazamientos independientes | Dar profundidad a la transformación conceptual |
| Hasta 2200 cambios de estilo y rellenos por cuadro | Geometría reutilizable y nueve rellenos agrupados | Acotar el trabajo de dibujo sin eliminar partículas |
| Redibujado directo por cada actualización | Un RAF solicitado, pausa fuera de vista y documento oculto | Evitar trabajo repetido o invisible |
| Densidad limitada solo por DPR | Tope de 1.5 millones de píxeles en compacto y 3 millones en escritorio | Evitar crecimiento desmedido en alta densidad y 4K |
| Solo selección de componentes HIDROBAC | Separar/reunir planos, con teclado inmediato y controles de 44px | Explorar relaciones sin depender del hover |
| Controles de proceso después del gráfico y texto | Controles antes de la representación | Elegir la etapa y ver su resultado debajo en móvil |

## Evidencia local

- Build y lint correctos. Seis pruebas pasan: tres de consulta y tres nuevas de geometría reversible, raster y pintado agrupado.
- QA de exportación: 22 páginas y 858 referencias internas, sin incidencias.
- Capturas en `qa/scrollcraft/` (material local, excluido de Git): desktop opening/middle/exit, mobile opening/middle/exit, HIDROBAC separado, cierre compacto final y escritorio intermedio final.
- Viewports: 240/280/320/360 × 640, 390/430 × 844, 600 × 900, 768 × 1024 y 844 × 390 sin desbordamiento horizontal en la página revisada.
- Se inspeccionaron tres posiciones de portada en escritorio y teléfono. En el compacto final 360 × 640, el mensaje termina con opacity=1. Las capas de escritorio presentan matrices independientes (fondo 1.0182 y desplazamiento vertical +28; primer plano 1.0727 y desplazamiento -88).
- Ajuste de la única ronda de corrección: acortar la expansión de escritorio para eliminar el hueco claro después de desaparecer el texto; conservar el cierre. Se confirmó en `final-desktop-middle.png`.
- Explorador: separar, reunir con Enter, estados pressed, geometría de planos y botones de 44px verificados. Se retiraron líneas de llamada al separar, para no apuntar a posiciones anteriores.
- Menú móvil lleva a Nutrición animal; un timeout de la aserción por la barra final de URL se aclaró comprobando la ruta real, sin errores de consola.
- Dibujo local instrumentado: medias observadas de 3.84ms y 3.72ms en el navegador de esta máquina durante la revisión. Es tiempo CPU de geometría y comandos Canvas, no FPS ni latencia GPU, y no es una comparación de velocidad contra la versión anterior.

Curva visual revisada: reconocimiento → transformación → comprensión → elección → exploración → confianza → consulta. El hueco claro intermedio interrumpía el pico; la corrección lo elimina. Se mantiene el cierre estable y el contenido factual existente.

## Límites

Pruebas con viewport responsive en navegador de escritorio, no un teléfono físico. No se certifican FPS en móviles, GPU, ahorro de batería ni Safari/iOS. Preferencia de movimiento reducido y fallback sin JavaScript revisados en código; el navegador disponible no expone emulación para ambos. El harness externo de Scrollcraft se sustituye por el navegador autorizado de la sesión y pruebas del motor propio; no se afirma haber ejecutado su informe automatizado de contraste o dead-scroll.

Las capturas locales y el build no certifican el despliegue externo de Vercel. El commit y push se verifican por separado.
