"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import {
  ArrowRight,
  Combine,
  Pause,
  Play,
  RotateCcw,
  Route,
  ScanLine,
  SlidersHorizontal,
} from "lucide-react";
import Link from "next/link";
import { processSteps } from "@/lib/content";
import {
  processParticles as particles,
  processPosition as position,
} from "@/lib/process-layout.mjs";

const stageIcons = [ScanLine, SlidersHorizontal, Combine, Route];
const stageNames = ["Conocer", "Recuperar", "Formular", "Conectar"];
const sceneLabels = [
  "Materia de origen",
  "Fracciones del material",
  "Objetivo de formulación",
  "Origen · Proceso · Aplicación",
];

export function Process() {
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [announce, setAnnounce] = useState(false);
  const graphic = useRef<HTMLDivElement>(null);
  const nodes = useRef<SVGCircleElement[]>([]);
  const copy = useRef<HTMLDivElement>(null);
  const autoplay = useRef<gsap.core.Timeline | null>(null);
  const manual = useRef(false);
  const initialized = useRef(false);
  const instant = useRef(false);
  const syncPlayback = useRef<(() => void) | null>(null);

  useEffect(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const sequence = gsap.timeline({
        paused: true,
        onComplete: () => setPlaying(false),
      });
      for (let stage = 1; stage < 4; stage++) {
        sequence.call(
          () => {
            instant.current = false;
            setStep(stage);
          },
          [],
          stage * 4,
        );
      }
      autoplay.current = sequence;
      let visible = false;
      const sync = () => {
        if (visible && !document.hidden && !manual.current) sequence.play();
        else sequence.pause();
      };
      syncPlayback.current = sync;
      const observer = new IntersectionObserver(
        ([entry]) => {
          visible = entry.isIntersecting && entry.intersectionRatio >= 0.35;
          sync();
        },
        { threshold: [0.0, 0.35] },
      );
      if (graphic.current) observer.observe(graphic.current);
      document.addEventListener("visibilitychange", sync);
      return () => {
        observer.disconnect();
        document.removeEventListener("visibilitychange", sync);
        sequence.kill();
        autoplay.current = null;
        syncPlayback.current = null;
      };
    });
    return () => media.revert();
  }, []);

  useLayoutEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)");
    const compact = matchMedia("(max-width: 760px)");
    let timeline: gsap.core.Timeline;
    const animate = () => {
      timeline?.kill();
      const immediate =
        reduce.matches || instant.current || !initialized.current;
      initialized.current = true;
      timeline = gsap.timeline({ defaults: { ease: "power3.inOut" } });
      timeline.to(
        nodes.current.filter((_, i) => !compact.matches || i % 3 === 0),
        {
          x: (_i, node: SVGCircleElement) =>
            position(step, Number(node.dataset.particle)).x,
          y: (_i, node: SVGCircleElement) =>
            position(step, Number(node.dataset.particle)).y,
          duration: immediate ? 0 : compact.matches ? 0.45 : 0.75,
          stagger:
            immediate || compact.matches ? 0 : { amount: 0.1, from: "center" },
          overwrite: "auto",
        },
        0,
      );
      if (!immediate)
        timeline.fromTo(
          copy.current,
          { opacity: 0.55, y: 5 },
          { opacity: 1, y: 0, duration: 0.25, ease: "power2.out" },
          0,
        );
      else gsap.set(copy.current, { opacity: 1, y: 0 });
    };
    animate();
    reduce.addEventListener("change", animate);
    compact.addEventListener("change", animate);
    return () => {
      timeline?.kill();
      reduce.removeEventListener("change", animate);
      compact.removeEventListener("change", animate);
    };
  }, [step]);

  const choose = (index: number, keyboard = false) => {
    manual.current = true;
    autoplay.current?.pause();
    setPlaying(false);
    setAnnounce(true);
    instant.current = keyboard;
    setStep(index);
  };
  const replay = () => {
    choose(0);
    if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
      manual.current = false;
      setPlaying(true);
      setAnnounce(false);
      autoplay.current?.restart().pause();
      syncPlayback.current?.();
    }
  };

  return (
    <section
      className="section transformation-lab"
      id="transformacion"
      aria-labelledby="transformation-heading"
    >
      <div className="section-heading">
        <h2 id="transformation-heading">
          De subproducto
          <br />a solución.
        </h2>
        <p>
          Explora cómo el conocimiento de un material puede orientar una nueva
          aplicación. La ruta se evalúa según cada necesidad.
        </p>
      </div>
      <div className="lab-controls" aria-label="Etapas de transformación">
        {processSteps.map((stage, i) => {
          const StageIcon = stageIcons[i];
          return (
            <button
              type="button"
              key={stage.title}
              aria-pressed={step === i}
              aria-controls="lab-detail"
              onClick={(e) => choose(i, e.detail === 0)}
            >
              <StageIcon size={21} aria-hidden="true" />
              <span>{stageNames[i]}</span>
              <span className="lab-number">0{i + 1}</span>
            </button>
          );
        })}
      </div>
      <div className="lab-stage" data-stage={step}>
        <div className="lab-visual" ref={graphic}>
          <div className="lab-scene-title">
            <span>{sceneLabels[step]}</span>
            <span aria-hidden="true">0{step + 1} / 04</span>
          </div>
          <svg
            viewBox="0 45 600 265"
            role="img"
            aria-label={`Diagrama de transformación: ${processSteps[step].title}`}
          >
            <g className="lab-guide" data-active={step === 0}>
              <rect x="143" y="77" width="314" height="195" rx="70" />
              <path d="M128 100V76H152 M448 76H472V100 M128 248V272H152 M448 272H472V248" />
            </g>
            <g className="lab-guide" data-active={step === 1}>
              {[64, 234, 404].map((x) => (
                <rect key={x} x={x} y="98" width="130" height="142" rx="32" />
              ))}
              <path d="M202 169H223 M372 169H393" />
            </g>
            <g className="lab-guide" data-active={step === 2}>
              <rect x="194" y="80" width="214" height="186" rx="42" />
              <path d="M151 172H182 M418 172H449 M168 160L182 172L168 184 M435 160L449 172L435 184" />
            </g>
            <g className="lab-guide" data-active={step === 3}>
              {[130, 300, 470].map((x) => (
                <circle key={x} cx={x} cy="174" r="59" />
              ))}
              <path d="M190 174H240 M360 174H410 M228 163L240 174L228 185 M398 163L410 174L398 185" />
            </g>
            <g className="lab-particles">
              {particles.map((p, i) => (
                <circle
                  key={i}
                  ref={(node) => {
                    if (node) nodes.current[i] = node;
                  }}
                  data-particle={i}
                  cx="0"
                  cy="0"
                  r={p.r + 1}
                  fill={["#285540", "#73966c", "#aec5a0"][Math.floor(i / 40)]}
                  stroke="#f7f8f3"
                  strokeWidth=".8"
                  style={{ transform: `translate(${p.x}px,${p.y}px)` }}
                />
              ))}
            </g>
          </svg>
          <div className="lab-scrubber">
            <label htmlFor="lab-progress">Recorre la transformación</label>
            <input
              id="lab-progress"
              type="range"
              min="0"
              max="3"
              step="1"
              value={step}
              aria-valuetext={processSteps[step].title}
              onPointerDown={() => {
                instant.current = false;
              }}
              onChange={(e) => choose(Number(e.target.value), instant.current)}
              onKeyDown={() => {
                instant.current = true;
              }}
            />
          </div>
          <div className="lab-playback">
            <span>Selecciona una etapa para explorarla.</span>
            <button
              type="button"
              onClick={() => {
                if (playing) choose(step);
                else replay();
              }}
              aria-label={
                playing ? "Pausar transformación" : "Repetir transformación"
              }
            >
              {playing ? <Pause size={16} /> : <Play size={16} />}
              {playing ? "Pausar" : "Repetir"}
            </button>
          </div>
        </div>
        <div
          className="lab-detail"
          id="lab-detail"
          aria-live={announce ? "polite" : "off"}
          aria-atomic="true"
        >
          <div ref={copy}>
            <h3>{processSteps[step].title}</h3>
            <p>{processSteps[step].body}</p>
            <p className="lab-detail-note">{processSteps[step].detail}</p>
          </div>
          <div className="lab-detail-actions">
            <button
              type="button"
              onClick={(e) =>
                step === 3 ? replay() : choose(step + 1, e.detail === 0)
              }
            >
              {step === 3 ? "Volver al origen" : "Siguiente etapa"}
              {step === 3 ? <RotateCcw size={18} /> : <ArrowRight size={18} />}
            </button>
            <Link href="/contacto/?interes=subproducto">
              Consultar sobre mi material <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
      <p className="lab-context">
        Cada material requiere evaluación. El recorrido muestra alternativas, no
        una ruta aplicable a todos los subproductos.
      </p>
    </section>
  );
}
