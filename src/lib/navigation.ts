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
