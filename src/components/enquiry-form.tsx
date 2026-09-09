"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Icon } from "./icon";
import { site } from "@/lib/site";
import {
  buildMailto,
  formatEnquiry,
  intentLabels,
  normalizeIntent,
} from "@/lib/enquiry.mjs";
type Intent = keyof typeof intentLabels;
export function EnquiryForm() {
  const search = useSearchParams();
  const [selection, setIntent] = useState<Intent | null>(null);
  const intent =
    selection ?? (normalizeIntent(search.get("interes")) as Intent);
  const [summary, setSummary] = useState("");
  const [error, setError] = useState("");
  const [attachment, setAttachment] = useState("");
  const [ready, setReady] = useState(false);
  const result = useRef<HTMLDivElement>(null);
  const form = useRef<HTMLFormElement>(null);
  useEffect(() => {
    if (ready) result.current?.focus();
  }, [ready]);
  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const vals: Record<string, string> = {};
    for (const [key, value] of data.entries())
      if (typeof value === "string") vals[key] = value;
    if (
      !vals.Nombre?.trim() ||
      !vals.Empresa?.trim() ||
      !vals["Correo electrónico"]?.trim() ||
      !vals["Tu requerimiento"]?.trim()
    ) {
      setError(
        "Completa nombre, empresa, correo y requerimiento para preparar la consulta.",
      );
      return;
    }
    setError("");
    setSummary(
      formatEnquiry(intent, vals) +
        (attachment
          ? `\n\nDocumento disponible: ${attachment}\nRecuerda adjuntarlo manualmente al correo.`
          : ""),
    );
    setReady(true);
  }

  return (
    <div className="enquiry">
      <fieldset className="intent-select">
        <legend>¿Qué necesitas resolver?</legend>
        {Object.entries(intentLabels).map(([key, label]) => (
          <label key={key} className={intent === key ? "selected" : ""}>
            <input
              type="radio"
              name="intent"
              value={key}
              checked={intent === key}
              onChange={() => {
                setIntent(key as Intent);
                setReady(false);
              }}
            />
            <span>{label}</span>
            <Icon name="diagonal" />
          </label>
        ))}
      </fieldset>
      {
        <form
          ref={form}
          onSubmit={submit}
          className="enquiry-fields"
          hidden={ready}
        >
          <h2>{intentLabels[intent]}</h2>
          <p className="form-help">
            Los campos con * son obligatorios. El resumen se prepara en tu
            dispositivo y lo envías desde tu aplicación de correo.
          </p>
          <div className="form-grid">
            <Field
              label="Nombre"
              required
              autoComplete="name"
              maxLength={100}
            />
            <Field
              label="Empresa"
              required
              autoComplete="organization"
              maxLength={140}
            />
            <Field
              label="Correo electrónico"
              type="email"
              required
              autoComplete="email"
              maxLength={160}
            />
            <Field
              label="Teléfono"
              type="tel"
              autoComplete="tel"
              maxLength={40}
            />
          </div>
          {intent === "subproducto" && (
            <fieldset className="technical-fields">
              <legend>Sobre tu subproducto</legend>
              <div className="form-grid">
                <Field label="Sector industrial" maxLength={100} />
                <Field label="Tipo de subproducto" required maxLength={120} />
                <Field label="Origen del material" maxLength={160} />
                <Field
                  label="Volumen y frecuencia"
                  placeholder="Ej. kg/mes o t/mes"
                  maxLength={100}
                />
                <Field label="Ubicación" maxLength={140} />
                <Field label="Composición conocida" maxLength={200} />
              </div>
            </fieldset>
          )}
          {intent === "formulacion" && (
            <fieldset className="technical-fields">
              <legend>Sobre la solución nutricional</legend>
              <div className="form-grid">
                <Field label="Especie" required maxLength={100} />
                <Field label="Etapa productiva" maxLength={100} />
                <Field label="Materias primas disponibles" maxLength={200} />
                <Field label="Volumen aproximado" maxLength={100} />
                <Field label="Ubicación" maxLength={140} />
                <Field label="Objetivo nutricional" maxLength={200} />
              </div>
            </fieldset>
          )}
          {intent === "colaboracion" && (
            <div className="form-grid">
              <Field label="Área de investigación" maxLength={160} />
              <Field label="Etapa del proyecto" maxLength={100} />
            </div>
          )}
          <label className="field full">
            Tu requerimiento *
            <textarea
              name="Tu requerimiento"
              rows={5}
              required
              maxLength={1800}
              placeholder="Describe el desafío, la aplicación que buscas y los antecedentes disponibles."
            />
          </label>
          <label className="field file-field">
            Ficha o análisis disponible{" "}
            <span className="form-help">
              PDF, JPG o PNG · hasta 10 MB. El archivo permanece en tu
              dispositivo; debes adjuntarlo al correo.
            </span>
            <input
              type="file"
              name="attachment"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f && f.size > 10 * 1024 * 1024) {
                  setError(
                    "El archivo supera los 10 MB. Selecciona uno más pequeño.",
                  );
                  e.target.value = "";
                  setAttachment("");
                } else {
                  setAttachment(f?.name || "");
                  setError("");
                }
              }}
            />
          </label>
          <label className="consent">
            <input type="checkbox" name="consent" required />
            <span>
              Comprendo que debo revisar y enviar la consulta desde mi correo.
              He leído la{" "}
              <Link href="/privacidad/">información de privacidad</Link>. *
            </span>
          </label>
          {error && (
            <p role="alert" className="form-error">
              {error}
            </p>
          )}
          <button className="button" type="submit">
            Revisar mi consulta <Icon name="arrow" />
          </button>
        </form>
      }
      {ready && (
        <div className="enquiry-result" ref={result} tabIndex={-1}>
          <div className="result-check">
            <Icon name="check" />
          </div>
          <h2>Tu consulta está preparada.</h2>
          <p>
            Aún no se ha enviado. Revisa el resumen y abre tu aplicación de
            correo para enviarlo a <strong>{site.email}</strong>.
          </p>
          <pre>{summary}</pre>
          {attachment && (
            <p className="form-help">
              Recuerda adjuntar <strong>{attachment}</strong> manualmente al
              correo.
            </p>
          )}
          <div className="result-actions">
            <a
              className="button"
              href={buildMailto(site.email, intent, summary)}
            >
              Abrir en mi correo <Icon name="diagonal" />
            </a>
            <a
              className="button button-secondary"
              href={`data:text/plain;charset=utf-8,${encodeURIComponent(summary)}`}
              download="consulta-tecnica-gazalez.txt"
            >
              Descargar resumen <Icon name="download" />
            </a>
            <button className="text-link" onClick={() => setReady(false)}>
              Editar mi consulta
            </button>
            <button
              className="text-link"
              onClick={() => {
                form.current?.reset();
                setIntent("general");
                setAttachment("");
                setSummary("");
                setError("");
                setReady(false);
              }}
            >
              Nueva consulta
            </button>
          </div>
          <p className="form-help">
            Si no se abre una aplicación de correo, descarga el resumen y
            envíalo a {site.email}.
          </p>
        </div>
      )}
    </div>
  );
}
function Field({
  label,
  ...props
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="field">
      {label}
      {props.required ? " *" : ""}
      <input name={label} {...props} />
    </label>
  );
}
