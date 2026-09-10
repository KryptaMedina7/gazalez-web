import { mkdir, stat } from "node:fs/promises";
import sharp from "sharp";
import { createMatterField } from "../src/lib/matter-field.mjs";

// The mobile scene is painted at build time, never in the scroll handler.
await mkdir("public/assets/matter", { recursive: true });
for (const [format, width, height] of [
  ["portrait", 390, 766],
  ["landscape", 844, 312],
]) {
  for (const [name, progress] of [
    ["scattered", 0],
    ["formed", 1],
  ]) {
    const field = createMatterField(true);
    const circles = [];
    const painter = {
      fillStyle: "",
      beginPath() {},
      moveTo() {},
      fill() {},
      arc(x, y, r) {
        circles.push(
          `<circle cx="${x.toFixed(2)}" cy="${y.toFixed(2)}" r="${r.toFixed(2)}" fill="${this.fillStyle}"/>`,
        );
      },
    };
    field.update(width, height, progress);
    field.paint(painter);
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">${circles.join("")}</svg>`;
    const output = `public/assets/matter/${format}-${name}.webp`;
    await sharp(Buffer.from(svg), { density: 108 })
      .webp({ quality: 90, alphaQuality: 100 })
      .toFile(output);
    console.log(`${output}: ${(await stat(output)).size} bytes`);
  }
}
