# GAZAL — revisión de marca y hero, 29-09-2026

## Alcance
Vista de revisión en Vercel. No se publica en empresasgazalez.cl ni se regeneran los paquetes PHP de producción en esta entrega. La versión PHP conservada es una instantánea anterior; la aprobación y reconciliación de sus plantillas corresponden al siguiente despliegue.

## Identidad
Marca visible GAZAL. Se usa el lettering exacto del kit aportado por el usuario, en imágenes transparentes; el kit no contiene una fuente instalable. Se conservan Nassira Gazalez, Karim Gazalez, la razón social Gazalez e Hija SpA, RUT y contacto@empresagazalez.cl. La animación del loader permanece; cambia su nombre e isotipo para mantener coherencia de marca.

## Contenido contrastado
Fuente: https://www.empresasgazalez.cl/ y las 19 páginas interiores declaradas en el sitio, recuperadas el 29-09-2026. También se revisó el contenido dinámico servido en /build/app-gazal.js. Las capturas originales y diferencias de texto quedan localmente en tmp/gazal-refresh-20260929.

- Portada: compañía industrial y biotecnológica B2B, transformación de descartes en soluciones de nutrición, respaldo científico, formulación técnica y economía circular aplicada. La marca se actualiza a GAZAL según la instrucción más reciente.
- Orden de acciones: Explorar soluciones primero, conversación comercial después.
- Caracterización: diagnóstico proximal, perfil de aminoácidos, digestibilidad y microbiología.
- Recuperación: estabilización, secado controlado, reducción y molienda especializada.
- Formulación: mezclas de alta precisión nutricional adaptadas a la especie de destino.
- Trazabilidad: lotes analizados, consistencia técnica y entrega para integrar en planta.
- No se detectaron diferencias sustantivas en los textos del cuerpo de las otras páginas al normalizar los nodos HTML. El formulario renderizado por PHP es equivalente al componente ya presente en Next.

Estos son contenidos institucionales del sitio de la empresa, no una auditoría independiente de sus capacidades. Ferrometltda.com rechazó la conexión tanto en HTTP como en el navegador de revisión; no se afirma haber inspeccionado su animación actual.

## Escena y gradientes
Tres originales fotográficos generados con la herramienta integrada: bosque, vegetación izquierda y vegetación derecha. Se conservan en assets/gazal-forest-originals. Public/assets/forest contiene las entregas WebP adaptadas a móvil y escritorio. El paisaje se identifica como conceptual.

Scroll nativo con contenedor sticky, planos que se separan y escalas diferentes. GSAP solo transforma imágenes y opacidad. Sin vídeo, Canvas ni WebGL en el hero. Móvil descarga aproximadamente 463 KB de imágenes de escena; la capa intermedia adicional se oculta. El estado estático conserva contenido y acciones cuando falla un recurso, se desactiva JavaScript, se solicita movimiento reducido o la pantalla es demasiado baja.

Los gradientes originales del kit se integran en introducción, soluciones, trazabilidad, contacto y pie. El JSON de aurora queda archivado como referencia, fuera de ejecución: el hero ya aporta el movimiento principal y se evita sumar una animación de fondo permanente en teléfonos.

## Menú
El retorno de foco del diálogo se controla con preventScroll. Se mantiene el foco accesible al cerrar; al navegar a otro destino se deja actuar al cambio de página y su inicio superior.

## Validación
- Compilación de producción y TypeScript correctos; 13 pruebas automáticas pasan y 3 pruebas de integración PHP se omiten porque esta entrega no modifica el servidor PHP.
- Viewports Chromium de 240, 320, 360, 390, 430, 768, 1024 y 1440 px: sin desbordamiento horizontal. En 844 × 390, el hero conserva una composición estática sin recorrido adicional.
- Scroll comprobado en apertura, mitad y salida: los planos cambian de transformación en escritorio y móvil. Recarga inicia en y=0.
- Apertura y cierre mediante clic/toque real conservan y=240 en móvil y y=780 en escritorio. La navegación a Nutrición animal termina en y=0.
- Compilación servida localmente: consola sin errores ni avisos en carga normal y con movimiento reducido. Se corrigió la hidratación de TextRoll conservando el mismo árbol de letras en servidor y cliente.
- Sin JavaScript, el contenido y las acciones del hero permanecen visibles tras la salida CSS de seguridad del loader. El hero no añade recorrido vacío.
- Revisión Impeccable independiente: PASS sobre siete capturas y código de marca/hero; sin defectos materiales dentro de ese alcance. Las observaciones automáticas de documentación se incorporan a DESIGN.md.

Capturas y medidas locales: tmp/gazal-refresh-20260929. Las emulaciones de viewport en Chromium y las capturas no certifican velocidad de cuadros en hardware físico Samsung A51 ni Safari en iPhone 12 Pro Max. No se afirma haber probado esos dispositivos.
