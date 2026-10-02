"use client";
import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Pause, RotateCcw } from "lucide-react";
import { processSteps } from "@/lib/content";
import { Icon } from "./icon";
import Link from "next/link";

import {
  processParticles as particles,
  processPosition as position,
} from "@/lib/process-layout.mjs";

export function Process() {
  const materialId = useId().replace(/:/g, "");
  const [step, setStep] = useState(0);
  const [announce, setAnnounce] = useState(false);
  const [playing, setPlaying] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const manual = useRef(false);
  const initialized = useRef(false);
  const instant = useRef(false);
  const autoplay = useRef<gsap.core.Timeline | null>(null);
  const syncPlayback = useRef<(() => void) | null>(null);
  const nodes = useRef<SVGCircleElement[]>([]);
  const progress = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: reduce)", () => {
      setPlaying(false);
    });
    media.add("(prefers-reduced-motion: no-preference)", () => {
      if (!manual.current) setPlaying(true);
      const sequence = gsap.timeline({
        paused: true,
        onComplete: () => setPlaying(false),
      });
      for (let stage = 1; stage < 4; stage++)
        sequence.call(
          () => {
            if (!manual.current) {
              instant.current = false;
              setStep(stage);
            }
          },
          [],
          stage * 4.5,
        );
      autoplay.current = sequence;
      let inView = false;
      const sync = () => {
        if (inView && !document.hidden && !manual.current) sequence.play();
        else sequence.pause();
      };
      syncPlayback.current = sync;
      const observer = new IntersectionObserver(
        ([entry]) => {
          inView = entry.isIntersecting && entry.intersectionRatio >= 0.4;
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
        syncPlayback.current = null;
      };
    });
    return () => media.revert();
  }, []);

  useLayoutEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)");
    const compactQuery = matchMedia("(max-width: 1000px)");
    let timeline: gsap.core.Timeline;
    const animate = () => {
      timeline?.kill();
      const compact = compactQuery.matches;
      const immediate =
        reduce.matches || instant.current || !initialized.current;
      initialized.current = true;
      const animatedNodes = nodes.current.filter(
        (_, i) => !compact || i % 3 === 0,
      );
      timeline = gsap.timeline({ defaults: { ease: "power3.inOut" } });
      timeline.to(
        animatedNodes,
        {
          x: (_i, node: SVGCircleElement) =>
            position(step, Number(node.dataset.particle)).x,
          y: (_i, node: SVGCircleElement) =>
            position(step, Number(node.dataset.particle)).y,
          duration: immediate ? 0 : compact ? 0.5 : 0.72,
          stagger: immediate || compact ? 0 : { amount: 0.13, from: "center" },
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
    };
    animate();
    reduce.addEventListener("change", animate);
    compactQuery.addEventListener("change", animate);
    return () => {
      timeline?.kill();
      reduce.removeEventListener("change", animate);
      compactQuery.removeEventListener("change", animate);
    };
  }, [step]);

  const choose = (index: number, keyboard: boolean) => {
    manual.current = true;
    setPlaying(false);
    autoplay.current?.pause();
    instant.current = keyboard;
    setAnnounce(true);
    setStep(index);
  };
  const replay = (keyboard: boolean) => {
    choose(0, keyboard);
    if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
      manual.current = false;
      setPlaying(true);
      setAnnounce(false);
      autoplay.current?.restart().pause();
      syncPlayback.current?.();
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
          Explora cómo el conocimiento de un material puede orientar una nueva
          aplicación. La ruta se evalúa según cada necesidad.
        </p>
      </div>
      <div className="process-controls" aria-label="Etapas de transformación">
        {processSteps.map((p, i) => (
          <button
            key={p.title}
            aria-pressed={step === i}
            onClick={(event) => choose(i, event.detail === 0)}
          >
            <span className="process-step-number" aria-hidden="true">
              0{i + 1}
            </span>
            <span className="process-step-label">
              <strong>{p.label.split(" · ")[0]}</strong>
              <span>{p.label.split(" · ")[1]}</span>
            </span>
            <span className="process-step-status" aria-hidden="true" />
          </button>
        ))}
      </div>
      <div className="process-stage" data-stage={step}>
        <div className="matter-graphic">
          <svg
            viewBox="0 0 600 350"
            role="img"
            aria-label={`Representación conceptual: ${processSteps[step].title}`}
          >
            <defs>
              {[
                ["#e4efce", "#95b591"],
                ["#aacaae", "#4e805f"],
                ["#f5f5dc", "#b3c5a3"],
              ].map(([light, dark], index) => (
                <radialGradient
                  key={index}
                  id={`${materialId}-matter-${index}`}
                  cx="32%"
                  cy="28%"
                  r="75%"
                >
                  <stop stopColor={light} />
                  <stop offset="1" stopColor={dark} />
                </radialGradient>
              ))}
            </defs>
            <g className="process-guides" aria-hidden="true">
              <g className="process-guide" data-active={step === 0}>
                <path d="M173 73H145V103 M427 73H455V103 M145 244V274H173 M455 244V274H427" />
                <path
                  className="process-guide-faint"
                  d="M300 82V263 M153 174H447"
                />
                <text x="300" y="45">
                  CARACTERIZAR
                </text>
                <text x="300" y="312">
                  Origen · composición · volumen
                </text>
              </g>
              <g className="process-guide" data-active={step === 1}>
                {[65, 235, 405].map((x) => (
                  <rect key={x} x={x} y="99" width="128" height="135" rx="14" />
                ))}
                <text x="300" y="45">
                  RECUPERAR Y ACONDICIONAR
                </text>
                <text x="300" y="312">
                  Separar para reconocer su valor
                </text>
              </g>
              <g className="process-guide" data-active={step === 2}>
                <rect x="193" y="80" width="214" height="184" rx="24" />
                <path d="M155 174H181 M419 174H445 M174 167L181 174L174 181 M438 167L445 174L438 181" />
                <text x="300" y="45">
                  FORMULAR CON UN OBJETIVO
                </text>
                <text x="300" y="312">
                  Propiedades + requerimiento técnico
                </text>
              </g>
              <g className="process-guide" data-active={step === 3}>
                {[130, 300, 470].map((x) => (
                  <circle key={x} cx={x} cy="174" r="58" />
                ))}
                <path d="M190 174H240 M360 174H410 M232 167L240 174L232 181 M402 167L410 174L402 181" />
                <text x="300" y="45">
                  DAR CONTINUIDAD AL RECURSO
                </text>
                <text x="130" y="267">
                  Origen
                </text>
                <text x="300" y="267">
                  Proceso
                </text>
                <text x="470" y="267">
                  Aplicación
                </text>
                <text x="300" y="312">
                  Trazabilidad a lo largo de la cadena
                </text>
              </g>
            </g>
            {particles.map((p, i) => (
              <circle
                key={i}
                ref={(node) => {
                  if (node) nodes.current[i] = node;
                }}
                className="matter-particle"
                data-particle={i}
                cx="0"
                cy="0"
                r={p.r}
                fill={`url(#${materialId}-matter-${Math.floor(i / 40)})`}
                style={{ transform: `translate(${p.x}px,${p.y}px)` }}
              />
            ))}
          </svg>
          <button
            className="process-playback"
            aria-label={
              playing
                ? "Pausar transformación"
                : "Repetir transformación desde el inicio"
            }
            onClick={() => {
              if (playing) {
                manual.current = true;
                autoplay.current?.pause();
                setPlaying(false);
              } else replay(false);
            }}
          >
            {playing ? (
              <Pause size={14} aria-hidden="true" />
            ) : (
              <RotateCcw size={14} aria-hidden="true" />
            )}
            {playing ? "Pausar" : "Repetir"}
          </button>
          <div className="graphic-caption">
            <span>Materia → nueva aplicación</span>
            <span>Esquema conceptual</span>
          </div>
        </div>
        <div
          className="process-copy"
          onFocusCapture={() => {
            manual.current = true;
            autoplay.current?.pause();
            setPlaying(false);
          }}
          aria-live={announce ? "polite" : "off"}
          aria-atomic="true"
        >
          {processSteps.map((stage, index) => (
            <div
              key={stage.title}
              className="process-copy-panel"
              data-active={step === index}
              aria-hidden={step !== index}
              inert={step !== index}
            >
              <span className="step-count">0{index + 1} / 04</span>
              <h3>{stage.title}</h3>
              <p>{stage.body}</p>
              <span className="process-detail">{stage.detail}</span>
              <Link className="text-link" href="/contacto/?interes=subproducto">
                Consultar sobre mi material <Icon name="arrow" />
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className="process-progress" aria-hidden="true">
        <span ref={progress} />
      </div>
      <div className="process-bottom">
        <p>
          Cada material requiere evaluación. El recorrido muestra alternativas,
          no una ruta aplicable a todos los subproductos.
        </p>
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
