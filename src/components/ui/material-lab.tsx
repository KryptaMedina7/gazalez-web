"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ArrowLeft, ArrowRight, Pause, Play, RotateCcw } from "lucide-react";
import {
  clampProgress,
  interpolateSample,
  sampleCount,
  samplePoint,
  trayPose,
} from "@/lib/material-lab.mjs";

const stories = {
  protein: {
    title: "Un aporte dentro de una dieta completa.",
    intro:
      "Abre la muestra, explora el requerimiento y conecta la información. Tú controlas el recorrido.",
    steps: [
      [
        "Materia prima",
        "Todo empieza por conocer el material.",
        "La composición, el origen y los antecedentes de las materias primas permiten situar la consulta nutricional.",
        "Composición · Origen · Antecedentes",
      ],
      [
        "Requerimiento",
        "La misma materia, distintas necesidades.",
        "La especie, la etapa productiva y el objetivo orientan la evaluación. Seleccionar un ingrediente requiere entender dónde se va a utilizar.",
        "Especie · Etapa · Objetivo",
      ],
      [
        "Dieta completa",
        "El aporte se entiende en conjunto.",
        "La solución proteica se evalúa dentro de la dieta completa y de las condiciones de cada sistema productivo. Este recorrido no calcula una fórmula ni una proporción de incorporación.",
        "Ingrediente + requerimiento + dieta",
      ],
      [
        "Documentación",
        "De la información a una consulta concreta.",
        "Solicita la ficha vigente de la solución que necesitas. Las especificaciones y condiciones de suministro se revisan con el equipo técnico.",
        "Ficha técnica · Antecedentes · Consulta",
      ],
    ],
    cta: "Consultar sobre núcleos proteicos",
    href: "/contacto/?interes=formulacion&familia=nucleos",
  },
  recovery: {
    title: "Una muestra. Distintas posibilidades.",
    intro:
      "Recorre las preguntas que permiten evaluar una nueva aplicación para un subproducto.",
    steps: [
      [
        "Origen",
        "Primero, entender qué se genera.",
        "El proceso de origen, la ubicación, el volumen y la frecuencia ayudan a describir la corriente que quieres evaluar.",
        "Origen · Ubicación · Frecuencia",
      ],
      [
        "Caracterización",
        "Dar contexto a sus propiedades.",
        "Composición, condición del material y análisis disponibles orientan la revisión. Puedes iniciar la consulta aunque aún no tengas todos los antecedentes.",
        "Composición · Condición · Análisis",
      ],
      [
        "Alternativas",
        "Explorar una aplicación pertinente.",
        "Se revisan alternativas de recuperación y aprovechamiento según las características del material y los requisitos de su posible destino. No existe una ruta universal.",
        "Recuperación · Aprovechamiento · Viabilidad",
      ],
      [
        "Evaluación",
        "Acordar qué merece el siguiente paso.",
        "El equipo revisa la información contigo para definir el alcance de la evaluación. La consulta no implica aceptación automática del material.",
        "Antecedentes + aplicación + evaluación",
      ],
    ],
    cta: "Evaluar mi subproducto",
    href: "/contacto/?interes=subproducto",
  },
} as const;

const inspections = {
  protein: [
    [
      "Composición",
      "¿Qué antecedentes tiene el ingrediente?",
      "Comparte la composición conocida y los análisis disponibles. Estos antecedentes ayudan a revisar su pertinencia para la aplicación que buscas.",
    ],
    [
      "Origen",
      "¿De dónde viene la materia prima?",
      "El origen del material forma parte de su evaluación. Incluye los antecedentes que tengas al iniciar la conversación con GAZAL.",
    ],
    [
      "Compatibilidad",
      "¿Cómo se relaciona con tu dieta?",
      "Indica especie, etapa productiva, objetivo y materias primas disponibles. El aporte de un ingrediente se evalúa dentro del conjunto.",
    ],
  ],
  recovery: [
    [
      "Origen",
      "¿Qué proceso genera el subproducto?",
      "Describe el proceso de origen y la ubicación. Conocer ese contexto permite situar la evaluación del material.",
    ],
    [
      "Volumen",
      "¿Cuánto material se genera y con qué frecuencia?",
      "Un volumen aproximado y su frecuencia ayudan a plantear el requerimiento. No necesitas una ficha completa para consultar.",
    ],
    [
      "Condición",
      "¿Qué sabes de sus características?",
      "Comparte la composición conocida, la condición del material y los análisis disponibles. La alternativa depende de su evaluación.",
    ],
  ],
} as const;

