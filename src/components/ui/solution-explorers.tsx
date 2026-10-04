"use client";

import { useEffect, useId, useRef, useState } from "react";
import gsap from "gsap";
import {
  ArrowRight,
  Bird,
  ClipboardList,
  FlaskConical,
  Sprout,
  Wheat,
} from "lucide-react";
import type { Solution } from "@/lib/content";
import { ConceptImage } from "@/components/concept-image";

function useSelection() {
  const [selected, setSelected] = useState(0);
  const [keyboard, setKeyboard] = useState(false);
  return {
    selected,
    keyboard,
    select: (index: number, detail: number) => {
      setKeyboard(detail === 0);
      setSelected(index);
    },
  };
}

const preparation = [
  [
    "Especie y etapa",
    "Ubica la necesidad",
    "La especie y la etapa productiva sitúan el requerimiento nutricional que quieres consultar.",
    Bird,
  ],
  [
    "Objetivo",
    "Define qué buscas",
    "Describe el objetivo nutricional o productivo y las restricciones que debe considerar la formulación.",
    Sprout,
  ],
  [
    "Materias primas",
    "Comparte lo disponible",
    "Indica las materias primas con las que cuentas para revisar alternativas dentro de tu contexto.",
    Wheat,
  ],
  [
    "Análisis",
    "Reúne los antecedentes",
    "Si tienes análisis o antecedentes de la dieta, indícalos al equipo. Puedes iniciar la conversación aunque no tengas todos los documentos.",
    FlaskConical,
  ],
  [
    "Volumen",
    "Da contexto a la consulta",
    "Un volumen aproximado ayuda a plantear el requerimiento. Las condiciones se acuerdan después de la evaluación.",
    ClipboardList,
  ],
] as const;

function FormulationDesk() {
  const { selected, keyboard, select } = useSelection();
  const panel = useId();
  const CurrentIcon = preparation[selected][3];
  return (
    <section
      className="formulation-desk explorer"
      data-keyboard={keyboard}
      aria-labelledby={`${panel}-title`}
    >
      <header className="explorer-heading">
        <h2 id={`${panel}-title`}>Prepara tu conversación técnica.</h2>
        <p>
          Explora los antecedentes que ayudan a evaluar una formulación. No
          necesitas tenerlos todos para comenzar.
        </p>
      </header>
      <div className="desk-workspace">
        <div
          className="desk-files"
          role="group"
          aria-label="Antecedentes de formulación"
        >
          {preparation.map(([label, , , ItemIcon], index) => (
            <button
              key={label}
              type="button"
              aria-pressed={selected === index}
              aria-controls={panel}
              onClick={(e) => select(index, e.detail)}
            >
              <ItemIcon aria-hidden="true" />
              <span>{label}</span>
              <ArrowRight aria-hidden="true" />
            </button>
          ))}
        </div>
        <div
          className="desk-sheet"
          id={panel}
          aria-live="polite"
          aria-atomic="true"
        >
          <CurrentIcon className="desk-sheet-icon" aria-hidden="true" />
          <div key={selected} className="explorer-response">
            <h3>{preparation[selected][1]}</h3>
            <p>{preparation[selected][2]}</p>
          </div>
          <span className="desk-footnote">
            Una guía para consultar, sin completar ni guardar datos aquí.
          </span>
        </div>
      </div>
    </section>
  );
}

/** A bounded, event-driven SVG diagram. No renderer or frame loop while idle. */
function MaterialDiagram({
  stage,
  immediate,
}: {
  stage: number;
  immediate: boolean;
}) {
  const root = useRef<SVGSVGElement>(null);
  useEffect(() => {
    const svg = root.current;
    if (!svg) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)");
    const nodes = svg.querySelectorAll("[data-sample]");
    const target = (i: number) => {
      if (stage === 0) return [150 + ((i * 47) % 260), 80 + ((i * 31) % 135)];
      if (stage === 1)
        return [
          110 + (i % 3) * 170 + ((Math.floor(i / 3) % 4) - 1.5) * 13,
          108 + Math.floor(i / 12) * 26,
        ];
      const angle = (i / 48) * Math.PI * 2;
      return [
        280 + Math.cos(angle) * (i % 2 ? 96 : 58),
        146 + Math.sin(angle) * (i % 2 ? 72 : 42),
      ];
    };
    const tween = gsap.to(nodes, {
      attr: { x: (i: number) => target(i)[0], y: (i: number) => target(i)[1] },
      duration: immediate || reduce.matches ? 0 : 0.45,
      ease: "power2.out",
      overwrite: true,
    });
    const finish = () => {
      if (reduce.matches) tween.progress(1);
    };
    reduce.addEventListener("change", finish);
    return () => {
      tween.kill();
      reduce.removeEventListener("change", finish);
    };
  }, [stage, immediate]);
  return (
    <svg
      ref={root}
      viewBox="0 0 560 290"
      className="material-map"
      aria-hidden="true"
    >
      <path className="material-guide" d="M60 242 H500" />
      {[110, 280, 450].map((x, i) => (
        <g key={x} className="sample-zone" opacity={stage === 1 ? 1 : 0.12}>
          <rect x={x - 61} y="65" width="122" height="160" rx="12" />
          <path d={`M${x - 46} 205h92`} />
          <text x={x} y="269" textAnchor="middle">
            Muestra {i + 1}
          </text>
        </g>
      ))}
      <ellipse
        className="application-ring"
        cx="280"
        cy="146"
        rx="132"
        ry="98"
        opacity={stage === 2 ? 1 : 0}
      />
      {Array.from({ length: 48 }, (_, i) => (
        <rect
          data-sample
          key={i}
          x={150 + ((i * 47) % 260)}
          y={80 + ((i * 31) % 135)}
          width={i % 3 === 0 ? 15 : 8}
          height={i % 3 === 0 ? 5 : 8}
          rx="3"
          fill={["#28533d", "#708d66", "#a8c297"][i % 3]}
        />
      ))}
    </svg>
  );
}

