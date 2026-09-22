import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import Home from "../src/app/page";
import ContentPage, { generateMetadata } from "../src/app/[...slug]/page";
import NotFound from "../src/app/not-found";
import { Header, Footer } from "../src/components/shell";
import { BrandIntro } from "../src/components/ui/brand-intro";
import { SocialLinks } from "../src/components/ui/social-links";
import { allRoutes } from "../src/lib/content";
import { setServerPath } from "./compat/navigation";
import { island, resetIslands } from "./island-server";
export { allRoutes };
export async function renderRoute(route: string) {
  resetIslands();
  setServerPath(route);
  const header = renderToStaticMarkup(island("header", Header));
  const body =
    route === "/404/"
      ? createElement(NotFound)
      : route === "/"
        ? createElement(Home)
        : await ContentPage({
            params: Promise.resolve({ slug: route.split("/").filter(Boolean) }),
          });
  const content = renderToStaticMarkup(body);
  const metadata =
    route === "/" || route === "/404/"
      ? {
          title:
            route === "/"
              ? "GAZALEZ · De subproducto a solución"
              : "Página no encontrada | GAZALEZ",
          description:
            "Valorización industrial, nutrición animal y ciencia aplicada. Gazalez e Hija SpA, Coronel, Biobío, Chile.",
        }
      : await generateMetadata({
          params: Promise.resolve({ slug: route.split("/").filter(Boolean) }),
        });
  return {
    header,
    content,
    metadata,
    footer: renderToStaticMarkup(createElement(Footer)),
    intro: renderToStaticMarkup(island("intro", BrandIntro)),
    social: renderToStaticMarkup(
      island("social", SocialLinks, {
        links: [
          { platform: "mail", href: "mailto:contacto@empresagazalez.cl" },
        ],
      }),
    ),
  };
}
