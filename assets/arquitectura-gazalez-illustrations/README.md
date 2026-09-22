# Arquitectura de GAZALEZ

Fecha: 2026-09-21. Fuente: código local de la revisión 1dcd984.

Abre **index.html** para ver el conjunto sin conexión, ampliar los diagramas y descargar sus archivos.

## Entregables

- 01-arquitectura-ilustrada.png: ilustración conceptual Xiaohei del recorrido código → exportación → Vercel → dispositivos → correo.
- 02-arquitectura-completa: compilación, entrega, composición de interfaz, movimiento y salidas externas.
- 03-mapa-de-paginas: las 20 rutas declaradas, agrupadas según la navegación real; incluye referencias a 404 y SEO.
- 04-flujo-de-consulta: validación, preparación, revisión, descarga y envío manual desde una aplicación externa.
- Cada diagrama incluye PNG, SVG vectorial, Mermaid (.mmd) y Graphviz (.dot) editables.
- rutas-verificadas.json: inventario extraído de content.ts y contrastado con navigation.ts.
- PROMPT.txt: instrucción de generación de la ilustración mediante image_gen integrado.

La ilustración comunica la estructura general. Los tres diagramas detallan conjuntamente la arquitectura completa implementada; no representan servicios propuestos como si existieran.

## Verificación de ilustración

| Archivo | Proporción | Fondo | Acción Xiaohei | Rótulos | Sin título | Originalidad |
|---|---|---|---|---|---|---|
| 01-arquitectura-ilustrada.png | Horizontal, aproximadamente 16:9 (1672 × 941) | Blanco | Pliega el sitio de papel | 6 rótulos legibles en español | Sí | Metáfora creada para este sitio; no se reutilizaron casos |

Guardado en assets/arquitectura-gazalez-illustrations/ dentro del proyecto. Original conservado en la carpeta de imágenes generadas de Codex. Imagen final aprobada visualmente; ninguna variante opcional.

## Verificación técnica

- Modelo contrastado con next.config.ts, vercel.json, package.json, App Router, componentes, formulario y módulos de contenido.
- Las 20 rutas de allRoutes están representadas en el mapa.
- Diagramas renderizados mediante Graphviz WASM y examinados como PNG; SVG y fuentes conservan el detalle editable.
- El visor usa recursos locales; no requiere CDN, cuenta, ni conexión.
- No existe recepción de consultas por API, persistencia en base de datos ni integración ERP en este código.
- El formulario no envía ni adjunta archivos automáticamente. La entrega depende de la aplicación y proveedor de correo del usuario.
- Las variables remotas, el dominio vinculado y la disponibilidad actual de Vercel no fueron auditados. La configuración de despliegue está verificada en el repositorio.
- docs/VERCEL.md conserva una frase histórica de despliegue no iniciado; no se usó como prueba del estado remoto.

## Edición

Abre los .mmd en un editor compatible con Mermaid, o los .dot con Graphviz. Los SVG se pueden importar en herramientas de diseño. Al modificar una fuente de diagrama, vuelve a exportar su SVG/PNG y sustituye el SVG incrustado correspondiente en index.html.
