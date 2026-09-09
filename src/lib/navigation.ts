export const navigationGroups = [
  {
    label: "Soluciones",
    description: "Capacidades para cada desafío industrial.",
    links: [
      ["Todas las soluciones", "/soluciones/"],
      ["Nutrición animal", "/soluciones/nutricion-animal/"],
      ["Núcleos proteicos", "/soluciones/nucleos-proteicos/"],
      ["Formulación técnica", "/soluciones/formulacion-tecnica/"],
      ["Valorización industrial", "/soluciones/valorizacion-industrial/"],
      ["Bioprocesos", "/soluciones/bioprocesos/"],
    ],
  },
  {
    label: "Innovación",
    description: "Investigación, transferencia y aplicación.",
    links: [
      ["Investigación e industria", "/innovacion/"],
      ["HIDROBAC", "/innovacion/hidrobac/"],
      ["Transferencia tecnológica", "/innovacion/transferencia-tecnologica/"],
      ["Proyectos e iniciativas", "/innovacion/proyectos/"],
    ],
  },
  {
    label: "Empresa",
    description: "Conoce GAZALEZ y su visión de transformación.",
    links: [
      ["Conoce GAZALEZ", "/empresa/"],
      ["Sostenibilidad", "/sostenibilidad/"],
      ["Aplicaciones industriales", "/casos/"],
      ["Actualidad", "/actualidad/"],
    ],
  },
  {
    label: "Calidad y trazabilidad",
    description: "Información y contacto directo.",
    links: [
      ["Calidad y trazabilidad", "/calidad-trazabilidad/"],
      ["Contacto comercial", "/contacto/"],
      ["Preguntas frecuentes", "/preguntas-frecuentes/"],
      ["Privacidad", "/privacidad/"],
      ["Términos de uso", "/terminos/"],
    ],
  },
] as const;