const recoverySteps = [
  [
    "Origen",
    "Conocer el material",
    "Origen, ubicación, volumen y frecuencia permiten situar la corriente que se quiere evaluar.",
  ],
  [
    "Caracterización",
    "Revisar sus propiedades",
    "La condición y la composición conocida ayudan a comparar alternativas. Los análisis disponibles aportan antecedentes para la revisión.",
  ],
  [
    "Alternativas",
    "Evaluar una aplicación",
    "La ruta depende de las características del material y de los requisitos de su posible aplicación. No implica aceptación automática.",
  ],
] as const;

function RecoveryJourney() {
  const { selected, keyboard, select } = useSelection();
  const id = useId();
  return (
    <section
      className="recovery-journey explorer"
      data-keyboard={keyboard}
      aria-labelledby={`${id}-title`}
    >
      <header className="explorer-heading">
        <h2 id={`${id}-title`}>Del material a una posibilidad.</h2>
        <p>
          Recorre los antecedentes de una evaluación. Cada corriente puede
          requerir una alternativa distinta.
        </p>
      </header>
      <div className="recovery-body">
        <div className="recovery-scene">
          <MaterialDiagram stage={selected} immediate={keyboard} />
          <p>Selecciona una etapa para explorar la evaluación.</p>
        </div>
        <div
          className="recovery-steps"
          role="group"
          aria-label="Etapas de evaluación"
        >
          {recoverySteps.map(([label, title, description], index) => (
            <button
              key={label}
              type="button"
              aria-pressed={selected === index}
              onClick={(e) => select(index, e.detail)}
            >
              <span className="journey-marker">{index + 1}</span>
              <span>
                <span className="journey-label">{label}</span>
                <strong>{title}</strong>
                <span>{description}</span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

const nutritionTopics = [
  [
    "Aplicación",
    "El contexto de tu operación",
    "Plantas de alimento, productores y formuladores pueden plantear su necesidad para revisar alternativas de nutrición animal.",
  ],
  [
    "Etapa",
    "Un requerimiento situado",
    "La especie y la etapa productiva son antecedentes de la consulta. El foco declarado incluye nutrición avícola.",
  ],
  [
    "Dieta",
    "Mirar el conjunto",
    "La composición, el origen y la compatibilidad con la dieta orientan la evaluación de un ingrediente.",
  ],
] as const;
function PoultryScene() {
  const { selected, keyboard, select } = useSelection();
  const id = useId();
  return (
    <section
      className="poultry-explorer explorer"
      data-keyboard={keyboard}
      aria-labelledby={`${id}-title`}
    >
      <header className="explorer-heading">
        <h2 id={`${id}-title`}>La nutrición empieza por el contexto.</h2>
        <p>Selecciona qué aspecto de tu operación quieres explorar.</p>
      </header>
      <div className="poultry-layout">
        <div className="poultry-landscape">
          <ConceptImage visual="poultry" />
          <div
            className="poultry-points"
            role="group"
            aria-label="Aspectos de nutrición"
          >
            {nutritionTopics.map(([label], i) => (
              <button
                type="button"
                key={label}
                aria-pressed={selected === i}
                aria-controls={id}
                onClick={(e) => select(i, e.detail)}
              >
                <span aria-hidden="true" />
                {label}
              </button>
            ))}
          </div>
        </div>
        <div
          className="poultry-explanation"
          id={id}
          aria-live="polite"
          aria-atomic="true"
        >
          <div key={selected} className="explorer-response">
            <Bird aria-hidden="true" />
            <h3>{nutritionTopics[selected][1]}</h3>
            <p>{nutritionTopics[selected][2]}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

const proteinTopics = [
  [
    "Materia prima",
    "Composición y antecedentes",
    "Las materias primas disponibles y los antecedentes de la dieta forman parte de la información que revisa el equipo.",
  ],
  [
    "Requerimiento",
    "Un objetivo nutricional",
    "El aporte proteico se evalúa dentro de la dieta completa y de las condiciones del sistema productivo.",
  ],
  [
    "Documentación",
    "Especificaciones de la solución",
    "Solicita la ficha técnica vigente de la solución evaluada. No hay porcentajes universales publicados para cualquier aplicación.",
  ],
] as const;

const bioTopics = [
  [
    "Biomasa",
    "El punto de partida",
    "Comparte los antecedentes de la biomasa y su proceso de origen. Sus propiedades y variabilidad orientan qué oportunidades explorar.",
  ],
  [
    "Desafío",
    "La pregunta de desarrollo",
    "Explica la aplicación que te interesa y los antecedentes disponibles para plantear una evaluación técnica.",
  ],
  [
    "Colaboración",
    "Un alcance acordado",
    "La conversación puede incorporar investigación aplicada y transferencia tecnológica. La viabilidad y el escalamiento se revisan caso a caso.",
  ],
] as const;

function RelationshipMap({ protein = false }: { protein?: boolean }) {
  const { selected, keyboard, select } = useSelection();
  const id = useId();
  const topics = protein ? proteinTopics : bioTopics;
  return (
    <section
      className={`relationship-explorer explorer ${protein ? "protein-explorer" : "bioprocess-explorer"}`}
      data-keyboard={keyboard}
      aria-labelledby={`${id}-title`}
    >
      <header className="explorer-heading">
        <h2 id={`${id}-title`}>
          {protein
            ? "Un aporte dentro de una dieta completa."
            : "Conecta la biomasa con tu desafío."}
        </h2>
        <p>
          {protein
            ? "Explora las relaciones que se revisan antes de definir una solución proteica."
            : "La línea de desarrollo reúne material, aplicación y colaboración. Selecciona una conexión."}
        </p>
      </header>
      <div className="relationship-layout">
        <div className="relationship-board" data-active={selected}>
          <svg
            viewBox="0 0 500 340"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path data-active={selected === 0} d="M250 164 Q100 165 95 55" />
            <path data-active={selected === 1} d="M250 164 Q385 155 405 55" />
            <path data-active={selected === 2} d="M250 164 V290" />
          </svg>
          <div className="relationship-center">
            {protein ? (
              <Wheat aria-hidden="true" />
            ) : (
              <FlaskConical aria-hidden="true" />
            )}
            <strong>
              {protein ? "Dieta completa" : "Desarrollo aplicado"}
            </strong>
          </div>
          {topics.map(([label], i) => (
            <button
              className={`relationship-node relationship-node-${i}`}
              type="button"
              key={label}
              aria-pressed={selected === i}
              aria-controls={id}
              onClick={(e) => select(i, e.detail)}
            >
              {label}
              <ArrowRight aria-hidden="true" />
            </button>
          ))}
        </div>
        <div
          className="relationship-detail"
          id={id}
          aria-live="polite"
          aria-atomic="true"
        >
          <div key={selected} className="explorer-response">
            <h3>{topics[selected][1]}</h3>
            <p>{topics[selected][2]}</p>
          </div>
          <p className="relationship-note">
            {protein
              ? "Este diagrama no representa proporciones ni una receta."
              : "Una relación de trabajo, no una tecnología universal ni resultados garantizados."}
          </p>
        </div>
      </div>
    </section>
  );
}

export function SolutionExplorer({ solution }: { solution: Solution }) {
  return (
    <>
      {solution.slug === "formulacion-tecnica" ? (
        <FormulationDesk />
      ) : solution.slug === "valorizacion-industrial" ? (
        <RecoveryJourney />
      ) : solution.slug === "nutricion-animal" ? (
        <PoultryScene />
      ) : (
        <RelationshipMap protein={solution.slug === "nucleos-proteicos"} />
      )}
      <section
        className={`solution-scope solution-scope--${solution.slug}`}
        aria-label="Alcance de la consulta"
      >
        <div className="scope-lead">
          <h2>Qué puedes consultar</h2>
          <p>{solution.need}</p>
        </div>
        <dl>
          {[
            ["Antecedentes útiles", solution.input],
            ["Cómo lo abordamos", solution.process],
            ["Qué se define", solution.result],
          ].map(([title, body]) => (
            <div key={title}>
              <dt>{title}</dt>
              <dd>{body}</dd>
            </div>
          ))}
        </dl>
      </section>
    </>
  );
}
