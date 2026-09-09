import { site } from "@/lib/site";
export const dynamic = "force-static";
export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: site.indexable ? "/" : undefined,
      disallow: site.indexable ? undefined : "/",
    },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
