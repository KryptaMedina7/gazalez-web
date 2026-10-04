export const sectionIntros = {
  "/soluciones/nutricion-animal/": { film: "avicola", title: "Nutrición animal" },
  "/soluciones/nucleos-proteicos/": { film: "nucleos", title: "Núcleos proteicos avícolas" },
  "/innovacion/": { film: "innovacion", title: "Innovación y biotecnología" },
} as const;

export function getSectionIntro(path: string) {
  const route = `/${path.split("/").filter(Boolean).join("/")}/`;
  return sectionIntros[route as keyof typeof sectionIntros];
}