/** Same scene and particles throughout; GSAP mutates SVG only while moving. */
export function MaterialLab({ variant }: { variant: keyof typeof stories }) {
  const story = stories[variant],
    recovery = variant === "recovery";
  const id = useId().replaceAll(":", "");
  const root = useRef<HTMLElement>(null);
  const slider = useRef<HTMLInputElement>(null);
  const progressText = useRef<HTMLOutputElement>(null);
  const motion = useRef({ progress: 0 });
  const tween = useRef<gsap.core.Tween | null>(null);
  const paint = useRef<(value: number) => void>(() => {});
  const current = useRef(0);
  const reduced = useRef(false);
  const seeking = useRef(false);
  const [stage, setStage] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [keyboard, setKeyboard] = useState(false);
  const [inspected, setInspected] = useState<number | null>(null);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const detail = root.current?.querySelector(".material-reading");
    if (!detail) return;
    const arrival = gsap.fromTo(
      detail,
      { opacity: 0.55, y: 4 },
      { opacity: 1, y: 0, duration: 0.24, clearProps: "transform" },
    );
    return () => {
      arrival.kill();
    };
  }, [stage, inspected]);

  useEffect(() => {
    const host = root.current;
    if (!host) return;
    const nodes = Array.from(
      host.querySelectorAll<SVGGElement>("[data-material]"),
    );
    const trays = Array.from(
      host.querySelectorAll<SVGGElement>("[data-tray]"),
    ).map((node) => ({
      node,
      ellipses: Array.from(node.querySelectorAll("ellipse")),
      rim: node.querySelector("path")!,
    }));
    const phases = Array.from(
      host.querySelectorAll<SVGGElement>("[data-phase]"),
    );
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    reduced.current = preference.matches;
    paint.current = (value) => {
      const progress = clampProgress(value);
      motion.current.progress = progress;
      nodes.forEach((node, index) => {
        const [x, y, angle] = interpolateSample(index, progress, recovery);
        node.setAttribute(
          "transform",
          `translate(${x.toFixed(2)} ${y.toFixed(2)}) rotate(${angle})`,
        );
      });
      trays.forEach(({ node, ellipses, rim }, group) => {
        const [x, y, radius, opacity] = trayPose(group, progress, recovery);
        node.setAttribute("transform", `translate(${x} ${y})`);
        node.setAttribute("opacity", String(opacity));
        ellipses.forEach((ellipse, index) => {
          ellipse.setAttribute("rx", String(radius - (index === 2 ? 8 : 0)));
          ellipse.setAttribute(
            "ry",
            String(radius / 2 - (index === 2 ? 5 : 0)),
          );
        });
        rim.setAttribute(
          "d",
          `M${-radius} 0v12a${radius} ${radius / 2} 0 0 0 ${radius * 2} 0v-12`,
        );
      });
      phases.forEach((node, index) =>
        node.setAttribute(
          "opacity",
          String(Math.max(0, 1 - Math.abs(progress - index))),
        ),
      );
      if (slider.current) {
        slider.current.value = String(progress * 100);
        slider.current.style.setProperty(
          "--lab-progress",
          `${(progress / 3) * 100}%`,
        );
      }
      const next = Math.round(progress);
      if (progressText.current)
        progressText.current.textContent = `${Math.round((progress / 3) * 100)} %`;
      if (!seeking.current && next !== current.current) {
        current.current = next;
        setStage(next);
        setInspected(null);
      }
    };
    const pause = () => {
      tween.current?.kill();
      seeking.current = false;
      paint.current(motion.current.progress);
      setPlaying(false);
    };
    const visibility = () => {
      if (document.hidden) pause();
    };
    const onPreference = () => {
      reduced.current = preference.matches;
      if (preference.matches) {
        pause();
        paint.current(current.current);
      }
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) pause();
      },
      { threshold: 0.08 },
    );
    observer.observe(host);
    document.addEventListener("visibilitychange", visibility);
    preference.addEventListener("change", onPreference);
    return () => {
      tween.current?.kill();
      observer.disconnect();
      document.removeEventListener("visibilitychange", visibility);
      preference.removeEventListener("change", onPreference);
    };
  }, [recovery]);

  function seek(value: number, immediate = false) {
    setInspected(null);
    tween.current?.kill();
    setPlaying(false);
    setKeyboard(immediate);
    const target = clampProgress(value);
    seeking.current = false;
    if (immediate || reduced.current) paint.current(target);
    else {
      seeking.current = true;
      current.current = Math.round(target);
      setStage(current.current);
      tween.current = gsap.to(motion.current, {
        progress: target,
        duration: 0.6,
        ease: "power2.inOut",
        onUpdate: () => paint.current(motion.current.progress),
        onComplete: () => {
          seeking.current = false;
        },
      });
    }
  }
  function play() {
    setInspected(null);
    seeking.current = false;
    tween.current?.kill();
    if (playing) {
      setPlaying(false);
      return;
    }
    if (reduced.current) {
      seek((current.current + 1) % 4, true);
      return;
    }
    if (motion.current.progress >= 2.99) paint.current(0);
    setKeyboard(false);
    setPlaying(true);
    tween.current = gsap.to(motion.current, {
      progress: 3,
      duration: (3 - motion.current.progress) * 4,
      ease: "none",
      onUpdate: () => paint.current(motion.current.progress),
      onComplete: () => setPlaying(false),
    });
  }

  return (
    <section
      ref={root}
      className={`material-lab explorer material-lab--${variant}`}
      aria-labelledby={`${id}-title`}
      data-keyboard={keyboard}
    >
      <header className="explorer-heading">
        <h2 id={`${id}-title`}>{story.title}</h2>
        <p>{story.intro}</p>
      </header>
      <div className="material-workspace">
        <div className="material-stage">
          <svg
            viewBox="0 0 640 385"
            role="group"
            aria-label={`${story.steps[stage][0]}: ${story.steps[stage][3]}`}
          >
            <defs>
              <linearGradient id={`${id}-tray`} x1="0" y1="0" x2="0.8" y2="1">
                <stop stopColor="#edf3e9" />
                <stop offset="1" stopColor="#b8ceae" />
              </linearGradient>
              <linearGradient id={`${id}-grain`} x1="0" y1="0" x2="1" y2="1">
                <stop stopColor="#ece1c8" />
                <stop offset="1" stopColor="#8b8760" />
              </linearGradient>
            </defs>
            {[0, 1, 2].map((group) => (
              <g
                key={group}
                data-tray
                aria-hidden="true"
                transform={`translate(${[174, 320, 466][group]} ${[175, 240, 175][group]})`}
              >
                <ellipse cy="22" rx="82" ry="41" fill="#547653" opacity=".1" />
                <path d="M-82 0v12a82 41 0 0 0 164 0v-12" fill="#91ab87" />
                <ellipse
                  rx="82"
                  ry="41"
                  fill={`url(#${id}-tray)`}
                  stroke="#789774"
                />
                <ellipse
                  cy="-1"
                  rx="74"
                  ry="36"
                  fill="none"
                  stroke="#fff"
                  opacity=".6"
                />
              </g>
            ))}
            {[0, 1, 2, 3].map((phase) => (
              <g
                key={phase}
                data-phase={phase}
                aria-hidden="true"
                opacity={phase === 0 ? 1 : 0}
              >
                {phase === 1 && (
                  <g fill="#183a2d" textAnchor="middle" fontSize="16">
                    <text x="110" y="292">
                      {recovery ? "Composición" : "Especie"}
                    </text>
                    <text x="320" y="292">
                      {recovery ? "Condición" : "Etapa"}
                    </text>
                    <text x="530" y="292">
                      {recovery ? "Análisis" : "Objetivo"}
                    </text>
                  </g>
                )}
                {phase === 2 && (
                  <g
                    fill="none"
                    stroke="#547653"
                    strokeWidth="1.5"
                    strokeDasharray="5 7"
                  >
                    <path
                      d={
                        recovery
                          ? "M140 200Q225 300 300 260M340 260Q425 300 500 200"
                          : "M125 110Q320 10 515 110M125 290Q320 380 515 290"
                      }
                    />
                  </g>
                )}
                {phase === 3 && (
                  <g>
                    <path
                      d="M335 214H377m-8-8 8 8-8 8"
                      fill="none"
                      stroke="#547653"
                      strokeWidth="2"
                    />
                    <rect
                      x="398"
                      y="103"
                      width="155"
                      height="199"
                      rx="7"
                      fill="#f7f8f3"
                      stroke="#91ab87"
                    />
                    <path
                      d="M420 156H531M420 189H510M420 212H531M420 236H500"
                      stroke="#b8ceae"
                      strokeWidth="7"
                    />
                    <text x="420" y="133" fill="#183a2d" fontSize="15">
                      {recovery ? "Antecedentes" : "Ficha técnica"}
                    </text>
                    <path d="M420 268H473" stroke="#547653" strokeWidth="2" />
                  </g>
                )}
              </g>
            ))}
            {Array.from({ length: sampleCount }, (_, index) => {
              const [x, y, angle] = samplePoint(index, 0, recovery);
              return (
                <g
                  data-material
                  key={index}
                  transform={`translate(${x} ${y}) rotate(${angle})`}
                >
                  <path
                    d={
                      recovery
                        ? "M-8 0Q0-6 9 0Q0 5-8 0Z"
                        : "M-5-1-2-4 3-3 5 0 2 4-3 3Z"
                    }
                    fill={
                      index % 3 === 0
                        ? recovery
                          ? "#547653"
                          : "#98805c"
                        : index % 3 === 1
                          ? `url(#${id}-grain)`
                          : recovery
                            ? "#c1cfa5"
                            : "#d9c49a"
                    }
                    stroke={recovery ? "#789774" : "#8d9e77"}
                    strokeWidth=".5"
                  />
                  <path
                    d={recovery ? "M-6 0H7" : "M-2-1h4"}
                    stroke="#f7f8f3"
                    strokeWidth=".8"
                    opacity=".55"
                  />
                </g>
              );
            })}
            {stage === 0 &&
              !playing &&
              [0, 1, 2].map((index) => (
                <g
                  className="material-hotspot"
                  key={index}
                  transform={`translate(${[174, 320, 466][index]} ${[124, 189, 124][index]})`}
                  role="button"
                  tabIndex={0}
                  aria-label={`Explorar ${inspections[variant][index][0]}`}
                  aria-pressed={inspected === index}
                  onClick={() => {
                    seek(0, true);
                    setInspected(index);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      seek(0, true);
                      setInspected(index);
                    }
                  }}
                >
                  <rect
                    x="-55"
                    y="-45"
                    width="110"
                    height="110"
                    fill="transparent"
                  />
                  <circle
                    r="15"
                    fill="#f7f8f3"
                    stroke="#547653"
                    strokeWidth="1.5"
                  />
                  <path d="M-5 0H5M0-5V5" stroke="#183a2d" strokeWidth="1.5" />
                </g>
              ))}
          </svg>
          <p className="material-caption">{story.steps[stage][3]}</p>
          {stage === 0 && (
            <p className="material-hint">
              Toca una muestra para conocer qué se evalúa.
            </p>
          )}
        </div>
        <div
          className="material-reading"
          id={`${id}-detail`}
          aria-live="polite"
          aria-atomic="true"
        >
          <span className="material-step-count">
            {stage + 1} / {story.steps.length}
          </span>
          <h3>
            {inspected === null
              ? story.steps[stage][1]
              : inspections[variant][inspected][1]}
          </h3>
          <p>
            {inspected === null
              ? story.steps[stage][2]
              : inspections[variant][inspected][2]}
          </p>
          {inspected !== null && (
            <button
              className="material-back"
              onClick={() => setInspected(null)}
            >
              <ArrowLeft aria-hidden="true" /> Volver a la etapa
            </button>
          )}
          <Link className="text-link" href={story.href}>
            {story.cta}
            <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </div>
      <div className="material-controls">
        <div
          className="material-chapters"
          role="group"
          aria-label="Etapas del recorrido"
        >
          {story.steps.map(([label], index) => (
            <button
              key={label}
              aria-pressed={stage === index}
              aria-controls={`${id}-detail`}
              onClick={(e) => seek(index, e.detail === 0)}
            >
              <span>{index + 1}</span>
              {label}
            </button>
          ))}
        </div>
        <div className="material-transport">
          <button
            onClick={play}
            aria-label={playing ? "Pausar recorrido" : "Reproducir recorrido"}
          >
            {playing ? <Pause /> : <Play />}
            <span>{playing ? "Pausar" : "Explorar"}</span>
          </button>
          <label className="material-range">
            <span>Recorre la evaluación</span>
            <input
              ref={slider}
              type="range"
              min="0"
              max="300"
              step="1"
              defaultValue="0"
              aria-label="Progreso del recorrido"
              aria-valuetext={story.steps[stage][0]}
              onChange={(e) => seek(Number(e.target.value) / 100, true)}
            />
          </label>
          <output ref={progressText} aria-hidden="true">
            0 %
          </output>
          <button
            disabled={stage === 0}
            aria-label="Etapa anterior"
            onClick={(e) => seek(stage - 1, e.detail === 0)}
          >
            <ArrowLeft />
          </button>
          <button
            aria-label={stage === 3 ? "Volver al inicio" : "Etapa siguiente"}
            onClick={(e) => seek(stage === 3 ? 0 : stage + 1, e.detail === 0)}
          >
            {stage === 3 ? <RotateCcw /> : <ArrowRight />}
          </button>
        </div>
      </div>
    </section>
  );
}
