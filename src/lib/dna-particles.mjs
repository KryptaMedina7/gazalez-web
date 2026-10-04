export const DNA_DESKTOP_COUNT = 18000;
export const DNA_COMPACT_COUNT = 6000;
export const DNA_TRAIL_SECONDS = 0.85;
const clamp = (n) => Math.max(0, Math.min(1, n));
const smooth = (n) => {
  const t = clamp(n);
  return t * t * (3 - 2 * t);
};

/** Deterministic volumetric double helix; every prefix covers both strands/rungs. */
export function createDnaVolume(count = DNA_DESKTOP_COUNT) {
  let seed = 271828;
  const random = () =>
    (seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0) / 4294967296;
  return Array.from({ length: count }, (_, i) => {
    const strand = i % 10 < 7;
    const t = strand ? 0.035 + random() * 0.93 : 0.055 + (i % 29) * (0.89 / 28);
    const phase = t * Math.PI * 3.4 + 0.45;
    const phi = random() * Math.PI * 2;
    const thickness = (strand ? 0.042 : 0.016) * (0.75 + random() * 0.25);
    const radial = strand
      ? (i % 2 ? -0.265 : 0.265) + Math.cos(phi) * thickness
      : (random() * 2 - 1) * 0.265;
    const tangent = strand ? 0 : Math.cos(phi) * thickness;
    return [
      0.5 + Math.cos(phase) * radial - Math.sin(phase) * tangent,
      t + Math.sin(phi) * thickness * (2 / 3),
      0.5 + Math.sin(phase) * radial + Math.cos(phase) * tangent,
      random(),
    ];
  });
}

/** Packed XYZ samples; the third coordinate is actual depth, not image tone. */
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
    width: (h * 2) / 3,
    height: h,
    yaw: turn * Math.PI * 2,
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
