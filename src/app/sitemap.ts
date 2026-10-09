import { site } from "@/lib/site";
import { allRoutes } from "@/lib/content";
import { locales, localHref, languageAlternates } from "@/i18n/routing.mjs";
export const dynamic = "force-static";
export default function sitemap() {
  return locales.flatMap((locale) =>
    allRoutes.map((route) => ({
      url: `${site.url}${localHref(route, locale)}`,
      alternates: {
        languages: Object.fromEntries(
          Object.entries(languageAlternates(route)).map(([lang, path]) => [
            lang,
            `${site.url}${path}`,
          ]),
        ),
      },
      changeFrequency: "monthly" as const,
      priority: route === "/" ? 1 : 0.7,
    })),
  );
}
