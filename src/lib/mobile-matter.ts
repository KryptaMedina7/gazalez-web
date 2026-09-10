import { createMatterField } from "./matter-field.mjs";

const vertex = `
attribute vec4 seedA;
attribute vec4 seedB;
uniform float progress;
uniform vec2 size;
uniform float ratio;
varying vec3 color;
void main() {
 float u=seedA.x, v=seedA.y, p=progress;
 float s=seedA.z*cos(p*.7)+seedA.w*sin(p*.7);
 float c=seedA.w*cos(p*.7)-seedA.z*sin(p*.7);
 float scatter=(1.-p)*(1.-u)*(1.-u);
 float depth=c*v;
 float x=size.x*.5+s*size.x*.23+v*c*size.x*.38+seedB.x*size.x*scatter;
 float y=size.y*.38+(u-.5)*size.y*.61+seedB.y*size.y*.48*scatter;
 gl_Position=vec4(x/size.x*2.-1.,1.-y/size.y*2.,0.,1.);
 gl_PointSize=max(.65,1.8+depth*1.6+seedB.z*(1.-p))*2.*ratio;
 color=mix(vec3(.38,.49,.41),vec3(.88,.94,.79),clamp((depth+.5)*.75+u*.2,0.,1.));
 if(seedB.w>.5) color=vec3(.71,.63,.45);
}`;
const fragment = `precision mediump float;
varying vec3 color;
void main() {
 float d=length(gl_PointCoord-vec2(.5));
 if(d>.5) discard;
 gl_FragColor=vec4(color,1.-smoothstep(.40,.50,d));
}`;

export function createMobileMatter(canvas: HTMLCanvasElement) {
  const gl = canvas.getContext("webgl", {
    alpha: true,
    antialias: false,
    depth: false,
    stencil: false,
    powerPreference: "low-power",
  });
  if (!gl) {
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    const field = createMatterField(true, 4);
    return {
      mode: "canvas-lite",
      resize(w: number, h: number, r: number) {
        canvas.width = Math.round(w * r);
        canvas.height = Math.round(h * r);
        ctx.setTransform(r, 0, 0, r, 0, 0);
      },
      draw(w: number, h: number, p: number) {
        ctx.clearRect(0, 0, w, h);
        field.update(w, h, p);
        field.paint(ctx);
      },
      dispose() {},
    };
  }
  const shaders: WebGLShader[] = [];
  const compile = (type: number, source: string) => {
    const shader = gl.createShader(type)!;
    shaders.push(shader);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
      throw new Error("Matter shader compilation failed");
    return shader;
  };
  const program = gl.createProgram()!;
  let buffer: WebGLBuffer | null = null;
  const dispose = () => {
    if (buffer) gl.deleteBuffer(buffer);
    shaders.forEach((s) => gl.deleteShader(s));
    gl.deleteProgram(program);
  };
  try {
    gl.attachShader(program, compile(gl.VERTEX_SHADER, vertex));
    gl.attachShader(program, compile(gl.FRAGMENT_SHADER, fragment));
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS))
      throw new Error("Matter shader linking failed");
    gl.useProgram(program);
    const noise = (i: number) => {
      const n = Math.sin(i * 127.1 + 311.7) * 43758.5453;
      return n - Math.floor(n);
    };
    const seeds = new Float32Array(1100 * 8);
    for (let i = 0; i < 1100; i++) {
      const u = (i % 110) / 109,
        a = u * Math.PI * 2.15 - 1.3;
      seeds.set(
        [
          u,
          Math.floor(i / 110) / 9 - 0.5,
          Math.sin(a),
          Math.cos(a),
          noise(i) - 0.5,
          noise(i + 87) - 0.5,
          noise(i + 16),
          i % 67 === 0 ? 1 : 0,
        ],
        i * 8,
      );
    }
    buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, seeds, gl.STATIC_DRAW);
    for (const [name, offset] of [
      ["seedA", 0],
      ["seedB", 16],
    ] as const) {
      const loc = gl.getAttribLocation(program, name);
      gl.enableVertexAttribArray(loc);
      gl.vertexAttribPointer(loc, 4, gl.FLOAT, false, 32, offset);
    }
    const progress = gl.getUniformLocation(program, "progress"),
      size = gl.getUniformLocation(program, "size"),
      ratio = gl.getUniformLocation(program, "ratio");
    gl.enable(gl.BLEND);
    gl.blendFuncSeparate(
      gl.SRC_ALPHA,
      gl.ONE_MINUS_SRC_ALPHA,
      gl.ONE,
      gl.ONE_MINUS_SRC_ALPHA,
    );
    return {
      mode: "webgl",
      resize(w: number, h: number, r: number) {
        canvas.width = Math.round(w * r);
        canvas.height = Math.round(h * r);
        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.uniform2f(size, w, h);
        gl.uniform1f(ratio, r);
      },
      draw(_w: number, _h: number, p: number) {
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.uniform1f(progress, p);
        gl.drawArrays(gl.POINTS, 0, 1100);
      },
      dispose,
    };
  } catch {
    dispose();
    return null;
  }
}

