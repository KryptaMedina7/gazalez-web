// Broad families supported by the existing approved nutrition content.
// Add specific products only after their commercial scope has been confirmed.
export const productFamilies = [
  {
    id: "ingredientes",
    name: "Ingredientes para nutrición animal",
    description:
      "Materias primas que se evalúan por su composición, origen y compatibilidad con la dieta.",
    audience: "Plantas de alimento, productores y formuladores.",
    href: "/soluciones/formulacion-tecnica/",
    detail: "Evaluar una formulación",
    image: "ingredientes",
    alt: "Bandejas con harinas y materiales granulados de distintas texturas",
    request: "Solicitar antecedentes del ingrediente",
  },
  {
    id: "nucleos",
    name: "Núcleos proteicos avícolas",
    description:
      "Soluciones proteicas cuyo aporte se revisa dentro de una dieta completa, según la etapa y el objetivo nutricional.",
    audience: "Integraciones avícolas, plantas de alimento y formuladores.",
    href: "/soluciones/nucleos-proteicos/",
    detail: "Explorar los núcleos proteicos",
    image: "nucleos",
    alt: "Muestra de material molido y granulado en un recipiente verde",
    request: "Solicitar ficha de la solución",
  },
];
export function findProductFamily(value) {
  return productFamilies.find((family) => family.id === value);
}
export function familyEnquiryHref(id) {
  const family = findProductFamily(id);
  return family
    ? `/contacto/?interes=formulacion&familia=${family.id}`
    : "/contacto/";
}
