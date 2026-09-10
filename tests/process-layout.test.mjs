import test from "node:test";
import assert from "node:assert/strict";
import {
  processParticles,
  processPosition,
} from "../src/lib/process-layout.mjs";

test("every process stage keeps desktop and mobile particles inside the diagram, away from labels", () => {
  for (let stage = 0; stage < 4; stage++) {
    for (let i = 0; i < processParticles.length; i++) {
      const { x, y } = processPosition(stage, i);
      assert.ok(x >= 65 && x <= 535, `stage ${stage}, particle ${i}: x`);
      assert.ok(y >= 85 && y <= 260, `stage ${stage}, particle ${i}: y`);
    }
  }
});

test("mobile retains all three material fractions and visibly reforms them", () => {
  const mobile = processParticles.map((_, i) => i).filter((i) => i % 3 === 0);
  assert.equal(mobile.length, 40);
  for (let group = 0; group < 3; group++) {
    const fraction = mobile.filter((i) => Math.floor(i / 40) === group);
    assert.ok(fraction.length >= 13);
    for (const i of fraction) {
      const recovered = processPosition(1, i);
      assert.ok(
        recovered.x >= 65 + group * 170 && recovered.x <= 193 + group * 170,
      );
      const formulated = processPosition(2, i);
      assert.ok(formulated.x > 193 && formulated.x < 407);
      const traced = processPosition(3, i);
      assert.ok(
        Math.hypot(traced.x - (130 + group * 170), traced.y - 174) < 58,
      );
      assert.notDeepEqual(recovered, formulated);
    }
  }
});
