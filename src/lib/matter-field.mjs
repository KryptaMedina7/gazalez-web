const tones = [
  "#617e68",
  "#789778",
  "#91ae87",
  "#abc59c",
  "#c5d9b4",
  "#deebcf",
  "#ecf3dc",
  "#abc196",
  "#b6a173",
];
const noise = (n) => {
  const value = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return value - Math.floor(value);
};

/** Bound raster memory independently of device pixel ratio and screen size. */
export function matterPixelRatio(width, height, deviceRatio, compact) {
  if (width <= 0 || height <= 0) return 1;
  return Math.min(
    deviceRatio || 1,
    compact ? 1.5 : 1.75,
    Math.sqrt((compact ? 1_500_000 : 3_000_000) / (width * height)),
  );
}

/** Reusable geometry buffers: no particle objects or trigonometry per draw. */
export function createMatterField(compact) {
  const count = compact ? 1100 : 2200;
  const seeds = Array.from({ length: count }, (_, i) => {
    const u = (i % 110) / 109;
    const angle = u * Math.PI * 2.15 - 1.3;
    return [
      u,
      Math.floor(i / 110) / (count / 110 - 1) - 0.5,
      Math.sin(angle),
      Math.cos(angle),
      noise(i) - 0.5,
      noise(i + 87) - 0.5,
      noise(i + 16),
    ];
  });
  const buckets = tones.map(() => new Float32Array(count * 3));
  const lengths = new Uint16Array(tones.length);
  return {
    count,
    buckets,
    lengths,
    update(width, height, progress) {
      const p = Math.max(0, Math.min(1, progress));
      const sin = Math.sin(p * 0.7),
        cos = Math.cos(p * 0.7);
      const center = width * (0.76 - p * 0.26);
      const span = width * (0.53 + p * 0.36);
      lengths.fill(0);
      for (let i = 0; i < count; i++) {
        const [u, v, baseSin, baseCos, nx, ny, nr] = seeds[i];
        const s = baseSin * cos + baseCos * sin;
        const c = baseCos * cos - baseSin * sin;
        const depth = c * v;
        const scatter = (1 - p) * (1 - u) ** 2;
        const x = compact
          ? width * 0.5 +
            s * width * 0.23 +
            v * c * width * 0.38 +
            nx * width * scatter
          : center + (u - 0.5) * span + nx * span * 0.4 * scatter;
        const y = compact
          ? height * 0.38 +
            (u - 0.5) * height * 0.61 +
            ny * height * 0.48 * scatter
          : height * 0.48 +
            s * height * 0.19 +
            v * c * height * 0.3 +
            ny * height * 0.65 * scatter;
        const radius = Math.max(
          0.65,
          (compact ? 1.8 : 2.3) + depth * 1.6 + nr * (1 - p),
        );
        const tone =
          i % 67 === 0
            ? 8
            : Math.min(7, Math.max(0, Math.floor((depth + 0.5) * 6 + u * 2)));
        const offset = lengths[tone] * 3;
        buckets[tone][offset] = x;
        buckets[tone][offset + 1] = y;
        buckets[tone][offset + 2] = radius;
        lengths[tone]++;
      }
    },
    /** @param {CanvasRenderingContext2D} ctx */
    paint(ctx) {
      for (let tone = 0; tone < tones.length; tone++) {
        ctx.fillStyle = tones[tone];
        ctx.beginPath();
        for (let i = 0; i < lengths[tone] * 3; i += 3) {
          const x = buckets[tone][i],
            y = buckets[tone][i + 1],
            r = buckets[tone][i + 2];
          ctx.moveTo(x + r, y);
          ctx.arc(x, y, r, 0, Math.PI * 2);
        }
        ctx.fill();
      }
    },
  };
}
