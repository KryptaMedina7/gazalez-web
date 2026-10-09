import { test } from "node:test";
import assert from "node:assert/strict";
import {
  clampProgress,
  interpolateSample,
  sampleCount,
  trayPose,
} from "../src/lib/material-lab.mjs";
import {
  findProductFamily,
  familyEnquiryHref,
} from "../src/lib/product-families.mjs";

test("material scenes remain finite, in frame and continuous across every chapter", () => {
  for (const recovery of [false, true]) {
    for (let i = 0; i < sampleCount; i++) {
      for (let p = 0; p <= 3; p += 0.025) {
        const [x, y, angle] = interpolateSample(i, p, recovery);
        assert.ok([x, y, angle].every(Number.isFinite));
        assert.ok(x >= 12 && x <= 628 && y >= 12 && y <= 373);
      }
      for (const boundary of [1, 2]) {
        const a = interpolateSample(i, boundary - 0.001, recovery);
        const b = interpolateSample(i, boundary + 0.001, recovery);
        assert.ok(Math.hypot(a[0] - b[0], a[1] - b[1]) < 0.01);
      }
    }
  }
  assert.equal(clampProgress(NaN), 0);
  assert.equal(clampProgress(-2), 0);
  assert.equal(clampProgress(5), 3);
});

test("moving samples remain on their matching trays throughout transitions", () => {
  for (const recovery of [false, true]) {
    for (let p = 0; p <= 3; p += 0.025) {
      for (let i = 0; i < sampleCount; i++) {
        const [x, y] = interpolateSample(i, p, recovery);
        const [cx, cy, radius, opacity] = trayPose(i % 3, p, recovery);
        assert.ok(opacity >= 0 && opacity <= 1);
        const inside = ((x - cx) / radius) ** 2 + ((y - cy) / (radius / 2)) ** 2;
        assert.ok(inside < 1, `sample ${i} at ${p} leaves its tray`);
      }
    }
  }
});

test("family enquiry routing accepts only known public family IDs", () => {
  for (const value of [
    null,
    undefined,
    "__proto__",
    "constructor",
    "<script>",
    "inventado",
  ]) {
    assert.equal(findProductFamily(value), undefined);
    assert.equal(familyEnquiryHref(value), "/contacto/");
  }
  const href = new URL(familyEnquiryHref("nucleos"), "https://example.test");
  assert.equal(href.pathname, "/contacto/");
  assert.equal(href.searchParams.get("familia"), "nucleos");
  assert.equal(href.searchParams.get("interes"), "formulacion");
});
