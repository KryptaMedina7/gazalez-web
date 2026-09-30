export const solutionPaths = [
  {
    title: "Nutrición animal",
    href: "/soluciones/nutricion-animal/",
    description:
      "Ingredientes, núcleos proteicos avícolas y formulación según el requerimiento nutricional.",
    audience:
      "Para plantas de alimento, integraciones avícolas y formuladores.",
    action: "Explorar nutrición animal",
    slugs: ["nutricion-animal", "nucleos-proteicos", "formulacion-tecnica"],
  },
  {
    title: "Valorización industrial",
    href: "/soluciones/valorizacion-industrial/",
    description:
      "Evaluación de subproductos y alternativas de recuperación y aprovechamiento.",
    audience: "Para industrias generadoras de subproductos y agroindustria.",
    action: "Evaluar una oportunidad de valorización",
    slugs: ["valorizacion-industrial"],
  },
  {
    title: "Innovación y biotecnología",
    href: "/innovacion/",
    description:
      "Bioprocesos, colaboración tecnológica e HIDROBAC: líneas de desarrollo con alcances propios.",
    audience:
      "Para empresas y equipos de investigación con un desafío de aplicación.",
    action: "Conocer las líneas de innovación",
    slugs: ["bioprocesos"],
  },
];
export const workingSteps = [
  [
    "Comprender la necesidad",
    "Cuéntanos tu actividad, el material o la aplicación de interés y qué necesitas resolver.",
  ],
  [
    "Evaluar antecedentes y alternativas",
    "Revisamos la información disponible para orientar la conversación técnica y precisar qué antecedentes adicionales se necesitan.",
  ],
  [
    "Definir el siguiente paso",
    "El alcance, las condiciones y la alternativa que merece evaluación se acuerdan según el requerimiento.",
  ],
] as const;
export type Solution = {
  slug: string;
  title: string;
  short: string;
  description: string;
  audience: string;
  need: string;
  input: string;
  process: string;
  result: string;
  questions: [string, string][];
  cta: string;
  intent: string;
};
export const solutions: Solution[] = [
  {
    slug: "nutricion-animal",
    title: "Nutrición animal",
    short: "Ingredientes que se integran a tu operación.",
    description:
      "Conectamos la valorización de materias primas con las necesidades de la alimentación animal, para evaluar soluciones acordes a cada operación productiva.",
    audience: "Plantas de alimento, productores y formuladores.",
    need: "La elección de un ingrediente comienza por su composición, su origen y su compatibilidad con la dieta.",
    input:
      "Aplicación, especie, etapa productiva y materias primas disponibles. Si tienes análisis o antecedentes de la dieta, puedes incorporarlos a la consulta.",
    process:
      "Revisión de antecedentes, definición del objetivo nutricional y evaluación de alternativas junto al cliente.",
    result:
      "Una propuesta técnica cuyo alcance, especificaciones y condiciones de suministro se acuerdan para cada requerimiento.",
    questions: [
      [
        "¿Para qué especies trabajan?",
        "El foco declarado incluye nutrición avícola. Para otras especies, consulta la pertinencia de tu requerimiento con el equipo.",
      ],
      [
        "¿Cómo solicito una ficha técnica?",
        "Indica el ingrediente o la aplicación que necesitas. La documentación aplicable se revisa con el equipo técnico.",
      ],
    ],
    cta: "Consultar una solución nutricional",
    intent: "formulacion",
  },
  {
    slug: "nucleos-proteicos",
    title: "Núcleos proteicos avícolas",
    short: "Un punto de partida técnico para la nutrición avícola.",
    description:
      "Soluciones proteicas orientadas a la alimentación avícola, con una conversación técnica que parte de la especie, la etapa productiva y el objetivo de la formulación.",
    audience: "Integraciones avícolas, plantas de alimento y formuladores.",
    need: "El aporte proteico debe evaluarse dentro de la dieta completa y de las condiciones de cada sistema productivo.",
    input:
      "Requerimiento nutricional, materias primas disponibles y antecedentes de la dieta.",
    process:
      "Revisión de composición y objetivos para definir la solución y la documentación técnica pertinente.",
    result:
      "Especificaciones y propuesta de suministro a consultar directamente con GAZAL.",
    questions: [
      [
        "¿Se publican porcentajes de proteína?",
        "Las especificaciones se entregan para la solución evaluada. Solicita la ficha técnica vigente antes de definir una incorporación.",
      ],
      [
        "¿Puedo solicitar volúmenes y condiciones?",
        "Sí. Incluye el volumen aproximado, la frecuencia y la ubicación para que el equipo evalúe tu solicitud.",
      ],
    ],
    cta: "Solicitar información técnica",
    intent: "formulacion",
  },
  {
    slug: "formulacion-tecnica",
    title: "Formulación técnica",
    short: "La solución empieza en tu requerimiento.",
    description:
      "Evaluación de materias primas y alternativas de formulación según las necesidades nutricionales y los objetivos productivos de cada cliente.",
    audience: "Equipos técnicos, formuladores y empresas de nutrición animal.",
    need: "Una materia prima disponible y un objetivo productivo necesitan encontrarse en una formulación viable.",
    input:
      "Especie, etapa productiva, objetivo nutricional, materias primas y análisis disponibles. Indica también las restricciones que deba considerar la formulación.",
    process:
      "Revisión técnica del desafío, intercambio de antecedentes y definición del alcance de trabajo.",
    result:
      "Una alternativa adaptada al requerimiento, con criterios de evaluación acordados.",
    questions: [
      [
        "¿Qué antecedentes ayudan a comenzar?",
        "Especie, etapa productiva, objetivo, materias primas, análisis disponibles y volumen aproximado.",
      ],
      [
        "¿La evaluación compromete una compra?",
        "La consulta inicia una conversación técnica. Alcance, plazos y condiciones se acuerdan posteriormente.",
      ],
    ],
    cta: "Evaluar mi formulación",
    intent: "formulacion",
  },
  {
    slug: "valorizacion-industrial",
    title: "Valorización industrial",
    short: "Una nueva aplicación para los recursos de tu proceso.",
    description:
      "Evaluamos oportunidades para recuperar y reincorporar corrientes secundarias y subproductos a nuevas cadenas productivas.",
    audience:
      "Industrias generadoras de subproductos y empresas agroindustriales.",
    need: "Una corriente secundaria puede conservar propiedades útiles. Identificarlas es el primer paso para evaluar una nueva aplicación.",
    input:
      "Origen del subproducto, ubicación, volumen, frecuencia, condición y composición conocida. No es necesario tener todos los análisis para iniciar una consulta.",
    process:
      "Caracterización inicial, evaluación de alternativas de recuperación y revisión de viabilidad productiva.",
    result:
      "Una ruta de valorización a evaluar según las características del material y los requisitos de su aplicación.",
    questions: [
      [
        "¿Se acepta cualquier subproducto?",
        "Cada corriente requiere una evaluación. La consulta no implica una aceptación automática del material.",
      ],
      [
        "¿Qué información debo enviar?",
        "Describe el origen, volumen, frecuencia, ubicación y composición. Si tienes análisis, indícalo para la revisión técnica.",
      ],
    ],
    cta: "Evaluar un subproducto",
    intent: "subproducto",
  },
  {
    slug: "bioprocesos",
    title: "Bioprocesos",
    short: "Explorar el potencial de la biomasa.",
    description:
      "Una línea de desarrollo que conecta biomasa, procesamiento y conocimiento aplicado para estudiar nuevas oportunidades de valorización.",
    audience:
      "Agroindustria, generadores de biomasa y equipos de investigación.",
    need: "Las propiedades de una biomasa y su variabilidad determinan qué oportunidades merece la pena explorar.",
    input:
      "Antecedentes de biomasa, proceso de origen y aplicación de interés.",
    process:
      "Planteamiento del desafío, revisión de información disponible y definición de una evaluación técnica o colaboración.",
    result:
      "Un alcance de desarrollo acordado. La viabilidad y el escalamiento se revisan caso a caso.",
    questions: [
      [
        "¿Ofrecen una tecnología estándar?",
        "El alcance depende del desafío. No se publica una tecnología universal ni resultados garantizados para cualquier biomasa.",
      ],
      [
        "¿Pueden participar universidades?",
        "Sí, la conversación puede orientarse a investigación aplicada y transferencia tecnológica.",
      ],
    ],
    cta: "Plantear un desafío de bioprocesos",
    intent: "colaboracion",
  },
];
export const processSteps = [
  {
    title: "Conocer la materia",
    label: "Subproducto · Caracterización",
    body: "Revisamos origen, composición y antecedentes disponibles para entender las propiedades del material y su posible destino.",
    detail: "Punto de partida: los antecedentes de tu proceso.",
  },
  {
    title: "Recuperar su valor",
    label: "Recuperación · Procesamiento",
    body: "Evaluamos alternativas de recuperación y procesamiento según el estado del material y las condiciones de la operación.",
    detail: "La ruta depende de las características del material.",
  },
  {
    title: "Dar una nueva forma",
    label: "Formulación · Control",
    body: "Relacionamos las propiedades de la materia con un objetivo técnico. En nutrición animal, la especie, la etapa y la dieta orientan la evaluación.",
    detail: "Un objetivo definido guía la formulación.",
  },
  {
    title: "Conectar otra cadena",
    label: "Trazabilidad · Nueva solución",
    body: "La aplicación y sus condiciones se definen con el equipo. Los antecedentes de origen y proceso acompañan la conversación sobre trazabilidad.",
    detail: "La nueva aplicación cierra el recorrido.",
  },
];
export const corporatePages = {
  empresa: {
    title: "GAZAL: nutrición, valorización y conocimiento aplicado.",
    description:
      "Desde Coronel, en la Región del Biobío, trabajamos con plantas de alimento, integraciones avícolas e industrias generadoras de subproductos. GAZAL conecta recuperación, procesamiento y formulación técnica.",
    sections: [
      [
        "Una empresa, capacidades conectadas",
        "Nuestro trabajo reúne la recuperación de subproductos, la producción y la formulación técnica. El objetivo es identificar nuevas aplicaciones para recursos que conservan valor.",
      ],
      [
        "La operación como punto de partida",
        "El origen de la materia, su recepción, procesamiento, almacenamiento y salida son parte de la conversación industrial. Evaluamos cada requerimiento considerando sus condiciones reales.",
      ],
      [
        "Una relación técnica y cercana",
        "Para comenzar necesitamos entender tu proceso: qué material tienes, qué solución buscas y qué condiciones debe cumplir. Desde ahí definimos el siguiente paso.",
      ],
    ],
  },
  "calidad-trazabilidad": {
    title: "Conocer el origen. Comprender cada etapa.",
    description:
      "La trazabilidad conecta la materia prima con el producto terminado. Una secuencia de información que acompaña la transformación.",
    sections: [
      [
        "Del ingreso al despacho",
        "Origen, recepción, identificación del lote, proceso, control, producto terminado y despacho: esta secuencia organiza la conversación sobre trazabilidad.",
      ],
      [
        "Información para decidir",
        "La composición, el origen y las condiciones de cada requerimiento ayudan a evaluar su aplicación. Solicita los antecedentes técnicos pertinentes para tu operación.",
      ],
      [
        "Documentación y certificaciones",
        "Consulta al equipo por las fichas y análisis aplicables al material y al uso propuesto. Un análisis, una ficha técnica y una certificación son documentos distintos. Esta página no acredita certificaciones ni sustituye la documentación de una solución concreta.",
      ],
    ],
  },
  sostenibilidad: {
    title: "El valor puede continuar.",
    description:
      "La circularidad se concreta cuando un material recuperado encuentra una nueva aplicación productiva.",
    sections: [
      [
        "Práctica: evaluar oportunidades de recuperación",
        "Conocer qué se genera, dónde y en qué condiciones permite identificar oportunidades de recuperación. No todas las corrientes tienen el mismo destino.",
      ],
      [
        "Objetivo: encontrar una nueva aplicación",
        "La posibilidad de reincorporar un recurso depende de sus propiedades, del proceso y de los requisitos de la cadena que lo recibe.",
      ],
      [
        "Resultados: medir con una base real",
        "Esta página no publica resultados cuantificados de impacto. Para medirlos se necesitan cantidades, condiciones de proceso, destino y un método de comparación. Los objetivos de valorización no equivalen por sí solos a un ahorro o una reducción demostrada.",
      ],
    ],
  },
  "innovacion/transferencia-tecnologica": {
    title: "Conectar conocimiento y aplicación.",
    description:
      "La transferencia tecnológica acerca resultados de investigación a los desafíos productivos. Es un proceso de colaboración, evaluación y desarrollo.",
    sections: [
      [
        "Investigación universitaria",
        "El conocimiento nace de equipos de investigación. Reconocer su autoría y trayectoria es parte de una transferencia responsable.",
      ],
      [
        "Una licencia para avanzar",
        "La relación de GAZAL con la Universidad de Concepción incluye una licencia de tecnología basada en hidrogeles y bacterias benéficas.",
      ],
      [
        "De la tecnología a la aplicación",
        "Validación, escalamiento y condiciones de uso son etapas que requieren evidencia propia. Una licencia no implica, por sí sola, disponibilidad comercial.",
      ],
    ],
  },
  "innovacion/proyectos": {
    title: "Desafíos que conectan ciencia e industria.",
    description:
      "Un espacio para conocer la transferencia tecnológica y abrir conversaciones de investigación aplicada.",
    sections: [
      [
        "HIDROBAC",
        "Tecnología desarrollada en la Universidad de Concepción basada en hidrogeles y bacterias benéficas, orientada al estrés hídrico en plantas.",
      ],
      [
        "Colaboración aplicada",
        "Si tu organización trabaja con biomasa, nutrición o soluciones agrícolas, podemos iniciar una conversación sobre un desafío concreto.",
      ],
      [
        "Un alcance definido desde el inicio",
        "El objetivo, los antecedentes y los criterios de evaluación permiten construir una propuesta de colaboración con responsabilidades claras.",
      ],
    ],
  },
} as const;
export const allRoutes = [
  "/",
  "/empresa/",
  "/soluciones/",
  ...solutions.map((s) => `/soluciones/${s.slug}/`),
  "/innovacion/",
  "/innovacion/hidrobac/",
  "/innovacion/transferencia-tecnologica/",
  "/innovacion/proyectos/",
  "/calidad-trazabilidad/",
  "/sostenibilidad/",
  "/casos/",
  "/actualidad/",
  "/contacto/",
  "/preguntas-frecuentes/",
  "/privacidad/",
  "/terminos/",
];
export type CaseStudy = {
  slug: string;
  published: boolean;
  client: string;
  challenge: string;
  evaluation: string;
  solution: string;
  implementation: string;
  result: string;
  evidence: string[];
};
export const cases: CaseStudy[] = [];
export type TechnicalDocument = {
  title: string;
  file: string;
  revision: string;
  solution: string;
  approved: boolean;
};
export const documents: TechnicalDocument[] = [];
