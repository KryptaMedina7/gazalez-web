// The same material keeps its identity through four conceptual operations.
export const processParticles = Array.from({ length: 120 }, (_, i) => ({
  x: 165 + ((i * 173) % 270),
  y: 95 + ((i * 97) % 155),
  r: 2.5 + (i % 5) * 0.6,
}));

export function processPosition(stage, i) {
  const group = Math.floor(i / 40);
  const sample = i % 40;
  if (stage === 0) return processParticles[i];
  if (stage === 1)
    return {
      x: 85 + group * 170 + (sample % 8) * 12,
      y: 122 + Math.floor(sample / 8) * 22,
    };
  // Interleave the recovered fractions into a single controlled formulation.
  if (stage === 2)
    return {
      x: 223 + (sample % 8) * 22,
      y: 107 + Math.floor(sample / 8) * 31 + group * 7,
    };
  // Material is associated with each station of the traceable chain.
  const angle = sample * 2.4;
  const radius = Math.sqrt(sample / 39) * 41;
  return {
    x: 130 + group * 170 + Math.cos(angle) * radius,
    y: 174 + Math.sin(angle) * radius,
  };
}
