import sharp from "sharp";
import { writeFile } from "node:fs/promises";

// Delivery encoding only; the reviewed square artwork is kept in assets/.
const source = "assets/gazal-favicon-source.png";
const frames = [];
for (const size of [16, 32, 48, 64]) {
  const png = await sharp(source).resize(size, size).png().toBuffer();
  await writeFile(`public/assets/gazal/favicon-v2-${size}.png`, png);
  frames.push({ size, png });
}
const header = Buffer.alloc(6 + frames.length * 16);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(frames.length, 4);
let offset = header.length;
frames.forEach(({ size, png }, index) => {
  const entry = 6 + index * 16;
  header[entry] = size;
  header[entry + 1] = size;
  header.writeUInt16LE(1, entry + 4);
  header.writeUInt16LE(32, entry + 6);
  header.writeUInt32LE(png.length, entry + 8);
  header.writeUInt32LE(offset, entry + 12);
  offset += png.length;
});
await writeFile(
  "public/favicon.ico",
  Buffer.concat([header, ...frames.map((f) => f.png)]),
);
await sharp(source)
  .resize(180, 180)
  .png()
  .toFile("public/assets/gazal/apple-touch-icon-v2.png");
