import {
  AmbientLight,
  BufferGeometry,
  CanvasTexture,
  CircleGeometry,
  Color,
  CylinderGeometry,
  DirectionalLight,
  DynamicDrawUsage,
  Float32BufferAttribute,
  Group,
  HemisphereLight,
  IcosahedronGeometry,
  InstancedMesh,
  Line,
  LineBasicMaterial,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  Object3D,
  OrthographicCamera,
  PlaneGeometry,
  Scene,
  SRGBColorSpace,
  TorusGeometry,
  WebGLRenderer,
} from "three";
import gsap from "gsap";
import {
  materialIndices,
  materialPosition,
  trayPose,
} from "./process-volume.mjs";

export interface MaterialScene {
  setStage(stage: number, instant?: boolean): void;
  setView(angle: number, instant?: boolean, tilt?: number): void;
  getView(): { angle: number; tilt: number };
  setActive(active: boolean): void;
  dispose(): void;
}

export function createMaterialScene(
  canvas: HTMLCanvasElement,
  onFailure: () => void,
): MaterialScene {
  // No renderer is created until this isolated section approaches the viewport.
  const compact = matchMedia("(max-width: 760px)");
  const hardware = navigator as Navigator & { deviceMemory?: number };
  const constrained =
    (hardware.deviceMemory ?? 8) <= 4 ||
    (navigator.hardwareConcurrency || 8) <= 4;
  const context3d = canvas.getContext("webgl2", {
    alpha: true,
    antialias: !constrained,
    powerPreference: "low-power",
  });
  if (!context3d) throw new Error("WebGL2 unavailable");
  const renderer = new WebGLRenderer({
    canvas,
    context: context3d,
    alpha: true,
    antialias: !constrained,
    powerPreference: "low-power",
  });
  renderer.outputColorSpace = SRGBColorSpace;
  renderer.setClearColor(0x000000, 0);
  const scene = new Scene();
  const camera = new OrthographicCamera(-4.5, 4.5, 3.3, -3.3, 0.1, 30);
  camera.position.set(0, 5.4, 9);
  camera.lookAt(0, 0.8, 0);
  const root = new Group();
  scene.add(root);
  scene.add(new HemisphereLight(0xf7f8f3, 0x66836b, 2.1));
  scene.add(new AmbientLight(0xffffff, 0.35));
  const light = new DirectionalLight(0xfff8e8, 3);
  light.position.set(-3, 7, 5);
  scene.add(light);

  const geometry = new IcosahedronGeometry(1, constrained ? 0 : 1);
  const material = new MeshStandardMaterial({
    roughness: 0.92,
    metalness: 0,
    flatShading: true,
  });
  const particles = new InstancedMesh(geometry, material, 180);
  particles.instanceMatrix.setUsage(DynamicDrawUsage);
  particles.frustumCulled = false;
  root.add(particles);
  const palette = [
    new Color("#285540"),
    new Color("#73966c"),
    new Color("#aec5a0"),
  ];
  const indices = materialIndices(compact.matches, constrained);
  particles.count = indices.length;
  indices.forEach((index, i) => particles.setColorAt(i, palette[index % 3]));
  if (particles.instanceColor) particles.instanceColor.needsUpdate = true;
  const dummy = new Object3D();
  const positions = indices.map((index) => materialPosition(0, index));

  // Baked soft contact shade: no per-frame shadow pass, bloom or reflections.
  const shadeCanvas = document.createElement("canvas");
  shadeCanvas.width = shadeCanvas.height = 64;
  const context = shadeCanvas.getContext("2d")!;
  const gradient = context.createRadialGradient(32, 32, 2, 32, 32, 32);
  gradient.addColorStop(0, "rgba(22,48,36,.23)");
  gradient.addColorStop(1, "rgba(22,48,36,0)");
  context.fillStyle = gradient;
  context.fillRect(0, 0, 64, 64);
  const texture = new CanvasTexture(shadeCanvas);
  const shade = new Mesh(
    new PlaneGeometry(8.3, 4.3),
    new MeshBasicMaterial({
      map: texture,
      transparent: true,
      depthWrite: false,
    }),
  );
  shade.rotation.x = -Math.PI / 2;
  shade.position.y = -0.2;
  root.add(shade);

  const trayGeometry = new CylinderGeometry(1, 1, 0.08, 48);
  const ringGeometry = new TorusGeometry(1, 0.009, 4, 64);
  const faceGeometry = new CircleGeometry(0.97, 48);
  const trays = Array.from({ length: 4 }, (_, i) => {
    const group = new Group();
    const trayMaterial = new MeshStandardMaterial({
      color: i ? palette[i - 1] : new Color("#c7d8bd"),
      roughness: 1,
      transparent: true,
    });
    const tray = new Mesh(trayGeometry, trayMaterial);
    const ringMaterial = new MeshBasicMaterial({
      color: "#73966c",
      transparent: true,
    });
    const ring = new Mesh(ringGeometry, ringMaterial);
    ring.rotation.x = Math.PI / 2;
    ring.position.y = 0.05;
    const faceMaterial = new MeshBasicMaterial({
      color: "#e4eedc",
      transparent: true,
    });
    const face = new Mesh(faceGeometry, faceMaterial);
    face.rotation.x = -Math.PI / 2;
    face.position.y = 0.041;
    group.add(tray, face, ring);
    root.add(group);
    return {
      group,
      materials: [trayMaterial, ringMaterial, faceMaterial],
      pose: trayPose(0, i),
    };
  });

  const lineGeometry = new BufferGeometry();
  lineGeometry.setAttribute(
    "position",
    new Float32BufferAttribute([-2.25, 0.12, 0, 0, 0.12, 0, 2.25, 0.12, 0], 3),
  );
  const lineMaterial = new LineBasicMaterial({
    color: "#42634b",
    transparent: true,
    opacity: 0,
  });
  root.add(new Line(lineGeometry, lineMaterial));

  let active = true;
  let disposed = false;
  let frame = 0;
  let transition: gsap.core.Tween | null = null;
  let viewTween: gsap.core.Tween | null = null;
  let stage = 0;
  let matterDirty = true;
  const view = { angle: -0.38, tilt: 0 };
  const render = () => {
    frame = 0;
    if (!active || disposed || document.hidden) return;
    root.rotation.y = view.angle;
    root.rotation.x = view.tilt;
    if (matterDirty) {
      for (let slot = 0; slot < indices.length; slot++) {
        const i = indices[slot];
        const p = positions[slot];
        const scale = 0.085 + ((i * 13) % 9) * 0.009;
        dummy.position.set(p.x, p.y, p.z);
        dummy.rotation.set(i * 0.7, i * 1.3 + stage * 0.14, i * 0.3);
        dummy.scale.set(
          scale * (i % 3 === 0 ? 1.7 : 1),
          scale * (i % 3 === 1 ? 0.55 : 1),
          scale,
        );
        dummy.updateMatrix();
        particles.setMatrixAt(slot, dummy.matrix);
      }
      particles.instanceMatrix.needsUpdate = true;
      trays.forEach(({ group, materials, pose }) => {
        group.position.set(pose.x, pose.y, 0);
        group.scale.set(pose.scale, 1, pose.scale);
        group.visible = pose.opacity > 0.01;
        materials.forEach((m) => {
          m.opacity = pose.opacity;
          m.depthWrite = pose.opacity > 0.95;
        });
      });
      matterDirty = false;
    }
    renderer.render(scene, camera);
  };
  const requestRender = () => {
    if (active && !disposed && !frame) frame = requestAnimationFrame(render);
  };
  const resize = () => {
    if (disposed) return;
    const { width, height } = canvas.getBoundingClientRect();
    if (!width || !height) return;
    renderer.setPixelRatio(
      Math.min(devicePixelRatio || 1, compact.matches || constrained ? 1 : 1.5),
    );
    renderer.setSize(width, height, false);
    const span = Math.max(7.8, (4.6 * width) / height);
    camera.left = -span / 2;
    camera.right = span / 2;
    camera.top = span / (width / height) / 2;
    camera.bottom = -camera.top;
    camera.updateProjectionMatrix();
    requestRender();
  };
  const setStage = (next: number, instant = false) => {
    transition?.kill();
    stage = next;
    const from = positions.map((p) => ({ ...p }));
    const target = indices.map((i) => materialPosition(stage, i));
    const trayFrom = trays.map((t) => ({ ...t.pose }));
    const trayTarget = trays.map((_, i) => trayPose(stage, i));
    const lineFrom = lineMaterial.opacity;
    const zoomFrom = camera.zoom;
    const zoomTarget =
      stage === 0 ? 1.25 : stage === 2 ? (compact.matches ? 2 : 1.4) : 1;
    const progress = { value: 0 };
    const update = () => {
      const t = progress.value;
      positions.forEach((p, i) => {
        p.x = from[i].x + (target[i].x - from[i].x) * t;
        p.y = from[i].y + (target[i].y - from[i].y) * t;
        p.z = from[i].z + (target[i].z - from[i].z) * t;
      });
      trays.forEach((tray, i) => {
        const a = trayFrom[i],
          b = trayTarget[i];
        tray.pose = {
          x: a.x + (b.x - a.x) * t,
          y: a.y + (b.y - a.y) * t,
          scale: a.scale + (b.scale - a.scale) * t,
          opacity: a.opacity + (b.opacity - a.opacity) * t,
        };
      });
      lineMaterial.opacity =
        lineFrom + ((stage === 3 ? 0.8 : 0) - lineFrom) * t;
      camera.zoom = zoomFrom + (zoomTarget - zoomFrom) * t;
      camera.updateProjectionMatrix();
      matterDirty = true;
      requestRender();
    };
    transition = gsap.to(progress, {
      value: 1,
      duration: instant ? 0 : compact.matches ? 0.65 : 0.9,
      ease: "power3.inOut",
      onUpdate: update,
      onComplete: update,
      paused: !active,
    });
  };
  const setView = (angle: number, instant = false, tilt = 0) => {
    viewTween?.kill();
    // Pointer/keyboard input tracks immediately; only preset buttons tween.
    if (instant) {
      view.angle = angle;
      view.tilt = Math.max(-0.3, Math.min(0.3, tilt));
      requestRender();
      return;
    }
    viewTween = gsap.to(view, {
      angle,
      tilt: Math.max(-0.3, Math.min(0.3, tilt)),
      duration: instant ? 0 : 0.45,
      ease: "power2.out",
      onUpdate: requestRender,
      onComplete: requestRender,
      paused: !active,
    });
  };
  const contextLost = (event: Event) => {
    event.preventDefault();
    onFailure();
  };
  const budgetChanged = () => {
    transition?.kill();
    indices.splice(
      0,
      indices.length,
      ...materialIndices(compact.matches, constrained),
    );
    positions.splice(
      0,
      positions.length,
      ...indices.map((i) => materialPosition(stage, i)),
    );
    particles.count = indices.length;
    indices.forEach((index, i) => particles.setColorAt(i, palette[index % 3]));
    if (particles.instanceColor) particles.instanceColor.needsUpdate = true;
    resize();
    setStage(stage, true);
  };
  compact.addEventListener("change", budgetChanged);
  canvas.addEventListener("webglcontextlost", contextLost);
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(canvas);
  resize();
  setStage(0, true);
  return {
    setStage,
    setView,
    getView: () => ({ ...view }),
    setActive(value) {
      active = value;
      if (active) {
        transition?.resume();
        viewTween?.resume();
        requestRender();
      } else {
        transition?.pause();
        viewTween?.pause();
        cancelAnimationFrame(frame);
        frame = 0;
      }
    },
    dispose() {
      if (disposed) return;
      disposed = true;
      transition?.kill();
      viewTween?.kill();
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      compact.removeEventListener("change", budgetChanged);
      canvas.removeEventListener("webglcontextlost", contextLost);
      geometry.dispose();
      material.dispose();
      particles.dispose();
      trayGeometry.dispose();
      ringGeometry.dispose();
      faceGeometry.dispose();
      trays.forEach((t) => t.materials.forEach((m) => m.dispose()));
      lineGeometry.dispose();
      lineMaterial.dispose();
      texture.dispose();
      shade.geometry.dispose();
      shade.material.dispose();
      renderer.dispose();
    },
  };
}
