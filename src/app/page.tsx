import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink, ContactBand } from "@/components/shared";
import { Icon } from "@/components/icon";
import { Process } from "@/components/process";
import { solutions } from "@/lib/content";
import { HeroExperience } from "@/components/ui/hero-experience";
import { HydrobacExplorer } from "@/components/ui/hydrobac-explorer";
import { InstitutionStrip } from "@/components/institution-strip";
import { LeadershipVoices } from "@/components/leadership-voices";
import { CompanyFaq } from "@/components/company-faq";
export const metadata: Metadata = { alternates: { canonical: "/" } };
export default function Home() {
  return (
    <>
      <HeroExperience>
        <div className="hero-copy">
          <h1>
            De subproducto
            <br />a <span>solución.</span>
          </h1>
          <p className="hero-description">
            Transformamos subproductos industriales en nuevas soluciones de
            valor.
          </p>
          <p className="hero-support">
            Capacidad productiva, formulación técnica y ciencia aplicada para
            conectar recursos con nuevas cadenas productivas.
          </p>
          <div className="hero-actions">
            <ButtonLink href="/contacto/">Hablemos de tu desafío</ButtonLink>
            <Link className="text-link" href="/soluciones/">
              Explorar soluciones <Icon name="arrow" />
            </Link>
          </div>
        </div>
      </HeroExperience>
      <div className="capability-rail">
        <span>Valorización industrial</span>
        <span>Nutrición animal</span>
        <span>Formulación técnica</span>
        <span>Biotecnología aplicada</span>
      </div>
      <section className="intro-section section" id="nuevo-comienzo">
        <div>
          <h2>
            Donde otros ven el final,
            <br />
            nosotros estudiamos
            <br />
            <span>un nuevo comienzo.</span>
          </h2>
          <div className="intro-bottom">
            <p>
              Una corriente secundaria puede ser el punto de partida de otra
              cadena productiva. En GAZALEZ conectamos recuperación,
              procesamiento y formulación para explorar ese potencial.
            </p>
            <Link className="text-link" href="/empresa/">
              Conoce GAZALEZ <Icon name="diagonal" />
            </Link>
          </div>
        </div>
      </section>
      <Process />
      <section className="solutions-home section">
        <div className="section-heading">
          <h2>
            Capacidades que
            <br />
            se conectan.
          </h2>
          <div>
            <p>
              Un desafío industrial.
              <br />
              Distintas formas de abordarlo.
            </p>
            <Link className="text-link" href="/soluciones/">
              Todas las soluciones <Icon name="arrow" />
            </Link>
          </div>
        </div>
        <div className="solution-list">
          {solutions.map((s, i) => (
            <Link
              href={`/soluciones/${s.slug}/`}
              key={s.slug}
              className="solution-row"
            >
              <span className="solution-name">{s.title}</span>
              <span className="solution-short">{s.short}</span>
              <span className="row-arrow">
                <Icon name="diagonal" />
              </span>
              <span className="sr-only">Ver solución {i + 1}</span>
            </Link>
          ))}
        </div>
      </section>
      <section className="innovation-home">
        <div className="innovation-visual">
          <HydrobacExplorer />
        </div>
        <div className="innovation-copy">
          <h2>
            De la investigación
            <br />a la industria.
          </h2>
          <p>
            La ciencia abre nuevas posibilidades para la materia. Nuestra
            relación con la Universidad de Concepción acerca investigación y
            aplicación.
          </p>
          <div className="innovation-feature">
            <span>HIDROBAC</span>
            <p>
              Hidrogeles y bacterias benéficas para abordar el estrés hídrico en
              plantas.
            </p>
            <span className="tag">Transferencia tecnológica</span>
          </div>
          <ButtonLink href="/innovacion/hidrobac/" secondary>
            Explorar HIDROBAC
          </ButtonLink>
        </div>
      </section>
      <section className="trace-home section">
        <div>
          <h2>
            El origen importa.
            <br />
            El recorrido también.
          </h2>
          <p>
            Conectar la recepción, el proceso y el producto terminado permite
            comprender la transformación de cada recurso.
          </p>
          <Link className="text-link" href="/calidad-trazabilidad/">
            Calidad y trazabilidad <Icon name="diagonal" />
          </Link>
        </div>
        <ol className="trace-path">
          {[
            "Origen",
            "Recepción",
            "Lote",
            "Proceso y control",
            "Producto terminado",
            "Despacho",
          ].map((t, i) => (
            <li key={t}>
              <span>{String(i + 1).padStart(2, "0")}</span>
              {t}
              <span className="trace-node" aria-hidden="true" />
              {i < 5 && (
                <span className="trace-connection" aria-hidden="true">
                  <span />
                </span>
              )}
            </li>
          ))}
        </ol>
      </section>
      <LeadershipVoices />
      <div className="section">
        <CompanyFaq compact />
      </div>
      <ContactBand />
      <InstitutionStrip />
    </>
  );
}
