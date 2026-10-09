import type { Metadata } from "next";
import { languageAlternates } from "@/i18n/routing.mjs";
import { Suspense } from "react";
import { HydrobacLab } from "@/components/ui/hydrobac-lab";
import { DotGrid } from "@/components/ui/dot-grid";
import { SolutionExplorer } from "@/components/ui/solution-explorers";
import { ProductFamilies } from "@/components/product-families";
import { QualityDocuments } from "@/components/ui/quality-documents";
import {
  CompanyCapabilities,
  ProjectsExplorer,
  SustainabilityExplorer,
  TransferExplorer,
} from "@/components/ui/company-explorers";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  solutions,
  corporatePages,
  allRoutes,
  solutionPaths,
  workingSteps,
} from "@/lib/content";
import { site, sourceUdec, sourceNews, socialImage } from "@/lib/site";
import {
  Breadcrumb,
  PageIntro,
  ButtonLink,
  ContactBand,
} from "@/components/shared";
import { Icon } from "@/components/icon";
import { EnquiryForm } from "@/components/enquiry-form";
import { LeadershipVoices } from "@/components/leadership-voices";
import { CompanyFaq } from "@/components/company-faq";
import type { VisualKey } from "@/components/concept-image";
// Each internal opening has its own artwork; homepage category images stay there.
const pageVisuals: Partial<Record<string, VisualKey>> = {
  soluciones: "solution-overview",
  "soluciones/nutricion-animal": "poultry",
  "soluciones/nucleos-proteicos": "protein-study",
  "soluciones/formulacion-tecnica": "formulation",
  "soluciones/valorizacion-industrial": "crop-recovery",
  "soluciones/bioprocesos": "bioprocess-study",
  innovacion: "research-seedlings",
  "innovacion/hidrobac": "hydrogel-roots",
  "innovacion/transferencia-tecnologica": "technology-transfer",
  "innovacion/proyectos": "field-trials",
  empresa: "rural-company",
  "calidad-trazabilidad": "quality",
  sostenibilidad: "circular-soil",
  casos: "technical-dialogue",
};
const descriptions: Record<string, string> = {
  soluciones:
    "Tres recorridos: nutrición animal, valorización industrial e innovación y biotecnología. Consulta el ámbito que corresponde a tu operación.",
  innovacion:
    "Bioprocesos, transferencia universitaria y colaboración técnica: conoce las líneas de desarrollo y los vínculos documentados de GAZAL.",
  "innovacion/hidrobac":
    "Descripción, origen UdeC, licencia, estado y fuentes de HIDROBAC. Presentación informativa, sin disponibilidad comercial confirmada.",
  casos:
    "Guía para preparar una conversación técnica sobre nutrición o valorización. Antecedentes útiles y siguiente paso.",
  actualidad:
    "Publicaciones fechadas y fuentes sobre investigación y transferencia tecnológica de la Universidad de Concepción.",
  contacto:
    "Prepara una consulta para contacto@empresagazalez.cl. Revisa el resumen y completa el envío desde tu aplicación de correo.",
  privacidad:
    "Cómo se prepara una consulta en tu navegador, qué información se conserva y cómo completar el envío desde tu correo.",
  terminos:
    "Alcance informativo de los contenidos, consultas técnicas e imágenes de GAZAL. Identidad societaria y condiciones de uso.",
  "preguntas-frecuentes":
    "Clientes industriales, nutrición avícola, formulación, cobertura y consulta técnica: respuestas sobre GAZAL.",
};
const titles: Record<string, string> = {
  soluciones: "Soluciones industriales",
  innovacion: "Innovación y transferencia tecnológica",
  "innovacion/hidrobac": "HIDROBAC: transferencia tecnológica UdeC",
  casos: "Cómo trabajamos",
  actualidad: "Actualidad",
  contacto: "Consulta técnica",
  privacidad: "Privacidad",
  terminos: "Términos de uso",
  "preguntas-frecuentes": "Preguntas frecuentes",
};
export const dynamicParams = false;
export function generateStaticParams() {
  return allRoutes
    .filter((r) => r !== "/")
    .map((r) => ({ slug: r.split("/").filter(Boolean) }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const key = slug.join("/");
  const s = solutions.find((s) => key === `soluciones/${s.slug}`);
  const c = corporatePages[key as keyof typeof corporatePages];
  const title = s?.title || c?.title || titles[key] || "GAZAL";
  const description =
    s?.description ||
    c?.description ||
    descriptions[key] ||
    "GAZAL: nutrición animal y valorización industrial desde Coronel, Biobío.";
  return {
    title,
    description,
    alternates: { canonical: `/${key}/`, languages: languageAlternates(`/${key}/`) },
    openGraph: {
      url: `/${key}/`,
      title,
      description,
      siteName: site.name,
      type: "website",
      locale: "es_CL",
      images: [socialImage],
    },
  };
}
export default async function ContentPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const key = slug.join("/");
  const solution = solutions.find((s) => key === `soluciones/${s.slug}`);
  const corporate = corporatePages[key as keyof typeof corporatePages];
  const pageVisual = pageVisuals[key];
  const quietBackground = [
    "preguntas-frecuentes",
    "actualidad",
    "contacto",
    "privacidad",
    "terminos",
  ].includes(key);
  const label =
    solution?.title ||
    (
      {
        empresa: "Empresa",
        "calidad-trazabilidad": "Calidad y trazabilidad",
        sostenibilidad: "Sostenibilidad",
        "innovacion/transferencia-tecnologica": "Transferencia tecnológica",
        "innovacion/proyectos": "Proyectos y colaboración",
      } as Record<string, string>
    )[key] ||
    titles[key] ||
    corporate?.title ||
    "";
  const parent =
    slug.length > 1
      ? {
          label: slug[0] === "soluciones" ? "Soluciones" : "Innovación",
          href: `/${slug[0]}/`,
        }
      : null;
  const nutritionParent = [
    "soluciones/nucleos-proteicos",
    "soluciones/formulacion-tecnica",
  ].includes(key)
    ? [{ label: "Nutrición animal", href: "/soluciones/nutricion-animal/" }]
    : [];
  const crumbs = [...(parent ? [parent] : []), ...nutritionParent, { label }];
  return (
    <>
      <div
        className={`page-wrap${quietBackground ? " page-wrap--quiet-dots" : ""}`}
      >
        {quietBackground && <DotGrid surface="light" />}
        <Breadcrumb items={crumbs} />
        {key === "preguntas-frecuentes" && (
          <>
            <PageIntro
              visual={pageVisual}
              title="Preguntas frecuentes"
              description="Lo que necesitas saber antes de iniciar una conversación con nuestro equipo."
            />
            <CompanyFaq />
          </>
        )}
        {solution ? (
          <>
            <PageIntro
              visual={
                solution.slug === "nutricion-animal" ? undefined : pageVisual
              }
              title={solution.title}
              description={solution.description}
            >
              <ButtonLink href={`/contacto/?interes=${solution.intent}`}>
                {solution.cta}
              </ButtonLink>
            </PageIntro>
            <div className="solution-audience">
              <span>Orientado a</span>
              <p>{solution.audience}</p>
            </div>
            <SolutionExplorer solution={solution} />
            <p className="evaluation-note">
              La primera consulta no exige una ficha completa. La viabilidad,
              las especificaciones, la disponibilidad y las condiciones
              requieren evaluación del equipo; no se confirman automáticamente
              al escribirnos.
            </p>
            <section className="faq-section">
              <h2>Antes de comenzar.</h2>
              <div>
                {solution.questions.map(([q, a]) => (
                  <details key={q}>
                    <summary>
                      {q}
                      <Icon name="plus" />
                    </summary>
                    <p>{a}</p>
                  </details>
                ))}
              </div>
            </section>
            <div className="related related-solutions">
              <h2>Continúa según tu necesidad</h2>
              <Link href="/soluciones/">
                Ver los tres caminos de soluciones <Icon name="arrow" />
              </Link>
              {solution.slug === "valorizacion-industrial" && (
                <Link href="/calidad-trazabilidad/">
                  <span>
                    <strong>Calidad y trazabilidad</strong>
                    <span className="related-description">
                      Conoce qué antecedentes y documentación conviene revisar
                      para evaluar un material.
                    </span>
                  </span>
                  <Icon name="diagonal" />
                </Link>
              )}
              {solution.slug === "bioprocesos" && (
                <Link href="/innovacion/">
                  <span>
                    <strong>Innovación y biotecnología</strong>
                    <span className="related-description">
                      Explora las líneas de desarrollo y los vínculos
                      tecnológicos documentados.
                    </span>
                  </span>
                  <Icon name="diagonal" />
                </Link>
              )}
              {solutions
                .filter(
                  (s) =>
                    s.slug !== solution.slug &&
                    solutionPaths
                      .find((path) => path.slugs.includes(solution.slug))
                      ?.slugs.includes(s.slug),
                )
                .map((s) => (
                  <Link href={`/soluciones/${s.slug}/`} key={s.slug}>
                    <span>
                      <strong>{s.title}</strong>
                      <span className="related-description">
                        {s.description}
                      </span>
                    </span>
                    <Icon name="diagonal" />
                  </Link>
                ))}
            </div>
          </>
        ) : null}
        {key === "soluciones" && (
          <>
            <PageIntro
              visual={pageVisual}
              title="Soluciones según tu necesidad."
              description="Nutrición y formulación, evaluación de subproductos o colaboración tecnológica. Elige el ámbito de tu consulta; las condiciones se revisan para cada caso."
            />
            <div className="path-directory">
              {solutionPaths.map((path) => (
                <section key={path.title}>
                  <div>
                    <h2>
                      <Link href={path.href}>{path.title}</Link>
                    </h2>
                    <p>{path.description}</p>
                    <p>{path.audience}</p>
                  </div>
                  <div>
                    {solutions
                      .filter((s) => path.slugs.includes(s.slug))
                      .map((s) => (
                        <Link
                          className="directory-link"
                          href={`/soluciones/${s.slug}/`}
                          key={s.slug}
                        >
                          <span>
                            <strong>{s.title}</strong>
                            <span>{s.short}</span>
                          </span>
                          <Icon name="diagonal" />
                        </Link>
                      ))}
                    {path.href === "/innovacion/" && (
                      <>
                        <Link
                          className="directory-link"
                          href="/innovacion/hidrobac/"
                        >
                          HIDROBAC: tecnología licenciada{" "}
                          <Icon name="diagonal" />
                        </Link>
                        <Link className="text-link" href="/innovacion/">
                          Panorama de innovación <Icon name="arrow" />
                        </Link>
                      </>
                    )}
                  </div>
                </section>
              ))}
            </div>
            <ProductFamilies />
          </>
        )}
        {corporate && (
          <>
            <PageIntro
              visual={key === "innovacion/proyectos" ? undefined : pageVisual}
              title={corporate.title}
              description={corporate.description}
            />
            {key === "empresa" && <LeadershipVoices />}
            {key === "calidad-trazabilidad" && <QualityDocuments />}
            {key === "calidad-trazabilidad" && (
              <ol
                className="trace-path quality-trace"
                aria-label="Recorrido de trazabilidad"
              >
                {[
                  "Origen",
                  "Recepción",
                  "Lote",
                  "Proceso",
                  "Control",
                  "Producto",
                  "Despacho",
                ].map((t, index) => (
                  <li key={t}>
                    <span className="trace-node" aria-hidden="true" />
                    <span>{t}</span>
                    {index < 6 && (
                      <span className="trace-connection" aria-hidden="true">
                        <span />
                      </span>
                    )}
                  </li>
                ))}
              </ol>
            )}
            {key === "empresa" ? (
              <CompanyCapabilities />
            ) : key === "sostenibilidad" ? (
              <SustainabilityExplorer />
            ) : key === "innovacion/transferencia-tecnologica" ? (
              <TransferExplorer />
            ) : key === "innovacion/proyectos" ? (
              <ProjectsExplorer />
            ) : (
              <div className="editorial-sections">
                {corporate.sections.map(([h, p]) => (
                  <section key={h}>
                    <h2>{h}</h2>
                    <p>{p}</p>
                  </section>
                ))}
              </div>
            )}
            {key === "empresa" && (
              <div className="legal-identity">
                <span>Identidad societaria</span>
                <strong>{site.legalName}</strong>
                <span>
                  RUT {site.rut} · {site.location}
                </span>
              </div>
            )}
          </>
        )}
        {key === "innovacion" && (
          <>
            <PageIntro
              visual={pageVisual}
              title="Innovación y biotecnología."
              description="Líneas de desarrollo y colaboración que conectan biomasa, conocimiento universitario y necesidades productivas. Cada iniciativa tiene un alcance y un estado propios."
            />
            <div className="editorial-sections">
              <section>
                <h2>Bioprocesos</h2>
                <div>
                  <p>
                    Exploramos oportunidades de valorización de biomasa a partir
                    de sus propiedades y de la aplicación buscada. Es una línea
                    de desarrollo: su viabilidad y escalamiento se evalúan caso
                    a caso.
                  </p>
                  <Link className="text-link" href="/soluciones/bioprocesos/">
                    Plantear un desafío de biomasa <Icon name="arrow" />
                  </Link>
                </div>
              </section>
              <section>
                <h2>Transferencia universitaria</h2>
                <div>
                  <p>
                    HIDROBAC es la tecnología de hidrogeles y bacterias
                    benéficas desarrollada en la UdeC y licenciada a Gazalez e
                    Hija durante 2025. La ficha específica reúne su descripción,
                    vínculo y límites de aplicación.
                  </p>
                  <Link className="text-link" href="/innovacion/hidrobac/">
                    Consultar HIDROBAC y sus fuentes <Icon name="arrow" />
                  </Link>
                </div>
              </section>
              <section>
                <h2>Colaboración técnica</h2>
                <div>
                  <p>
                    Empresas y equipos de investigación pueden proponer un
                    desafío en biomasa, nutrición o aplicaciones agrícolas.
                    Indica el objetivo, la etapa del trabajo y los antecedentes
                    disponibles para conversar sobre su alcance.
                  </p>
                  <ButtonLink href="/contacto/?interes=colaboracion">
                    Consultar una colaboración
                  </ButtonLink>
                </div>
              </section>
            </div>
            <div className="related">
              <h2>Más información</h2>
              <Link href="/innovacion/transferencia-tecnologica/">
                Cómo se relacionan licencia y aplicación <Icon name="arrow" />
              </Link>
              <Link href="/innovacion/proyectos/">
                Proyectos y colaboración <Icon name="arrow" />
              </Link>
              <Link href="/actualidad/">
                Publicaciones de contexto <Icon name="arrow" />
              </Link>
            </div>
          </>
        )}
        {key === "innovacion/hidrobac" && (
          <>
            <PageIntro
              visual={pageVisual}
              title="HIDROBAC. Ciencia frente al estrés hídrico."
              description="Tecnología desarrollada en la Universidad de Concepción, basada en hidrogeles y bacterias benéficas, orientada a mitigar el estrés hídrico en plantas."
            />
            <HydrobacLab />
            <section className="hydrobac-feature">
              <div className="hydrobac-title">
                <h2>
                  Hidrogeles.
                  <br />
                  Microorganismos.
                  <br />
                  <span>Nuevas posibilidades.</span>
                </h2>
                <span className="tag">Tecnología licenciada</span>
                <p>
                  La Facultad de Agronomía UdeC informó que la tecnología fue
                  licenciada a Gazalez e Hija durante 2025.
                </p>
                <a
                  className="text-link"
                  href={sourceUdec}
                  target="_blank"
                  rel="noreferrer"
                >
                  Consultar la fuente UdeC <Icon name="diagonal" />
                </a>
              </div>
              <div className="hydrobac-mechanism">
                <h3>
                  Dos componentes,
                  <br />
                  un propósito de investigación.
                </h3>
                <dl>
                  <div>
                    <dt>Matriz de hidrogel</dt>
                    <dd>
                      Biopolímeros estudiados por su capacidad para retener
                      agua.
                    </dd>
                  </div>
                  <div>
                    <dt>Bacterias benéficas</dt>
                    <dd>
                      Microorganismos incorporados a la matriz para explorar su
                      aplicación en plantas.
                    </dd>
                  </div>
                  <div>
                    <dt>Estrés hídrico</dt>
                    <dd>
                      El desafío agrícola al que se orienta esta tecnología.
                    </dd>
                  </div>
                </dl>
                <span className="form-help">
                  Descripción conceptual. Los resultados dependen de la
                  validación y las condiciones de aplicación.
                </span>
              </div>
            </section>
            <section className="editorial-sections">
              <section>
                <h2>El rol de GAZAL</h2>
                <p>
                  Participar en la transferencia hacia la industria de una
                  tecnología nacida en la Universidad de Concepción. Su origen
                  científico y la relación de licenciamiento son la base de esta
                  línea de innovación.
                </p>
              </section>
              <section>
                <h2>Estado y alcance</h2>
                <p>
                  La licencia es el hito público confirmado. Esta presentación
                  es informativa: no constituye una oferta de venta, una
                  afirmación de exclusividad ni una certificación de desempeño.
                </p>
              </section>
            </section>
            <ButtonLink href="/contacto/?interes=colaboracion">
              Consultar sobre HIDROBAC
            </ButtonLink>
            <div className="related">
              <h2>Explora la innovación</h2>
              <Link href="/innovacion/transferencia-tecnologica/">
                Transferencia tecnológica <Icon name="diagonal" />
              </Link>
              <Link href="/innovacion/proyectos/">
                Proyectos y colaboración
                <Icon name="diagonal" />
              </Link>
            </div>
          </>
        )}
        {key === "casos" && (
          <>
            <PageIntro
              visual={pageVisual}
              title="Cómo preparar una primera conversación."
              description="Esta guía explica cómo iniciar una consulta. No es una galería de casos ni presenta resultados de clientes."
            />
            <section className="case-framework">
              <h2>De la necesidad al siguiente paso</h2>
              <ol>
                {workingSteps.map(([title, body]) => (
                  <li key={title}>
                    <h3>{title}</h3>
                    <p>{body}</p>
                  </li>
                ))}
              </ol>
              <p>
                Para un subproducto, describe origen, ubicación, volumen y
                frecuencia. Para nutrición, indica especie, etapa y objetivo.
                Comparte los análisis disponibles después, si son pertinentes;
                no es necesario completar un expediente antes de contactarnos.
              </p>
              <ButtonLink href="/contacto/">Preparar una consulta</ButtonLink>
            </section>
          </>
        )}
        {key === "actualidad" && (
          <>
            <PageIntro
              visual={pageVisual}
              title="Conocimiento que avanza."
              description="Publicaciones y antecedentes públicos sobre investigación, transferencia tecnológica y la relación entre ciencia e industria."
            />
            <div className="news-list">
              <article>
                <time dateTime="2026-01">Enero 2026</time>
                <div>
                  <h2>
                    Agronomía UdeC destaca la tecnología licenciada a Gazalez
                  </h2>
                  <p>
                    La facultad reconoce al académico Mauricio Schoebitz por la
                    tecnología de hidrogeles y bacterias orientada al estrés
                    hídrico en plantas.
                  </p>
                  <a
                    className="text-link"
                    href={sourceUdec}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Leer publicación de la facultad <Icon name="diagonal" />
                  </a>
                </div>
              </article>
              <article>
                <time dateTime="2026-01-28">28 enero 2026</time>
                <div>
                  <h2>
                    Ciencia con Impacto: el encuentro entre investigación y
                    aplicación
                  </h2>
                  <p>
                    La Universidad de Concepción presenta su novena edición de
                    reconocimientos a la transferencia tecnológica y la
                    innovación.
                  </p>
                  <a
                    className="text-link"
                    href={sourceNews}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Leer en Noticias UdeC <Icon name="diagonal" />
                  </a>
                </div>
              </article>
            </div>
          </>
        )}
        {key === "contacto" && (
          <>
            <PageIntro
              visual={pageVisual}
              title="Consulta al equipo técnico."
              description="Describe tu necesidad y prepara un correo para el equipo de GAZAL. El sitio no envía mensajes automáticamente: completa el envío en tu aplicación de correo."
            />
            <div className="contact-meta">
              <p>{site.location}</p>
              <a href={`mailto:${site.email}`}>
                {site.email}
                <Icon name="diagonal" />
              </a>
            </div>
            <Suspense
              fallback={
                <p className="enquiry-loading">
                  Cargando preparador de correo…
                </p>
              }
            >
              <EnquiryForm />
            </Suspense>
            <noscript>
              <p>
                Para consultar sin JavaScript, escribe directamente a{" "}
                <a href={`mailto:${site.email}`}>{site.email}</a>. Incluye tu
                nombre, empresa y la necesidad que quieres evaluar.
              </p>
            </noscript>
          </>
        )}
        {(key === "privacidad" || key === "terminos") && (
          <>
            <PageIntro
              visual={pageVisual}
              title={
                key === "privacidad"
                  ? "Tu información, con claridad."
                  : "Información y condiciones de uso."
              }
              description={
                key === "privacidad"
                  ? "Cómo funciona la preparación de consultas en este sitio."
                  : "Alcance de los contenidos y las consultas técnicas a Gazalez e Hija SpA."
              }
            />
            <div className="legal-copy">
              {key === "privacidad" ? (
                <>
                  <h2>Consultas preparadas en tu dispositivo</h2>
                  <p>
                    Los datos introducidos en el formulario se utilizan en el
                    navegador para preparar un resumen. El sitio no guarda ese
                    resumen en una base de datos ni lo envía automáticamente.
                    Puedes copiarlo, descargarlo o abrirlo en tu aplicación de
                    correo. No se guardan borradores con datos personales al
                    recargar.
                  </p>
                  <h2>Documentos adjuntos</h2>
                  <p>
                    Este sitio no selecciona, carga ni envía documentos. Para
                    compartir una ficha o análisis, adjúntalo al mensaje en tu
                    aplicación de correo.
                  </p>
                  <h2>Envío por correo</h2>
                  <p>
                    Cuando decides enviar el mensaje desde tu correo, compartes
                    sus datos y adjuntos con Gazalez e Hija SpA para atender tu
                    requerimiento. Puedes consultar sobre el tratamiento de tu
                    información escribiendo a {site.email}.
                  </p>
                  <h2>Navegación</h2>
                  <p>
                    Se guarda únicamente una marca de sesión para no repetir la
                    bienvenida, sin datos del formulario. Esta versión no
                    incorpora herramientas de analítica ni cookies
                    publicitarias. Los proveedores de alojamiento y correo
                    pueden procesar los datos técnicos necesarios para prestar
                    sus servicios.
                  </p>
                </>
              ) : (
                <>
                  <h2>Contenido técnico e informativo</h2>
                  <p>
                    El sitio presenta las capacidades y líneas de desarrollo de
                    GAZAL. La viabilidad, las especificaciones, disponibilidad,
                    plazos y condiciones de cada solución se acuerdan
                    directamente con el equipo.
                  </p>
                  <h2>Consultas</h2>
                  <p>
                    Preparar o enviar una consulta no constituye una orden de
                    compra ni una aceptación de un material. Toda aplicación
                    requiere revisión técnica.
                  </p>
                  <h2>Investigación y transferencia</h2>
                  <p>
                    HIDROBAC se presenta como tecnología desarrollada en la
                    Universidad de Concepción y licenciada a Gazalez e Hija. No
                    se ofrece como producto disponible para compra a través de
                    este sitio.
                  </p>
                  <h2>Imágenes y propiedad</h2>
                  <p>
                    Las visualizaciones conceptuales se identifican expresamente
                    y no representan instalaciones, productos comerciales ni
                    resultados de ensayo. Las marcas y publicaciones de terceros
                    pertenecen a sus respectivos titulares.
                  </p>
                </>
              )}
              <h2>Responsable del sitio</h2>
              <p>
                {site.legalName} · RUT {site.rut}
                <br />
                {site.location}
                <br />
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </p>
            </div>
          </>
        )}
        {!solution && !corporate && !titles[key] && notFound()}
      </div>
      {!["contacto", "privacidad", "terminos"].includes(key) && (
        <ContactBand
          intent={
            solution?.intent ||
            (key.startsWith("innovacion") ? "colaboracion" : undefined)
          }
          title={
            solution?.intent === "formulacion"
              ? "Cuéntanos tu necesidad nutricional."
              : solution?.intent === "subproducto"
                ? "Conversemos sobre tu subproducto."
                : solution?.intent === "colaboracion" ||
                    key.startsWith("innovacion")
                  ? "Exploremos tu desafío de aplicación."
                  : undefined
          }
          description={
            solution
              ? solution.input
              : key.startsWith("innovacion")
                ? "Comparte la aplicación que te interesa y los antecedentes disponibles para orientar una conversación técnica."
                : undefined
          }
        />
      )}
    </>
  );
}
