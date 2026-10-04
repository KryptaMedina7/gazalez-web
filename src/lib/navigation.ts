export const navigationGroups = [
  {
    label: "Soluciones",
    description: "Encuentra el camino según tu necesidad.",
    links: [
      ["Soluciones por necesidad", "/soluciones/"],
      ["Nutrición animal", "/soluciones/nutricion-animal/"],
      ["Valorización industrial", "/soluciones/valorizacion-industrial/"],
      ["Innovación y biotecnología", "/innovacion/"],
    ],
  },
  {
    label: "Innovación",
    description: "Líneas de desarrollo y vínculos tecnológicos.",
    links: [
      ["Innovación y biotecnología", "/innovacion/"],
      ["HIDROBAC: tecnología y alcance", "/innovacion/hidrobac/"],
      ["Bioprocesos", "/soluciones/bioprocesos/"],
      ["Transferencia tecnológica", "/innovacion/transferencia-tecnologica/"],
      ["Colaboración y proyectos", "/innovacion/proyectos/"],
    ],
  },
  {
    label: "Empresa",
    description: "Actividad, antecedentes y documentación.",
    links: [
      ["Conoce GAZAL", "/empresa/"],
      ["Calidad y trazabilidad", "/calidad-trazabilidad/"],
      ["Sostenibilidad", "/sostenibilidad/"],
      ["Preguntas frecuentes", "/preguntas-frecuentes/"],
    ],
  },
] as const;

/** Destination shortcuts may appear twice; route ownership never does. */
export function activeNavigationGroup(path: string): string | undefined {
  const route = `/${path.split(/[?#]/)[0].split("/").filter(Boolean).join("/")}/`;
  if (route.startsWith("/innovacion/") || route === "/soluciones/bioprocesos/") return "Innovación";
  if (route.startsWith("/soluciones/")) return "Soluciones";
  if (navigationGroups[2].links.some(([, href]) => route === href)) return "Empresa";
  return undefined;
}
