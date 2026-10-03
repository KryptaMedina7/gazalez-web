import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import sharp from "sharp";
import { decodeDnaSamples, dnaLayout, trailEnvelope, DNA_TRAIL_SECONDS } from "../src/lib/dna-particles.mjs";

const data = await readFile("public/assets/dna/particles.bin");
const buffer = data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength);

test("DNA samples cover the original silhouette at both particle budgets", () => {
  for (const compact of [false, true]) {
    const samples = decodeDnaSamples(buffer, compact);
    assert.equal(samples.count, compact ? 6000 : 18000);
    assert.ok(samples.positions.every(v => Number.isFinite(v) && v >= 0 && v <= 1));
    const bands = new Uint32Array(6);
    for (let i = 1; i < samples.positions.length; i += 3)
      bands[Math.min(5, Math.floor(samples.positions[i] * 6))]++;
    assert.ok(bands.every(n => n > samples.count * 0.05), "a reduced budget must not remove one end of the molecule");
  }
  assert.throws(() => decodeDnaSamples(new ArrayBuffer(8), false), /Invalid/);
});

test("mobile DNA leaves the caption clear, desktop keeps opening DNA away from copy", () => {
  for (const [w, h, compact] of [[320, 480, true], [390, 560, true], [844, 260, true], [1440, 813, false], [1920, 993, false]]) {
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

test("scroll turn preserves copy clearance and mobile caption space before release", () => {
  for (const [w, h, compact] of [[320, 480, true], [390, 560, true], [768, 560, true], [1440, 813, false]]) {
    let previous = 0;
    for (let step = 0; step <= 100; step++) {
      const p = step / 100;
      const pose = dnaLayout(w, h, p, compact);
      assert.ok(pose.roll >= previous);
      previous = pose.roll;
      assert.ok(pose.yaw < Math.PI / 4, "image must never turn edge-on");
      const halfX = pose.width * (0.5 * Math.cos(pose.yaw) + 0.04 * Math.sin(pose.yaw));
      const extentX = halfX * Math.cos(pose.roll) + pose.height / 2 * Math.sin(pose.roll);
      const extentY = halfX * Math.sin(pose.roll) + pose.height / 2 * Math.cos(pose.roll);
      if (compact) {
        assert.ok(pose.x - extentX >= 0 && pose.x + extentX <= w);
        assert.ok(pose.y + extentY < h * 0.73, "keep the caption area clear");
      } else if (p <= 0.49) {
        assert.ok(pose.x - extentX >= w * 0.47, "turn must stay away from visible copy");
      }
    }
    assert.equal(dnaLayout(w, h, 0, compact).roll, 0);
    assert.equal(dnaLayout(w, h, compact ? 0.48 : 0.7, compact).roll, previous);
  }
});

test("matching static DNA alternatives are transparent and stay within transfer budgets", async () => {
  for (const name of ["portrait", "landscape"]) {
    const file = await readFile(`public/assets/dna/${name}.webp`);
    assert.ok(file.byteLength < 100_000);
    const image = await sharp(file).metadata();
    assert.ok(image.hasAlpha);
    assert.equal(image.format, "webp");
  }
});
