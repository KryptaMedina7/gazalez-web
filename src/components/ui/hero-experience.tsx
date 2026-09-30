"use client";
import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";

/** Native-scroll forest passage: no canvas, video decoder or render loop. */
export function HeroExperience({
  children,
  assetBase = "",
}: {
  children: ReactNode;
  assetBase?: string;
}) {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    const section = root.current;
    if (!section) return;
    let disposed = false;
    const media = gsap.matchMedia();
    const images = Array.from(
      section.querySelectorAll<HTMLImageElement>(".forest-plane img"),
    );
    // If a layer fails, preserve the complete static scene and usable actions.
    Promise.all(images.map((image) => image.decode()))
      .then(() => import("gsap/ScrollTrigger"))
      .then(({ ScrollTrigger }) => {
        if (disposed) return;
        gsap.registerPlugin(ScrollTrigger);
        media.add(
          {
            motion: "(prefers-reduced-motion: no-preference)",
            desktop: "(min-width: 1001px)",
            tall: "(min-height: 600px)",
          },
          (context) => {
            if (!context.conditions?.motion || !context.conditions.tall) return;
            const desktop = !!context.conditions.desktop;
            section.dataset.forestMotion = "ready";
            gsap
              .timeline({
                defaults: { ease: "none" },
                scrollTrigger: {
                  trigger: section,
                  start: () =>
                    `top top+=${parseFloat(getComputedStyle(section).getPropertyValue("--forest-top"))}`,
                  end: () =>
                    `+=${parseFloat(getComputedStyle(section).getPropertyValue("--forest-travel"))}`,
                  scrub: desktop ? 0.25 : true,
                  invalidateOnRefresh: true,
                  onUpdate: (self) => {
                    section.dataset.progress = self.progress.toFixed(3);
                  },
                  onToggle: (self) => {
                    section.dataset.active = String(self.isActive);
                  },
                },
              })
              .to(
                ".forest-background",
                { scale: desktop ? 1.26 : 1.17, yPercent: 2, duration: 1 },
                0,
              )
              .to(
                ".forest-near-left",
                {
                  xPercent: desktop ? -58 : -54,
                  scale: 1.34,
                  rotation: -7,
                  duration: 0.9,
                },
                0,
              )
              .to(
                ".forest-near-right",
                {
                  xPercent: desktop ? 58 : 54,
                  scale: 1.34,
                  rotation: 7,
                  duration: 0.9,
                },
                0,
              )
              .to(
                ".forest-mid",
                { yPercent: 16, scale: 1.22, opacity: 0, duration: 0.9 },
                0.1,
              );
            return () => {
              delete section.dataset.forestMotion;
              delete section.dataset.active;
              delete section.dataset.progress;
            };
          },
          section,
        );
      })
      .catch(() => {
        /* Static forest fallback. */
      });
    return () => {
      disposed = true;
      media.revert();
    };
  }, []);
  const plane = (name: string, className: string, priority = false) => (
    <picture className={`forest-plane ${className}`}>
      <source
        media="(max-width: 1000px)"
        srcSet={`${assetBase}/assets/forest/${name}-mobile.webp`}
      />
      <img
        src={`${assetBase}/assets/forest/${name}-desktop.webp`}
        alt=""
        width={name === "forest" ? 1536 : 860}
        height={name === "forest" ? 1024 : 1290}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
        draggable={false}
      />
    </picture>
  );
  return (
    <section
      className="forest-journey"
      ref={root}
      aria-label="Nutrición animal y valorización industrial"
    >
      <div className="forest-sticky">
        <div className="forest-world" aria-hidden="true">
          {plane("forest", "forest-background", true)}
          {plane("fern-right", "forest-mid")}
          <div className="forest-copy-shade" />
          {plane("fern-left", "forest-near-left")}
          {plane("fern-right", "forest-near-right")}
        </div>
        <div className="forest-copy">{children}</div>
        <div className="forest-caption">
          <span>Natural. En constante evolución.</span>

        </div>
      </div>
    </section>
  );
}
