# GAZALEZ · sitio PHP para hosting compartido

Versión independiente de WordPress. PHP sirve las páginas, las rutas y los metadatos. React, GSAP, Motion, Canvas/WebGL y SVG se ejecutan únicamente en el navegador para conservar las interacciones existentes. No se requiere Node.js, Next.js, npm, Composer, base de datos ni un proceso permanente en el hosting.

## Requisitos y estructura

- PHP 8.1 o superior; comprobado localmente en PHP 8.3.31. Seleccionar PHP 8.3 en cPanel.
- Apache o LiteSpeed compatible con `.htaccess` y reescritura. Confirmar estos ajustes del plan con BenzaHosting al instalar.
- `public/`: única carpeta pública. Contiene index.php, .htaccess, imágenes y recursos CSS/JS ya compilados.
- `app/`: configuración, rutas permitidas, controlador y manifiesto de recursos. Mantener fuera del directorio público.
- `views/`: plantillas PHP de las 20 páginas, cabeceras, pie y diseño común. Mantener fuera del directorio público.

## Instalar sin ejecutar Node.js

El paquete ZIP tiene dos carpetas:

```text
/home/USUARIO/
  gazalez-private/
    app/
    views/
  public_html/
    index.php
    .htaccess
    assets/
    build/
```

1. Respaldar los archivos completos del WordPress existente y exportar su base de datos antes de sustituirlo. El paquete no contiene ni modifica wp-config.php, wp-content ni la base de datos de WordPress.
2. Subir `gazalez-private/` al directorio de la cuenta, fuera de `public_html/`.
3. Para revisar, crear preferentemente un subdominio con raíz `/home/USUARIO/gazalez-preview`. Subir allí el contenido de la carpeta `public_html/` del ZIP. El controlador localizará `../gazalez-private` automáticamente. La web de WordPress continúa funcionando en su raíz original.
4. Copiar `gazalez-private/app/config.local.example.php` a `config.local.php`. Configurar `url` con el origen HTTPS de la revisión y mantener `indexable=false`.
5. Abrir portada, página interior, menú móvil, HIDROBAC y formulario. Verificar recursos, consola, enlaces, recarga de ruta interior, robots y sitemap. Comprobar también en el A51 e iPhone reales.
6. Al aprobar la revisión, copiar los archivos públicos a la raíz definitiva. Reemplazar de forma controlada el index.php y las reglas .htaccess de WordPress: no combinar ambas reglas de enrutamiento sin una configuración deliberada. Configurar el dominio final y habilitar `indexable=true` solo cuando corresponda.

Si el hosting exige otra ubicación privada, establecer la variable `GAZALEZ_PRIVATE_DIR` o ajustar la variable `$private` en el index.php público a la ruta absoluta de `gazalez-private`. No mover las carpetas privadas dentro de public_html.

### Revisión dentro de una subcarpeta existente

También admite `/revision/`. Configurar `base_path => '/revision'`. En `public_html/revision/index.php`, ajustar `$private` a la ruta absoluta privada: la ubicación de la carpeta privada cambia respecto de un sitio instalado en la raíz. El origen `url` no lleva esa subcarpeta, porque se agrega mediante `base_path`. Las reglas existentes de WordPress deben dejar pasar esta carpeta física; verificarlo en staging.

## Configuración

`app/config.local.php` permite cambiar correo, origen URL, subcarpeta e indexación. No necesita credenciales. El correo predeterminado es `contacto@empresagazalez.cl`. El controlador no toma el dominio del encabezado Host enviado por un visitante.

El formulario mantiene el funcionamiento anterior: valida los campos, prepara un resumen, permite descargarlo y abre la aplicación de correo. El visitante debe enviar y adjuntar archivos manualmente. No se ha añadido envío automático por PHP ni almacenamiento de consultas.

## Desarrollo local

Desde la raíz del repositorio:

```powershell
npm ci
npm ci --prefix tools/php
node scripts/build-php.mjs
php -S 127.0.0.1:8083 -t php-site/public php-site/router.php
```

Node.js solo se usa localmente para recompilar CSS/JS y copiar los recursos públicos. `node scripts/build-php.mjs` nunca sobrescribe las plantillas PHP. `--migrate-views` fue una migración inicial desde las páginas React; se rechaza si las plantillas ya existen.

El sitio original de Next.js permanece en el repositorio como referencia y mantiene su compilación de Vercel. El entregable para BenzaHosting es `php-site`, no `out/` ni `.next/`.

## Dónde editar

- Estructura y metadatos globales: `views/layout.php` y `app/routes.json`.
- Texto y estructura de páginas: `views/pages/*.php`.
- Menú y componentes interactivos: fuentes compartidas de `src/components`; adaptadores PHP en `php-client/`.
- Estilos: `src/app/globals.css`; ejecutar la compilación local después de modificarlos.
- Componentes con `data-island`: su HTML inicial y sus propiedades deben mantenerse compatibles con el componente React. No editar IDs internos ni atributos de hidratación manualmente. El bloque editorial del hero se conserva en `data-props.copyHtml`; si se cambia, actualizar también su HTML inicial para mantener la paridad.
- Se mantienen 20 cabeceras renderizadas, una por estado de navegación. Al añadir rutas o alterar el menú, actualizar sus plantillas junto con navigation.ts para conservar el estado activo inicial.

## Pruebas

```powershell
npm test
$env:PHP_QA_URL='http://127.0.0.1:8083'
node --test tests/php-http.test.mjs
npx tsc --noEmit
npm run lint
```

El servidor integrado de PHP se usa solo para QA local. No sustituye la comprobación de reglas Apache/LiteSpeed ni la validación de dispositivos físicos en el hosting real.
