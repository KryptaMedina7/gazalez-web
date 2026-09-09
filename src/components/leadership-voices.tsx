import { Quote } from "lucide-react";

export function LeadershipVoices() {
  return (
    <section className="leadership-section" aria-labelledby="leadership-title">
      <h2 id="leadership-title">
        Nuestra visión y compromiso
        <br />
        con la industria.
      </h2>
      <div className="leadership-grid">
        <figure>
          <Quote aria-hidden="true" size={32} strokeWidth={1.5} />
          <blockquote>
            En Gazalez transformamos la investigación científica y la economía
            circular en soluciones de alto valor real. Nos enfoca desarrollar
            formulaciones donde la trazabilidad, la biotecnología y la calidad
            constante estén siempre garantizadas en cada entrega.
          </blockquote>
          <figcaption>
            <span className="leadership-initial" aria-hidden="true">
              NG
            </span>
            <span>
              <strong>Nassira Gazalez</strong>
              <span>Cofundadora y directora</span>
            </span>
          </figcaption>
        </figure>
        <figure>
          <Quote aria-hidden="true" size={32} strokeWidth={1.5} />
          <blockquote>
            Más de una década de trayectoria en la industria avícola nos
            respalda. Entendemos las exigencias del sector industrial B2B, por
            lo que acompañamos a nuestros clientes con un soporte técnico
            especializado y soluciones a la medida.
          </blockquote>
          <figcaption>
            <span className="leadership-initial" aria-hidden="true">
              KG
            </span>
            <span>
              <strong>Karim Gazalez</strong>
              <span>Cofundador y director</span>
            </span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
