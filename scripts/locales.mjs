import fs from "node:fs";
import path from "node:path";
import ts from "typescript";
const root = process.cwd();
export const normalizeText = (text) => text.replace(/\s+/g, " ").trim();
function files(dir) {
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .flatMap((e) =>
      e.isDirectory()
        ? files(path.join(dir, e.name))
        : [path.join(dir, e.name)],
    );
}
const sources = () =>
  ["src/components", "src/lib", "src/app/(es)"]
    .flatMap((d) => files(path.join(root, d)))
    .filter((f) => /\.(tsx?|jsx?|mjs|mts)$/.test(f));
function walk(source, fn) {
  const ast = ts.createSourceFile(
    source.file,
    source.code,
    ts.ScriptTarget.Latest,
    true,
  );
  const visit = (n) => {
    fn(n);
    ts.forEachChild(n, visit);
  };
  visit(ast);
}
function human(node) {
  if (ts.isJsxText(node)) return true;
  if (!(
    ts.isStringLiteralLike(node) ||
    ts.isTemplateHead(node) ||
    ts.isTemplateMiddle(node) ||
    ts.isTemplateTail(node)
  ))
    return false;
  if (
    ts.isImportDeclaration(node.parent) ||
    ts.isExportDeclaration(node.parent) ||
    ts.isLiteralTypeNode(node.parent)
  )
    return false;
  const text = normalizeText(node.text);
  return (
    (/^[A-ZÁÉÍÓÚÑ¿¡]/.test(text) &&
      !text.startsWith("M0") &&
      !/^[A-Z][\d .,-]+$/.test(text)) ||
    /[áéíóúñ¿¡]/i.test(text)
  );
}
export function extractMessages() {
  const messages = new Map();
  for (const file of sources()) {
    const code = fs.readFileSync(file, "utf8");
    walk({ file, code }, (node) => {
      if (!human(node)) return;
      const text = normalizeText(node.text);
      if (!text || text.length > 2400) return;
      if (!messages.has(text)) messages.set(text, []);
      messages.get(text).push(path.relative(root, file).replaceAll("\\", "/"));
    });
  }
  return Object.fromEntries(
    [...messages].map(([text, uses]) => [text, [...new Set(uses)]]),
  );
}
export function generateLocales() {
  for (const locale of ["en", "pt"]) {
    const dictFile = path.join(root, `src/i18n/${locale}.json`);
    if (!fs.existsSync(dictFile)) continue;
    const dictionary = JSON.parse(fs.readFileSync(dictFile, "utf8"));
    for (const file of sources()) {
      const relative = path
        .relative(path.join(root, "src"), file)
        .replaceAll("\\", "/");
      const isPage = relative.startsWith("app/(es)/");
      const destination = path.join(
        root,
        isPage
          ? `src/app/(${locale})/${locale}/${relative.slice("app/(es)/".length)}`
          : `src/generated-locales/${locale}/${relative}`,
      );
      let code = fs.readFileSync(file, "utf8");
      const edits = [];
      walk({ file, code }, (node) => {
        if (
          ts.isStringLiteralLike(node) ||
          ts.isJsxText(node) ||
          ts.isTemplateHead(node) ||
          ts.isTemplateMiddle(node) ||
          ts.isTemplateTail(node)
        ) {
          const text = normalizeText(node.text);
          if (!Object.hasOwn(dictionary, text)) return;
          const value = dictionary[text];
          if (ts.isJsxText(node)) {
            const raw = node.getFullText();
            edits.push([
              node.pos,
              node.end,
              (/^\s/.test(raw) ? " " : "") +
                value +
                (/\s$/.test(raw) ? " " : ""),
            ]);
          } else if (ts.isStringLiteralLike(node))
            edits.push([node.getStart(), node.end, JSON.stringify(value)]);
          else {
            const start = node.getStart() + (ts.isTemplateHead(node) ? 1 : 1);
            const end = node.end - (ts.isTemplateTail(node) ? 1 : 2);
            const raw = code.slice(start, end);
            edits.push([
              start,
              end,
              (/^\s/.test(raw) ? " " : "") +
                value +
                (/\s$/.test(raw) ? " " : ""),
            ]);
          }
        }
      });
      for (const [a, b, value] of edits.sort((a, b) => b[0] - a[0]))
        code = code.slice(0, a) + value + code.slice(b);
      code = code
        .replaceAll(
          '"@/components/',
          '"@/generated-locales/' + locale + "/components/",
        )
        .replaceAll('"@/lib/', '"@/generated-locales/' + locale + "/lib/");
      code = code.replace(
        /from ["']next\/link["']/g,
        `from "@/i18n/link-${locale}"`,
      );
      if (relative === "components/shell.tsx")
        code = code.replace(
          'from "./language-switcher"',
          'from "@/components/language-switcher"',
        );
      if (
        code.includes("usePathname") &&
        !relative.endsWith("page-motion.tsx") &&
        !relative.endsWith("reading-progress.tsx")
      )
        code = code.replace(
          /from ["']next\/navigation["']/g,
          `from "@/i18n/navigation-${locale}"`,
        );
      if (relative === "app/(es)/layout.tsx")
        code = code
          .replaceAll('"../', '"../../')
          .replace(
            'lang="es-CL"',
            `lang="${locale === "pt" ? "pt-BR" : "en"}"`,
          );
      code = code.replaceAll(
        'locale: "es_CL"',
        `locale: "${locale === "pt" ? "pt_BR" : "en_US"}"`,
      );
      if (isPage) {
        code = code
          .replace(
            "canonical: `/${key}/`",
            `canonical: \`/${locale}/\${key}/\``,
          )
          .replace("url: `/${key}/`", `url: \`/${locale}/\${key}/\``);
        code = code
          .replace('canonical: "/"', `canonical: "/${locale}/"`)
          .replace('url: "/"', `url: "/${locale}/"`);
      }
      const anchors = [];
      walk({ file, code }, (node) => {
        if (
          ts.isJsxAttribute(node) &&
          node.name.getText() === "href" &&
          node.parent.parent.tagName?.getText() === "a" &&
          node.initializer
        ) {
          const init = node.initializer;
          const value = ts.isJsxExpression(init)
            ? init.expression?.getText()
            : JSON.stringify(init.text);
          if (value)
            anchors.push([
              init.getStart(),
              init.end,
              `{localeHref(${value},"${locale}")}`,
            ]);
        }
      });
      if (anchors.length) {
        for (const [a, b, v] of anchors.sort((a, b) => b[0] - a[0]))
          code = code.slice(0, a) + v + code.slice(b);
        const start = code.indexOf("import ");
        code =
          code.slice(0, start) +
          `import { localHref as localeHref } from "@/i18n/routing.mjs";\n` +
          code.slice(start);
      }
      fs.mkdirSync(path.dirname(destination), { recursive: true });
      // Stable writes avoid invalidating dev watchers and incremental builds.
      if (
        !fs.existsSync(destination) ||
        fs.readFileSync(destination, "utf8") !== code
      )
        fs.writeFileSync(destination, code);
    }
  }
}
if (process.argv.includes("--extract")) {
  fs.mkdirSync("qa/i18n", { recursive: true });
  fs.writeFileSync(
    "qa/i18n/source.json",
    JSON.stringify(extractMessages(), null, 2),
  );
  console.log(Object.keys(extractMessages()).length + " messages");
}
if (process.argv.includes("--generate")) generateLocales();
