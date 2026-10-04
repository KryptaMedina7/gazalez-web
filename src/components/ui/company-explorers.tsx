"use client";

import { useId, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  FileText,
  Leaf,
  Microscope,
  Sprout,
} from "lucide-react";
import { corporatePages } from "@/lib/content";
import { sourceUdec } from "@/lib/site";
import { ConceptImage } from "@/components/concept-image";

function useChoice() {
  const [active, setActive] = useState(0);
  const [keyboard, setKeyboard] = useState(false);
  return {
    active,
    keyboard,
    choose: (index: number, detail: number) => {
      setActive(index);
      setKeyboard(detail === 0);
    },
  };
}

export function SustainabilityExplorer() {
  const { active, keyboard, choose } = useChoice();
  const id = useId();
  const sections = corporatePages.sostenibilidad.sections;
  return (
    <>
      <section
        className="sustainability-explorer explorer"
        data-keyboard={keyboard}
        aria-labelledby={id}
      >
        <header className="explorer-heading">
          <h2 id={id}>Un recorrido que necesita evaluación.</h2>
          <p>
            Recuperar un material y encontrarle una aplicación son posibilidades
            que hay que contrastar con sus condiciones.
          </p>
        </header>
        <div className="sustainability-layout">
          <div
            className="resource-loop"
            data-active={active}
            aria-hidden="true"
          >
            <svg viewBox="0 0 340 300">
              <path
                d="M70 216 C5 104 108 15 211 51"
                className={active === 0 ? "is-active" : ""}
              />
              <path
                d="M247 68 C340 145 283 263 168 265"
                className={active === 1 ? "is-active" : ""}
              />
              <path d="m204 39 16 16-22 2 M181 253l-18 13 22 10" />
            </svg>
            <Leaf />
            <span className="loop-origin">Material</span>
            <span className="loop-destination">Posible aplicación</span>
          </div>
          <div
            className="sustainability-choices"
            role="group"
            aria-label="Explorar oportunidades de recuperación"
          >
            {sections.slice(0, 2).map(([title, text], i) => (
              <button
                key={title}
                type="button"
                aria-pressed={active === i}
                onClick={(e) => choose(i, e.detail)}
              >
                <strong>{title}</strong>
                <span>{text}</span>
                <ArrowRight aria-hidden="true" />
              </button>
            ))}
          </div>
        </div>
      </section>
      <section className="measurement-note">
        <div>
          <h2>{sections[2][0]}</h2>
          <p>{sections[2][1]}</p>
        </div>
        <ul aria-label="Antecedentes necesarios para medir">
          {[
            "Cantidades",
            "Condiciones de proceso",
            "Destino",
            "Método de comparación",
          ].map((label) => (
            <li key={label}>
              <FileText aria-hidden="true" />
              {label}
            </li>
          ))}
        </ul>
        <Link className="text-link" href="/contacto/?interes=subproducto">
          Consultar por un material <ArrowRight aria-hidden="true" />
        </Link>
      </section>
    </>
  );
}

