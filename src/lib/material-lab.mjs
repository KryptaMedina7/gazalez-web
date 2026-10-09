export const sampleCount = 84;
export function clampProgress(value) {
  return Number.isFinite(value) ? Math.max(0, Math.min(3, value)) : 0;
}
export function samplePoint(index, stage, recovery = false) {
  const group = index % 3;
  const n = Math.floor(index / 3);
  const angle = n * 2.399963;
  const radius = Math.sqrt((n + 0.5) / 28);
  const centers = [
    [174, 175],
    [320, 240],
    [466, 175],
  ];
  let [x, y] = centers[group];
  let rx = 60,
    ry = 30;
  if (stage === 1) {
    x = 110 + group * 210;
    y = 190;
    rx = 74;
    ry = 40;
  }
  if (stage === 2) {
    x = recovery ? 140 + group * 180 : 320;
    y = recovery ? 150 + (group % 2) * 90 : 205;
    rx = recovery ? 48 : 114;
    ry = recovery ? 26 : 58;
  }
  if (stage === 3) {
    x = 205;
    y = 215;
    rx = 82;
    ry = 44;
  }
  return [
    x + Math.cos(angle) * radius * rx,
    y + Math.sin(angle) * radius * ry,
    (index * 37) % 180,
  ];
}
export function interpolateSample(index, progress, recovery = false) {
  const p = clampProgress(progress);
  const start = Math.floor(p),
    end = Math.min(3, start + 1);
  const t = p - start;
  const blend = t * t * (3 - 2 * t);
  const a = samplePoint(index, start, recovery),
    b = samplePoint(index, end, recovery);
  return a.map((v, i) => v + (b[i] - v) * blend);
}

export function trayPose(group, progress, recovery = false) {
  const pose = (stage) => {
    if (stage === 0)
      return [[174, 320, 466][group], [175, 240, 175][group], 82, 1];
    if (stage === 1) return [110 + group * 210, 190, 96, 1];
    if (stage === 2 && recovery)
      return [140 + group * 180, 150 + (group % 2) * 90, 82, 1];
    if (stage === 2) return [320, 205, 144, group === 0 ? 1 : 0];
    return [205, 215, 112, group === 0 ? 1 : 0];
  };
  const p = clampProgress(progress),
    a = pose(Math.floor(p)),
    b = pose(Math.min(3, Math.floor(p) + 1));
  const t = p - Math.floor(p),
    blend = t * t * (3 - 2 * t);
  return a.map((v, index) => v + (b[index] - v) * blend);
}
