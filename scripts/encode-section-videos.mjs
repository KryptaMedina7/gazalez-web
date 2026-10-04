// Rebuild the supplied section films. Requires ffmpeg/ffprobe on PATH.
import { spawnSync } from 'node:child_process';
import { mkdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import path from 'node:path';

const inputDir = process.argv[2];
if (!inputDir) throw new Error('Usage: node scripts/encode-section-videos.mjs <source directory>');
const outputDir = 'public/assets/section-videos';
mkdirSync(outputDir, { recursive: true });
const films = [
  ['avicola', 'Chicken_approaching_wooden_trough_20261003220658.mp4', '/soluciones/nutricion-animal/', 2],
  ['nucleos', 'Granules_falling_into_tray_20261003215253.mp4', '/soluciones/nucleos-proteicos/', 2],
  ['innovacion', 'DNA_rotating_behind_logo_20261003214726.mp4', '/innovacion/', 1],
];
// Reframe each action, rather than cropping every film through its centre.
// The chicken enters from the left; falling granules/tray are on the right.
const portraitCrops = { avicola: [960, 0], nucleos: [940, 340], innovacion: [600, 340] };
function portraitFilter(id) {
  const [width, x] = portraitCrops[id];
  return `[0:v]split=2[bg][fg];` +
    `[bg]scale=90:160:force_original_aspect_ratio=increase,crop=90:160,gblur=sigma=9,scale=720:1280,eq=saturation=0.8:brightness=-0.035[back];` +
    `[fg]crop=${width}:720:${x}:0,scale=720:-2[front];` +
    `[back][front]overlay=(W-w)/2:(H-h)/2,setsar=1[out]`;
}
function run(program, args) {
  const result = spawnSync(program, args, { encoding: 'utf8' });
  if (result.error || result.status !== 0) throw new Error(result.error?.message || result.stderr);
  return result.stdout;
}
const manifest = films.map(([id, source, route, posterTime]) => {
  const input = path.join(inputDir, source);
  const outputs = [];
  for (const [variant, width] of [['desktop', 1280], ['mobile', 640]]) {
    for (const extension of ['webm', 'mp4']) {
      const filename = `${id}-${variant}.${extension}`;
      const codec = extension === 'webm'
        ? ['-c:v', 'libvpx-vp9', '-crf', '33', '-b:v', '0', '-deadline', 'good', '-cpu-used', '3', '-row-mt', '1']
        : ['-c:v', 'libx264', '-crf', '25', '-preset', 'slow', '-movflags', '+faststart'];
      const framing = variant === 'mobile'
        ? ['-filter_complex', portraitFilter(id), '-map', '[out]']
        : ['-map', '0:v:0', '-vf', `scale=${width}:-2`];
      run('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-y', '-i', input,
        ...framing, '-an', '-pix_fmt', 'yuv420p', ...codec,
        path.join(outputDir, filename)]);
      outputs.push({ filename, width: variant === 'mobile' ? 720 : 1280, height: variant === 'mobile' ? 1280 : 720, bytes: statSync(path.join(outputDir, filename)).size });
    }
  }
  const poster = `${id}-poster.webp`;
  run('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-y', '-ss', String(posterTime), '-i', input,
    '-frames:v', '1', '-vf', 'scale=960:-2', '-quality', '82', path.join(outputDir, poster)]);
  const mobilePoster = `${id}-mobile-poster.webp`;
  run('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-y', '-ss', String(posterTime),
    '-i', path.join(outputDir, `${id}-mobile.webm`), '-frames:v', '1', '-quality', '82', path.join(outputDir, mobilePoster)]);
  console.log(`Converted ${source}`);
  return { id, source, route, sha256: createHash('sha256').update(readFileSync(input)).digest('hex'),
    sourceProbe: JSON.parse(run('ffprobe', ['-v', 'error', '-show_entries', 'format=duration,size:stream=codec_name,width,height', '-of', 'json', input])),
    outputs, poster, mobilePoster, portraitCrop: portraitCrops[id], posterTime };
});
writeFileSync('docs/assets/2026-10-03-section-videos.json', JSON.stringify({
  provenance: 'Three brand films supplied by the user on 2026-10-03. Not evidence of company facilities or specifications.',
  placement: 'Chicken and granules follow Nassira’s avian nutrition/nuclei request. Innovation DNA placement is an editorial inference.',
  audio: 'Removed; original sources retained outside the repository.', films: manifest,
  portrait: '720x1280 adaptation: scene-specific foreground crop preserves brand and action, over a blurred moving extension baked into the video. No stretching or newly generated footage. Desktop remains 16:9.',
}, null, 2) + '\n');
