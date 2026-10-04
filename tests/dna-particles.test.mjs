import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import sharp from "sharp";
import {
  decodeDnaSamples,
  dnaLayout,
  trailEnvelope,
  packDnaTrail,
  DNA_TRAIL_SECONDS,
} from "../src/lib/dna-particles.mjs";

const data = await readFile("public/assets/dna/helix.bin");
const buffer = data.buffer.slice(
  data.byteOffset,
  data.byteOffset + data.byteLength,
);

test("DNA samples cover the double helix at both particle budgets", () => {
  for (const compact of [false, true]) {
    const samples = decodeDnaSamples(buffer, compact);
    assert.equal(samples.count, compact ? 6000 : 18000);
    assert.ok(
      samples.positions.every((v) => Number.isFinite(v) && v >= 0 && v <= 1),
    );
    const bands = new Uint32Array(6);
    for (let i = 1; i < samples.positions.length; i += 3)
      bands[Math.min(5, Math.floor(samples.positions[i] * 6))]++;
    assert.ok(
      bands.every((n) => n > samples.count * 0.05),
      "a reduced budget must not remove one end of the molecule",
    );
  }
  assert.throws(() => decodeDnaSamples(new ArrayBuffer(8), false), /Invalid/);
});

test("mobile DNA leaves the caption clear, desktop keeps opening DNA away from copy", () => {
  for (const [w, h, compact] of [
    [320, 480, true],
    [390, 560, true],
    [844, 260, true],
    [1440, 813, false],
    [1920, 993, false],
  ]) {
    const opening = dnaLayout(w, h, 0, compact);
    assert.ok(opening.x - opening.width / 2 >= (compact ? 0 : w * 0.47));
    if (compact) assert.ok(opening.y + opening.height / 2 <= h * 0.7);
    assert.deepEqual(dnaLayout(w, h, -1, compact), opening);
    assert.equal(dnaLayout(w, h, 1, compact).release, 1);
    assert.deepEqual(dnaLayout(w, h, 2, compact), dnaLayout(w, h, 1, compact));
    assert.equal(dnaLayout(w, h, compact ? 0.48 : 0.7, compact).release, 0);
  }
});

test("local pointer trail expires completely, allowing the renderer to sleep", () => {
  assert.equal(trailEnvelope(-1), 0);
  assert.equal(trailEnvelope(0), 0);
  assert.ok(trailEnvelope(0.2) > 0);
  assert.equal(trailEnvelope(DNA_TRAIL_SECONDS), 0);
  assert.equal(trailEnvelope(60), 0);
});

test("packed pointer impulses preserve the original particle response and expire without losing the first frame", () => {
  const samples = Array.from({ length: 12 }, (_, i) => ({
    x: 500 + i * 17,
    y: 250 + i * 9,
    z: 2 - i * 0.08,
    w: 0.3 + i * 0.04,
  }));
  const output = Array.from({ length: 12 }, () => ({
    x: 0,
    y: 0,
    z: 0,
    w: 0,
    set(x, y, z, w) {
      Object.assign(this, { x, y, z, w });
    },
  }));
  const identities = [...output];
  // Compare the GPU's former per-vertex envelope with the shared packed result.
  for (const now of [2, 2.016, 2.2, 2.84, 3, 10]) {
    const count = packDnaTrail(samples, output, now);
    for (const [x, y] of [
      [540, 260],
      [700, 390],
      [10, 10],
    ]) {
      const strength = (px, py) =>
        Math.max(0, 1 - Math.hypot(x - px, y - py) / 145) ** 2;
      const original = samples.reduce((sum, sample) => {
        const life = Math.max(
          0,
          Math.min(1, (now - sample.z) / DNA_TRAIL_SECONDS),
        );
        return (
          sum +
          strength(sample.x, sample.y) *
            Math.sin(life * Math.PI) *
            (1 - life) *
            sample.w
        );
      }, 0);
      const packed = output
        .slice(0, count)
        .reduce(
          (sum, sample) => sum + strength(sample.x, sample.y) * sample.z,
          0,
        );
      assert.ok(Math.abs(original - packed) < 1e-12);
    }
    output.forEach((entry, i) =>
      assert.equal(entry, identities[i], "reuse uniform slots"),
    );
    if (now >= 3) assert.equal(count, 0, "no GPU pointer loop after expiry");
  }
  assert.equal(
    packDnaTrail([{ x: 1, y: 2, z: 5, w: 1 }], output, 5),
    1,
    "schedule the next frame even though the initial envelope is zero",
  );
  assert.equal(packDnaTrail([{ x: 1, y: 2, z: 5, w: 1 }], output, 4), 0);
  assert.equal(packDnaTrail([{ x: 1, y: 2, z: 5, w: 0 }], output, 5.2), 0);
});

test("combined axial rotation and lateral inclination preserve volume and text clearance", () => {
  const { positions } = decodeDnaSamples(buffer, true);
  for (const [w, h, compact] of [
    [320, 480, true],
    [390, 560, true],
    [768, 560, true],
    [1440, 813, false],
  ]) {
    for (let step = 0; step <= 40; step++) {
      const p = step / 40;
      const pose = dnaLayout(w, h, p, compact);
      const c = Math.cos(pose.yaw),
        s = Math.sin(pose.yaw);
      for (let i = 0; i < positions.length; i += 3) {
        const x = positions[i] - 0.5,
          y = positions[i + 1] - 0.5,
          z = positions[i + 2] - 0.5;
        const rx = x * c + z * s,
          rz = -x * s + z * c;
        assert.ok(
          Math.abs(rx * rx + rz * rz - x * x - z * z) < 1e-8,
          "rotation must preserve real radial depth",
        );
        const dx = (rx * (1 + rz * 0.12) + y * 0.16) * pose.width;
        const dy = y * pose.height + rz * pose.width * 0.3;
        const px = pose.x + dx * Math.cos(pose.roll) - dy * Math.sin(pose.roll);
        const py = pose.y + dx * Math.sin(pose.roll) + dy * Math.cos(pose.roll);
        if (compact) {
          assert.ok(px >= 0 && px <= w);
          assert.ok(py < h * 0.73, "keep caption clear");
        } else if (p <= 0.49) assert.ok(px >= w * 0.47, "protect visible copy");
      }
    }
    assert.equal(dnaLayout(w, h, 0, compact).yaw, 0);
    assert.equal(dnaLayout(w, h, 0, compact).roll, 0);
    assert.equal(dnaLayout(w, h, 1, compact).roll, compact ? 0.24 : 0.38);
    assert.equal(
      dnaLayout(w, h, compact ? 0.48 : 0.7, compact).yaw,
      Math.PI * 2,
    );
  }
  let rear = 0,
    front = 0;
  for (let i = 2; i < positions.length; i += 3) {
    if (positions[i] < 0.3) rear++;
    if (positions[i] > 0.7) front++;
  }
  assert.ok(
    rear > 500 && front > 500,
    "both sides need volume, not a flat plate",
  );
});

test("matching static DNA alternatives are transparent and stay within transfer budgets", async () => {
  for (const name of ["portrait", "landscape"]) {
    const file = await readFile(`public/assets/dna/${name}-axial.webp`);
    assert.ok(file.byteLength < 100_000);
    const image = await sharp(file).metadata();
    assert.ok(image.hasAlpha);
    assert.equal(image.format, "webp");
  }
});
