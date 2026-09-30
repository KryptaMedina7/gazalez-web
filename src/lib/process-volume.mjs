// Stable material identity: geometry illustrates relationships, not equipment.
export const materialCount = 180;
export function materialPosition(stage, index) {
  const fraction = index % 3;
  const sample = Math.floor(index / 3);
  const angle = sample * 2.399963 + fraction * 0.7;
  const radius = Math.sqrt((sample + 0.5) / 60);
  if (stage === 0)
    return {
      x: Math.cos(angle) * radius * 2.05,
      y: 0.25 + (((index * 17) % 23) / 23) * (1.65 - radius * 0.65),
      z: Math.sin(angle) * radius * 1.5,
    };
  if (stage === 1)
    return {
      x: (fraction - 1) * 2.25 + Math.cos(angle) * radius * 0.82,
      y: [0.3, 0.75, 1.2][fraction] + ((sample * 7) % 9) / 30,
      z: Math.sin(angle) * radius * 0.82,
    };
  if (stage === 2) {
    const layer = Math.floor(index / 36);
    const slot = index % 36;
    return {
      x: ((slot % 6) - 2.5) * 0.37,
      y: 0.3 + layer * 0.3,
      z: (Math.floor(slot / 6) - 2.5) * 0.37,
    };
  }
  return {
    x: (fraction - 1) * 2.25 + Math.cos(angle) * radius * 0.73,
    y: 0.25 + (1 - radius) * 0.7,
    z: Math.sin(angle) * radius * 0.73,
  };
}

export function materialIndices(compact, constrained) {
  const stride = constrained ? 3 : compact ? 2 : 1;
  // Taking every third index would drop two fractions: sample within each.
  return Array.from({ length: materialCount }, (_, i) => i).filter(
    (i) => (Math.floor(i / 3) * 37) % 60 < 60 / stride,
  );
}

export function trayPose(stage, tray) {
  if (tray === 0)
    return {
      x: 0,
      y: 0,
      scale: stage === 2 ? 1.35 : 2.2,
      opacity: stage === 0 || stage === 2 ? 1 : 0,
    };
  const fraction = tray - 1;
  return {
    x: (fraction - 1) * 2.25,
    y: stage === 1 ? [0.05, 0.5, 0.95][fraction] : 0,
    scale: 0.96,
    opacity: stage === 1 || stage === 3 ? 1 : 0,
  };
}
