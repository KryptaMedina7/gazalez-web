import { config } from "./config";
export { sourceUdec, sourceNews } from "../../src/lib/site";
export const site = {
  name: "GAZALEZ",
  legalName: "Gazalez e Hija SpA",
  rut: "76.585.794-5",
  location: "Coronel, Región del Biobío, Chile",
  url: "https://www.empresasgazalez.cl",
  indexable: false,
  get email() {
    return config().email || "contacto@empresagazalez.cl";
  },
};
