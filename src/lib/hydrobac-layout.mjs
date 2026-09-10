/** Centers in the conceptual 540 x 550 diagram; no physical scale. */
export function hydrobacPlanePositions(opening) {
  const amount = Math.max(0, Math.min(100, Number(opening) || 0)) / 100;
  return [320 + amount * 130, 270, 220 - amount * 130];
}
