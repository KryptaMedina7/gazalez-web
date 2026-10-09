import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
export default defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores(["out/**", ".next/**", "qa/**", "tmp/**", "src/generated-locales/**", "src/app/(en)/**", "src/app/(pt)/**", "php-site/public/**", "tools/php/**"]),
]);
