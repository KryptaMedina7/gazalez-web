import sharp from "sharp";
import { writeFile } from "node:fs/promises";

// Delivery encoding only; the reviewed transparent artwork is kept in assets/.
const source = "assets/gazal-favicon-transparent.png";
const frames = [];
for (const size of [16, 32, 48, 64]) {
  const png = await sharp(source)
    .resize(size, size, { fit: "contain", background: "#00000000" })
    .png()
    .toBuffer();
  await writeFile(`public/assets/gazal/favicon-v3-${size}.png`, png);
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
  .resize(180, 180, { fit: "contain", background: "#f7f8f3" })
  .flatten({ background: "#f7f8f3" })
  .png()
  .toFile("public/assets/gazal/apple-touch-icon-v3.png");
// Alpha mask preserves the supplied silhouette and remains visible on dark tabs.
const mask = frames.find((frame) => frame.size === 64).png.toString("base64");
await writeFile(
  "public/assets/gazal/favicon-v3.svg",
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><style>rect{fill:#183a2d}@media(prefers-color-scheme:dark){rect{fill:#dcebd8}}</style><defs><mask id="mark" style="mask-type:alpha"><image width="64" height="64" href="data:image/png;base64,${mask}"/></mask></defs><rect width="64" height="64" mask="url(#mark)"/></svg>`,
);
