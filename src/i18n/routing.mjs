export const locales = ["es", "en", "pt"];
export function stripLocale(pathname) {
  return pathname.replace(/^\/(en|pt)(?=\/|$)/, "") || "/";
}
export function localeOf(pathname) {
  return /^\/(en|pt)(?=\/|$)/.exec(pathname)?.[1] || "es";
}
export function localHref(href, locale) {
  if (
    typeof href !== "string" ||
    !href.startsWith("/") ||
    href.startsWith("//") ||
    href.startsWith("/assets/") ||
    href.startsWith("/_next/")
  )
    return href;
  const path = stripLocale(href);
  return locale === "es"
    ? path
    : `/${locale}${path.startsWith("/") ? path : "/" + path}`;
}
export function languageAlternates(pathname) {
  return {
    "es-CL": localHref(pathname, "es"),
    en: localHref(pathname, "en"),
    "pt-BR": localHref(pathname, "pt"),
    "x-default": localHref(pathname, "es"),
  };
}
