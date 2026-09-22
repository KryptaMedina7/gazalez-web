# Migración PHP · 2026-09-22

## Resultado

Sitio independiente en `php-site/`, con 20 rutas públicas y una plantilla 404. PHP controla resolución de rutas, códigos HTTP, metadatos, sitemap, robots, configuración e inclusión de plantillas. Los módulos interactivos originales se conservan como componentes de navegador hidratados dentro del HTML que entrega PHP.

El paquete para BenzaHosting es `releases/gazalez-php-benzahosting.zip`. Contiene archivos públicos compilados y `gazalez-private` para instalar fuera del directorio público. No necesita Node.js, Next.js, npm, Composer ni base de datos en el servidor. No es un tema ni plugin de WordPress.

## Decisiones para mantener paridad

- Las vistas se migraron una sola vez desde el contenido existente. La compilación habitual de CSS/JS no regenera ni sobreescribe PHP.
- Las animaciones siguen usando los componentes existentes: introducción, topbar, menú móvil por niveles, partículas de escritorio, WebGL móvil y fallback Canvas, transformación de materia, HIDROBAC y conexiones de trazabilidad.
- Los adaptadores locales sustituyen Link, Image y navegación de Next por enlaces HTML, imágenes locales y navegación entre documentos PHP. La compilación verifica que el bundle no incluya el runtime Next.js.
- Cada componente conserva sus identificadores entre el HTML inicial y la hidratación. PHP entrega contenido legible aun sin JavaScript; se añade navegación alternativa y acceso al correo para ese caso.
- Los enlaces internos conservan cortina de salida y llegada. La navegación completa abre el nuevo documento arriba; los enlaces con ancla mantienen su destino.
- La carga inicial tiene una salida CSS de respaldo, para evitar una pantalla de carga permanente si JavaScript falla.
- Correo configurable en PHP. El formulario mantiene preparación local, descarga y mailto; no se inventó un backend de envío.
- Las dependencias pg/nodemailer/pglite que ya estaban modificadas antes de esta tarea no se incorporaron al runtime PHP y no se incluyeron en este commit.

## Validación

- PHP 8.3.31: sintaxis de todos los archivos PHP comprobada.
- Suite HTTP PHP: 20 rutas, títulos, contenido sin `_next`, 404, privacidad de app/views, rechazo POST, HEAD, redirección conservando query, sitemap de 20 rutas y carga de recursos. Pasó tanto en raíz como con base `/revision`.
- 13 pruebas existentes de lógica y geometría aprobadas; las 3 nuevas pruebas HTTP requieren `PHP_QA_URL` y se ejecutaron separadamente contra PHP local.
- TypeScript sin errores. ESLint de la migración comprobado.
- Navegador: portada PHP de escritorio con Canvas; desplegable y destino Nutrición animal; llegada a y=0; menú móvil por niveles e HIDROBAC; portada móvil en y=0 con título a 123 px; WebGL cambió de progreso 0 a 0.175 tras scroll; proceso automático llegó a su cuarta etapa; separación HIDROBAC a 100 y selección de agua; formulario de subproducto produjo resumen y mailto correcto sin enviar.
- Subcarpeta: hidratación sin errores de consola, menú y ruta interior con prefijo y llegada arriba.
- Portada y página interior: sin desbordamiento a 240, 280, 320, 390, 430, 600, 768, 1024 y 1440 px; página interior también horizontal 844 × 390. Formulario inspeccionado en móvil.
- ZIP con manifiesto SHA-256, prueba de integridad y exclusión de configuración local, Node y fuentes de desarrollo.
- La compilación Next.js original también pasó, para conservar la vista de Vercel durante la migración.

## Límites pendientes del entorno real

No se accedió a cPanel ni se modificó el WordPress existente. Las reglas .htaccess deben comprobarse en el Apache/LiteSpeed del plan contratado. La prueba local usa el servidor integrado de PHP. No se ha certificado rendimiento en teléfonos físicos ni Safari/iOS. Antes del cambio definitivo corresponde un respaldo completo de WordPress y su base de datos y una revisión en subdominio.

Fuente consultada del proveedor: https://www.benzahosting.cl/ — publicita PHP hasta 8.3 y hosting con cPanel. Esto no sustituye confirmar el plan concreto de la cuenta.

## Operación

Ver `php-site/README.md`. Compilar en el equipo de desarrollo con `node scripts/build-php.mjs`; empaquetar con `python scripts/package-php.py`. Subir el ZIP ya construido; no ejecutar estas herramientas en el hosting.
