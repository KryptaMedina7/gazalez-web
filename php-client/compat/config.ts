export function config() {
  if (typeof document === "undefined")
    return { basePath: "", path: "/", email: "contacto@empresagazalez.cl" };
  return JSON.parse(
    document.getElementById("gazalez-config")?.textContent || "{}",
  );
}
export function localUrl(url: string) {
  const base = config().basePath || "";
  return url.startsWith("/") &&
    !url.startsWith("//") &&
    !(base && (url === base || url.startsWith(base + "/")))
    ? base + url
    : url;
}
export function localHtml(html: string) {
  return html.replace(
    /\b(href|src|srcset|action)="(\/(?!\/)[^"]*)"/g,
    (_, attr, url) => `${attr}="${localUrl(url)}"`,
  );
}
