import Link from "next/link";
import { DotGrid } from "./ui/dot-grid";
import { Icon } from "./icon";
import { ConceptImage, type VisualKey } from "./concept-image";
export function ButtonLink({
  href,
  children,
  secondary = false,
}: {
  href: string;
  children: React.ReactNode;
  secondary?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`button ${secondary ? "button-secondary" : ""}`}
    >
      {children}
      <Icon name="diagonal" />
    </Link>
  );
}
export function ContactBand({
  intent,
  title,
  description,
}: {
  intent?: string;
  title?: string;
  description?: string;
}) {
  return (
    <section className="contact-band">
      <DotGrid />
      <div>
        <h2>{title || "Conversemos sobre tu necesidad."}</h2>
        <p>
          {description ||
            "Cuéntanos qué material tienes o qué solución necesitas."}
        </p>
      </div>
      <ButtonLink href={intent ? `/contacto/?interes=${intent}` : "/contacto/"}>
        Preparar mi consulta
      </ButtonLink>
    </section>
  );
}
export function Breadcrumb({
  items,
}: {
  items: { label: string; href?: string }[];
}) {
  return (
    <nav className="breadcrumb" aria-label="Ruta de navegación">
      <Link href="/">Inicio</Link>
      {items.map((x, i) => (
        <span key={i}>
          <span aria-hidden="true">/</span>
          {x.href ? (
            <Link href={x.href}>{x.label}</Link>
          ) : (
            <span aria-current="page">{x.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
export function PageIntro({
  title,
  description,
  children,
  visual,
}: {
  title: string;
  description: string;
  children?: React.ReactNode;
  visual?: VisualKey;
}) {
  if (visual)
    return (
      <div className="page-intro page-intro--visual">
        <DotGrid surface="light" />
        <div className="page-intro-copy">
          <h1>{title}</h1>
          <p>{description}</p>
          {children}
        </div>
        <ConceptImage visual={visual} />
      </div>
    );
  return (
    <div className="page-intro">
      <h1>{title}</h1>
      <div>
        <p>{description}</p>
        {children}
      </div>
    </div>
  );
}
