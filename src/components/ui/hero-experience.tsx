"use client";
import { useEffect, useRef, type ReactNode } from "react";
import { ArrowDown } from "lucide-react";
import gsap from "gsap";
import type { createDnaRenderer } from "@/lib/dna-renderer";

/** Volumetric DNA particles with local pointer impulses and reversible scroll. */
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
            pointer: "(hover: hover) and (pointer: fine)",
          },
          (scope) => {
            const desktop = !!scope.conditions?.desktop;
            const motion = !!scope.conditions?.motion;
            // Reduced motion uses the matching pre-rendered particle plate.
            if (!motion) return;
            const controller = new AbortController();
            let renderer:
              Awaited<ReturnType<typeof createDnaRenderer>> | undefined;
            const state = { progress: 0 };
            const interactive =
              desktop && motion && !!scope.conditions?.pointer;
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
              const active = renderer?.render(
                state.progress,
                performance.now(),
              );
              if (active) request();
            };
            const request = () => {
              if (!frame && !dead && visible && !document.hidden)
                frame = requestAnimationFrame(paint);
            };
            let pointerAllowed = false;
            let scrolling = false;
            let settleTimer: ReturnType<typeof setTimeout> | undefined;
            let pointerBounds = surface.getBoundingClientRect();
            let pointerInset = 0.47;
            const resetPointer = () => {
              renderer?.clearPointer();
            };
            const syncPointer = () => {
              const allowed =
                interactive &&
                visible &&
                !document.hidden &&
                !scrolling &&
                state.progress < 1;
              if (allowed === pointerAllowed) return;
              pointerAllowed = allowed;
              section.dataset.interactive = String(allowed);
              if (allowed) {
                pointerBounds = surface.getBoundingClientRect();
                // Read once after scroll settles, not on every pointer event.
                const inset =
                  getComputedStyle(world).clipPath.match(/([\d.]+)%\)$/);
                pointerInset = inset ? Number(inset[1]) / 100 : 0;
              } else resetPointer();
            };
            const suspendPointer = () => {
              if (!interactive) return;
              scrolling = true;
              syncPointer();
              clearTimeout(settleTimer);
              // Includes the scrub's final frames, so the mouse cannot fight it.
              settleTimer = setTimeout(() => {
                scrolling = false;
                syncPointer();
              }, 180);
            };
            const movePointer = (event: PointerEvent) => {
              if (!pointerAllowed || event.pointerType !== "mouse") return;
              // Only the visible scene is interactive; links in the copy stay still.
              const x =
                (event.clientX - pointerBounds.left) / pointerBounds.width;
              const y =
                (event.clientY - pointerBounds.top) / pointerBounds.height;
              if (x < pointerInset || x > 1 || y < 0 || y > 1) {
                resetPointer();
                return;
              }
              renderer?.pointer(x * width, y * height, performance.now());
              request();
            };
            if (interactive) {
              section.addEventListener("pointermove", movePointer);
              section.addEventListener("pointerleave", resetPointer);
              window.addEventListener("scroll", suspendPointer, {
                passive: true,
              });
              syncPointer();
            }
            const resize = () => {
              const w = surface.clientWidth,
                h = surface.clientHeight;
              if (w === width && h === height) return;
              width = w;
              height = h;
              renderer?.resize(w, h);
              request();
              pointerBounds = surface.getBoundingClientRect();
            };
            const resizeObserver = new ResizeObserver(resize);
            resizeObserver.observe(surface);
            const visibilityObserver = new IntersectionObserver(([entry]) => {
              visible = entry.isIntersecting;
              syncPointer();
              if (visible) request();
            });
            visibilityObserver.observe(visual);
            const visibilityChanged = () => {
              syncPointer();
              request();
            };
            document.addEventListener("visibilitychange", visibilityChanged);
            let timeline: gsap.core.Timeline | undefined;
            if (motion) {
              section.dataset.motion = "ready";
              timeline = gsap.timeline({
                defaults: { ease: "none" },
                scrollTrigger: {
                  trigger: desktop ? section : track,
                  start: () =>
                    desktop
                      ? `top top+=${parseFloat(getComputedStyle(section).getPropertyValue("--site-header-height"))}`
                      : "top 60%",
                  end: () =>
                    desktop
                      ? `+=${section.offsetHeight - section.querySelector<HTMLElement>(".ribbon-sticky")!.offsetHeight + visual.offsetHeight * 0.45}`
                      : `bottom top+=${parseFloat(getComputedStyle(section).getPropertyValue("--site-header-height"))}`,
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
                    suspendPointer();
                    section.dataset.progress = p.toFixed(3);
                    const hidden = desktop && p >= 0.49;
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
                  .to(copy, { opacity: 0, y: -20, duration: 0.24 }, 0.25)
                  .to(
                    world,
                    {
                      clipPath: "inset(0 0 0 0%)",
                      duration: 0.2,
                      ease: "power2.inOut",
                    },
                    0.49,
                  )
                  .fromTo(
                    section.querySelector(".ribbon-caption"),
                    { opacity: 0, y: 12 },
                    { opacity: 1, y: 0, duration: 0.1 },
                    0.69,
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
                [surface, section.querySelector(".ribbon-fallback")],
                { yPercent: 6, scale: 1.04, duration: 0.7 },
                0.3,
              );
              timeline.to(
                section.querySelector(".ribbon-meadow"),
                { yPercent: 12, opacity: 0, duration: 0.6 },
                0.4,
              );
              timeline.to(
                section.querySelector(".ribbon-caption"),
                { opacity: 0, y: 12, duration: 0.1 },
                0.9,
              );
            }
            const contextLost = (event: Event) => {
              event.preventDefault();
              delete surface.dataset.ready;
              cancelAnimationFrame(frame);
              frame = 0;
            };
            surface.addEventListener("webglcontextlost", contextLost);
            surface.addEventListener("webglcontextrestored", request);
            void import("@/lib/dna-renderer")
              .then(({ createDnaRenderer }) => {
                if (dead) return;
                return createDnaRenderer(
                  surface,
                  !desktop,
                  assetBase,
                  controller.signal,
                );
              })
              .then((result) => {
                if (!result) return;
                if (dead) {
                  result.dispose();
                  return;
                }
                renderer = result;
                renderer.resize(width, height);
                request();
              })
              .catch(() => {
                /* The pre-rendered DNA remains usable without WebGL. */
              });
            // The static safety plate also clears when WebGL cannot be initialized.
            timeline?.to(
              section.querySelector(".ribbon-fallback"),
              { opacity: 0, duration: 0.2 },
              0.8,
            );
            resize();
            return () => {
              dead = true;
              cancelAnimationFrame(frame);
              resizeObserver.disconnect();
              visibilityObserver.disconnect();
              document.removeEventListener(
                "visibilitychange",
                visibilityChanged,
              );
              section.removeEventListener("pointermove", movePointer);
              section.removeEventListener("pointerleave", resetPointer);
              window.removeEventListener("scroll", suspendPointer);
              clearTimeout(settleTimer);
              controller.abort();
              surface.removeEventListener("webglcontextlost", contextLost);
              surface.removeEventListener("webglcontextrestored", request);
              renderer?.dispose();
              timeline?.scrollTrigger?.kill();
              timeline?.kill();
              copy.inert = false;
              delete section.dataset.motion;
              delete section.dataset.progress;
              delete section.dataset.interactive;
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
  }, [assetBase]);
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
              aria-label="ADN de partículas que reaccionan al cursor y descienden al avanzar por la página."
            >
              <picture className="ribbon-fallback">
                <source
                  media="(max-width:1000px), (max-height:719px)"
                  srcSet={`${assetBase}/assets/dna/portrait-axial.webp`}
                />
                <img
                  src={`${assetBase}/assets/dna/landscape-axial.webp`}
                  alt=""
                  width="1200"
                  height="720"
                />
              </picture>
              <picture className="ribbon-countryside">
                <source
                  media="(max-width:1000px), (max-height:719px)"
                  srcSet={`${assetBase}/assets/campo/praderas-640.webp`}
                />
                <img
                  src={`${assetBase}/assets/campo/praderas-1600.webp`}
                  alt=""
                  width="1600"
                  height="1067"
                />
              </picture>
              <div className="ribbon-atmosphere" aria-hidden="true" />
              <div className="ribbon-meadow" aria-hidden="true" />
              <canvas ref={canvas} aria-hidden="true" />
            </div>
            <div className="ribbon-caption" aria-hidden="true">
              <span>Misma materia.</span>
              <p>Nuevas posibilidades.</p>
            </div>
            <div className="ribbon-footer">
              <a className="ribbon-skip" href="#soluciones">
                Ver soluciones <ArrowDown size={16} aria-hidden="true" />
              </a>
              <span className="ribbon-pointer-hint" aria-hidden="true">
                Explora el ADN con el cursor
              </span>
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
