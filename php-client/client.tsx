import { createElement, type ComponentType } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { Header } from "../src/components/shell";
import { BrandIntro } from "../src/components/ui/brand-intro";
import { SocialLinks } from "../src/components/ui/social-links";
import { HeroExperience } from "../src/components/ui/hero-experience";
import { Process } from "../src/components/process";
import { HydrobacExplorer } from "../src/components/ui/hydrobac-explorer";
import { EnquiryForm } from "../src/components/enquiry-form";
import { ContentMotion } from "../src/components/ui/content-motion";
import { config, localHtml } from "./compat/config";
import { mountPageMotion } from "./page-motion";
// Props cross a JSON boundary; the server-side registry generates these exact pairs.
const components = {
  header: Header,
  intro: BrandIntro,
  social: SocialLinks,
  hero: HeroExperience,
  process: Process,
  hydrobac: HydrobacExplorer,
  enquiry: EnquiryForm,
};
for (const element of document.querySelectorAll<HTMLElement>("[data-island]")) {
  const name = element.dataset.island!;
  const props = JSON.parse(element.dataset.props || "{}");
  if (name === "hero") {
    props.children = createElement("div", {
      className: "hero-copy",
      dangerouslySetInnerHTML: { __html: localHtml(props.copyHtml) },
    });
    props.assetBase = config().basePath;
    delete props.copyHtml;
  }
  if (name === "social")
    props.links = [{ platform: "mail", href: `mailto:${config().email}` }];
  if (
    name === "intro" &&
    document.documentElement.classList.contains("page-arrival")
  ) {
    element.replaceChildren();
    continue;
  }
  const Component = components[
    name as keyof typeof components
  ] as ComponentType<Record<string, unknown>>;
  hydrateRoot(element, createElement(Component, props), {
    identifierPrefix: element.dataset.prefix,
  });
}
const effects = document.getElementById("content-effects")!;
createRoot(effects).render(createElement(ContentMotion));
mountPageMotion();
document.documentElement.classList.add("interactive-ready");
