import fs from "node:fs";
import path from "node:path";
const walk = (p) =>
  fs
    .readdirSync(p, { withFileTypes: true })
    .flatMap((e) =>
      e.isDirectory() ? walk(path.join(p, e.name)) : [path.join(p, e.name)],
    );
const issues = [];
let pages = 0;
for (const l of ["en", "pt"]) {
  const dict = JSON.parse(fs.readFileSync(`src/i18n/${l}.json`));
  for (const f of walk(`out/${l}`).filter((f) => f.endsWith("index.html"))) {
    pages++;
    const h = fs.readFileSync(f, "utf8");
    const text = h
      .replace(/<script[\s\S]*?<\/script>/g, "")
      .replace(/<style[\s\S]*?<\/style>/g, "")
      .replace(/<[^>]*>/g, " ")
      .replace(/\s+/g, " ");
    for (const k of Object.keys(dict)) {
      if (k.length > 38 && k !== dict[k] && text.includes(k))
        issues.push([f, k]);
    }
    if (!h.includes(`lang="${l === "pt" ? "pt-BR" : "en"}"`))
      issues.push([f, "Incorrect lang"]);
    for (const m of h.matchAll(/href="(\/(?!_next|assets)[^"?#]*)/g)) {
      if (m[1].startsWith(`/${l}/`) || m[1].includes("favicon")) continue;
      if (m[1].startsWith("/en/") || m[1].startsWith("/pt/") || m[1] === "/")
        continue;
      issues.push([f, "Unlocalized link: " + m[1]]);
    }
  }
}
console.log(JSON.stringify({ pages, issues }, null, 2));
if (issues.length) process.exitCode = 1;
