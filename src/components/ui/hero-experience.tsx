"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { createMatterField, matterPixelRatio } from "@/lib/matter-field.mjs";
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
    let field = createMatterField(compactQuery.matches);
    let fieldCompact = compactQuery.matches;
    let frame = 0;
    let visible = true;
    let paintCount = 0;
    let paintTotal = 0;
    const draw = () => {
      frame = 0;
      if (disposed || !visible || document.hidden || width < 1 || height < 1)
        return;
      const started = performance.now();
      if (fieldCompact !== compactQuery.matches) {
        fieldCompact = compactQuery.matches;
        field = createMatterField(fieldCompact);
      }
      ctx.clearRect(0, 0, width, height);
      field.update(width, height, state.progress);
      field.paint(ctx);
      surface.dataset.ready = "true";
      // Local diagnostics only, without network reporting or visitor data.
      paintTotal += performance.now() - started;
      paintCount++;
      surface.dataset.paintMs = (paintTotal / paintCount).toFixed(2);
    };
    const scheduleDraw = () => {
      if (!frame && visible && !document.hidden && !disposed)
        frame = requestAnimationFrame(draw);
    };
    const visibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(frame);
        frame = 0;
      } else scheduleDraw();
    };
    document.addEventListener("visibilitychange", visibility);
    const viewObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) scheduleDraw();
      else {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    });
    viewObserver.observe(surface);
    const resize = () => {
      const box = surface.getBoundingClientRect();
      width = box.width;
      height = box.height;
      const dpr = matterPixelRatio(
        width,
        height,
        devicePixelRatio,
        compactQuery.matches,
      );
      surface.width = Math.floor(width * dpr);
      surface.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      scheduleDraw();
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
          section.dataset.motion = "ready";
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
                scrub: desktop ? 0.35 : 0.18,
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
                  scheduleDraw();
                  const copy = section.querySelector<HTMLElement>(".hero-copy");
                  if (copy && desktop) copy.inert = state.progress > 0.3;
                },
              },
              0,
            );
            timeline
              .to(
                ".hero-depth-back",
                { yPercent: 7, scale: 1.04, duration: 1, ease: "none" },
                0,
              )
              .to(
                ".hero-depth-front",
                {
                  yPercent: -22,
                  xPercent: desktop ? -6 : 4,
                  scale: 1.16,
                  duration: 1,
                  ease: "none",
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
                  duration: desktop ? 0.35 : 0.7,
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
            delete section.dataset.motion;
            state.progress = 0;
            scheduleDraw();
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
      viewObserver.disconnect();
      document.removeEventListener("visibilitychange", visibility);
      cancelAnimationFrame(frame);
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
              <svg
                className="hero-depth-back"
                viewBox="0 0 1000 800"
                preserveAspectRatio="xMidYMid slice"
                aria-hidden="true"
              >
                {Array.from({ length: 9 }, (_, i) => (
                  <path
                    key={i}
                    d={`M${-180 + i * 47} 850 C${100 + i * 37} 590 ${720 - i * 24} 700 ${730 + i * 39} -100`}
                  />
                ))}
              </svg>
              <canvas ref={canvas} aria-hidden="true" />
              <svg
                className="hero-depth-front"
                viewBox="0 0 1000 800"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path d="M-80 140 Q80 62 150 126 Q178 184 88 246 L-44 294Z" />
                <path d="M830 -65 Q948 10 1020 142 L1080 -50Z" />
                <path d="M930 550 Q872 592 914 674 L1040 756 L1070 565Z" />
                <path
                  className="hero-fragment-edge"
                  d="M-70 163 Q80 83 145 132 M939 566 Q899 600 936 662"
                />
              </svg>
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
              Conoce nuestro enfoque
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
