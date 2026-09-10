"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { ArrowDown } from "lucide-react";
import gsap from "gsap";

export function HeroExperience({ children }: { children: ReactNode }) {
  const root = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const section = root.current;
    const surface = canvas.current;
    if (!section || !surface) return;
    const ctx = surface.getContext("2d");
    if (!ctx) return;
    let disposed = false;
    let cleanup = () => {};
    const state = { progress: 0 };
    let width = 1;
    let height = 1;
    const compactQuery = matchMedia("(max-width: 1000px)");
    const noise = (n: number) => {
      const v = Math.sin(n * 127.1 + 311.7) * 43758.5453;
      return v - Math.floor(v);
    };
    const seeds = Array.from({ length: 2200 }, (_, i) => [
      noise(i),
      noise(i + 87),
      noise(i + 16),
    ]);
    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      surface.dataset.ready = "true";
      const p = state.progress;
      const mobile = compactQuery.matches;
      const center = width * (mobile ? 0.5 : 0.76 - p * 0.26);
      const span = width * (mobile ? 0.95 : 0.53 + p * 0.36);
      const count = mobile ? 1100 : 2200;
      // A deterministic sheet of matter gathers into an ordered, twisting ribbon.
      for (let i = 0; i < count; i++) {
        const u = (i % 110) / 109;
        const v = Math.floor(i / 110) / (count / 110 - 1) - 0.5;
        const angle = u * Math.PI * 2.15 - 1.3 + p * 0.7;
        const scatter = (1 - p) * Math.pow(1 - u, 2);
        const depth = Math.cos(angle) * v;
        const x = mobile
          ? width * 0.5 +
            Math.sin(angle) * width * 0.23 +
            v * Math.cos(angle) * width * 0.38 +
            (seeds[i][0] - 0.5) * width * scatter
          : center + (u - 0.5) * span + (noise(i) - 0.5) * span * 0.4 * scatter;
        const y = mobile
          ? height * 0.38 +
            (u - 0.5) * height * 0.61 +
            (seeds[i][1] - 0.5) * height * 0.48 * scatter
          : height * 0.48 +
            Math.sin(angle) * height * 0.19 +
            v * Math.cos(angle) * height * 0.3 +
            (noise(i + 87) - 0.5) * height * 0.65 * scatter;
        const radius = Math.max(
          0.65,
          (mobile ? 1.8 : 2.3) + depth * 1.6 + seeds[i][2] * (1 - p),
        );
        const light = 61 + depth * 32 + u * 17;
        ctx.fillStyle =
          i % 67 === 0
            ? `hsla(41, 39%, 65%, ${0.5 + p * 0.3})`
            : `hsla(102, 25%, ${light}%, ${0.5 + (depth + 0.5) * 0.4})`;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      }
    };
    const resize = () => {
      const box = surface.getBoundingClientRect();
      width = box.width;
      height = box.height;
      const dpr = Math.min(devicePixelRatio, compactQuery.matches ? 1.5 : 1.75);
      surface.width = Math.round(width * dpr);
      surface.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw();
    };
    const observer = new ResizeObserver(resize);
    observer.observe(surface);
    void import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
      if (disposed) return;
      gsap.registerPlugin(ScrollTrigger);
      const media = gsap.matchMedia();
      media.add(
        {
          motion: "(prefers-reduced-motion: no-preference)",
          desktop: "(min-width: 1001px)",
        },
        (mediaContext) => {
          if (!mediaContext.conditions?.motion) return;
          const desktop = mediaContext.conditions.desktop;
          const context = gsap.context(() => {
            const timeline = gsap.timeline({
              scrollTrigger: {
                trigger: desktop
                  ? section
                  : section.querySelector(".hero-stage-track"),
                start: () =>
                  `top top+=${parseFloat(getComputedStyle(section).getPropertyValue("--hero-top"))}`,
                end: () =>
                  desktop
                    ? `+=${parseFloat(getComputedStyle(section).getPropertyValue("--hero-travel"))}`
                    : `+=${section.querySelector(".hero-stage-track")!.getBoundingClientRect().height - section.querySelector(".hero-stage")!.getBoundingClientRect().height}`,
                scrub: 0.35,
                invalidateOnRefresh: true,
              },
            });
            timeline.to(
              state,
              {
                progress: 1,
                duration: 1,
                ease: "none",
                onUpdate: () => {
                  draw();
                  const copy = section.querySelector<HTMLElement>(".hero-copy");
                  if (copy && desktop) copy.inert = state.progress > 0.3;
                },
              },
              0,
            );
            if (desktop)
              timeline.to(
                ".hero-copy",
                { y: -38, opacity: 0, duration: 0.25 },
                0,
              );
            else
              timeline.to(
                ".hero-universe",
                {
                  clipPath: "inset(0% 0% 0% 0% round 0px)",
                  duration: 0.7,
                  ease: "power2.inOut",
                },
                0.05,
              );
            timeline
              .to(
                section,
                {
                  "--hero-reveal": "0%",
                  duration: 0.7,
                  ease: "power2.inOut",
                },
                0.1,
              )
              .fromTo(
                ".hero-finale",
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.3 },
                0.65,
              )
              .to(
                ".hero-progress-fill",
                { scaleX: 1, duration: 1, ease: "none" },
                0,
              );
          }, section);
          return () => {
            context.revert();
            state.progress = 0;
            draw();
            const copy = section.querySelector<HTMLElement>(".hero-copy");
            if (copy) copy.inert = false;
          };
        },
      );
      cleanup = () => media.revert();
    });
    return () => {
      disposed = true;
      observer.disconnect();
      cleanup();
    };
  }, []);

  return (
    <section
      ref={root}
      className="hero-journey"
      aria-label="De subproducto a solución"
    >
      <div className="hero hero-immersive">
        {children}
        <div className="hero-stage-track">
          <div className="hero-stage">
            <figure
              className="hero-universe"
              aria-label="Visualización conceptual de materia que se reúne en una cinta"
            >
              <svg
                className="hero-ribbon-fallback"
                viewBox="0 0 800 600"
                aria-hidden="true"
              >
                <path
                  d="M80 320C300 0 380 600 740 240"
                  fill="none"
                  stroke="#b8ceae"
                  strokeWidth="34"
                />
              </svg>
              <canvas ref={canvas} aria-hidden="true" />
              <figcaption>
                Materia en transformación <span>Visualización conceptual</span>
              </figcaption>
            </figure>
            <div className="hero-finale" aria-hidden="true">
              Misma materia.
              <br />
              <span>Nuevas posibilidades.</span>
            </div>
            <a className="hero-scroll-invitation" href="#nuevo-comienzo">
              Descubre la transformación{" "}
              <ArrowDown aria-hidden="true" size={15} />
            </a>
            <span className="hero-progress" aria-hidden="true">
              <span className="hero-progress-fill" />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
