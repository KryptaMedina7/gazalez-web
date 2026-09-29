import Image from "next/image";

export type VisualKey = "nutrition" | "valorization" | "biotech" | "nature";
const alternatives: Record<VisualKey, string> = {
  nutrition:
    "Visualización conceptual de cereales, harinas y gránulos para nutrición animal",
  valorization:
    "Visualización conceptual de fibras vegetales y su transformación en gránulos",
  biotech:
    "Visualización conceptual de una plántula, raíces y perlas de hidrogel",
  nature:
    "Paisaje de bosque conceptual que representa la identidad natural de GAZAL",
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
      ? "/assets/forest/forest-desktop.webp"
      : `/assets/solutions/${visual}-${compact ? 640 : 1200}.webp`;
  const mobile =
    visual === "nature"
      ? "/assets/forest/forest-mobile.webp"
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
      <figcaption>Visualización conceptual</figcaption>
    </figure>
  );
}
