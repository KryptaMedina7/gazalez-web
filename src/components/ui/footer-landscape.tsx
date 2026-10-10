"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/** Two decorative rural planes; the reading area never moves. */
export function FooterLandscape() {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    media.add(
      {
        motion: "(prefers-reduced-motion: no-preference)",
        compact: "(max-width: 700px)",
      },
      (context) => {
        if (!context.conditions?.motion) return;
        const scene = root.current;
        const planes = scene?.querySelector<HTMLElement>(
          ".footer-landscape__planes",
        );
        const layers = scene?.querySelectorAll("[data-ridge]");
        const footer = scene?.closest("footer");
        if (!scene || !planes || !layers || !footer) return;
        const compact = context.conditions.compact;
        gsap.fromTo(
          layers,
          { y: (i) => (compact ? [24, 54] : [38, 90])[i] },
          {
            y: (i) => (compact ? [-6, -15] : [-12, -30])[i],
            ease: "none",
            scrollTrigger: {
              trigger: scene,
              start: "top bottom",
              end: "clamp(bottom bottom)",
              scrub: 0.45,
            },
          },
        );
        // End feedback moves only the artwork. Native wheel/touch scrolling is untouched.
        let rebound: gsap.core.Timeline | undefined;
        let armed = true;
        const end = ScrollTrigger.create({
          trigger: footer,
          start: "bottom bottom+=100",
          end: "max",
          onUpdate: (self) => {
            if (self.progress < 0.35) armed = true;
            if (!armed || self.direction < 0 || self.progress < 0.995) return;
            armed = false;
            rebound?.kill();
            rebound = gsap
              .timeline()
              .to(planes, {
                y: compact ? 11 : 20,
                duration: 0.16,
                ease: "power2.out",
              })
              .to(planes, {
                y: 0,
                duration: 0.85,
                ease: "elastic.out(1, 0.55)",
              });
          },
        });
        return () => {
          rebound?.kill();
          end.kill();
          gsap.set(planes, { clearProps: "transform" });
        };
      },
    );
    return () => media.revert();
  }, []);
  return (
    <div ref={root} className="footer-landscape" aria-hidden="true">
      <div className="footer-landscape__planes">
        {(["cordillera", "praderas"] as const).map((layer) => (
          <picture
            key={layer}
            data-ridge
            className={`footer-landscape__${layer}`}
          >
            <source
              media="(max-width: 700px)"
              srcSet={`/assets/footer/${layer}-960.webp`}
            />
            <Image
              src={`/assets/footer/${layer}-1920.webp`}
              alt=""
              width={1920}
              height={640}
              loading="lazy"
              unoptimized
            />
          </picture>
        ))}
      </div>
    </div>
  );
}
