import type { Metadata } from "next";
import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { solutions, corporatePages, allRoutes } from "@/lib/content";
import { site, sourceUdec, sourceNews } from "@/lib/site";
import {
  Breadcrumb,
  PageIntro,
  ButtonLink,
  ContactBand,
} from "@/components/shared";
import { Icon } from "@/components/icon";
import { EnquiryForm } from "@/components/enquiry-form";
import { Process } from "@/components/process";
import { LeadershipVoices } from "@/components/leadership-voices";
import { CompanyFaq } from "@/components/company-faq";
const titles: Record<string, string> = {
  soluciones: "Soluciones industriales",
  innovacion: "Innovación y transferencia tecnológica",
  "innovacion/hidrobac": "HIDROBAC: transferencia tecnológica UdeC",
  casos: "Aplicaciones industriales",
  actualidad: "Actualidad",
  contacto: "Hablemos de tu desafío",
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
  return {
    title: s?.title || c?.title || titles[key] || "GAZALEZ",
    description:
      s?.description ||
      c?.description ||
      `${titles[key] || "GAZALEZ"}. Valorización industrial, nutrición animal y conocimiento aplicado desde Coronel, Biobío.`,
    alternates: { canonical: `/${key}/` },
    openGraph: { url: `/${key}/` },
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
  const label =
    solution?.title ||
    (
      {
        empresa: "Empresa",
        "calidad-trazabilidad": "Calidad y trazabilidad",
        sostenibilidad: "Sostenibilidad",
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
  const crumbs = [...(parent ? [parent] : []), { label }];
  return (
    <>
      <div className="page-wrap">
        <Breadcrumb items={crumbs} />
        {key === "preguntas-frecuentes" && <><PageIntro title="Preguntas frecuentes" description="Lo que necesitas saber antes de iniciar una conversación con nuestro equipo." /><CompanyFaq /></>}
        {solution ? (
          <>
            <PageIntro
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
            <section className="solution-detail">
              <div className="detail-lead">
                <h2>
                  La aplicación define
                  <br />
                  el camino.
                </h2>
                <p>{solution.need}</p>
              </div>
              <dl className="technical-list">
                {[
                  ["Punto de partida", solution.input],
                  ["Cómo lo abordamos", solution.process],
                  ["Qué se define", solution.result],
                ].map(([t, b], i) => (
                  <div key={t}>
                    <dt>
                      <span>0{i + 1}</span>
                      {t}
                    </dt>
                    <dd>{b}</dd>
                  </div>
                ))}
              </dl>
            </section>
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
            <div className="related">
              <h2>Capacidades relacionadas</h2>
              {solutions
                .filter((s) => s.slug !== solution.slug)
                .slice(0, 2)
                .map((s) => (
                  <Link href={`/soluciones/${s.slug}/`} key={s.slug}>
                    {s.title}
                    <Icon name="diagonal" />
                  </Link>
                ))}
            </div>
          </>
        ) : null}
        {key === "soluciones" && (
          <>
            <PageIntro
              title="Un recurso. Nuevas posibilidades."
              description="Conectamos capacidades para abordar desafíos de valorización, nutrición y desarrollo técnico. El punto de partida es entender tu operación."
            />
            <div className="solutions-directory">
              {solutions.map((s) => (
                <article key={s.slug}>
                  <div>
                    <h2>
                      <Link href={`/soluciones/${s.slug}/`}>
                        {s.title}
                        <Icon name="diagonal" />
                      </Link>
                    </h2>
                    <p>{s.description}</p>
                    <span className="audience-text">{s.audience}</span>
                  </div>
                  <Link
                    className="text-link"
                    href={`/contacto/?interes=${s.intent}`}
                  >
                    {s.cta}
                    <Icon name="arrow" />
                  </Link>
                </article>
              ))}
            </div>
          </>
        )}
        {corporate && (
          <>
            <PageIntro
              title={corporate.title}
              description={corporate.description}
            />
            {key === "empresa" && (
              <figure className="corporate-material">
                <Image
                  src="/assets/materia.webp"
                  alt="Representación conceptual del paso de materia granular a una forma continua"
                  width={1400}
                  height={933}
                />
                <figcaption>
                  Transformación de la materia · Visualización conceptual
                </figcaption>
              </figure>
            )}
            {key === "calidad-trazabilidad" && (
              <ol className="horizontal-trace">
                {[
                  "Origen",
                  "Recepción",
                  "Lote",
                  "Proceso",
                  "Control",
                  "Producto",
                  "Despacho",
                ].map((t) => (
                  <li key={t}>
                    {t}
                    <Icon name="arrow" />
                  </li>
                ))}
              </ol>
            )}
            <div className="editorial-sections">
              {corporate.sections.map(([h, p]) => (
                <section key={h}>
                  <h2>{h}</h2>
                  <p>{p}</p>
                </section>
              ))}
            </div>
            {key.startsWith("innovacion/") && (
              <div className="source-callout">
                <Link href="/innovacion/hidrobac/">
                  Conoce la tecnología HIDROBAC <Icon name="diagonal" />
                </Link>
                <a href={sourceUdec} target="_blank" rel="noreferrer">
                  Ver publicación de Agronomía UdeC <Icon name="diagonal" />
                </a>
              </div>
            )}
            {key === "empresa" && (
              <LeadershipVoices />
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
        {(key === "innovacion" || key === "innovacion/hidrobac") && (
          <>
            <PageIntro
              title={
                key === "innovacion"
                  ? "La ciencia encuentra una nueva aplicación."
                  : "HIDROBAC. Ciencia frente al estrés hídrico."
              }
              description={
                key === "innovacion"
                  ? "Acercamos investigación y desafíos productivos mediante transferencia tecnológica. Una relación que abre nuevas posibilidades para la industria y la agricultura."
                  : "Tecnología desarrollada en la Universidad de Concepción, basada en hidrogeles y bacterias benéficas, orientada a mitigar el estrés hídrico en plantas."
              }
            />
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
                <h2>El rol de GAZALEZ</h2>
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
            <div className="related">
              <h2>Explora la innovación</h2>
              <Link
                href={
                  key === "innovacion"
                    ? "/innovacion/hidrobac/"
                    : "/innovacion/transferencia-tecnologica/"
                }
              >
                {key === "innovacion"
                  ? "Conocer HIDROBAC"
                  : "Transferencia tecnológica"}
                <Icon name="diagonal" />
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
              title="Cada aplicación empieza con un desafío."
              description="Conoce cómo estructuramos una conversación de valorización: desde el material de origen hasta los criterios para evaluar una nueva aplicación."
            />
            <section className="case-framework">
              <h2>Un recorrido de trabajo</h2>
              <ol>
                {[
                  ["Desafío", "Qué se genera y qué necesitas resolver."],
                  [
                    "Evaluación",
                    "Qué información permite conocer el material.",
                  ],
                  ["Solución", "Qué alternativa merece ser estudiada."],
                  ["Implementación", "Qué alcance y condiciones se acuerdan."],
                  [
                    "Resultado",
                    "Qué criterios permitirán evaluar el proyecto.",
                  ],
                ].map(([t, b]) => (
                  <li key={t}>
                    <h3>{t}</h3>
                    <p>{b}</p>
                  </li>
                ))}
              </ol>
              <p className="editorial-note">
                Los casos documentados se incorporarán cuando cuenten con
                información verificable y autorización de publicación.
              </p>
              <ButtonLink href="/contacto/?interes=subproducto">
                Conversemos sobre tu caso
              </ButtonLink>
            </section>
          </>
        )}
        {key === "actualidad" && (
          <>
            <PageIntro
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
              title="Hablemos de tu desafío."
              description="Un subproducto por evaluar. Una formulación por desarrollar. Una colaboración por comenzar. Cuéntanos qué necesitas resolver."
            />
            <div className="contact-meta">
              <p>{site.location}</p>
              <a href={`mailto:${site.email}`}>
                {site.email}
                <Icon name="diagonal" />
              </a>
            </div>
            <Suspense fallback={<p>Cargando formulario…</p>}>
              <EnquiryForm />
            </Suspense>
          </>
        )}
        {(key === "privacidad" || key === "terminos") && (
          <>
            <PageIntro
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
                    Puedes descargarlo o abrirlo en tu aplicación de correo.
                  </p>
                  <h2>Documentos adjuntos</h2>
                  <p>
                    El selector identifica el nombre de un documento. Su
                    contenido no se carga al sitio. Para compartirlo, debes
                    adjuntarlo manualmente al mensaje que envíes.
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
                    Esta versión no incorpora herramientas de analítica ni
                    cookies publicitarias. Los proveedores de alojamiento y
                    correo pueden procesar los datos técnicos necesarios para
                    prestar sus servicios.
                  </p>
                </>
              ) : (
                <>
                  <h2>Contenido técnico e informativo</h2>
                  <p>
                    El sitio presenta las capacidades y líneas de desarrollo de
                    GAZALEZ. La viabilidad, las especificaciones, disponibilidad,
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
                    Universidad de Concepción y licenciada a Gazalez. No se
                    ofrece como producto disponible para compra a través de este
                    sitio.
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
      {key === "sostenibilidad" && <Process />}
      {!["contacto", "privacidad", "terminos"].includes(key) && <ContactBand />}
    </>
  );
}
