import sharp from "sharp";
import { mkdir, writeFile } from "node:fs/promises";

import { createDnaVolume, dnaLayout } from "../src/lib/dna-particles.mjs";

// Offline volumetric sampling: XYZ is retained so the helix can rotate fully.
const points = createDnaVolume();
const bytes = Buffer.alloc(points.length * 8);
points.forEach((point, i) =>
  point.forEach((n, c) =>
    bytes.writeUInt16LE(Math.round(n * 65535), i * 8 + c * 2),
  ),
);
await mkdir("public/assets/dna", { recursive: true });
await writeFile("public/assets/dna/helix.bin", bytes);
for (const [name, width, height, compact] of [
  ["landscape", 1200, 720, false],
  ["portrait", 640, 900, true],
]) {
  const count = compact ? 6000 : 18000;
  const pose = dnaLayout(width, height, 0, compact);
  const circles = points.slice(0, count).sort((a, b) => a[2] - b[2]).map(([x, y, z, seed]) => {
    const depth = z - 0.5;
    const depthTone = Math.max(0, Math.min(1, 0.5 + depth * 1.55));
    const tint = depthTone * 0.85 + seed * 0.15;
    const color = [105, 139, 112].map((c, i) =>
      Math.round(c + ([228, 237, 210][i] - c) * tint),
    );
    const r = (2 + depthTone * 1.3 + seed * 0.5) / 2;
    const px = pose.x + ((x - 0.5) * (1 + depth * 0.12) + (y - 0.5) * 0.16) * pose.width;
    const py = pose.y + (y - 0.5) * pose.height + depth * pose.width * 0.3;
    return `<circle cx="${px.toFixed(2)}" cy="${py.toFixed(2)}" r="${r.toFixed(2)}" fill="rgb(${color.join(",")})"/>`;
  });
  await sharp(
    Buffer.from(
      `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">${circles.join("")}</svg>`,
    ),
  )
    .webp({ quality: 75, alphaQuality: 70 })
    .toFile(`public/assets/dna/${name}-axial.webp`);
}
console.log(
  JSON.stringify({
    geometry: "volumetric double helix",
    particles: points.length,
    bytes: bytes.length,
  }),
);
