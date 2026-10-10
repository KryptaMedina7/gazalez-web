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
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const layers = root.current?.querySelectorAll("[data-ridge]");
      if (!layers) return;
      gsap.fromTo(
        layers,
        { y: (i) => [-18, 28][i] },
        {
          y: 0,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top bottom",
            end: "bottom center",
            scrub: 0.6,
          },
        },
      );
    });
    return () => media.revert();
  }, []);
  return (
    <div ref={root} className="footer-landscape" aria-hidden="true">
      {(["cordillera", "praderas"] as const).map((layer) => (
        <picture key={layer} data-ridge className={`footer-landscape__${layer}`}>
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
  );
}
