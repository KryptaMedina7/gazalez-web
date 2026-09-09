import Link from "next/link";
import { Icon } from "./icon";
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
export function ContactBand() {
  return (
    <section className="contact-band">
      <div>
        <h2>
          Tu próximo recurso
          <br />
          puede estar en tu proceso.
        </h2>
        <p>Cuéntanos qué material tienes o qué solución necesitas.</p>
      </div>
      <ButtonLink href="/contacto/">Hablemos de tu desafío</ButtonLink>
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
}: {
  title: string;
  description: string;
  children?: React.ReactNode;
}) {
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
