import test from "node:test";
import assert from "node:assert/strict";
import {
  materialCount,
  materialPosition,
  materialIndices,
  trayPose,
} from "../src/lib/process-volume.mjs";

test("device budgets retain every material fraction without duplicated identities", () => {
  for (const [compact, constrained, count] of [
    [false, false, 180],
    [true, false, 90],
    [true, true, 60],
  ]) {
    const indices = materialIndices(compact, constrained);
    assert.equal(indices.length, count);
    assert.equal(new Set(indices).size, count);
    for (let fraction = 0; fraction < 3; fraction++)
      assert.equal(indices.filter((i) => i % 3 === fraction).length, count / 3);
  }
});

test("all stages have bounded volume and recovery keeps separated fractions above their supports", () => {
  for (let stage = 0; stage < 4; stage++) {
    for (let i = 0; i < materialCount; i++) {
      const p = materialPosition(stage, i);
      assert.ok([p.x, p.y, p.z].every(Number.isFinite));
      assert.ok(
        Math.abs(p.x) < 3.2 && Math.abs(p.z) < 2 && p.y >= 0 && p.y < 2,
      );
      if (stage === 1) {
        const tray = trayPose(stage, (i % 3) + 1);
        assert.ok(Math.hypot(p.x - tray.x, p.z) < tray.scale);
        assert.ok(p.y > tray.y + 0.08);
      }
    }
  }
});

test("mobile sampling covers the full formulation volume, rather than one half", () => {
  for (const constrained of [false, true]) {
    const points = materialIndices(true, constrained).map((i) =>
      materialPosition(2, i),
    );
    for (const axis of ["x", "z"]) {
      assert.ok(Math.min(...points.map((p) => p[axis])) < -0.9);
      assert.ok(Math.max(...points.map((p) => p[axis])) > 0.9);
    }
    assert.ok(Math.max(...points.map((p) => p.y)) >= 1.5);
  }
});

test("formulation combines the same identities inside one volume and traceable stations stay distinct", () => {
  for (let i = 0; i < materialCount; i++) {
    const recovered = materialPosition(1, i);
    const formulated = materialPosition(2, i);
    const connected = materialPosition(3, i);
    assert.ok(Math.abs(formulated.x) <= 0.93 && Math.abs(formulated.z) <= 0.93);
    assert.ok(Math.abs(connected.x - ((i % 3) - 1) * 2.25) < 0.74);
    assert.notDeepEqual(recovered, formulated);
    assert.notDeepEqual(formulated, connected);
  }
});
