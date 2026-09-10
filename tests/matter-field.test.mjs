import test from "node:test";
import assert from "node:assert/strict";
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

test("paint batches every particle into at most nine fills", () => {
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
    assert.equal(arcs, field.count);
    assert.ok(fills <= 9);
  }
});
