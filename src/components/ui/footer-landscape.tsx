"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/** Decorative horizons: only transform the three layers, never the footer's layout. */
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
        { y: (i) => [55, 85, 120][i] },
        {
          y: 0,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top bottom",
            end: "bottom 65%",
            scrub: 0.6,
          },
        },
      );
    });
    return () => media.revert();
  }, []);
  return (
    <div ref={root} className="footer-landscape" aria-hidden="true">
      <svg viewBox="0 0 1600 360" preserveAspectRatio="none">
        <path
          data-ridge
          fill="#b8ceae"
          d="M0 160L120 126L245 165L410 68L540 144L710 38L880 150L1020 100L1150 169L1320 74L1480 140L1600 90V500H0Z"
        />
        <path
          data-ridge
          fill="#789774"
          d="M0 218Q170 100 340 208T690 195T1030 207T1360 174T1600 220V500H0Z"
        />
        <path
          data-ridge
          fill="#36583e"
          d="M0 265Q160 240 300 280T630 246T970 271T1280 255T1600 276V500H0Z"
        />
        <path
          fill="#163024"
          d="M0 324Q300 290 570 327T1110 317T1600 320V500H0Z"
        />
      </svg>
    </div>
  );
}
