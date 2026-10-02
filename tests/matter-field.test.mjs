import test from "node:test";
import assert from "node:assert/strict";
import { stat } from "node:fs/promises";
import sharp from "sharp";
import {
  createMatterField,
  matterPixelRatio,
} from "../src/lib/matter-field.mjs";

const snapshot = (field) =>
  field.buckets.map((values, i) => [
    ...values.subarray(0, field.lengths[i] * 3),
  ]);

test("matter geometry is finite and reversible across phone, landscape and desktop", () => {
  for (const [width, height, compact] of [
    [240, 560, true],
    [390, 766, true],
    [844, 312, true],
    [1440, 800, false],
  ]) {
    const field = createMatterField(compact);
    field.update(width, height, 0);
    const opening = snapshot(field);
    for (const p of [0.1, 0.3, 0.5, 0.8, 1]) {
      field.update(width, height, p);
      assert.equal(
        [...field.lengths].reduce((a, b) => a + b),
        field.count,
      );
      assert.ok(snapshot(field).flat().every(Number.isFinite));
      for (const values of snapshot(field)) {
        for (let i = 2; i < values.length; i += 3)
          assert.ok(values[i] > 0 && values[i] < 6);
      }
    }
    assert.notDeepEqual(snapshot(field), opening);
    field.update(width, height, 0);
    assert.deepEqual(snapshot(field), opening);
    field.update(width, height, -1);
    assert.deepEqual(snapshot(field), opening);
  }
});

test("lateral release preserves the DNA, reverses exactly and clears the canvas", () => {
  for (const compact of [false, true]) {
    const field = createMatterField(compact);
    field.update(390, 766, 1);
    const formed = snapshot(field);
    for (const release of [0.15, 0.5, 0.85, 1]) {
      field.update(390, 766, 1, release);
      assert.ok(snapshot(field).flat().every(Number.isFinite));
      assert.equal(
        [...field.lengths].reduce((a, b) => a + b),
        field.count,
      );
    }
    for (const bucket of snapshot(field))
      for (let i = 0; i < bucket.length; i += 3)
        assert.ok(bucket[i + 1] - bucket[i + 2] > 766);
    field.update(390, 766, 1, 0);
    assert.deepEqual(snapshot(field), formed);
  }
});

test("raster budget holds on high density phones and 4K screens", () => {
  for (const [w, h, deviceRatio, compact] of [
    [390, 844, 3, true],
    [1000, 1400, 3, true],
    [3840, 2160, 2, false],
  ]) {
    const ratio = matterPixelRatio(w, h, deviceRatio, compact);
    assert.ok(w * h * ratio ** 2 <= (compact ? 1_500_000 : 3_000_000) + 0.01);
    assert.ok(ratio > 0 && ratio <= deviceRatio);
  }
});

test("depth bands preserve occlusion order while framing reverses independently", () => {
  const field = createMatterField(false);
  field.update(1440, 800, 1, 0, 0);
  const opening = snapshot(field);
  let previousRadius = 0;
  for (const band of opening) {
    if (!band.length) continue;
    const radii = band.filter((_, index) => index % 3 === 2);
    const mean = radii.reduce((sum, radius) => sum + radius, 0) / radii.length;
    assert.ok(mean > previousRadius, "near planes must not be painted behind smaller far planes");
    previousRadius = mean;
  }
  field.update(1440, 800, 1, 0, 1);
  const expanded = snapshot(field);
  assert.notDeepEqual(expanded, opening);
  for (let band = 0; band < opening.length; band++) {
    for (let index = 0; index < opening[band].length; index++) {
      if (index % 3 !== 0) assert.equal(expanded[band][index], opening[band][index]);
    }
  }
  field.update(1440, 800, 1, 0, 0);
  assert.deepEqual(snapshot(field), opening);
});

test("paint uses a bounded depth pass and small front-surface highlights", () => {
  for (const compact of [true, false]) {
    const field = createMatterField(compact);
    let fills = 0,
      arcs = 0;
    field.update(390, 766, 0.5);
    field.paint({
      fillStyle: "",
      beginPath() {},
      moveTo() {},
      arc() {
        arcs++;
      },
      fill() {
        fills++;
      },
    });
    assert.ok(arcs >= field.count && arcs <= field.count * 1.5);
    assert.ok(fills <= 12);
  }
});

test("pointer exploration is bounded, reversible and disabled for touch and release", () => {
  const field = createMatterField(false);
  field.update(1440, 800, 0.82, 0, 0);
  const neutral = snapshot(field);
  field.update(1440, 800, 0.82, 0, 0, 1, -1);
  const explored = snapshot(field);
  assert.notDeepEqual(explored, neutral);
  assert.ok(explored.flat().every(Number.isFinite));
  field.update(1440, 800, 0.82, 0, 0, 100, -100);
  assert.deepEqual(snapshot(field), explored);
  field.update(1440, 800, 0.82, 0, 0, 0, 0);
  assert.deepEqual(snapshot(field), neutral);
  field.update(1440, 800, 1, 0.5, 1);
  const released = snapshot(field);
  field.update(1440, 800, 1, 0.5, 1, 1, 1);
  assert.deepEqual(snapshot(field), released);
  const mobile = createMatterField(true);
  mobile.update(390, 600, 1, 0, 0);
  const touch = snapshot(mobile);
  mobile.update(390, 600, 1, 0, 0, 1, -1);
  assert.deepEqual(snapshot(mobile), touch);
});

test("mobile scenes decode with transparency within transfer and texture budgets", async () => {
  for (const format of ["portrait", "landscape"]) {
    let bytes = 0,
      pixels = 0;
    for (const phase of ["scattered", "formed"]) {
      const path = `public/assets/matter/${format}-${phase}.webp`;
      const meta = await sharp(path).metadata();
      assert.equal(meta.format, "webp");
      assert.equal(meta.hasAlpha, true);
      assert.ok(meta.width > 500 && meta.height > 400);
      await sharp(path).raw().toBuffer();
      bytes += (await stat(path)).size;
      pixels += meta.width * meta.height;
    }
    assert.ok(bytes < 130_000, `transfer budget: ${format}`);
    assert.ok(pixels < 1_500_000, `decoded texture budget: ${format}`);
  }
});
