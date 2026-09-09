# Vista de revisión en Vercel

El proyecto está preparado para una primera vista de revisión. No se ha publicado ni vinculado una cuenta de Vercel.

## Desplegar desde esta carpeta

También se puede importar `KryptaMedina7/gazalez-web` en Vercel, seleccionar la rama `main`, usar el directorio raíz y conservar el preset Next.js. La configuración de compilación está incluida en el repositorio.

1. Ejecutar `npx vercel` desde la raíz del proyecto.
2. Iniciar sesión en la cuenta de la empresa y seleccionar el equipo/proyecto correspondiente.
3. Conservar el preset Next.js. `vercel.json` define instalación y compilación; Next.js genera el sitio estático mediante `output: "export"`.
4. Mantener `NEXT_PUBLIC_INDEXABLE=false` para esta revisión. No configurar el dominio corporativo todavía.
5. Si se desea que los metadatos usen la URL de revisión, configurar `NEXT_PUBLIC_SITE_URL` con la URL estable asignada por Vercel y volver a desplegar.
6. Abrir la URL entregada y comprobar portada, una página interior, refresco de una ruta interior, menú móvil y formulario. El formulario prepara un borrador; no envía mensajes automáticamente.

El correo confirmado ya está incluido: `contacto@empresagazalez.cl`. La vista no requiere claves de 21st.dev ni servicios de backend. `.vercelignore` excluye dependencias locales, capturas y material de trabajo.

## Recorrido sugerido para jefatura

Portada y transformación de materia; desplegable Soluciones; Nutrición animal; Innovación e HIDROBAC; Calidad y trazabilidad; preparación de una consulta. En móvil, abrir el menú, elegir una familia y después una página. La nueva página debe empezar arriba.

Fuentes de configuración: [Next.js en Vercel](https://vercel.com/docs/frameworks/full-stack/nextjs) y [configuración del proyecto](https://vercel.com/docs/project-configuration).
