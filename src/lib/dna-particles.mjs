export const DNA_DESKTOP_COUNT = 18000;
export const DNA_COMPACT_COUNT = 6000;
export const DNA_TRAIL_SECONDS = 0.85;
const clamp = (n) => Math.max(0, Math.min(1, n));
const smooth = (n) => {
  const t = clamp(n);
  return t * t * (3 - 2 * t);
};

/** Packed image samples, shuffled offline so every prefix covers both strands. */
export function decodeDnaSamples(buffer, compact) {
  if (buffer.byteLength !== DNA_DESKTOP_COUNT * 8)
    throw new Error("Invalid DNA sample data");
  const view = new DataView(buffer);
  const count = compact ? DNA_COMPACT_COUNT : DNA_DESKTOP_COUNT;
  const positions = new Float32Array(count * 3);
  const seeds = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    for (let c = 0; c < 3; c++)
      positions[i * 3 + c] = view.getUint16(i * 8 + c * 2, true) / 65535;
    seeds[i] = view.getUint16(i * 8 + 6, true) / 65535;
  }
  return { positions, seeds, count };
}

export function dnaLayout(width, height, progress, compact) {
  const p = clamp(progress);
  const expansion = compact ? 0 : smooth((p - 0.49) / 0.2);
  // Finish the turn before release; reversing scroll restores the same pose.
  const turn = smooth((p - 0.025) / (compact ? 0.455 : 0.675));
  const h = compact
    ? Math.min(height * 0.68, width * 1.45)
    : Math.min(height * (1.06 + expansion * 0.08), width * 0.7);
  return {
    x: width * (compact ? 0.5 : 0.76 - expansion * 0.2),
    y: height * (compact ? 0.35 : 0.48),
    width: (h * (1 - turn * (compact ? 0.08 : 0.04)) * 2) / 3,
    height: h * (1 - turn * (compact ? 0.08 : 0.04)),
    roll: turn * (compact ? 0.24 : 0.38),
    yaw: turn * (compact ? 0.3 : 0.48),
    release: clamp((p - (compact ? 0.48 : 0.7)) / (compact ? 0.52 : 0.3)),
  };
}

export function trailEnvelope(age) {
  if (age < 0 || age >= DNA_TRAIL_SECONDS) return 0;
  return (
    Math.sin((Math.PI * age) / DNA_TRAIL_SECONDS) *
    (1 - age / DNA_TRAIL_SECONDS)
  );
}
