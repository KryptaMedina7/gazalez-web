"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import {
  ArrowRight,
  ArrowLeft,
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
import { ProcessScene } from "./ui/process-scene";
import { DotGrid } from "./ui/dot-grid";

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
  const [instantScene, setInstantScene] = useState(false);
  const graphic = useRef<HTMLDivElement>(null);
  const copy = useRef<HTMLDivElement>(null);
  const progressFill = useRef<HTMLSpanElement>(null);
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
            setInstantScene(false);
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
    let timeline: gsap.core.Timeline;
    const animate = () => {
      timeline?.kill();
      const immediate =
        reduce.matches || instant.current || !initialized.current;
      initialized.current = true;
      timeline = gsap.timeline({ defaults: { ease: "power3.inOut" } });
      if (!immediate)
        timeline.fromTo(
          copy.current,
          { opacity: 0.55, y: 5 },
          { opacity: 1, y: 0, duration: 0.25, ease: "power2.out" },
          0,
        );
      else gsap.set(copy.current, { opacity: 1, y: 0 });
      timeline.to(
        progressFill.current,
        {
          scaleX: step / 3,
          duration: immediate ? 0 : 0.2,
          ease: "power3.out",
        },
        0,
      );
    };
    animate();
    reduce.addEventListener("change", animate);
    return () => {
      timeline?.kill();
      reduce.removeEventListener("change", animate);
    };
  }, [step]);

  const choose = (index: number, keyboard = false) => {
    manual.current = true;
    autoplay.current?.pause();
    setPlaying(false);
    setAnnounce(true);
    instant.current = keyboard;
    setInstantScene(keyboard);
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
      data-instant={instantScene}
    >
      <DotGrid surface="light" />
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
              data-complete={i < step}
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
          <ProcessScene
            stage={step}
            instant={instantScene}
            onInteract={() => {
              manual.current = true;
              autoplay.current?.pause();
              setPlaying(false);
            }}
          />
          <div className="lab-navigation" aria-label="Recorrer las etapas">
            <button
              type="button"
              disabled={step === 0}
              onClick={(e) => choose(step - 1, e.detail === 0)}
            >
              <ArrowLeft size={17} /> Anterior
            </button>
            <span>Etapa {step + 1} de 4</span>
            <button
              type="button"
              onClick={(e) => choose(step === 3 ? 0 : step + 1, e.detail === 0)}
            >
              {step === 3 ? "Volver al inicio" : "Siguiente"}
              {step === 3 ? <RotateCcw size={17} /> : <ArrowRight size={17} />}
            </button>
          </div>
          <div className="lab-scrubber">
            <label htmlFor="lab-progress">Recorre la transformación</label>
            <div className="lab-range">
              <div className="lab-range-track" aria-hidden="true">
                <span ref={progressFill} className="lab-range-fill" />
                {[0, 1, 2, 3].map((i) => (
                  <i
                    key={i}
                    data-complete={i <= step}
                    style={{ left: `${(i / 3) * 100}%` }}
                  />
                ))}
              </div>
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
                onChange={(e) =>
                  choose(Number(e.target.value), instant.current)
                }
                onKeyDown={() => {
                  instant.current = true;
                }}
              />
            </div>
          </div>
          <div className="lab-playback">
            <span>Elige una etapa o mueve el control.</span>
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
