# GAZALEZ — sitio corporativo

Sitio local construido con Next.js 16, React 19 y TypeScript. Exportación estática de 19 rutas, español de Chile, fuentes alojadas localmente y diseño responsive en verdes pastel. Logo original entregado por el usuario.

## Ejecutar

```sh
npm ci
npm run dev
```

Vista previa de producción:

```sh
npm run build
npm run preview
```

Abrir http://localhost:3000. El servidor de preview se limita a loopback. La salida publicable está en `out/`; no se publicó ni se modificó el WordPress existente.

## Verificación

```sh
npm run lint
npm run typecheck
npm test
npm run build
npm run qa
npm audit
```

`npm run qa` comprueba enlaces/archivos internos, títulos, H1 y archivos SEO del export. La evidencia de navegador de esta entrega se guarda en `qa/` y se resume en `docs/QA.md`. No confundir las verificaciones estáticas con pruebas visuales.

## Configuración y formularios

`src/lib/site.ts` centraliza marca, razón social, RUT, ubicación, URL y correo. Correo confirmado: **contacto@empresagazalez.cl**. `.env.example` documenta las opciones.

El formulario prepara la consulta localmente, permite revisarla y editarla, abre un borrador `mailto:` o descarga un TXT. El usuario realiza el envío desde su correo. Un archivo seleccionado no se sube ni se adjunta automáticamente. No hay backend de correo ni base de datos. No se ha enviado ningún correo durante QA.

La versión se exporta con `noindex` y `robots.txt` bloqueando indexación hasta validar publicación. Configurar `NEXT_PUBLIC_INDEXABLE=true` y el dominio final al hacer una entrega pública aprobada, después recompilar. Esto no sustituye autenticación para contenido privado; el sitio no contiene datos privados.

## Contenido e identidad

- `PRODUCT.md`: hechos y restricciones del producto.
- `DESIGN.md`: sistema visual implementado.
- `docs/CONTENT-EVIDENCE.md`: fuentes, clasificación y pendientes reales.
- `docs/ASSETS.md`: procedencia del logo y visual conceptual.
- `docs/FINISH-REVIEW.md`: revisión independiente y resolución.
- `src/lib/content.ts`: contenido editable y estructuras preparadas para CMS.

HIDROBAC se presenta como transferencia tecnológica UdeC. No se publican clientes, métricas, certificaciones ni productos inventados. Las imágenes conceptuales están rotuladas; se requieren fotografías autorizadas para mostrar instalaciones reales.

## Componentes y movimiento

El proyecto ya tiene React, TypeScript, Tailwind CSS 4 y estructura shadcn. `@/components/ui` resuelve a `src/components/ui`: es el equivalente correcto de `/components/ui` en este proyecto con directorio `src`. Mantenerlo evita romper los imports de los registros. `components.json` configura estos aliases; `src/lib/utils.ts` aporta `cn`. Los estilos principales están en `src/app/globals.css`. Tailwind incluye tema y utilidades sin Preflight para preservar el sistema editorial existente. No hace falta reinicializar el proyecto con el CLI de shadcn.

- Text Roll: fuente obtenida de 21st MCP, ibelick / motion-primitives, adaptada a movimiento reducido y Unicode.
- Menú: Sterling Gate Kinetic Navigation, hardikkashiyani123456788, obtenido mediante 21st MCP y adaptado a Radix, rutas reales y paleta GAZALEZ.
- Contacto flotante: Social Links, wasifgee0012, obtenido mediante 21st MCP; utiliza únicamente el correo confirmado. No hay perfiles sociales oficiales confirmados.
- Iconos: `lucide-react`, biblioteca utilizada por los componentes seleccionados de 21st.
- Animación: `motion` para texto, GSAP para navegación/scroll y CSS para microinteracciones. Las duraciones están en `src/lib/motion-policy.ts` y CSS.
- Referencias recuperadas: `docs/references/`. No contienen credenciales.

21st MCP quedó registrado globalmente en Codex, con `API_KEY_21ST` persistida en el entorno del usuario de Windows. La sesión MCP ya abierta conservaba su credencial anterior; los dos componentes nuevos se recuperaron mediante el endpoint MCP autenticado con la nueva clave. Reiniciar Codex permite que la conexión integrada tome el nuevo entorno. No pegar la clave en el proyecto ni en comandos de instalación de componentes.

Consulta `QA.md` para el alcance exacto de las comprobaciones y `.impeccable/design.json` para la extensión del sistema visual.

## Navegación y animaciones actualizadas

La bienvenida se muestra al entrar y al refrescar, según la última solicitud. Los cambios internos de página usan una cortina GSAP y se colocan arriba del destino. Topbar con cuatro desplegables y todas las rutas; menú completo con Drilldown Menu adaptado del código adjunto, usando `motion/react` ya instalado.

La transformación de materia recorre cuatro etapas una vez al entrar en pantalla y tiene repetición manual. Investigación e industria incorpora una secuencia propia. Trazabilidad, listas, mecanismo HIDROBAC, FAQ y controles tienen movimiento contextual. Todas las animaciones no esenciales respetan movimiento reducido.

Preparación para la primera revisión en Vercel: `vercel.json`, `.vercelignore` y `docs/VERCEL.md`. No se ha publicado un despliegue.

Topbar: AppMenuBar adaptado del código adjunto, con Radix Menubar, iconos Lucide por destino y paneles compactos. Componentes en `src/components/ui/{app-menu-bar,menubar}.tsx`; estilos en `src/app/globals.css`.
