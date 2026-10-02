// Static fallback uses the same geometry, palette and opening pose as Canvas.
import sharp from "sharp";
import { createMatterField } from "../src/lib/matter-field.mjs";

for (const [format, width, height, compact] of [
  ["portrait", 640, 900, true],
  ["landscape", 1200, 720, false],
]) {
  const field = createMatterField(compact);
  field.update(width, height, 0.82, 0, 0);
  const circles = [];
  let color;
  let alpha = 1;
  field.paint({
    set fillStyle(value) {
      color = value;
    },
    set globalAlpha(value) {
      alpha = value;
    },
    beginPath() {},
    moveTo() {},
    fill() {},
    arc(x, y, radius) {
      circles.push(
        `<circle cx="${x.toFixed(2)}" cy="${y.toFixed(2)}" r="${radius.toFixed(2)}" fill="${color}" opacity="${alpha}"/>`,
      );
    },
  });
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">${circles.join("")}</svg>`;
  await sharp(Buffer.from(svg))
    .webp({ quality: 85 })
    .toFile(`public/assets/matter/${format}-opening.webp`);
}
