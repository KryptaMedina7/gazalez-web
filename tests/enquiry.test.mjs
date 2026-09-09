import { test } from "node:test";
import assert from "node:assert/strict";
import {
  normalizeIntent,
  formatEnquiry,
  buildMailto,
} from "../src/lib/enquiry.mjs";
test("unknown and inherited enquiry types safely use general", () => {
  for (const x of [
    null,
    undefined,
    "__proto__",
    "constructor",
    "toString",
    "bad",
  ])
    assert.equal(normalizeIntent(x), "general");
  assert.equal(normalizeIntent("subproducto"), "subproducto");
});
test("summary includes user input but excludes consent and local file objects", () => {
  const body = formatEnquiry("subproducto", {
    Nombre: " Ana ",
    Empresa: " Planta ",
    "Correo electrónico": "ana@example.com",
    "Tu requerimiento": "Evaluar biomasa & nutrición",
    consent: "on",
    attachment: "internal",
    Vacío: " ",
  });
  assert.match(body, /Nombre: Ana/);
  assert.match(body, /biomasa & nutrición/);
  assert.doesNotMatch(body, /consent|internal|Vacío/);
});
test("draft email preserves accents and escapes email header injection", () => {
  const body = "Línea 1\nconsulta & volumen #1?";
  const href = buildMailto("contacto@empresagazalez.cl", "formulacion", body);
  const u = new URL(href);
  assert.equal(u.pathname, "contacto@empresagazalez.cl");
  assert.equal(u.searchParams.get("body"), body);
  assert.equal(u.searchParams.size, 2);
  assert.ok(!href.includes("\n"));
});
