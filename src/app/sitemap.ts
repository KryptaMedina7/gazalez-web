import { site } from "@/lib/site";
import { allRoutes } from "@/lib/content";
export const dynamic = "force-static";
export default function sitemap() {
  return allRoutes.map((route) => ({
    url: `${site.url}${route}`,
    changeFrequency: "monthly" as const,
    priority: route === "/" ? 1 : 0.7,
  }));
}
