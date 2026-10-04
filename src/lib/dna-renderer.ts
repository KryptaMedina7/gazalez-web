import {
  BufferAttribute,
  BufferGeometry,
  Camera,
  Points,
  Scene,
  ShaderMaterial,
  Vector2,
  Vector4,
  WebGLRenderer,
} from "three";
import { decodeDnaSamples, dnaLayout, packDnaTrail } from "./dna-particles.mjs";
import { matterPixelRatio } from "./matter-field.mjs";

const vertexShader = `
attribute float aSeed;
uniform vec2 uResolution;
uniform vec4 uImage;
uniform vec4 uTurn;
uniform float uRelease;
uniform float uRatio;
uniform int uTrailCount;
uniform vec4 uTrail[12];
varying float vShade;
varying float vLift;
void main() {
  // Rotate actual XYZ around the longitudinal axis, not a flat image plate.
  vec3 local = position - 0.5;
  float turnX = local.x * uTurn.x + local.z * uTurn.y;
  float turnZ = -local.x * uTurn.y + local.z * uTurn.x;
  float perspective = 1.0 + turnZ * 0.12;
  vec2 projected = vec2(
    (turnX * perspective + local.y * 0.16) * uImage.z,
    local.y * uImage.w + turnZ * uImage.z * 0.3
  );
  // Incline the whole helix after axial rotation, before release and pointer input.
  vec2 point = uImage.xy + vec2(
    projected.x * uTurn.z - projected.y * uTurn.w,
    projected.x * uTurn.w + projected.y * uTurn.z
  );
  float gather = smoothstep(0.0, 0.55, uRelease);
  point.x = mix(point.x, uResolution.x * 0.84, gather * 0.82);
  float delay = 0.15 + position.y * 0.24 + aSeed * 0.08;
  float fall = max(0.0, (uRelease - delay) / (1.0 - delay));
  point.x += (aSeed - 0.5) * uResolution.x * 0.14 * fall;
  point.y += uResolution.y * 2.5 * fall * fall;
  float lift = 0.0;
  if (uTrailCount > 0) {
    vec2 displacement = vec2(0.0);
    float radius = min(145.0, uResolution.x * 0.14);
    float radiusSquared = radius * radius;
    vec2 scatter = vec2(cos(aSeed * 31.4), sin(aSeed * 23.7));
    for (int i = 0; i < 12; i++) {
      if (i >= uTrailCount) break;
      vec2 delta = point - uTrail[i].xy;
      float distanceSquared = dot(delta, delta);
      if (distanceSquared >= radiusSquared) continue;
      float distance = sqrt(distanceSquared);
      float falloff = 1.0 - distance / radius;
      float influence = falloff * falloff * uTrail[i].z;
      vec2 direction = distance > 0.01 ? delta / distance : vec2(cos(aSeed * 6.28), sin(aSeed * 6.28));
      displacement += (direction * 110.0 + scatter * 22.0) * influence;
      lift += influence;
    }
    // Bound the local impulse without changing a particle's scroll destination.
    point += displacement / (1.0 + length(displacement) / 100.0);
  }
  gl_Position = vec4(point.x / uResolution.x * 2.0 - 1.0, 1.0 - point.y / uResolution.y * 2.0, -turnZ * 1.7, 1.0);
  float depthTone = clamp(0.5 + turnZ * 1.55, 0.0, 1.0);
  float size = 2.0 + depthTone * 1.3 + aSeed * 0.5;
  gl_PointSize = size * uRatio * (1.0 + min(lift, 1.0) * 0.6);
  vShade = clamp(depthTone * 0.85 + aSeed * 0.15, 0.0, 1.0);
  vLift = min(lift, 1.0);
}`;
const fragmentShader = `
varying float vShade;
varying float vLift;
void main() {
  vec2 p = gl_PointCoord - 0.5;
  float r = length(p);
  if (r > 0.5) discard;
  float alpha = 1.0 - smoothstep(0.32, 0.5, r);
  vec3 color = mix(vec3(0.412, 0.545, 0.439), vec3(0.894, 0.929, 0.824), vShade);
  color += vLift * 0.055;
  gl_FragColor = vec4(color, alpha * 0.94);
}`;