export function TransferExplorer() {
  const { active, keyboard, choose } = useChoice();
  const id = useId();
  const sections =
    corporatePages["innovacion/transferencia-tecnologica"].sections;
  return (
    <>
      <section className="license-evidence">
        <Microscope aria-hidden="true" />
        <div>
          <h2>HIDROBAC: un vínculo documentado.</h2>
          <p>
            Tecnología desarrollada en la Universidad de Concepción y licenciada
            a Gazalez e Hija durante 2025.
          </p>
          <div className="evidence-links">
            <Link href="/innovacion/hidrobac/">
              Tecnología y alcance <ArrowUpRight aria-hidden="true" />
            </Link>
            <a href={sourceUdec} target="_blank" rel="noreferrer">
              Publicación de Agronomía UdeC <ArrowUpRight aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>
      <section
        className="transfer-explorer explorer"
        data-keyboard={keyboard}
        aria-labelledby={id}
      >
        <header className="explorer-heading">
          <h2 id={id}>Tres conceptos, distintos alcances.</h2>
          <p>
            Selecciona un concepto para situarlo en la relación entre
            conocimiento y aplicación. No son una lista de etapas completadas.
          </p>
        </header>
        <div
          className="transfer-track"
          role="group"
          aria-label="Conceptos de transferencia"
        >
          {["Investigación", "Licencia", "Aplicación"].map((label, i) => (
            <button
              type="button"
              key={label}
              aria-pressed={active === i}
              aria-controls={`${id}-detail`}
              onClick={(e) => choose(i, e.detail)}
            >
              <span className="transfer-dot" aria-hidden="true" />
              <span>{label}</span>
              <span>
                {
                  [
                    "Autoría universitaria",
                    "Vínculo documentado",
                    "Requiere evidencia propia",
                  ][i]
                }
              </span>
            </button>
          ))}
        </div>
        <div
          className="transfer-readout"
          id={`${id}-detail`}
          aria-live="polite"
          aria-atomic="true"
        >
          <span className="transfer-word" aria-hidden="true">
            {["Conocimiento", "Vínculo", "Evaluación"][active]}
          </span>
          <div key={active} className="explorer-response">
            <h3>{sections[active][0]}</h3>
            <p>{sections[active][1]}</p>
          </div>
        </div>
        <p className="transfer-limit">
          La licencia no equivale a disponibilidad comercial. Consulta la ficha
          de HIDROBAC para conocer su estado y límites.
        </p>
        <noscript>
          {sections.slice(1).map(([title, text]) => (
            <div key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </noscript>
      </section>
    </>
  );
}

const collaborationTopics = [
  [
    "Biomasa",
    "Describe el material, su proceso de origen y la aplicación que te interesa.",
  ],
  [
    "Nutrición",
    "Comparte la especie, la etapa y el objetivo nutricional que quieres abordar.",
  ],
  [
    "Aplicaciones agrícolas",
    "Explica la necesidad de aplicación, la etapa del trabajo y los antecedentes disponibles.",
  ],
] as const;

export function ProjectsExplorer() {
  const { active, keyboard, choose } = useChoice();
  const id = useId();
  const sections = corporatePages["innovacion/proyectos"].sections;
  return (
    <div className="projects-layout explorer" data-keyboard={keyboard}>
      <section className="project-evidence">
        <ConceptImage visual="field-trials" />
        <div>
          <h2>{sections[0][0]}</h2>
          <p>{sections[0][1]}</p>
          <p className="project-status">
            Tecnología licenciada · Consulta su estado y alcance.
          </p>
          <Link className="text-link" href="/innovacion/hidrobac/">
            Explorar HIDROBAC <ArrowRight aria-hidden="true" />
          </Link>
          <a
            className="text-link"
            href={sourceUdec}
            target="_blank"
            rel="noreferrer"
          >
            Consultar la fuente UdeC <ArrowUpRight aria-hidden="true" />
          </a>
        </div>
      </section>
      <section className="collaboration-desk">
        <h2>{sections[1][0]}</h2>
        <p>{sections[1][1]}</p>
        <div
          className="collaboration-topics"
          role="group"
          aria-label="Ámbito de colaboración"
        >
          {collaborationTopics.map(([label], i) => (
            <button
              type="button"
              key={label}
              aria-pressed={active === i}
              aria-controls={id}
              onClick={(e) => choose(i, e.detail)}
            >
              {label}
            </button>
          ))}
        </div>
        <div
          className="collaboration-prompt"
          id={id}
          aria-live="polite"
          aria-atomic="true"
        >
          <Sprout aria-hidden="true" />
          <p key={active} className="explorer-response">
            {collaborationTopics[active][1]}
          </p>
        </div>
        <h3>{sections[2][0]}</h3>
        <p>{sections[2][1]}</p>
        <Link className="button" href="/contacto/?interes=colaboracion">
          Plantear una colaboración <ArrowUpRight aria-hidden="true" />
        </Link>
      </section>
    </div>
  );
}

const capabilities = [
  [
    "Recuperación",
    "El origen y las características del material son el punto de partida para evaluar oportunidades.",
  ],
  [
    "Producción",
    "Las condiciones de recepción, procesamiento, almacenamiento y salida sitúan la conversación industrial.",
  ],
  [
    "Formulación",
    "La necesidad nutricional y la aplicación orientan la revisión técnica y el siguiente paso.",
  ],
] as const;

export function CompanyCapabilities() {
  const { active, keyboard, choose } = useChoice();
  const id = useId();
  const sections = corporatePages.empresa.sections;
  return (
    <section
      className="company-capabilities explorer"
      data-keyboard={keyboard}
      aria-labelledby={`${id}-title`}
    >
      <header className="explorer-heading">
        <h2 id={`${id}-title`}>{sections[0][0]}</h2>
        <p>{sections[0][1]}</p>
      </header>
      <div
        className="capabilities-path"
        role="group"
        aria-label="Capacidades conectadas"
      >
        {capabilities.map(([label], i) => (
          <button
            type="button"
            key={label}
            aria-pressed={active === i}
            aria-controls={id}
            onClick={(e) => choose(i, e.detail)}
          >
            {label}
            <ArrowRight aria-hidden="true" />
          </button>
        ))}
      </div>
      <div
        className="capability-explanation"
        id={id}
        aria-live="polite"
        aria-atomic="true"
      >
        <p key={active} className="explorer-response">
          {capabilities[active][1]}
        </p>
      </div>
      <div className="company-practice">
        {sections.slice(1).map(([title, text]) => (
          <div key={title}>
            <h3>{title}</h3>
            <p>{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
