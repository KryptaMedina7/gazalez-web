# Revisión de movimiento y navegación

Última pasada: 2026-09-09. Criterios aplicados: Emil Design Engineering e Impeccable Animate/Polish. Revisión local de implementación e interacciones, no certificación WCAG ni medición formal de FPS.

| Before | After | Why |
| --- | --- | --- |
| La bienvenida se ocultaba al refrescar por una marca de sesión. | Se muestra en cada carga de documento; se puede omitir y tiene salida de seguridad. | Cumple la petición de entrada y refresco sin repetirla en cada navegación interna. |
| La transición empezaba después del cambio de ruta. | Cortina previa de 180ms, cambio de ruta y revelado de 320ms. | Hace visible la continuidad antes y después del cambio. |
| Navegación podía conservar una posición inferior. | El cambio de ruta sin ancla coloca el documento arriba antes de revelarlo. | La lectura empieza por el título. Verificado desde scrollY 1443 hasta 0. |
| Topbar con enlaces generales. | Cuatro desplegables con 18 destinos únicos; Inicio mediante el logo. | Todas las páginas quedan accesibles directamente. |
| Menú móvil con secciones generales. | Drilldown con fila de retorno y enlaces hijos animados. | Conserva contexto y permite llegar a páginas interiores. |
| Filas largas se superponían a 240px. | Separación vertical de 3.1em y etiquetas con salto entre palabras. | Sin colisiones ni desbordamiento en el caso corregido. |
| Transformación cambiaba rápidamente según scroll. | Cuatro estados GSAP, avance único al entrar, pausa fuera de pantalla y repetición manual. | El proceso se entiende y el usuario conserva el control. |
| Investigación e industria permanecía estática. | Secuencia breve de núcleo, órbitas y etiquetas. | Expresa la relación conceptual entre hidrogel y bacterias sin inventar evidencia. |
| Movimiento de apoyo limitado. | Trazabilidad, listas, mecanismo HIDROBAC, FAQ y controles reciben movimiento contextual. | Refuerza secuencias y estados, sin animar indiscriminadamente el texto de lectura. |

Verificado: desplegables con mouse y teclado, Escape y foco, navegación anidada, 18 destinos únicos, transición con fase final idle, llegada arriba, refresco, transformación desde etapa 0 a 3, final de secuencia de investigación y consola sin errores capturados. La matriz del drilldown cubrió 240/280/320/390/430/600/768/1024/1440 px; el único problema detectado a 240px se corrigió y se confirmó.

Las animaciones de contenido se pausan fuera de pantalla y con pestaña oculta. Movimiento reducido está implementado mediante Motion, GSAP y CSS; la herramienta usada no expone emulación de esa preferencia. La versión para Vercel está preparada, pero no se ha publicado.

## AppMenuBar — ajuste solicitado

| Before | After | Why |
| --- | --- | --- |
| Megamenú ancho con flechas genéricas. | Paneles anclados de 276px, separadores e iconos Lucide en 4 grupos y 18 destinos. | Reproduce el patrón adjunto y facilita reconocer cada página. |
| El cierre animado podía interferir con el siguiente menú. | Apertura de 160ms y desmontaje inmediato al cerrar. | Cambio consecutivo entre los cuatro grupos verificado. |

Build y lint correctos; 3 pruebas existentes correctas; 21 páginas y 797 referencias internas sin incidencias. Se verificaron todos los iconos/destinos, Escape y retorno de foco, flecha abajo, navegación a Nutrición animal con scrollY 0, y ajuste de escritorio. Preferencia de movimiento reducido implementada; no emulada en navegador.

## Gazalez — contenido y experiencia

| Before | After | Why |
| --- | --- | --- |
| Zoom mínimo de una imagen fija. | Transformación de materia en canvas y expansión a todo el ancho, durante 440px de scroll en escritorio. | Hace tangible el paso de subproducto a nueva aplicación. |
| Diagrama de círculos estático. | HIDROBAC explorable en tres componentes, con secuencias finitas y pausa fuera de vista. | Explica relaciones con interacción y texto accesible. |
| Puntos aislados de trazabilidad. | Cinco conexiones se dibujan secuencialmente. | El recorrido se percibe como continuidad. |
| Restauración de foco y scroll podía ocurrir después del cambio de ruta. | Scroll de Next desactivado durante transición, asentamiento tras layout y cierre de diálogo, cancelable al desplazarse el usuario. | Footer 6577→0, topbar 2138→0 y hamburguesa móvil 2359→0 verificados. |
| Marca Gazal y logos/declaraciones ausentes. | Gazalez, logo holding propio, franja institucional, voces de directores y FAQ. | Completa el contenido comprobado de Inicio y FAQ del sitio anterior. |

El nuevo logo SVG incluye el símbolo original y tipografía Manrope incrustada. Se conserva la identidad verde y el dorado se limita a trazos y detalles.
