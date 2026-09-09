import Link from "next/link";

export const companyQuestions = [
  [
    "¿Qué produce Gazalez Holding Group?",
    "Núcleos proteicos y soluciones nutricionales para la industria animal, con foco principal en avicultura, además de desarrollos biotecnológicos aplicados a la economía circular.",
  ],
  [
    "¿A qué tipo de clientes atienden?",
    "Atendemos a clientes industriales: plantas de alimento concentrado e integraciones avícolas B2B. No realizamos venta a público general.",
  ],
  [
    "¿Trabajan con formulaciones a medida?",
    "La formulación se adapta a las materias primas disponibles y a los objetivos productivos de cada cliente, mediante evaluación con el equipo técnico.",
  ],
  [
    "¿Cuál es la cobertura logística de despacho?",
    "La cobertura declarada comprende la zona centro y centro-sur de Chile, desde la Región de Coquimbo hasta la del Biobío. La logística, los volúmenes y los plazos de cada pedido se coordinan directamente con el equipo.",
  ],
  [
    "¿Cómo se relacionan Gazalez Holding Group y Gazalez e Hija SpA?",
    "Gazalez Holding Group es la marca paraguas del grupo corporativo. Gazalez e Hija SpA es la sociedad operativa de origen, que aporta la trayectoria industrial.",
  ],
  [
    "¿Cómo se conecta la investigación con la industria?",
    "La relación con la Universidad de Concepción acerca investigación y aplicación mediante transferencia tecnológica, como en el caso de HIDROBAC: hidrogeles y bacterias benéficas para abordar el estrés hídrico en plantas.",
  ],
] as const;

export function CompanyFaq({ compact = false }: { compact?: boolean }) {
  return (
    <section
      className="company-faq faq-section"
      aria-label="Preguntas frecuentes sobre Gazalez"
    >
      <div>
        <h2>
          Respuestas para
          <br />
          tu operación.
        </h2>
        <p>
          Productos, formulación, cobertura y nuestra estructura empresarial.
        </p>
        {compact && (
          <Link href="/preguntas-frecuentes/" className="text-link">
            Todas las preguntas frecuentes →
          </Link>
        )}
      </div>
      <div>
        {(compact ? companyQuestions.slice(0, 4) : companyQuestions).map(
          ([question, answer]) => (
            <details key={question}>
              <summary>{question}</summary>
              <p>{answer}</p>
            </details>
          ),
        )}
      </div>
    </section>
  );
}
