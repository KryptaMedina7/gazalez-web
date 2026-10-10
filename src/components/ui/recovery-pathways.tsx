"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { StageHighlight } from "./stage-highlight";
import {
  ArrowRight,
  ArrowLeft,
  MapPin,
  ScanLine,
  GitBranch,
  MessagesSquare,
} from "lucide-react";

const stages = [
  {
    label: "Origen",
    title: "Una corriente, un contexto propio.",
    text: "Describe el proceso que genera el subproducto, su ubicación, volumen aproximado y frecuencia. Ese contexto es el punto de partida de la evaluación.",
    icon: MapPin,
  },
  {
    label: "Caracterización",
    title: "Las propiedades orientan la decisión.",
    text: "Composición, condición y análisis disponibles permiten situar el material. Puedes iniciar la conversación aunque todavía no tengas todos los antecedentes.",
    icon: ScanLine,
  },
  {
    label: "Alternativas",
    title: "Abrir posibilidades, evaluar cada una.",
    text: "Recuperación, procesamiento y aprovechamiento son alternativas que requieren evaluación. No todos los materiales siguen el mismo recorrido ni tienen el mismo destino.",
    icon: GitBranch,
  },
  {
    label: "Evaluación",
    title: "Definir juntos el siguiente paso.",
    text: "El equipo revisa los antecedentes y la aplicación buscada para acordar el alcance. La consulta no implica aceptación automática del material.",
    icon: MessagesSquare,
  },
];
const branches = [
  [
    "Recuperación",
    "Revisar qué propiedades del material podrían conservar valor para otra aplicación.",
  ],
  [
    "Procesamiento",
    "Evaluar si se requiere una transformación y qué antecedentes permiten estudiarla.",
  ],
  [
    "Aprovechamiento",
    "Relacionar las características del material con los requisitos de su posible destino.",
  ],
];

