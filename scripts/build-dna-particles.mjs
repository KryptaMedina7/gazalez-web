import sharp from "sharp";
import { mkdir, writeFile } from "node:fs/promises";

// Offline image sampling; no pixel reads, textures or image decoding at runtime.
const source = "assets/dna/gazal-dna-source.png";
const { data, info } = await sharp(source)
  .resize(512, 768)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });
let seed = 271828;
const random = () =>
  (seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0) / 4294967296;
const candidates = [];
for (let y = 0; y < info.height; y++) {
  for (let x = 0; x < info.width; x++) {
    const i = (y * info.width + x) * 4;
    if (data[i + 3] < 250) continue;
    const shade =
      (data[i] * 0.2126 + data[i + 1] * 0.7152 + data[i + 2] * 0.0722) / 255;
    candidates.push([
      (x + random()) / info.width,
      (y + random()) / info.height,
      shade,
      random(),
    ]);
  }
}
for (let i = candidates.length - 1; i > 0; i--) {
  const j = Math.floor(random() * (i + 1));
  [candidates[i], candidates[j]] = [candidates[j], candidates[i]];
}
const points = candidates.slice(0, 18000);
const bytes = Buffer.alloc(points.length * 8);
points.forEach((point, i) =>
  point.forEach((n, c) =>
    bytes.writeUInt16LE(Math.round(n * 65535), i * 8 + c * 2),
  ),
);
await mkdir("public/assets/dna", { recursive: true });
await writeFile("public/assets/dna/particles.bin", bytes);
for (const [name, width, height, compact] of [
  ["landscape", 1200, 720, false],
  ["portrait", 640, 900, true],
]) {
  const count = compact ? 6000 : 18000;
  const h = compact
    ? Math.min(height * 0.68, width * 1.45)
    : Math.min(height * 1.06, width * 0.7);
  const w = (h * 2) / 3;
  const cx = width * (compact ? 0.5 : 0.76),
    cy = height * (compact ? 0.35 : 0.48);
  const circles = points.slice(0, count).map(([x, y, shade, seed]) => {
    const tint = Math.max(0, Math.min(1, (shade - 0.16) / 0.72));
    const color = [105, 139, 112].map((c, i) =>
      Math.round(c + ([228, 237, 210][i] - c) * tint),
    );
    const r = (compact ? 1.1 : 1.05) + shade * 0.65 + seed * 0.25;
    return `<circle cx="${(cx + (x - 0.5) * w).toFixed(2)}" cy="${(cy + (y - 0.5) * h).toFixed(2)}" r="${r.toFixed(2)}" fill="rgb(${color.join(",")})"/>`;
  });
  await sharp(
    Buffer.from(
      `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">${circles.join("")}</svg>`,
    ),
  )
    .webp({ quality: 85 })
    .toFile(`public/assets/dna/${name}.webp`);
}
console.log(
  JSON.stringify({
    candidates: candidates.length,
    particles: points.length,
    bytes: bytes.length,
  }),
);
