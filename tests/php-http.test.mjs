import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
// Integration suite is opt-in because it requires a running PHP preview.
const origin = process.env.PHP_QA_URL;
const run = origin ? test : test.skip;
const get = (url, init) => fetch(origin.replace(/\/$/, "") + url, init);
run(
  "PHP serves every declared route, metadata and content without Next.js",
  async () => {
    const routes = JSON.parse(
      await fs.readFile("php-site/app/routes.json", "utf8"),
    );
    for (const [route, info] of Object.entries(routes)) {
      if (route === "/404/") continue;
      const response = await get(route);
      assert.equal(response.status, 200, route);
      assert.equal(
        response.headers.get("content-type"),
        "text/html; charset=utf-8",
      );
      const html = await response.text();
      assert.ok(html.includes("<h1"), route);
      assert.ok(
        html.includes(
          info.title.replaceAll("&", "&amp;").replaceAll('"', "&quot;"),
        ),
        route,
      );
      assert.ok(!html.includes("/_next/") && !html.includes("__next_f"), route);
      assert.ok(
        html.includes('name="robots" content="noindex,nofollow"'),
        route,
      );
      assert.ok(html.includes("contacto@empresagazalez.cl"), route);
    }
  },
);
run(
  "PHP routes reject unknown pages and unsupported methods, and preserve query on canonical redirect",
  async () => {
    assert.equal((await get("/no-existe/")).status, 404);
    assert.equal((await get("/app/config.php")).status, 404);
    assert.equal((await get("/views/pages/inicio.php")).status, 404);
    assert.equal((await get("/.htaccess")).status, 404);
    assert.equal(
      (await get("/contacto/", { method: "POST", body: "test=local" })).status,
      405,
    );
    const redirect = await get("/contacto?interes=subproducto", {
      redirect: "manual",
    });
    assert.equal(redirect.status, 301);
    assert.ok(
      redirect.headers
        .get("location")
        .endsWith("/contacto/?interes=subproducto"),
    );
    const head = await get("/empresa/", { method: "HEAD" });
    assert.equal(head.status, 200);
    assert.equal(await head.text(), "");
  },
);
run("PHP SEO and local asset references resolve", async () => {
  const robots = await (await get("/robots.txt")).text();
  assert.ok(robots.includes("Disallow: /"));
  const sitemap = await (await get("/sitemap.xml")).text();
  assert.equal((sitemap.match(/<loc>/g) || []).length, 20);
  const html = await (await get("/")).text();
  const root = new URL(origin);
  const files = new Set(
    [...html.matchAll(/(?:src|href)="([^"#]+)"/g)]
      .map((m) => m[1])
      .filter((x) => /\.(png|jpg|webp|css|js|svg)(?:$|\?)/.test(x)),
  );
  for (const url of files) {
    const response = await fetch(new URL(url, root));
    assert.equal(response.status, 200, url);
    assert.ok(
      !response.headers.get("content-type")?.includes("text/html"),
      url,
    );
  }
});