/** A decision map, not a production line: paths remain alternatives, never promises. */
export function RecoveryPathways() {
  const [stage, setStage] = useState(0);
  const [branch, setBranch] = useState<number | null>(null);
  const root = useRef<HTMLElement>(null);
  const id = useId();
  useEffect(() => {
    const host = root.current;
    if (!host) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)");
    const ctx = gsap.context(() => {
      const lines = host.querySelectorAll<SVGPathElement>("[data-flow]");
      const nodes = host.querySelectorAll<SVGGElement>("[data-station]");
      gsap.to(lines, {
        strokeDashoffset: (i) => (i < stage ? 0 : 1),
        opacity: (i) => (i < stage ? 1 : 0.22),
        duration: reduce.matches ? 0 : 0.65,
        stagger: reduce.matches ? 0 : 0.055,
        ease: "power2.out",
      });
      gsap.to(nodes, {
        opacity: (i) => (i <= stage ? 1 : 0.34),
        duration: reduce.matches ? 0 : 0.3,
      });
      if (!reduce.matches) {
        gsap.fromTo(
          host.querySelector(".recovery-reading"),
          { opacity: 0.5, y: 5 },
          { opacity: 1, y: 0, duration: 0.24, clearProps: "transform" },
        );
      }
    }, host);
    // Keep the current stroke position when a visitor interrupts a transition.
    return () => ctx.kill(false);
  }, [stage, branch]);
  return (
    <section
      className="recovery-pathways explorer"
      ref={root}
      aria-labelledby={`${id}-title`}
    >
      <header className="explorer-heading">
        <h2 id={`${id}-title`}>El valor está en encontrar el camino.</h2>
        <p>
          Un mapa para explorar cómo se evalúa un subproducto. Selecciona un
          punto y descubre qué información conecta con el siguiente.
        </p>
      </header>
      <div className="recovery-map">
        <svg
          viewBox="0 0 760 320"
          role="img"
          aria-label="Mapa de evaluación: del origen a la caracterización, las alternativas y la consulta"
        >
          <defs>
            <pattern
              id={`${id}-dots`}
              width="22"
              height="22"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="2" cy="2" r="1" fill="#789774" opacity=".24" />
            </pattern>
          </defs>
          <rect width="760" height="320" fill={`url(#${id}-dots)`} />
          <g fill="none" stroke="#547653" strokeWidth="2" strokeLinecap="round">
            <path
              d="M113 160H260M300 160C365 160 350 65 430 65H500M300 160H500M300 160C365 160 350 255 430 255H500M530 65C605 65 580 160 657 160M530 160H657M530 255C605 255 580 160 657 160"
              opacity=".24"
            />
            {[
              "M113 160H260",
              "M300 160C365 160 350 65 430 65H500M300 160H500M300 160C365 160 350 255 430 255H500",
              "M530 65C605 65 580 160 657 160M530 160H657M530 255C605 255 580 160 657 160",
            ].map((d) => (
              <path
                key={d}
                data-flow
                d={d}
                pathLength="1"
                strokeDasharray="1"
                strokeDashoffset="1"
                strokeWidth="4"
              />
            ))}
          </g>
          {[
            [95, 160],
            [280, 160],
            [515, 65],
            [675, 160],
          ].map(([x, y], i) => (
            <g key={i} data-station transform={`translate(${x} ${y})`}>
              <circle r="27" fill="#e4eedc" stroke="#789774" />
              <circle r="12" fill={i === stage ? "#163024" : "#789774"} />
              <circle
                r="34"
                fill="none"
                stroke="#c1cfa5"
                strokeDasharray="2 8"
              />
            </g>
          ))}
          {[160, 255].map((y) => (
            <g key={y}>
              <circle cx="515" cy={y} r="15" fill="#f7f8f3" stroke="#789774" />
              <circle cx="515" cy={y} r="5" fill="#789774" />
            </g>
          ))}
          <g fill="#183a2d" fontSize="15" textAnchor="middle">
            <text x="95" y="217">
              Origen
            </text>
            <text x="280" y="217">
              Propiedades
            </text>
            <text x="675" y="217">
              Consulta
            </text>
          </g>
        </svg>
        <div
          className="recovery-stops stage-rail"
          role="group"
          aria-label="Etapas de evaluación"
        >
          <StageHighlight index={stage} />
          {stages.map(({ label, icon: Icon }, i) => (
            <button
              key={label}
              data-stage-option
              aria-pressed={stage === i}
              aria-controls={`${id}-detail`}
              onClick={() => {
                setStage(i);
                setBranch(null);
              }}
            >
              <Icon aria-hidden="true" />
              <span>{label}</span>
              <i aria-hidden="true" />
            </button>
          ))}
        </div>
      </div>
      <div className="recovery-bottom">
        <div
          className="recovery-reading"
          id={`${id}-detail`}
          aria-live="polite"
        >
          <span className="material-step-count">{stage + 1} / 4</span>
          <h3>{branch === null ? stages[stage].title : branches[branch][0]}</h3>
          <p>{branch === null ? stages[stage].text : branches[branch][1]}</p>
        </div>
        <div className="recovery-actions">
          {stage === 2 ? (
            <div
              className="recovery-branches"
              role="group"
              aria-label="Explorar alternativas"
            >
              {branches.map(([label], i) => (
                <button
                  key={label}
                  aria-pressed={branch === i}
                  onClick={() => setBranch(i)}
                >
                  {label}
                  <ArrowRight aria-hidden="true" />
                </button>
              ))}
            </div>
          ) : (
            <p>
              La evaluación conecta las características del material con una
              necesidad concreta.
            </p>
          )}
          <div className="recovery-next">
            <button
              aria-label="Etapa anterior"
              disabled={stage === 0}
              onClick={() => {
                setStage(stage - 1);
                setBranch(null);
              }}
            >
              <ArrowLeft aria-hidden="true" />
            </button>
            <button
              onClick={() => {
                setStage((stage + 1) % 4);
                setBranch(null);
              }}
            >
              {stage === 3 ? "Volver al origen" : "Siguiente punto"}
              <ArrowRight aria-hidden="true" />
            </button>
          </div>
          <Link href="/contacto/?interes=subproducto" className="text-link">
            Evaluar mi subproducto
            <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
