import type { Metadata } from "next";
import { languageAlternates } from "@/i18n/routing.mjs";
import Link from "next/link";
import { ButtonLink } from "@/components/shared";
import { Icon } from "@/components/icon";
import { solutionPaths } from "@/lib/content";
import { sourceUdec } from "@/lib/site";
import { Process } from "@/components/process";
import { HeroExperience } from "@/components/ui/hero-experience";
import { HydrobacExplorer } from "@/components/ui/hydrobac-explorer";
import { CardCurtainReveal } from "@/components/ui/card-curtain-reveal";
import { ConceptImage, type VisualKey } from "@/components/concept-image";
export const metadata: Metadata = {
  title: "GAZAL · Nutrición animal y valorización industrial",
  description:
    "Soluciones para plantas de alimento, integraciones avícolas e industrias generadoras de subproductos. Conoce GAZAL y consulta al equipo técnico.",
  alternates: { canonical: "/", languages: languageAlternates("/") },
};
export default function Home() {
  return (
    <>
      <HeroExperience>
        <div className="hero-copy">
          <h1>
            Nutrición animal y <span>valorización industrial.</span>
          </h1>
          <p className="hero-description">
            En GAZAL conectamos recuperación, procesamiento y formulación
            técnica para desarrollar soluciones para la industria, con foco en
            nutrición avícola.
          </p>
          <p className="hero-audience">
            Para plantas de alimento, integraciones avícolas e industrias
            generadoras de subproductos.
          </p>
          <div className="hero-actions">
            <ButtonLink href="/contacto/">
              Consultar al equipo técnico
            </ButtonLink>
            <Link className="text-link" href="/soluciones/">
              Ver soluciones <Icon name="arrow" />
            </Link>
          </div>
        </div>
      </HeroExperience>
      <section
        className="section solutions-home"
        id="soluciones"
        aria-labelledby="solutions-heading"
      >
        <div className="section-heading">
          <h2 id="solutions-heading">¿Qué necesitas resolver?</h2>
          <p>
            Tres caminos para encontrar la información que corresponde a tu
            operación.
          </p>
        </div>
        <div className="need-paths">
          {solutionPaths.map((path, index) => (
            <CardCurtainReveal
              key={path.title}
              title={
                <h3>
                  <Link href={path.href}>
                    {path.title}
                    <Icon name="diagonal" />
                  </Link>
                </h3>
              }
              description={<p>{path.description}</p>}
              media={
                <ConceptImage
                  visual={
                    (["nutrition", "valorization", "biotech"] as VisualKey[])[
                      index
                    ]
                  }
                  compact
                />
              }
            >
              <p className="path-audience">{path.audience}</p>
              <Link className="text-link" href={path.href}>
                {path.action}
                <Icon name="arrow" />
              </Link>
            </CardCurtainReveal>
          ))}
        </div>
        <div className="family-home-link">
          <p>Ingredientes y núcleos proteicos para nutrición animal.</p>
          <Link className="text-link" href="/soluciones/nutricion-animal/">
            Explorar familias de productos <Icon name="arrow" />
          </Link>
        </div>
      </section>
      <Process />
      <section
        className="section evidence-home"
        aria-labelledby="evidence-heading"
      >
        <div>
          <h2 id="evidence-heading">Operación y respaldo</h2>
          <p>
            Desde Coronel, Biobío, GAZAL reúne valorización industrial,
            nutrición animal y formulación técnica. Cada aplicación requiere
            revisar el material, su destino y las condiciones de uso.
          </p>
          <Link className="text-link" href="/empresa/">
            Conocer la empresa <Icon name="arrow" />
          </Link>
        </div>
        <div className="evidence-links">
          <article>
            <h3>Antecedentes para tu operación</h3>
            <p>
              Consulta la documentación pertinente al material o solución que
              necesitas evaluar.
            </p>
            <Link href="/calidad-trazabilidad/" className="text-link">
              Calidad y trazabilidad <Icon name="arrow" />
            </Link>
          </article>
          <article>
            <h3>Un vínculo documentado con la UdeC</h3>
            <p>
              La Facultad de Agronomía informó una licencia de tecnología a
              Gazalez e Hija durante 2025.
            </p>
            <a
              className="text-link"
              href={sourceUdec}
              target="_blank"
              rel="noreferrer"
            >
              Consultar publicación de Agronomía <Icon name="diagonal" />
            </a>
          </article>
        </div>
      </section>
      <section className="innovation-home" aria-labelledby="hydrobac-heading">
        <div className="innovation-visual">
          <HydrobacExplorer />
        </div>
        <div className="innovation-copy">
          <h2 id="hydrobac-heading">
            HIDROBAC: investigación frente al estrés hídrico.
          </h2>
          <p>
            Tecnología de la Universidad de Concepción que combina hidrogeles y
            bacterias benéficas para estudiar su aplicación en plantas.
          </p>
          <p>
            El vínculo confirmado es su licenciamiento a Gazalez e Hija en 2025.
            Se presenta como una línea de transferencia tecnológica; su
            disponibilidad comercial y desempeño no se dan por establecidos.
          </p>
          <ButtonLink href="/innovacion/hidrobac/" secondary>
            Ver tecnología, alcance y fuentes
          </ButtonLink>
        </div>
      </section>
      <section
        className="section consultation-home"
        aria-labelledby="consult-heading"
      >
        <div>
          <h2 id="consult-heading">Cuéntanos qué necesitas evaluar.</h2>
          <p>
            Describe tu actividad, el material o la aplicación de interés. No
            necesitas tener una ficha técnica completa para iniciar la
            conversación.
          </p>
          <ButtonLink href="/contacto/">
            Preparar una consulta técnica
          </ButtonLink>
        </div>
        <div className="consultation-notes">
          <h3>Atención a empresas</h3>
          <p>
            Trabajamos con clientes industriales. No realizamos venta a público
            general.
          </p>
          <h3>¿Tienes análisis o documentación?</h3>
          <p>
            Menciona los antecedentes disponibles. Podrás adjuntarlos al enviar
            el correo desde tu aplicación.
          </p>
          <Link href="/preguntas-frecuentes/" className="text-link">
            Más preguntas frecuentes <Icon name="arrow" />
          </Link>
        </div>
      </section>
    </>
  );
}
