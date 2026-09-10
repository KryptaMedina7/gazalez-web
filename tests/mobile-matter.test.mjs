import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import ts from "typescript";
const source = (
  await readFile(
    new URL("../src/lib/mobile-matter.ts", import.meta.url),
    "utf8",
  )
).replace(
  '"./matter-field.mjs"',
  JSON.stringify(new URL("../src/lib/matter-field.mjs", import.meta.url).href),
);
const js = ts.transpileModule(source, {
  compilerOptions: {
    target: ts.ScriptTarget.ES2022,
    module: ts.ModuleKind.ESNext,
  },
}).outputText;
const { createMobileMatter } = await import(
  "data:text/javascript;base64," + Buffer.from(js).toString("base64")
);

test("GPU renderer uploads seeds once, then draws one batch per progress update", () => {
  let uploads = 0,
    draws = 0,
    deleted = 0;
  const gl = {
    createShader: () => ({}),
    shaderSource() {},
    compileShader() {},
    getShaderParameter: () => true,
    createProgram: () => ({}),
    attachShader() {},
    linkProgram() {},
    getProgramParameter: () => true,
    useProgram() {},
    createBuffer: () => ({}),
    bindBuffer() {},
    bufferData(_t, seeds) {
      uploads++;
      assert.equal(seeds.length, 8800);
    },
    getAttribLocation: () => 0,
    enableVertexAttribArray() {},
    vertexAttribPointer() {},
    getUniformLocation: () => ({}),
    enable() {},
    blendFuncSeparate() {},
    viewport() {},
    uniform2f() {},
    uniform1f() {},
    clear() {},
    drawArrays(_mode, _start, count) {
      draws++;
      assert.equal(count, 1100);
    },
    deleteShader() {},
    deleteProgram() {},
    deleteBuffer() {
      deleted++;
    },
  };
  const renderer = createMobileMatter({ getContext: () => gl });
  assert.equal(renderer.mode, "webgl");
  renderer.resize(390, 766, 1.5);
  for (let i = 0; i <= 100; i++) renderer.draw(390, 766, i / 100);
  assert.equal(uploads, 1);
  assert.equal(draws, 101);
  renderer.dispose();
  assert.equal(deleted, 1);
});

test("without WebGL, the live Canvas fallback is limited to 440 particles", () => {
  let arcs = 0,
    fills = 0;
  const ctx = {
    setTransform() {},
    clearRect() {},
    beginPath() {},
    moveTo() {},
    arc() {
      arcs++;
    },
    fill() {
      fills++;
    },
  };
  const renderer = createMobileMatter({
    getContext: (type) => (type === "webgl" ? null : ctx),
  });
  assert.equal(renderer.mode, "canvas-lite");
  renderer.resize(360, 700, 1);
  renderer.draw(360, 700, 0.5);
  assert.equal(arcs, 440);
  assert.ok(fills <= 9);
  renderer.dispose();
});
