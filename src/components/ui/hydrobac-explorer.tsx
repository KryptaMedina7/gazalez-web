"use client";
import { useEffect, useRef, useState } from "react";
import { Dna, Droplets, Network } from "lucide-react";
import gsap from "gsap";

const stages = [
  {
    label: "Hidrogel",
    icon: Network,
    text: "Una red de polímeros capaz de incorporar agua en su estructura.",
  },
  {
    label: "Agua",
    icon: Droplets,
    text: "Explora cómo el agua se integra en la matriz del hidrogel.",
  },
  {
    label: "Bacterias benéficas",
    icon: Dna,
    text: "HIDROBAC combina hidrogeles y bacterias benéficas para abordar el estrés hídrico en plantas.",
  },
];
const nodes = [
  [140, 170],
  [215, 130],
  [300, 150],
  [365, 210],
  [355, 300],
  [280, 355],
  [195, 335],
  [125, 275],
  [220, 225],
  [285, 260],
  [235, 295],
  [170, 240],
];
const bonds = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [4, 5],
  [5, 6],
  [6, 7],
  [7, 0],
  [0, 8],
  [1, 8],
  [2, 8],
  [2, 9],
  [3, 9],
  [4, 9],
  [5, 10],
  [6, 10],
  [7, 11],
  [8, 11],
  [8, 9],
  [9, 10],
  [10, 11],
  [6, 11],
];

export function HydrobacExplorer() {
  const [active, setActive] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const keyboard = useRef(false);
  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      if (keyboard.current) return;
      let contextCleanup = () => {};
      const context = gsap.context(() => {
        const timeline = gsap.timeline({ paused: true });
        if (active === 1)
          timeline.fromTo(
            ".hydrobac-water",
            { x: -38, opacity: 0.15 },
            {
              x: 0,
              opacity: 1,
              duration: 0.85,
              stagger: 0.06,
              ease: "power2.out",
            },
          );
        else if (active === 2)
          timeline.fromTo(
            ".hydrobac-bacteria",
            {
              rotation: -22,
              scale: 0.7,
              transformOrigin: "center",
              opacity: 0.3,
            },
            {
              rotation: 0,
              scale: 1,
              opacity: 1,
              duration: 0.65,
              stagger: 0.07,
              ease: "power3.out",
            },
          );
        else
          timeline.fromTo(
            ".hydrobac-bond",
            { strokeDashoffset: 140 },
            {
              strokeDashoffset: 0,
              duration: 1.2,
              stagger: { amount: 0.3 },
              ease: "power2.out",
            },
          );
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting && !document.hidden) timeline.play();
            else timeline.pause();
          },
          { threshold: 0.25 },
        );
        observer.observe(element);
        const visibility = () => {
          if (document.hidden) timeline.pause();
          else if (
            element.getBoundingClientRect().bottom > 0 &&
            element.getBoundingClientRect().top < innerHeight
          )
            timeline.play();
        };
        document.addEventListener("visibilitychange", visibility);
        contextCleanup = () => {
          observer.disconnect();
          document.removeEventListener("visibilitychange", visibility);
        };
      }, element);
      // Observer callbacks run asynchronously; cleanup is retained with this media context.
      return () => {
        contextCleanup();
        context.revert();
      };
    });
    return () => media.revert();
  }, [active]);
  return (
    <div className="hydrobac-explorer" ref={root} data-active={active}>
      <div className="hydrobac-figure">
        <svg
          viewBox="0 0 500 440"
          role="img"
          aria-label={`HIDROBAC: ${stages[active].label}. Representación conceptual sin escala.`}
        >
          <defs>
            <radialGradient id="hydrobac-gel">
              <stop offset="0" stopColor="#e4f2d8" stopOpacity="0.7" />
              <stop offset="1" stopColor="#83a883" stopOpacity="0.15" />
            </radialGradient>
          </defs>
          <path
            className="hydrobac-envelope"
            d="M105 157Q172 70 286 105Q410 123 402 254Q399 356 297 384Q163 410 107 325Q57 239 105 157Z"
            fill="url(#hydrobac-gel)"
            stroke="#72966e"
            strokeWidth="1"
          />
          <g className="hydrobac-network">
            {bonds.map(([a, b], i) => (
              <line
                className="hydrobac-bond"
                key={i}
                x1={nodes[a][0]}
                y1={nodes[a][1]}
                x2={nodes[b][0]}
                y2={nodes[b][1]}
                stroke="#719b73"
                strokeWidth="1.5"
                strokeDasharray="140"
              />
            ))}
            {nodes.map(([x, y], i) => (
              <circle
                key={i}
                cx={x}
                cy={y}
                r={i % 3 === 0 ? 7 : 4}
                fill="#426b49"
                stroke="#d8e9d0"
                strokeWidth="3"
              />
            ))}
          </g>
          <g
            className="hydrobac-water-group"
            fill="#d7ede8"
            stroke="#487e76"
            strokeWidth="1.2"
          >
            {[
              [88, 190],
              [157, 208],
              [244, 179],
              [330, 234],
              [174, 296],
              [295, 316],
              [355, 160],
            ].map(([x, y], i) => (
              <g className="hydrobac-water" key={i}>
                <circle cx={x} cy={y} r={10 + (i % 3) * 3} />
                <path
                  d={`M${x - 4} ${y - 3}q2 -4 6 -3`}
                  fill="none"
                  stroke="#fff"
                  strokeWidth="2"
                />
              </g>
            ))}
          </g>
          <g
            className="hydrobac-bacteria-group"
            fill="#234c36"
            stroke="#a6c893"
            strokeWidth="2"
          >
            {[
              [193, 180, 30],
              [298, 210, -35],
              [253, 318, 25],
              [136, 257, -20],
              [345, 287, 45],
            ].map(([x, y, a], i) => (
              <g key={i} transform={`translate(${x} ${y}) rotate(${a})`}>
                <g className="hydrobac-bacteria">
                  <rect x="-7" y="-18" width="14" height="36" rx="7" />
                  <path d="M0 -9v18" stroke="#c4d9ae" strokeWidth="2" />
                </g>
              </g>
            ))}
          </g>
          <g fill="none" stroke="#8b7752" strokeWidth="1">
            <path d="M140 170L84 105H38" />
            <path d="M355 300L424 340H469" />
          </g>
          <g className="hydrobac-svg-label" fill="#294b37">
            <text x="38" y="94">
              Matriz de hidrogel
            </text>
            <text x="348" y="364">
              Sistema HIDROBAC
            </text>
          </g>
        </svg>
        <span className="hydrobac-concept">
          Visualización conceptual · sin escala
        </span>
      </div>
      <div
        className="hydrobac-controls"
        role="group"
        aria-label="Explorar componentes de HIDROBAC"
      >
        {stages.map(({ label, icon: StageIcon }, i) => (
          <button
            key={label}
            type="button"
            aria-pressed={active === i}
            onPointerDown={() => {
              keyboard.current = false;
            }}
            onKeyDown={() => {
              keyboard.current = true;
            }}
            onClick={() => setActive(i)}
          >
            <StageIcon size={17} aria-hidden="true" />
            {label}
          </button>
        ))}
      </div>
      <p className="hydrobac-description" aria-live="polite">
        {stages[active].text}
      </p>
    </div>
  );
}
