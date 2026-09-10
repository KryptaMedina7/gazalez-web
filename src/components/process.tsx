"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { RotateCcw } from "lucide-react";
import { processSteps } from "@/lib/content";
import { Icon } from "./icon";

// Four views of the same conceptual matter: scattered, sorted, formulated, connected.
const particles = Array.from({ length: 120 }, (_, i) => ({
  x: 48 + ((i * 173) % 505),
  y: 43 + ((i * 97) % 261),
  r: 2.5 + (i % 5) * 0.6,
}));
function position(stage: number, i: number) {
  const p = particles[i];
  if (stage === 0) return { x: p.x, y: p.y };
  if (stage === 1)
    return {
      x: 74 + (i % 30) * 15.5,
      y: 92 + Math.floor(i / 30) * 54 + Math.sin(i * 0.7) * 4,
    };
  if (stage === 2) {
    const n = i % 40,
      angle = n * 2.4,
      radius = 12 + Math.sqrt(n) * 7;
    return {
      x: 140 + Math.floor(i / 40) * 160 + Math.cos(angle) * radius,
      y: 175 + Math.sin(angle) * radius,
    };
  }
  const t = (i % 30) / 29,
    band = Math.floor(i / 30) - 1.5;
  return {
    x: 65 + t * 470,
    y: 175 + Math.sin(t * Math.PI * 2 - 0.8) * 68 + band * 9,
  };
}

export function Process() {
  const [step, setStep] = useState(0);
  const [announce, setAnnounce] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const manual = useRef(false);
  const instant = useRef(false);
  const autoplay = useRef<gsap.core.Timeline | null>(null);
  const nodes = useRef<SVGCircleElement[]>([]);
  const copy = useRef<HTMLDivElement>(null);
  const progress = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const sequence = gsap.timeline({ paused: true });
      for (let stage = 1; stage < 4; stage++)
        sequence.call(
          () => {
            if (!manual.current) {
              instant.current = false;
              setStep(stage);
            }
          },
          [],
          stage * 1.15,
        );
      autoplay.current = sequence;
      let inView = false;
      const sync = () => {
        if (inView && !document.hidden && !manual.current) sequence.play();
        else sequence.pause();
      };
      const observer = new IntersectionObserver(
        ([entry]) => {
          inView = entry.isIntersecting;
          sync();
        },
        { threshold: 0.4 },
      );
      const graphic = root.querySelector(".matter-graphic");
      if (graphic) observer.observe(graphic);
      document.addEventListener("visibilitychange", sync);
      return () => {
        observer.disconnect();
        document.removeEventListener("visibilitychange", sync);
        sequence.kill();
        autoplay.current = null;
      };
    });
    return () => media.revert();
  }, []);

  useLayoutEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)");
    let timeline: gsap.core.Timeline;
    const animate = () => {
      timeline?.kill();
      const immediate = reduce.matches || instant.current;
      timeline = gsap.timeline({ defaults: { ease: "power3.inOut" } });
      timeline.to(
        nodes.current,
        {
          x: (i) => position(step, i).x,
          y: (i) => position(step, i).y,
          duration: immediate ? 0 : 0.72,
          stagger: immediate ? 0 : { amount: 0.13, from: "center" },
          overwrite: "auto",
        },
        0,
      );
      timeline.to(
        progress.current,
        {
          scaleX: (step + 1) / 4,
          duration: immediate ? 0 : 0.55,
          ease: "power2.out",
        },
        0,
      );
      if (copy.current && !immediate)
        timeline.fromTo(
          copy.current,
          { opacity: 0.45, y: 7 },
          { opacity: 1, y: 0, duration: 0.32, ease: "power2.out" },
          0.06,
        );
      else gsap.set(copy.current, { opacity: 1, y: 0 });
    };
    animate();
    reduce.addEventListener("change", animate);
    return () => {
      timeline?.kill();
      reduce.removeEventListener("change", animate);
    };
  }, [step]);

  const choose = (index: number, keyboard: boolean) => {
    manual.current = true;
    autoplay.current?.pause();
    instant.current = keyboard;
    setAnnounce(true);
    setStep(index);
  };
  const replay = (keyboard: boolean) => {
    choose(0, keyboard);
    if (!keyboard && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
      manual.current = false;
      autoplay.current?.restart();
    }
  };

  return (
    <section className="process section" id="transformacion" ref={ref}>
      <div className="section-heading">
        <h2>
          De subproducto
          <br />a solución.
        </h2>
        <p>
          La transformación comienza al reconocer
          <br className="desktop-only" /> lo que la materia todavía puede
          aportar.
        </p>
      </div>
      <div className="process-stage" data-stage={step}>
        <div className="matter-graphic">
          <svg
            viewBox="0 0 600 350"
            role="img"
            aria-label={`Representación conceptual: ${processSteps[step].title}`}
          >
            <path className="process-axis" d="M25 175H575" />
            {particles.map((p, i) => (
              <circle
                key={i}
                ref={(node) => {
                  if (node) nodes.current[i] = node;
                }}
                className="matter-particle"
                cx="0"
                cy="0"
                r={p.r}
                fill={
                  i % 3 === 0 ? "#b8d8bc" : i % 3 === 1 ? "#75a58a" : "#e0eddb"
                }
                style={{ transform: `translate(${p.x}px,${p.y}px)` }}
              />
            ))}
          </svg>
          <div className="graphic-caption">
            <span>Materia → nueva aplicación</span>
            <span>Esquema conceptual</span>
          </div>
        </div>
        <div
          className="process-copy"
          aria-live={announce ? "polite" : "off"}
          aria-atomic="true"
        >
          <div ref={copy}>
            <span className="step-count">0{step + 1} / 04</span>
            <h3>{processSteps[step].title}</h3>
            <p>{processSteps[step].body}</p>
            <span className="process-detail">{processSteps[step].detail}</span>
          </div>
        </div>
      </div>
      <div className="process-progress" aria-hidden="true">
        <span ref={progress} />
      </div>
      <div className="process-controls" aria-label="Etapas de transformación">
        {processSteps.map((p, i) => (
          <button
            key={p.title}
            aria-pressed={step === i}
            onClick={(event) => choose(i, event.detail === 0)}
          >
            <span>0{i + 1}</span>
            <span>{p.label}</span>
            <Icon name="arrow" />
          </button>
        ))}
      </div>
      <div className="process-bottom">
        <p>Explora cada etapa de la transformación.</p>
        <button
          className="process-replay"
          onClick={(event) => replay(event.detail === 0)}
        >
          <RotateCcw size={16} aria-hidden="true" />
          Repetir transformación
        </button>
      </div>
    </section>
  );
}