export async function createDnaRenderer(
  canvas: HTMLCanvasElement,
  compact: boolean,
  assetBase: string,
  signal: AbortSignal,
) {
  const response = await fetch(`${assetBase}/assets/dna/helix.bin`, {
    signal,
  });
  if (!response.ok) throw new Error("DNA samples unavailable");
  const samples = decodeDnaSamples(await response.arrayBuffer(), compact);
  signal.throwIfAborted();
  const renderer = new WebGLRenderer({
    canvas,
    alpha: true,
    antialias: false,
    powerPreference: "low-power",
    depth: true,
    stencil: false,
  });
  renderer.setClearColor(0x000000, 0);
  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new BufferAttribute(samples.positions, 3));
  geometry.setAttribute("aSeed", new BufferAttribute(samples.seeds, 1));
  const samplesTrail = Array.from(
    { length: 12 },
    () => new Vector4(-10000, -10000, -1000, 0),
  );
  const trails = Array.from({ length: 12 }, () => new Vector4());
  const uniforms = {
    uResolution: { value: new Vector2(1, 1) },
    uImage: { value: new Vector4() },
    uTurn: { value: new Vector4(1, 0, 1, 0) },
    uRelease: { value: 0 },
    uRatio: { value: 1 },
    uTrailCount: { value: 0 },
    uTrail: { value: trails },
  };
  const material = new ShaderMaterial({
    uniforms,
    vertexShader,
    fragmentShader,
    transparent: true,
    depthTest: true,
    depthWrite: true,
  });
  const points = new Points(geometry, material);
  points.frustumCulled = false;
  const scene = new Scene();
  scene.add(points);
  const camera = new Camera();
  let index = 0,
    lastX = -1,
    lastY = -1,
    lastTime = 0;
  let width = 1,
    height = 1;
  return {
    resize(w: number, h: number) {
      width = w;
      height = h;
      const ratio = matterPixelRatio(w, h, devicePixelRatio, compact);
      renderer.setPixelRatio(ratio);
      renderer.setSize(w, h, false);
      uniforms.uResolution.value.set(w, h);
      uniforms.uRatio.value = ratio;
    },
    pointer(x: number, y: number, now: number) {
      if (compact || now - lastTime < 16) return;
      const speed =
        lastX < 0 || now - lastTime > 180
          ? 0.3
          : Math.min(
              1,
              Math.hypot(x - lastX, y - lastY) / Math.max(1, now - lastTime),
            );
      samplesTrail[index].set(x, y, now / 1000, 0.3 + speed * 0.7);
      index = (index + 1) % samplesTrail.length;
      lastX = x;
      lastY = y;
      lastTime = now;
    },
    clearPointer() {
      lastX = -1;
    },
    render(progress: number, now: number) {
      if (renderer.getContext().isContextLost()) return false;
      const pose = dnaLayout(width, height, progress, compact);
      uniforms.uImage.value.set(pose.x, pose.y, pose.width, pose.height);
      uniforms.uTurn.value.set(
        Math.cos(pose.yaw),
        Math.sin(pose.yaw),
        Math.cos(pose.roll),
        Math.sin(pose.roll),
      );
      uniforms.uRelease.value = pose.release;
      const activeTrails = compact
        ? 0
        : packDnaTrail(samplesTrail, trails, now / 1000);
      uniforms.uTrailCount.value = activeTrails;
      renderer.render(scene, camera);
      if (canvas.dataset.ready !== "true") {
        canvas.dataset.ready = "true";
        canvas.dataset.renderer = "three";
        canvas.dataset.particles = String(samples.count);
      }
      return activeTrails > 0;
    },
    dispose() {
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      delete canvas.dataset.ready;
      delete canvas.dataset.renderer;
      delete canvas.dataset.particles;
    },
  };
}
