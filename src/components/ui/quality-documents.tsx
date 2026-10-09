"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowRight, FileText, FlaskConical, Fingerprint } from "lucide-react";
const documents = [
  {
    title: "Origen e identificación",
    icon: Fingerprint,
    question: "¿De dónde viene el material?",
    body: "Relaciona el origen, la recepción y la identificación del lote con la solución que necesitas evaluar.",
    items: [
      "Proceso de origen",
      "Identificación del material",
      "Aplicación de interés",
    ],
  },
  {
    title: "Ficha técnica",
    icon: FileText,
    question: "¿Qué información describe la solución?",
    body: "Solicita la ficha pertinente al material y al uso propuesto. Las especificaciones se revisan para el requerimiento concreto.",
    items: [
      "Material o solución",
      "Composición y especificaciones",
      "Uso propuesto",
    ],
  },
  {
    title: "Análisis",
    icon: FlaskConical,
    question: "¿Qué antecedentes ayudan a decidir?",
    body: "Indica los análisis disponibles para conversar sobre la composición y las condiciones del material. Un análisis y una certificación cumplen funciones distintas.",
    items: [
      "Muestra a la que corresponde",
      "Antecedentes disponibles",
      "Condiciones del requerimiento",
    ],
  },
];
export function QualityDocuments() {
  const [selected, setSelected] = useState(0);
  const active = documents[selected];
  const DocumentIcon = active.icon;
  return (
    <section
      className="quality-documents explorer"
      aria-labelledby="documents-title"
    >
      <header className="explorer-heading">
        <h2 id="documents-title">El respaldo también se puede explorar.</h2>
        <p>
          Conoce qué información conviene revisar antes de definir una
          aplicación.
        </p>
      </header>
      <div className="documents-workspace">
        <div
          className="documents-tabs"
          role="group"
          aria-label="Tipos de antecedentes"
        >
          {documents.map((doc, i) => {
            const DocIcon = doc.icon;
            return (
              <button
                key={doc.title}
                aria-pressed={selected === i}
                aria-controls="document-detail"
                onClick={() => setSelected(i)}
              >
                <DocIcon aria-hidden="true" />
                <span>{doc.title}</span>
                <ArrowRight aria-hidden="true" />
              </button>
            );
          })}
        </div>
        <div
          className="document-sheet"
          id="document-detail"
          aria-live="polite"
          aria-atomic="true"
        >
          <DocumentIcon className="document-symbol" aria-hidden="true" />
          <h3>{active.question}</h3>
          <p>{active.body}</p>
          <ul>
            {active.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <Link href="/contacto/" className="text-link">
            Consultar documentación <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </div>
      <p className="documents-note">
        La documentación aplicable se consulta con el equipo. Este recorrido no
        acredita certificaciones ni sustituye una ficha o un análisis del
        material.
      </p>
    </section>
  );
}
