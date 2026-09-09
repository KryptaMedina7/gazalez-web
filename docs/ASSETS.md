# Assets

- `public/assets/gazal-logo.png`: copia byte por byte del PNG entregado por el usuario. Sin recoloración, redibujo ni sustitución.
- `public/assets/materia.webp`: imagen conceptual generada con la herramienta integrada ImageGen. No representa planta, producto comercial ni muestra científica de GAZAL. La web muestra su carácter conceptual.
- `public/assets/materia-social.jpg`: variante optimizada para metadata social.
- `public/assets/materia-original.png`: original conservado de la generación.
- Fuentes: Manrope Variable y Lexend Variable, paquetes Fontsource, servidas localmente (licencias SIL OFL incluidas en los paquetes).
- Iconos: conjunto SVG mínimo propio, trazo uniforme de 1.5 px. El repositorio Reicon se consultó, pero no se incorporó su código ni se atribuye una integración inexistente.
- Radix Dialog: navegación móvil con foco gestionado, Escape y retorno al disparador.
- 21st.dev: consulta de inspiración editorial/proceso; sin código de terceros recuperado ni credenciales guardadas.

## Prompt de la imagen conceptual

Create a premium editorial CGI material study for a Chilean industrial valorization and biotechnology company website. This is unmistakably a conceptual material sculpture, NOT a real plant, NOT a commercial product or a scientific microscopic photograph. Landscape composition 3:2. A sweeping sculptural ribbon made of thousands of tiny matte pale sage-green and muted mint-green granules, beginning as loose irregular granular matter at lower left, coalescing into an elegant rising twisted arch and emerging as a precise smooth pale mint ribbon to the right, suspended just above a very light grey-green solid studio floor. Beautiful tactile mineral/cellulose texture, sophisticated almost photographic physically rendered shadows, softly lit by large northern window, muted highlights, calm premium industrial material library aesthetic. Background uniform pale #E8EEE7. The sculptural ribbon fills the frame boldly, with artful cropping at the right edge. Natural sage and pale green palette, some deep forest granules for dimension. No gold, yellow, neon, glass bubbles, leaves, lettering, watermarks, logos, text, UI, borders, or grids. High material detail, convincing material mass. This image will be labeled conceptual visualization on site.

Método: herramienta integrada ImageGen, sin CLI ni claves API. Optimización WebP/JPEG con Sharp. La copia del logo se conservó sin modificar.

## Componentes interactivos (2026-09-09)

Fuentes recuperadas mediante MCP de 21st.dev:
- Text Roll — ibelick, componente 56 del catálogo MCP de 21st.dev
- Sterling Gate Kinetic Navigation — hardikkashiyani123456788, componente 10003 del catálogo MCP de 21st.dev
- Social Links — wasifgee0012: https://21st.dev/@wasifgee0012/components/social-links

Los archivos de referencia conservan autor y fuente. Se adaptaron las interacciones al sitio: Radix para el foco del menú, duraciones más cortas, verdes de GAZAL, enlaces reales, movimiento reducido y controles accesibles. El dock incluye solo mail, una plataforma admitida por el componente original. No se atribuyen a la empresa cuentas no verificadas. Los iconos provienen de Lucide, dependencia del ecosistema 21st seleccionado.
