"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { createMatterField, matterPixelRatio } from "@/lib/matter-field.mjs";
import gsap from "gsap";
import Image from "next/image";
import { mountMobileMatter } from "@/lib/mobile-matter";

export function HeroExperience({ children, assetBase = "" }: { children: ReactNode; assetBase?: string }) {
  const root = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const mobileCanvas = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const section = root.current;
    const surface = canvas.current;
    if (!section || !surface) return;
    const desktopQuery = matchMedia("(min-width: 1001px)");
    const reduceQuery = matchMedia("(prefers-reduced-motion: reduce)");
    let disposeScene = () => {};
    let generation = 0;
    const configure = () => {
      const current = ++generation;
      disposeScene();
      disposeScene = () => {};
      delete section.dataset.motion;
      surface.width = surface.height = 1;
      if (!desktopQuery.matches) {
        if (!reduceQuery.matches && mobileCanvas.current)
          disposeScene = mountMobileMatter(section, mobileCanvas.current);
        return;
      }
      void import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        if (generation !== current) return;
        gsap.registerPlugin(ScrollTrigger);
        const ctx = surface.getContext("2d");
        if (!ctx) return;
        const field = createMatterField(false);
        const state = { progress: reduceQuery.matches ? 1 : 0 };
        const copy = section.querySelector<HTMLElement>(".hero-copy");
        let width = 0,
          height = 0,
          visible = true;
        const paint = () => {
          if (!visible || document.hidden || !width || !height) return;
          ctx.clearRect(0, 0, width, height);
          field.update(width, height, state.progress);
          field.paint(ctx);
          surface.dataset.ready = "true";
          if (
            copy &&
            copy.inert !== state.progress > 0.3 &&
            !reduceQuery.matches
          )
            copy.inert = state.progress > 0.3;
        };
        const resize = () => {
          const box = surface.getBoundingClientRect();
          if (box.width === width && box.height === height) return;
          width = box.width;
          height = box.height;
          const ratio = matterPixelRatio(
            width,
            height,
            devicePixelRatio,
            false,
          );
          surface.width = Math.floor(width * ratio);
          surface.height = Math.floor(height * ratio);
          ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
          paint();
        };
        const observer = new ResizeObserver(resize);
        observer.observe(surface);
        const visibility = new IntersectionObserver(([entry]) => {
          visible = entry.isIntersecting;
          if (visible) paint();
        });
        visibility.observe(section);
        document.addEventListener("visibilitychange", paint);
        const context = gsap.context(() => {
          if (reduceQuery.matches) return;
          section.dataset.motion = "ready";
          gsap
            .timeline({
              scrollTrigger: {
                trigger: section,
                start: () =>
                  `top top+=${parseFloat(getComputedStyle(section).getPropertyValue("--hero-top"))}`,
                end: () =>
                  `+=${parseFloat(getComputedStyle(section).getPropertyValue("--hero-travel"))}`,
                scrub: 0.25,
                invalidateOnRefresh: true,
              },
            })
            .to(
              state,
              { progress: 1, duration: 1, ease: "none", onUpdate: paint },
              0,
            )
            .to(
              ".hero-depth-back",
              { yPercent: 7, duration: 1, ease: "none" },
              0,
            )
            .to(
              ".hero-depth-front",
              { yPercent: -22, xPercent: -6, duration: 1, ease: "none" },
              0,
            )
            .to(".hero-copy", { y: -38, opacity: 0, duration: 0.25 }, 0)
            .to(
              ".hero-universe",
              {
                clipPath: "inset(0 0 0 0%)",
                duration: 0.35,
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
        disposeScene = () => {
          observer.disconnect();
          visibility.disconnect();
          document.removeEventListener("visibilitychange", paint);
          context.revert();
          if (copy) copy.inert = false;
          delete surface.dataset.ready;
        };
      });
    };
    configure();
    desktopQuery.addEventListener("change", configure);
    reduceQuery.addEventListener("change", configure);
    return () => {
      generation++;
      disposeScene();
      desktopQuery.removeEventListener("change", configure);
      reduceQuery.removeEventListener("change", configure);
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
              {(["formed"] as const).map((phase) => (
                <picture
                  className={`hero-mobile-matter hero-mobile-${phase}`}
                  key={phase}
                >
                  <source
                    media="(min-width: 1001px)"
                    srcSet="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
                  />
                  <source
                    media="(max-height: 500px)"
                    srcSet={`${assetBase}/assets/matter/landscape-${phase}.webp`}
                  />
                  <Image
                    src={`/assets/matter/portrait-${phase}.webp`}
                    alt=""
                    width={585}
                    height={1149}
                    unoptimized
                    loading="eager"
                  />
                </picture>
              ))}
              <canvas
                className="hero-mobile-canvas"
                ref={mobileCanvas}
                aria-hidden="true"
              />
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
