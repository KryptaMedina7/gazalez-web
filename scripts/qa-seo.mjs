import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const root = path.resolve("out");
async function walk(dir) {
  const files = [];
  for (const item of await readdir(dir, { withFileTypes: true })) {
    if (item.name.startsWith("_") || item.name === "assets") continue;
    const file = path.join(dir, item.name);
    if (item.isDirectory()) files.push(...(await walk(file)));
    else if (item.name === "index.html") files.push(file);
  }
  return files;
}
const issues = [],
  pages = new Map(),
  titles = new Map();
const attr = (tag, name) => tag.match(new RegExp(`\\b${name}="([^"]*)"`))?.[1];
for (const file of await walk(root)) {
  const route =
    "/" + path.relative(root, path.dirname(file)).replaceAll("\\", "/");
  if (route.includes("404")) continue;
  const url = route === "/" ? route : route + "/";
  const html = await readFile(file, "utf8");
  const tags = [...html.matchAll(/<(?:link|meta|img)\b[^>]*>/g)].map(
    (m) => m[0],
  );
  const canonical = tags.find((t) => attr(t, "rel") === "canonical");
  const title = html.match(/<title>(.*?)<\/title>/)?.[1];
  const language = html.match(/<html[^>]*lang="([^"]+)"/)?.[1] || "missing";
  const titleKey = language + ":" + title;
  if (!title) issues.push(`${url}: missing title`);
  else if (titles.has(titleKey))
    issues.push(`${url}: duplicate title with ${titles.get(titleKey)}`);
  else titles.set(titleKey, url);
  for (const key of ["description", "robots"])
    if (!tags.some((t) => attr(t, "name") === key && attr(t, "content")))
      issues.push(`${url}: missing ${key}`);
  if (!canonical || new URL(attr(canonical, "href")).pathname !== url)
    issues.push(`${url}: canonical mismatch`);
  if ((html.match(/<h1\b/g) || []).length !== 1)
    issues.push(`${url}: H1 count`);
  if (!tags.some((t) => attr(t, "property") === "og:image"))
    issues.push(`${url}: missing social image`);
  for (const tag of tags.filter((t) => t.startsWith("<img")))
    if (attr(tag, "alt") === undefined)
      issues.push(`${url}: image without alt`);
  const alternates = tags
    .filter((t) => attr(t, "hrefLang"))
    .map((t) => [attr(t, "hrefLang"), new URL(attr(t, "href")).pathname]);
  if (alternates.length < 3) issues.push(`${url}: missing language alternates`);
  pages.set(url, {
    alternates,
    links: [...html.matchAll(/<a\b[^>]*href="(\/[^"?#]*)/g)].map((m) => m[1]),
  });
}
for (const [route, page] of pages)
  for (const [, alternate] of page.alternates) {
    if (!pages.has(alternate))
      issues.push(`${route}: missing alternate ${alternate}`);
    else if (
      !pages.get(alternate).alternates.some(([, back]) => back === route)
    )
      issues.push(`${route}: nonreciprocal alternate ${alternate}`);
  }
const reached = new Set(),
  queue = ["/", "/en/", "/pt/"];
while (queue.length) {
  const url = queue.shift();
  if (reached.has(url) || !pages.has(url)) continue;
  reached.add(url);
  queue.push(...pages.get(url).links);
}
for (const url of pages.keys())
  if (!reached.has(url))
    issues.push(`${url}: not reachable from a language homepage`);
const sitemap = await readFile(path.join(root, "sitemap.xml"), "utf8");
const sitemapPaths = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(
  (m) => new URL(m[1]).pathname,
);
for (const url of pages.keys())
  if (!sitemapPaths.includes(url)) issues.push(`${url}: absent from sitemap`);
console.log(
  JSON.stringify(
    {
      pages: pages.size,
      reachable: reached.size,
      uniqueTitles: titles.size,
      sitemapEntries: sitemapPaths.length,
      issues,
    },
    null,
    2,
  ),
);
if (issues.length) process.exitCode = 1;
