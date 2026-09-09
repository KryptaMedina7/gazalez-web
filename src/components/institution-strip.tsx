import Image from "next/image";

const institutions = [
  { name: "Universidad de Concepción", file: "udec", width: 793, height: 314 },
  {
    name: "Gobierno Regional del Biobío",
    file: "gore",
    width: 374,
    height: 667,
  },
  { name: "CORFO", file: "corfo", width: 928, height: 269 },
  { name: "Gazalez Holding Group", file: "holding", width: 900, height: 620 },
];

export function InstitutionStrip() {
  return (
    <section
      className="institution-section"
      aria-labelledby="institution-heading"
    >
      <div className="institution-heading">
        <h2 id="institution-heading">Ciencia, territorio e industria.</h2>
        <p>Desde el Biobío, para la industria.</p>
      </div>
      <ul className="institution-logos">
        {institutions.map(({ name, file, width, height }) => (
          <li key={file}>
            <Image
              src={
                file === "holding"
                  ? "/assets/gazalez-holding-group.svg"
                  : `/assets/instituciones/${file}.png`
              }
              alt={name}
              width={width}
              height={height}
              sizes="(max-width: 760px) 40vw, 22vw"
            />
            <span>{name}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
