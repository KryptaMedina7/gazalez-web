import Image from "next/image";

export type VisualKey =
  | "nutrition"
  | "valorization"
  | "biotech"
  | "nature"
  | "poultry"
  | "formulation"
  | "quality"
  | "protein-study"
  | "crop-recovery"
  | "bioprocess-study"
  | "research-seedlings"
  | "hydrogel-roots"
  | "technology-transfer"
  | "field-trials"
  | "rural-company"
  | "circular-soil"
  | "solution-overview"
  | "technical-dialogue";
const alternatives: Record<VisualKey, string> = {
  nutrition:
    "Visualización conceptual de cereales, harinas y gránulos para nutrición animal",
  valorization:
    "Visualización conceptual de fibras vegetales y su transformación en gránulos",
  biotech:
    "Visualización conceptual de una plántula, raíces y perlas de hidrogel",
  nature:
    "Praderas y cultivos entre colinas en una ilustración de paisaje rural",
  poultry: "Ilustración de gallinas adultas en una pradera agrícola",
  formulation:
    "Ilustración de muestras de cereales y fibras para una evaluación de formulación",
  quality:
    "Ilustración de toma de muestras de cereales y frascos de ingredientes",
  "protein-study":
    "Ilustración de muestras de ingredientes molidos de distintas texturas",
  "crop-recovery":
    "Ilustración de hojas, tallos y corontas de maíz separados para su evaluación",
  "bioprocess-study":
    "Ilustración de extractos vegetales y biomasa en recipientes de laboratorio",
  "research-seedlings":
    "Ilustración de observación del crecimiento de cereales y sus raíces",
  "hydrogel-roots":
    "Ilustración sin escala de raíces y gránulos de hidrogel en el suelo",
  "technology-transfer":
    "Ilustración de colaboración entre investigación y actividad agrícola",
  "field-trials":
    "Ilustración de un pequeño ensayo agrícola con distintas hileras de plantas",
  "rural-company": "Ilustración de un camino rural entre cultivos y colinas",
  "circular-soil":
    "Ilustración de suelo agrícola, rastrojos y cobertura vegetal",
  "solution-overview":
    "Ilustración de materiales agrícolas y muestras para evaluación técnica",
  "technical-dialogue":
    "Ilustración de preparación de una consulta técnica con muestras de material",
};

export function ConceptImage({
  visual,
  compact = false,
}: {
  visual: VisualKey;
  compact?: boolean;
}) {
  const source =
    visual === "nature"
      ? "/assets/campo/praderas-1600.webp"
      : `/assets/solutions/${visual}-${compact ? 640 : 1200}.webp`;
  const mobile =
    visual === "nature"
      ? "/assets/campo/praderas-640.webp"
      : `/assets/solutions/${visual}-640.webp`;
  return (
    <figure className={`concept-image concept-image--${visual}`}>
      <div className="concept-image-frame">
        <picture>
          <source media="(max-width: 760px)" srcSet={mobile} />
          <Image
            src={source}
            alt={alternatives[visual]}
            width={1200}
            height={800}
            loading={compact ? "lazy" : "eager"}
          />
        </picture>
      </div>
    </figure>
  );
}
