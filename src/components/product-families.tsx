import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, FileText } from "lucide-react";
import { productFamilies, familyEnquiryHref } from "@/lib/product-families.mjs";

export function ProductFamilies() {
  return (
    <section
      className="product-families"
      id="familias"
      aria-labelledby="families-title"
    >
      <header className="explorer-heading">
        <h2 id="families-title">Familias para tu operación.</h2>
        <p>
          Encuentra el punto de partida de tu consulta. Las especificaciones y
          condiciones de suministro se definen con el equipo técnico.
        </p>
      </header>
      <div className="family-collection">
        {productFamilies.map((family) => (
          <article className="family-item" key={family.id}>
            <Link
              className="family-image"
              href={family.href}
              aria-label={family.detail}
            >
              <picture>
                <source
                  media="(max-width: 760px)"
                  srcSet={`/assets/familias/${family.image}-640.webp`}
                />
                <Image
                  src={`/assets/familias/${family.image}-1200.webp`}
                  width={1200}
                  height={800}
                  sizes="(max-width: 760px) 100vw, 50vw"
                  alt={family.alt}
                  loading="lazy"
                />
              </picture>
            </Link>
            <div className="family-copy">
              <h3>
                <Link href={family.href}>
                  {family.name}
                  <ArrowUpRight aria-hidden="true" />
                </Link>
              </h3>
              <p>{family.description}</p>
              <p className="family-audience">{family.audience}</p>
              <Link
                className="button button-secondary"
                href={familyEnquiryHref(family.id)}
              >
                <FileText aria-hidden="true" />
                {family.request}
              </Link>
            </div>
          </article>
        ))}
      </div>
      <div className="family-service">
        <div>
          <h3>¿Necesitas definir la formulación?</h3>
          <p>
            Comparte especie, etapa, objetivo y materias primas disponibles.
            Puedes consultar aunque todavía no tengas todos los análisis.
          </p>
        </div>
        <Link className="text-link" href="/soluciones/formulacion-tecnica/">
          Conocer el servicio técnico <ArrowUpRight aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
