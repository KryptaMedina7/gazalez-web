import { readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";
const root = path.resolve("out");
const issues = [];
let pages = 0,
  links = 0;
async function walk(dir) {
  const files = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    if (e.name === "_next") continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) files.push(...(await walk(p)));
    else if (e.name === "index.html") files.push(p);
  }
  return files;
}
for (const file of await walk(root)) {
  const html = await readFile(file, "utf8");
  pages++;
  if ((html.match(/<h1\b/g) || []).length !== 1)
    issues.push(`${file}: expected one h1`);
  if (!html.includes("<title>")) issues.push(`${file}: missing title`);
  for (const m of html.matchAll(/(?:href|src)="(\/[^"#?]*)(?:[?#][^"]*)?"/g)) {
    links++;
    const url = m[1];
    const target = path.join(
      root,
      decodeURIComponent(url),
      url.endsWith("/") ? "index.html" : "",
    );
    try {
      await stat(target);
    } catch {
      issues.push(`Missing internal asset/link ${url} from ${file}`);
    }
  }
}
// Dropdown destinations are mounted on interaction, so verify their source links too.
const navigationSource = await readFile("src/lib/navigation.ts", "utf8");
for (const match of navigationSource.matchAll(/"(\/[^"#?]+)"/g)) {
  links++;
  try {
    await stat(path.join(root, match[1], "index.html"));
  } catch {
    issues.push("Missing navigation destination " + match[1]);
  }
}
const home = await readFile(path.join(root, "index.html"), "utf8");
if (!home.includes("22ce3cc8")) issues.push("Missing emitted design contract");
for (const file of ["sitemap.xml", "robots.txt", "404.html"])
  try {
    await stat(path.join(root, file));
  } catch {
    issues.push(`Missing ${file}`);
  }
const robots = await readFile(path.join(root, "robots.txt"), "utf8");
console.log(
  JSON.stringify(
    {
      pages,
      internalReferencesChecked: links,
      previewNoindex: robots.includes("Disallow: /"),
      issues,
    },
    null,
    2,
  ),
);
if (issues.length) process.exitCode = 1;
