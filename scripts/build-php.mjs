import fs from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { build } from "../tools/php/node_modules/esbuild/lib/main.js";
import postcss from "postcss";
import tailwind from "@tailwindcss/postcss";
const root = process.cwd();
const target = path.join(root, "php-site");
const generated = path.join(root, "tmp/php-build");
await fs.mkdir(generated, { recursive: true });
await fs.mkdir(path.join(target, "public/build"), { recursive: true });
const resolve = (p) => path.join(root, p);
const aliases = {
  "next/link": resolve("php-client/compat/link.tsx"),
  "next/image": resolve("php-client/compat/image.tsx"),
  "next/navigation": resolve("php-client/compat/navigation.ts"),
  "@/lib/site": resolve("php-client/compat/site.ts"),
  "@": resolve("src"),
};
const common = {
  bundle: true,
  jsx: "automatic",
  alias: aliases,
  define: {
    "process.env.NODE_ENV": '"production"',
    "process.env.NEXT_PUBLIC_SITE_URL": '"https://www.empresasgazalez.cl"',
    "process.env.NEXT_PUBLIC_CONTACT_EMAIL": '"contacto@empresagazalez.cl"',
    "process.env.NEXT_PUBLIC_INDEXABLE": '"false"',
  },
  logLevel: "warning",
};
const css = await postcss([tailwind()]).process(
  await fs.readFile("src/app/globals.css", "utf8"),
  { from: resolve("src/app/globals.css") },
);
await fs.writeFile(path.join(generated, "base.css"), css.css);
await fs.writeFile(
  path.join(generated, "entry.css"),
  `@import "${resolve("node_modules/@fontsource-variable/manrope/index.css").replaceAll("\\", "/")}";\n@import "${resolve("node_modules/@fontsource-variable/lexend/index.css").replaceAll("\\", "/")}";\n@import "./base.css";\n.php-island{display:contents}html.page-arrival .brand-intro{display:none}.php-fallback{padding:20px var(--space);background:var(--mint-light)}.php-fallback a{display:inline-block;margin:8px}.brand-intro{animation:php-intro-failsafe 0s 2.4s forwards}@keyframes php-intro-failsafe{to{visibility:hidden;pointer-events:none}}\n`,
);
const browser = await build({
  ...common,
  entryPoints: {
    app: "php-client/client.tsx",
    styles: path.join(generated, "entry.css"),
  },
  outdir: path.join(target, "public/build"),
  entryNames: "[name]-[hash]",
  assetNames: "[name]-[hash]",
  chunkNames: "chunk-[hash]",
  format: "esm",
  splitting: true,
  minify: true,
  target: ["es2020"],
  loader: { ".woff2": "file", ".woff": "file" },
  metafile: true,
});
const outputs = Object.entries(browser.metafile.outputs);
const liveFiles = new Set(outputs.map(([file]) => path.basename(file)));
for (const file of await fs.readdir(path.join(target, "public/build"))) {
  if (!liveFiles.has(file) && /\.(?:js|css|woff2?)$/.test(file))
    await fs.unlink(path.join(target, "public/build", file));
}
if (
  Object.keys(browser.metafile.inputs).some((p) =>
    /node_modules[\\/]next[\\/]/.test(p),
  )
)
  throw new Error("Next.js leaked into PHP browser bundle");
const manifest = {};
for (const [file, data] of outputs)
  if (data.entryPoint) {
    if (file.endsWith(".js") && data.entryPoint.endsWith("client.tsx"))
      manifest.js = "/build/" + path.basename(file);
    if (file.endsWith(".css")) manifest.css = "/build/" + path.basename(file);
  }
await fs.writeFile(
  path.join(target, "app/assets.json"),
  JSON.stringify(manifest, null, 2),
);
await fs.cp("public", path.join(target, "public"), { recursive: true });
// Existing PHP views are deliberately never overwritten by the normal asset build.
if (process.argv.includes("--migrate-views")) {
  if (
    await fs.access(path.join(target, "app/routes.json")).then(
      () => true,
      () => false,
    )
  )
    throw new Error(
      "PHP views already migrated. Edit php-site/views directly; migration is intentionally one-time.",
    );
  const targets = {
    "@/components/process": [
      "Process",
      "process",
      "src/components/process.tsx",
    ],
    "@/components/ui/hero-experience": [
      "HeroExperience",
      "hero",
      "src/components/ui/hero-experience.tsx",
    ],
    "@/components/ui/hydrobac-explorer": [
      "HydrobacExplorer",
      "hydrobac",
      "src/components/ui/hydrobac-explorer.tsx",
    ],
    "@/components/enquiry-form": [
      "EnquiryForm",
      "enquiry",
      "src/components/enquiry-form.tsx",
    ],
  };
  await build({
    ...common,
    entryPoints: ["php-client/migrate.tsx"],
    outfile: path.join(generated, "migrate.cjs"),
    platform: "node",
    format: "cjs",
    packages: "external",
    plugins: [
      {
        name: "php-islands",
        setup(b) {
          b.onResolve({ filter: /^@\/components\// }, (args) =>
            targets[args.path]
              ? { path: args.path, namespace: "island" }
              : undefined,
          );
          b.onLoad({ filter: /.*/, namespace: "island" }, (args) => {
            const [name, id, file] = targets[args.path];
            return {
              contents: `import { ${name} as Original } from ${JSON.stringify(resolve(file))}; import { island } from ${JSON.stringify(resolve("php-client/island-server.tsx"))}; export function ${name}(props) { return island(${JSON.stringify(id)}, Original, props); }`,
              loader: "tsx",
              resolveDir: root,
            };
          });
        },
      },
    ],
  });
  const { allRoutes, renderRoute } = await import(
    pathToFileURL(path.join(generated, "migrate.cjs")).href
  );
  const routes = {};
  const asPhp = (html) =>
    '<?php defined("GAZALEZ_APP") || exit; ?>\n' +
    html
      .replaceAll("contacto@empresagazalez.cl", "<?= e($config['email']) ?>")
      .replace(/© \d{4}/g, "© <?= date('Y') ?>") +
    "\n";
  for (const route of [...allRoutes, "/404/"]) {
    const key =
      route === "/" ? "inicio" : route.slice(1, -1).replaceAll("/", "--");
    const data = await renderRoute(route);
    await fs.writeFile(
      path.join(target, "views/pages", key + ".php"),
      asPhp(data.content),
    );
    await fs.writeFile(
      path.join(target, "views/headers", key + ".php"),
      asPhp(data.header),
    );
    routes[route] = {
      view: key,
      title:
        data.metadata.title +
        (route !== "/" && route !== "/404/" ? " | GAZALEZ" : ""),
      description: data.metadata.description,
    };
    if (route === "/")
      for (const part of ["footer", "intro", "social"])
        await fs.writeFile(
          path.join(target, "views/partials", part + ".php"),
          asPhp(data[part]),
        );
  }
  await fs.writeFile(
    path.join(target, "app/routes.json"),
    JSON.stringify(routes, null, 2),
  );
}
console.log(
  JSON.stringify(
    {
      php: target,
      assets: manifest,
      nextRuntime: false,
      bundleBytes: outputs.reduce((sum, [, v]) => sum + v.bytes, 0),
    },
    null,
    2,
  ),
);
