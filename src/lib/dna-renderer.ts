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
import {
  decodeDnaSamples,
  dnaLayout,
  DNA_TRAIL_SECONDS,
} from "./dna-particles.mjs";
import { matterPixelRatio } from "./matter-field.mjs";

const vertexShader = `
attribute float aSeed;
uniform vec2 uResolution;
uniform vec4 uImage;
uniform float uRelease;
uniform float uRatio;
uniform float uTime;
uniform vec4 uTrail[12];
varying float vShade;
varying float vLift;
void main() {
  vec2 point = uImage.xy + (position.xy - 0.5) * uImage.zw;
  float gather = smoothstep(0.0, 0.55, uRelease);
  point.x = mix(point.x, uResolution.x * 0.84, gather * 0.82);
  float delay = 0.15 + position.y * 0.24 + aSeed * 0.08;
  float fall = max(0.0, (uRelease - delay) / (1.0 - delay));
  point.x += (aSeed - 0.5) * uResolution.x * 0.14 * fall;
  point.y += uResolution.y * 2.5 * fall * fall;
  vec2 displacement = vec2(0.0);
  float lift = 0.0;
  float radius = min(145.0, uResolution.x * 0.14);
  for (int i = 0; i < 12; i++) {
    float age = uTime - uTrail[i].z;
    float life = clamp(age / ${DNA_TRAIL_SECONDS}, 0.0, 1.0);
    float envelope = sin(life * 3.14159265) * (1.0 - life) * uTrail[i].w;
    vec2 delta = point - uTrail[i].xy;
    float distance = length(delta);
    float influence = pow(max(0.0, 1.0 - distance / radius), 2.0) * envelope;
    vec2 direction = distance > 0.01 ? delta / distance : vec2(cos(aSeed * 6.28), sin(aSeed * 6.28));
    vec2 scatter = vec2(cos(aSeed * 31.4), sin(aSeed * 23.7));
    displacement += (direction * 110.0 + scatter * 22.0) * influence;
    lift += influence;
  }
  // Bound the local impulse without changing a particle's scroll destination.
  point += displacement / (1.0 + length(displacement) / 100.0);
  gl_Position = vec4(point.x / uResolution.x * 2.0 - 1.0, 1.0 - point.y / uResolution.y * 2.0, 0.0, 1.0);
  float size = 2.1 + position.z * 1.3 + aSeed * 0.5;
  gl_PointSize = size * uRatio * (1.0 + min(lift, 1.0) * 0.6);
  vShade = clamp((position.z - 0.16) / 0.72, 0.0, 1.0);
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
  const response = await fetch(`${assetBase}/assets/dna/particles.bin`, {
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
    depth: false,
    stencil: false,
  });
  renderer.setClearColor(0x000000, 0);
  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new BufferAttribute(samples.positions, 3));
  geometry.setAttribute("aSeed", new BufferAttribute(samples.seeds, 1));
  const trails = Array.from(
    { length: 12 },
    () => new Vector4(-10000, -10000, -1000, 0),
  );
  const uniforms = {
    uResolution: { value: new Vector2(1, 1) },
    uImage: { value: new Vector4() },
    uRelease: { value: 0 },
    uRatio: { value: 1 },
    uTime: { value: 0 },
    uTrail: { value: trails },
  };
  const material = new ShaderMaterial({
    uniforms,
    vertexShader,
    fragmentShader,
    transparent: true,
    depthTest: false,
    depthWrite: false,
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
      trails[index].set(x, y, now / 1000, 0.3 + speed * 0.7);
      index = (index + 1) % trails.length;
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
      uniforms.uRelease.value = pose.release;
      uniforms.uTime.value = now / 1000;
      renderer.render(scene, camera);
      canvas.dataset.ready = "true";
      canvas.dataset.renderer = "three";
      canvas.dataset.particles = String(samples.count);
      return trails.some((t) => now / 1000 - t.z < DNA_TRAIL_SECONDS);
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
