"use client";
import { useEffect, useRef, type ReactNode } from "react";
import Link from "next/link";
import { ArrowDown } from "lucide-react";
import gsap from "gsap";
import { createMatterField, matterPixelRatio } from "@/lib/matter-field.mjs";

/** The official site's particle ribbon, with native reversible scroll. */
export function HeroExperience({
  children,
  assetBase = "",
}: {
  children: ReactNode;
  assetBase?: string;
}) {
  const root = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const section = root.current,
      surface = canvas.current;
    if (!section || !surface) return;
    let disposed = false;
    const media = gsap.matchMedia();
    void import("gsap/ScrollTrigger")
      .then(({ ScrollTrigger }) => {
        if (disposed) return;
        gsap.registerPlugin(ScrollTrigger);
        media.add(
          {
            motion: "(prefers-reduced-motion: no-preference)",
            reduce: "(prefers-reduced-motion: reduce)",
            desktop: "(min-width: 1001px) and (min-height: 720px)",
          },
          (scope) => {
            const desktop = !!scope.conditions?.desktop;
            const motion = !!scope.conditions?.motion;
            const ctx = surface.getContext("2d");
            if (!ctx) return;
            const field = createMatterField(!desktop);
            const state = { progress: 0, release: 0 };
            const copy = section.querySelector<HTMLElement>(".ribbon-copy")!;
            const world = section.querySelector<HTMLElement>(".ribbon-world")!;
            const track = section.querySelector<HTMLElement>(".ribbon-track")!;
            const visual =
              section.querySelector<HTMLElement>(".ribbon-visual")!;
            const skip =
              section.querySelector<HTMLAnchorElement>(".ribbon-skip")!;
            let width = 0,
              height = 0,
              frame = 0,
              visible = true,
              dead = false;
            const paint = () => {
              frame = 0;
              if (dead || !visible || document.hidden || !width || !height)
                return;
              ctx.clearRect(0, 0, width, height);
              field.update(
                width,
                height,
                Math.min(1, state.progress / 0.58),
                state.release,
              );
              field.paint(ctx);
              surface.dataset.ready = "true";
            };
            const request = () => {
              if (!frame && !dead && visible && !document.hidden)
                frame = requestAnimationFrame(paint);
            };
            const resize = () => {
              const w = surface.clientWidth,
                h = surface.clientHeight;
              if (w === width && h === height) return;
              width = w;
              height = h;
              const ratio = matterPixelRatio(w, h, devicePixelRatio, !desktop);
              surface.width = Math.round(w * ratio);
              surface.height = Math.round(h * ratio);
              ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
              request();
            };
            const resizeObserver = new ResizeObserver(resize);
            resizeObserver.observe(surface);
            const visibilityObserver = new IntersectionObserver(([entry]) => {
              visible = entry.isIntersecting;
              if (visible) request();
            });
            visibilityObserver.observe(visual);
            document.addEventListener("visibilitychange", request);
            let timeline: gsap.core.Timeline | undefined;
            let releaseTween: gsap.core.Tween | undefined;
            if (motion) {
              section.dataset.motion = "ready";
              timeline = gsap.timeline({
                defaults: { ease: "none" },
                scrollTrigger: {
                  trigger: desktop ? section : track,
                  start: () =>
                    `top top+=${parseFloat(getComputedStyle(section).getPropertyValue("--site-header-height"))}`,
                  end: () =>
                    `+=${desktop ? section.offsetHeight - section.querySelector<HTMLElement>(".ribbon-sticky")!.offsetHeight : track.offsetHeight - visual.offsetHeight}`,
                  scrub: desktop ? 0.22 : true,
                  invalidateOnRefresh: true,
                },
              });
              timeline.to(
                state,
                {
                  progress: 1,
                  duration: 1,
                  onUpdate: () => {
                    const p = state.progress;
                    section.dataset.progress = p.toFixed(3);
                    const hidden = desktop && p > 0.2;
                    if (copy.inert !== hidden) {
                      if (hidden && copy.contains(document.activeElement))
                        skip.focus({ preventScroll: true });
                      copy.inert = hidden;
                    }
                    request();
                  },
                },
                0,
              );
              if (desktop) {
                timeline
                  .to(copy, { opacity: 0, y: -30, duration: 0.16 }, 0.015)
                  .to(
                    world,
                    {
                      clipPath: "inset(0 0 0 0%)",
                      duration: 0.22,
                      ease: "power2.inOut",
                    },
                    0.035,
                  )
                  .fromTo(
                    section.querySelector(".ribbon-caption"),
                    { opacity: 0, y: 12 },
                    { opacity: 1, y: 0, duration: 0.14 },
                    0.58,
                  );
              }
              timeline.to(
                section.querySelector(".ribbon-progress > span"),
                { scaleX: 1, duration: 1 },
                0,
              );
              // A small downward drift carries the material behind the next surface.
              // This is tied to scroll, so reversing reconstructs the same scene.
              timeline.to(
                surface,
                { yPercent: 6, scale: 1.04, duration: 0.7 },
                0.3,
              );
              timeline.to(
                section.querySelector(".ribbon-caption"),
                { opacity: 0, y: 12, duration: 0.1 },
                0.9,
              );
              // Continue the fall while the next section covers the scene.
              // Clearing at the sticky endpoint would leave an empty viewport.
              const travel = () =>
                desktop
                  ? section.offsetHeight -
                    section.querySelector<HTMLElement>(".ribbon-sticky")!
                      .offsetHeight
                  : track.offsetHeight - visual.offsetHeight;
              releaseTween = gsap.to(state, {
                release: 1,
                ease: "none",
                onUpdate: request,
                scrollTrigger: {
                  trigger: desktop ? section : track,
                  start: () =>
                    `top+=${travel() * 0.68} top+=${parseFloat(getComputedStyle(section).getPropertyValue("--site-header-height"))}`,
                  end: () =>
                    `+=${travel() * 0.32 + visual.offsetHeight * 0.65}`,
                  scrub: desktop ? 0.22 : true,
                  invalidateOnRefresh: true,
                },
              });
            }
            resize();
            return () => {
              dead = true;
              cancelAnimationFrame(frame);
              resizeObserver.disconnect();
              visibilityObserver.disconnect();
              document.removeEventListener("visibilitychange", request);
              timeline?.scrollTrigger?.kill();
              timeline?.kill();
              releaseTween?.scrollTrigger?.kill();
              releaseTween?.kill();
              copy.inert = false;
              delete section.dataset.motion;
              delete section.dataset.progress;
              delete surface.dataset.ready;
            };
          },
          section,
        );
      })
      .catch(() => {
        /* Original static particle plate remains visible. */
      });
    return () => {
      disposed = true;
      media.revert();
    };
  }, []);
  return (
    <section
      className="ribbon-journey"
      ref={root}
      aria-label="Nutrición animal y valorización industrial"
    >
      <div className="ribbon-sticky">
        <div className="ribbon-copy">{children}</div>
        <div className="ribbon-track">
          <div className="ribbon-visual">
            <div
              className="ribbon-world"
              role="img"
              aria-label="Partículas que se reúnen en una cinta de ADN y se despliegan al recorrer la página."
            >
              <picture className="ribbon-fallback">
                <source
                  media="(max-width:1000px)"
                  srcSet={`${assetBase}/assets/matter/portrait-formed.webp`}
                />
                <img
                  src={`${assetBase}/assets/matter/landscape-formed.webp`}
                  alt=""
                  width="1200"
                  height="720"
                />
              </picture>
              <svg
                className="ribbon-contours"
                viewBox="0 0 1000 800"
                preserveAspectRatio="none"
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
                className="ribbon-edges"
                viewBox="0 0 1000 800"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path d="M-100 80 Q90 85 32 254 L-70 380Z" />
                <path d="M950 -80 Q975 20 1090 80 L1080 -60Z" />
              </svg>
            </div>
            <div className="ribbon-caption" aria-hidden="true">
              <span>Misma materia.</span>
              <p>Nuevas posibilidades.</p>
            </div>
            <div className="ribbon-footer">
              <Link className="ribbon-skip" href="#soluciones">
                Ver soluciones <ArrowDown size={16} aria-hidden="true" />
              </Link>
            </div>
            <div className="ribbon-progress" aria-hidden="true">
              <span />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