export function mountMobileMatter(
  section: HTMLElement,
  canvas: HTMLCanvasElement,
) {
  const initial = createMobileMatter(canvas);
  if (!initial) return () => {};
  let renderer = initial;
  let suspended = false;
  section.dataset.mobileMotion = renderer.mode;
  const track = section.querySelector<HTMLElement>(".hero-stage-track")!;
  const stage = section.querySelector<HTMLElement>(".hero-stage")!;
  const front = section.querySelector<HTMLElement>(".hero-depth-front")!;
  const back = section.querySelector<HTMLElement>(".hero-depth-back")!;
  const finale = section.querySelector<HTMLElement>(".hero-finale")!;
  const progressBar = section.querySelector<HTMLElement>(
    ".hero-progress-fill",
  )!;
  let width = 0,
    height = 0,
    start = 0,
    travel = 1,
    frame = 0,
    visible = true,
    last = -1;
  const draw = () => {
    frame = 0;
    if (!visible || document.hidden || suspended) return;
    const p = Math.max(0, Math.min(1, (window.scrollY - start) / travel));
    if (Math.abs(p - last) < 0.0001) return;
    last = p;
    renderer.draw(width, height, p);
    canvas.dataset.ready = "true";
    canvas.dataset.progress = p.toFixed(3);
    front.style.transform = `translate3d(${-6 * p}%,${-18 * p}%,0)`;
    back.style.transform = `translate3d(0,${5 * p}%,0)`;
    const closing = Math.max(0, Math.min(1, (p - 0.62) / 0.3));
    finale.style.opacity = String(closing);
    finale.style.transform = `translate3d(0,${16 * (1 - closing)}px,0)`;
    progressBar.style.transform = `scaleX(${p})`;
  };
  const schedule = () => {
    if (!frame && visible && !document.hidden)
      frame = requestAnimationFrame(draw);
  };
  const measure = () => {
    const rect = stage.getBoundingClientRect();
    start =
      track.getBoundingClientRect().top +
      window.scrollY -
      parseFloat(getComputedStyle(stage).top);
    travel = Math.max(1, track.offsetHeight - stage.offsetHeight);
    if (rect.width !== width || rect.height !== height) {
      width = rect.width;
      height = rect.height;
      renderer.resize(
        width,
        height,
        Math.min(devicePixelRatio, 1.5, Math.sqrt(900000 / (width * height))),
      );
      last = -1;
    }
    schedule();
  };
  const resize = new ResizeObserver(measure);
  resize.observe(track);
  resize.observe(section);
  const view = new IntersectionObserver(
    ([entry]) => {
      visible = entry.isIntersecting;
      if (visible) schedule();
      else {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    },
    { rootMargin: "80px" },
  );
  view.observe(track);
  const lost = (event: Event) => {
    event.preventDefault();
    suspended = true;
    delete canvas.dataset.ready;
  };
  canvas.addEventListener("webglcontextlost", lost);
  const restored = () => {
    renderer.dispose();
    const next = createMobileMatter(canvas);
    if (!next) return;
    renderer = next;
    suspended = false;
    width = height = 0;
    last = -1;
    measure();
  };
  canvas.addEventListener("webglcontextrestored", restored);
  window.addEventListener("scroll", schedule, { passive: true });
  document.addEventListener("visibilitychange", schedule);
  measure();
  return () => {
    cancelAnimationFrame(frame);
    resize.disconnect();
    view.disconnect();
    window.removeEventListener("scroll", schedule);
    document.removeEventListener("visibilitychange", schedule);
    canvas.removeEventListener("webglcontextlost", lost);
    canvas.removeEventListener("webglcontextrestored", restored);
    renderer.dispose();
    delete section.dataset.mobileMotion;
    delete canvas.dataset.ready;
    [front, back, finale, progressBar].forEach((e) => {
      e.style.transform = "";
      e.style.opacity = "";
    });
  };
}
