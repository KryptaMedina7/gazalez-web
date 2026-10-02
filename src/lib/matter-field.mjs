// Back-to-front bands: colour, size and occlusion share the same depth.
const tones = [
  "#466952",
  "#577958",
  "#698961",
  "#7e9e71",
  "#96b284",
  "#b0c79c",
  "#c6d9b3",
  "#d5e4c4",
  "#e4edcf",
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
export function createMatterField(compact, rows = compact ? 10 : 20) {
  const count = 110 * Math.max(2, Math.min(20, rows));
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
    update(
      width,
      height,
      progress,
      release = 0,
      expansion = progress,
      pointerX = 0,
      pointerY = 0,
    ) {
      const p = Math.max(0, Math.min(1, progress));
      const exit = Math.max(0, Math.min(1, release));
      const shift = Math.min(1, exit / 0.55);
      const gather = shift * shift * (3 - 2 * shift);
      // A bounded turn of the same ribbon, never a cursor-following translation.
      // Touch and the release sequence keep their deterministic scroll geometry.
      const px = compact || exit > 0 ? 0 : Math.max(-1, Math.min(1, pointerX));
      const py = compact || exit > 0 ? 0 : Math.max(-1, Math.min(1, pointerY));
      const angle = p * 0.7 + px * 0.32 + py * 0.1;
      const sin = Math.sin(angle),
        cos = Math.cos(angle);
      const framing = Math.max(0, Math.min(1, expansion));
      const center = width * (0.76 - framing * 0.26);
      const span = width * (0.53 + framing * 0.36);
      lengths.fill(0);
      for (let i = 0; i < count; i++) {
        const [u, v, baseSin, baseCos, nx, ny, nr] = seeds[i];
        const s = baseSin * cos + baseCos * sin;
        const c = baseCos * cos - baseSin * sin;
        const depth = c * v;
        const scatter = (1 - p) * (1 - u) ** 2;
        let x = compact
          ? width * 0.5 +
            s * width * 0.23 +
            v * c * width * 0.38 +
            nx * width * scatter
          : center + (u - 0.5) * span + nx * span * 0.4 * scatter;
        let y = compact
          ? height * 0.38 +
            (u - 0.5) * height * 0.61 +
            ny * height * 0.48 * scatter
          : height * 0.48 +
            s * height * 0.19 +
            v * c * height * 0.3 +
            ny * height * 0.65 * scatter;
        x += px * width * 0.025 * depth;
        y += py * height * 0.045 * (0.5 + depth);
        const radius = Math.max(
          0.65,
          (compact ? 1.8 : 2.3) + depth * 1.6 + nr * (1 - p),
        );
        // Keep each original point and tone. Gather at the edge, then let
        // the same grains fall. Pure scroll geometry makes reversal exact.
        if (exit > 0) {
          x += (width * (compact ? 0.77 : 0.82) - x) * gather * 0.8;
          const delay = 0.18 + u * 0.22 + nr * 0.08;
          const fall = Math.max(0, (exit - delay) / (1 - delay));
          x += nx * width * 0.12 * fall;
          y += height * 2.4 * fall * fall;
        }
        const tone = Math.min(8, Math.max(0, Math.floor((depth + 0.5) * 9)));
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
        // One shared upper-left light. Three tiny batched highlights add matte
        // volume without per-particle gradients, blur or extra animation work.
        if (tone >= 6 && rows >= 10) {
          ctx.fillStyle = "#f0f4dd";
          ctx.globalAlpha = 0.28;
          ctx.beginPath();
          for (let i = 0; i < lengths[tone] * 3; i += 3) {
            const r = buckets[tone][i + 2];
            const x = buckets[tone][i] - r * 0.24;
            const y = buckets[tone][i + 1] - r * 0.28;
            ctx.moveTo(x + r * 0.3, y);
            ctx.arc(x, y, r * 0.3, 0, Math.PI * 2);
          }
          ctx.fill();
          ctx.globalAlpha = 1;
        }
      }
    },
  };
}
