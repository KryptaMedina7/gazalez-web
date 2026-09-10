import test from "node:test";
import assert from "node:assert/strict";
import { hydrobacPlanePositions } from "../src/lib/hydrobac-layout.mjs";

test("exploded HIDROBAC planes have visible gaps and remain inside the diagram", () => {
  const [matrix, water, bacteria] = hydrobacPlanePositions(100);
  // Each visible plate extends from center -66 to center +78.
  assert.ok(water - 66 - (bacteria + 78) >= 30);
  assert.ok(matrix - 66 - (water + 78) >= 30);
  for (let opening = 0; opening <= 100; opening++) {
    for (const center of hydrobacPlanePositions(opening)) {
      assert.ok(center - 74 >= 0); // keyboard focus ring
      assert.ok(center + 78 < 550);
    }
  }
});

test("opening is reversible and out-of-range values cannot eject a plane", () => {
  assert.deepEqual(hydrobacPlanePositions(-30), hydrobacPlanePositions(0));
  assert.deepEqual(hydrobacPlanePositions(130), hydrobacPlanePositions(100));
  assert.deepEqual(hydrobacPlanePositions(NaN), hydrobacPlanePositions(0));
  const start = hydrobacPlanePositions(0);
  hydrobacPlanePositions(100);
  assert.deepEqual(hydrobacPlanePositions(0), start);
});
