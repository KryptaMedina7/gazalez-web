import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
const input = process.argv[2];
if (!input)
  throw new Error(
    "Usage: node scripts/section-videos-1080.mjs <source-directory>",
  );
const entries = [
  [
    "innovacion",
    "mobile",
    "Generating_brand_animation_video_1080p_20261009221033.mp4",
  ],
  [
    "avicola",
    "desktop",
    "Gallina_alimentándose_en_comedero_1080p_20261009221212.mp4",
  ],
  ["innovacion", "desktop", "Animación_de_marca_con_ADN_20261009221203.mp4"],
  ["nucleos", "desktop", "Pellets_falling_into_tray_1080p_20261009221155.mp4"],
  [
    "avicola",
    "mobile",
    "Crear_animación_gallina_comiendo_1080p_20261009221044.mp4",
  ],
  ["nucleos", "mobile", "Pellets_falling_into_tray_1080p_20261009221039.mp4"],
];
const output = "public/assets/section-videos/20261009";
fs.mkdirSync(output, { recursive: true });
function run(tool, args) {
  const result = spawnSync(tool, args, {
    encoding: "utf8",
    windowsHide: true,
    maxBuffer: 5e6,
  });
  if (result.status !== 0)
    throw new Error(result.stderr || result.error?.message);
  return result.stdout.trim();
}
const manifest = [];
for (const [film, format, source] of entries) {
  const src = path.join(input, source),
    target = path.join(output, `${film}-${format}.webm`);
  run("ffmpeg", [
    "-hide_banner",
    "-loglevel",
    "error",
    "-i",
    src,
    "-map",
    "0:v:0",
    "-c:v",
    "libvpx-vp9",
    "-lossless",
    "1",
    "-b:v",
    "0",
    "-deadline",
    "good",
    "-cpu-used",
    "4",
    "-row-mt",
    "1",
    "-threads",
    "4",
    "-an",
    "-y",
    target,
  ]);
  const hash = (file) =>
    run("ffmpeg", [
      "-v",
      "error",
      "-i",
      file,
      "-map",
      "0:v:0",
      "-f",
      "hash",
      "-hash",
      "sha256",
      "-",
    ]);
  const sourceHash = hash(src),
    resultHash = hash(target);
  if (sourceHash !== resultHash)
    throw new Error(`Decoded video differs: ${source}`);
  fs.copyFileSync(src, path.join(output, `${film}-${format}.mp4`));
  const poster = path.join(
    output,
    `${film}-${format === "mobile" ? "mobile-poster" : "poster"}.webp`,
  );
  run("ffmpeg", [
    "-hide_banner",
    "-loglevel",
    "error",
    "-ss",
    "0",
    "-i",
    src,
    "-frames:v",
    "1",
    "-c:v",
    "libwebp",
    "-quality",
    "88",
    "-y",
    poster,
  ]);
  const metadata = JSON.parse(
    run("ffprobe", [
      "-v",
      "error",
      "-select_streams",
      "v:0",
      "-show_entries",
      "stream=width,height,r_frame_rate,pix_fmt:format=duration",
      "-of",
      "json",
      target,
    ]),
  );
  manifest.push({
    film,
    format,
    source,
    webm: target.replace("public", "").replaceAll("\\", "/"),
    bytes: fs.statSync(target).size,
    decodedVideoSha256: resultHash,
    losslessVerified: true,
    ...metadata,
  });
  console.log(
    `${film} ${format}: lossless verified, ${(fs.statSync(target).size / 1048576).toFixed(1)} MiB`,
  );
}
fs.mkdirSync("docs/assets", { recursive: true });
fs.writeFileSync(
  "docs/assets/section-videos-20261009.json",
  JSON.stringify(manifest, null, 2) + "\n",
);
