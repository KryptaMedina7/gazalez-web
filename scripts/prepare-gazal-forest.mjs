// Delivery encodes only: preserve the supplied branding and generated artwork.
import sharp from 'sharp';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const delivery = path.join(root, 'public/assets/forest');
const originals = path.join(root, 'assets/gazal-forest-originals');
const brand = path.join(root, 'public/assets/gazal');
await Promise.all([delivery, originals, brand].map(p => mkdir(p, { recursive: true })));
const manifest = [];
// Originals and supplied kit PNGs are versioned, so delivery is reproducible
// without the author's Downloads folder or the image-generation session.
for (const name of ['forest', 'fern-left', 'fern-right']) {
  const input = path.join(originals, `${name}.png`);
  if (name !== 'forest') {
    const { hasAlpha } = await sharp(input).metadata();
    const stats = await sharp(input).stats();
    if (!hasAlpha || stats.channels[3].min !== 0) throw new Error(`Missing transparency: ${name}`);
  }
  for (const [suffix, width] of [['desktop', name === 'forest' ? 1536 : 860], ['mobile', name === 'forest' ? 900 : 480]]) {
    const result = await sharp(input).resize({width, withoutEnlargement: true}).webp({ quality: 84, alphaQuality: 95 }).toFile(path.join(delivery, `${name}-${suffix}.webp`));
    manifest.push({ file: `${name}-${suffix}.webp`, ...result });
  }
}
for (const name of ['horizontal-transparente','principal-transparente','solo-nombre-transparente','simbolo-transparente','horizontal-marfil','principal-marfil']) {
  await sharp(path.join(brand, `gazal-${name}.png`)).resize({width:name.startsWith('horizontal') ? 720 : 600,withoutEnlargement:true}).webp({quality:95,alphaQuality:100}).toFile(path.join(brand, `gazal-${name}.webp`));
}
await sharp(path.join(brand,'gazal-simbolo-transparente.png')).resize(64,64,{fit:'contain',background:'#f7f8f3'}).png().toFile(path.join(brand,'favicon.png'));
await sharp(path.join(brand,'gazal-simbolo-transparente.png')).resize(180,180,{fit:'contain',background:'#f7f8f3'}).png().toFile(path.join(brand,'apple-touch-icon.png'));
await sharp(path.join(originals,'forest.png')).resize(1200,630,{fit:'cover'}).jpeg({quality:85}).toFile(path.join(delivery,'social.jpg'));
await writeFile(path.join(originals, 'delivery.json'), JSON.stringify(manifest,null,2));
console.log(manifest.map(x => `${x.file}: ${x.size} bytes`).join('\n'));
