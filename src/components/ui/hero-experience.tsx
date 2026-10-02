"use client";
import { useEffect, useRef, type ReactNode } from "react";
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
            pointer: "(hover: hover) and (pointer: fine)",
          },
          (scope) => {
            const desktop = !!scope.conditions?.desktop;
            const motion = !!scope.conditions?.motion;
            const ctx = surface.getContext("2d");
            if (!ctx) return;
            const field = createMatterField(!desktop);
            const state = { progress: 0 };
            const pointer = { x: 0, y: 0 };
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
              ctx.clearRect(0, 0, width, height);
              // Hand over continuously to the gathering phase, even on a fast scroll.
              const pointerInfluence = Math.max(
                0,
                Math.min(1, (0.7 - state.progress) / 0.06),
              );
              field.update(
                width,
                height,
                0.82 + Math.min(1, state.progress / 0.65) * 0.18,
                motion
                  ? Math.max(
                      0,
                      (state.progress - (desktop ? 0.7 : 0.48)) /
                        (desktop ? 0.3 : 0.52),
                    )
                  : 0,
                Math.max(0, Math.min(1, (state.progress - 0.49) / 0.2)),
                pointer.x * pointerInfluence,
                pointer.y * pointerInfluence,
              );
              field.paint(ctx);
              surface.dataset.ready = "true";
            };
            const request = () => {
              if (!frame && !dead && visible && !document.hidden)
                frame = requestAnimationFrame(paint);
            };
            const moveX = gsap.quickTo(pointer, "x", {
              duration: 0.55,
              ease: "power3.out",
              onUpdate: request,
            });
            const moveY = gsap.quickTo(pointer, "y", {
              duration: 0.55,
              ease: "power3.out",
              onUpdate: request,
            });
            let pointerAllowed = false;
            let scrolling = false;
            let settleTimer: ReturnType<typeof setTimeout> | undefined;
            let pointerBounds = visual.getBoundingClientRect();
            let pointerInset = 0.47;
            const resetPointer = () => {
              moveX(0);
              moveY(0);
            };
            const syncPointer = () => {
              const allowed =
                interactive &&
                visible &&
                !document.hidden &&
                !scrolling &&
                state.progress < 0.7;
              if (allowed === pointerAllowed) return;
              pointerAllowed = allowed;
              section.dataset.interactive = String(allowed);
              if (allowed) {
                pointerBounds = visual.getBoundingClientRect();
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
              moveX(
                Math.max(
                  -1,
                  Math.min(
                    1,
                    ((x - pointerInset) / (1 - pointerInset)) * 2 - 1,
                  ),
                ),
              );
              moveY(Math.max(-1, Math.min(1, y * 2 - 1)));
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
              const ratio = matterPixelRatio(w, h, devicePixelRatio, !desktop);
              surface.width = Math.round(w * ratio);
              surface.height = Math.round(h * ratio);
              ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
              request();
              pointerBounds = visual.getBoundingClientRect();
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
                surface,
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
              gsap.killTweensOf(pointer);
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
                  media="(max-width:1000px), (max-height:719px)"
                  srcSet={`${assetBase}/assets/matter/portrait-opening.webp`}
                />
                <img
                  src={`${assetBase}/assets/matter/landscape-opening.webp`}
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
