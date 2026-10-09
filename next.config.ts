import type { NextConfig } from "next";
import { generateLocales } from "./scripts/locales.mjs";
generateLocales();
const config: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  poweredByHeader: false,
};
export default config;
