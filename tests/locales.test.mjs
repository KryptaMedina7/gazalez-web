import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import {
  localHref,
  stripLocale,
  localeOf,
  languageAlternates,
} from "../src/i18n/routing.mjs";

test("language changes retain routes, anchors and enquiry context", () => {
  assert.equal(
    localHref("/pt/contacto/?interes=subproducto#contenido", "en"),
    "/en/contacto/?interes=subproducto#contenido",
  );
  assert.equal(
    localHref("/en/innovacion/hidrobac/", "es"),
    "/innovacion/hidrobac/",
  );
  assert.equal(localHref("/en/", "en"), "/en/");
  assert.equal(stripLocale("/enterprise/"), "/enterprise/");
  assert.equal(localeOf("/pt/empresa/"), "pt");
  assert.equal(localeOf("/pt-br/"), "es");
});

test("locale routing leaves downloads and external destinations intact", () => {
  for (const href of [
    "/assets/brand/logo.svg",
    "/_next/static/chunk.js",
    "//example.com/",
    "https://example.com/",
    "mailto:contacto@empresagazalez.cl",
    "#contenido",
  ]) {
    assert.equal(localHref(href, "pt"), href);
  }
  assert.deepEqual(languageAlternates("/contacto/"), {
    "es-CL": "/contacto/",
    en: "/en/contacto/",
    "pt-BR": "/pt/contacto/",
    "x-default": "/contacto/",
  });
});

test("English and Portuguese cover the same nonempty message set", () => {
  const dictionaries = ["en", "pt"].map((locale) =>
    JSON.parse(
      fs.readFileSync(new URL(`../src/i18n/${locale}.json`, import.meta.url)),
    ),
  );
  assert.deepEqual(
    Object.keys(dictionaries[0]).sort(),
    Object.keys(dictionaries[1]).sort(),
  );
  for (const dictionary of dictionaries) {
    for (const [key, value] of Object.entries(dictionary)) {
      assert.ok(typeof value === "string" && value.trim(), key);
      assert.equal(
        (value.match(/\$\{/g) || []).length,
        (key.match(/\$\{/g) || []).length,
        `Template placeholder changed: ${key}`,
      );
    }
  }
});
