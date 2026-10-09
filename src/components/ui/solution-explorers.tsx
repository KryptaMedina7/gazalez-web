"use client";

import { useId, useState } from "react";
import { MaterialLab } from "./material-lab";
import { ProductFamilies } from "@/components/product-families";
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
        <MaterialLab variant="recovery" />
      ) : solution.slug === "nutricion-animal" ? (
        <>
          <ProductFamilies />
          <PoultryScene />
        </>
      ) : solution.slug === "nucleos-proteicos" ? (
        <MaterialLab variant="protein" />
      ) : (
        <RelationshipMap />
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
