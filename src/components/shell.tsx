"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Icon } from "./icon";
import { TopbarNavigation } from "./ui/topbar-navigation";
import { site } from "@/lib/site";
import { SterlingGateNavigation } from "./ui/sterling-gate-kinetic-navigation";
export function Brand() {
  return (
    <Link href="/" className="brand" aria-label="GAZALEZ, inicio">
      <Image
        src="/assets/gazalez-logo.png"
        alt=""
        width={62}
        height={62}
        priority
      />
      <span>
        GAZALEZ
        <span className="brand-sub">INDUSTRIA · CIENCIA · TRANSFORMACIÓN</span>
      </span>
    </Link>
  );
}
export function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [instant, setInstant] = useState(false);
  const followingLink = useRef(false);
  return (
    <header className="header">
      <Brand />
      <TopbarNavigation key={path} path={path} />
      <Link className="header-cta" href="/contacto/">
        Hablemos <Icon name="diagonal" />
      </Link>
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Trigger
          className="menu-trigger"
          aria-label="Abrir menú"
          onPointerDown={() => setInstant(false)}
          onKeyDown={() => setInstant(true)}
        >
          <Icon name="menu" />
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="menu-overlay" />
          <Dialog.Content
            className={`mobile-menu kinetic-menu ${instant ? "is-instant" : ""}`}
            onEscapeKeyDown={() => setInstant(true)}
            onCloseAutoFocus={(event) => {
              if (followingLink.current) {
                event.preventDefault();
                followingLink.current = false;
              }
            }}
          >
            <SterlingGateNavigation
              path={path}
              close={() => {
                followingLink.current = true;
                setOpen(false);
              }}
              instant={instant}
            />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </header>
  );
}
export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-main">
        <div>
          <Brand />
          <p>
            Valorización industrial.
            <br />
            Nutrición animal.
            <br />
            Ciencia aplicada.
          </p>
          <span className="location">Coronel, Biobío · Chile</span>
        </div>
        <div>
          <h2>Explora</h2>
          {[
            ["Empresa", "/empresa/"],
            ["Soluciones", "/soluciones/"],
            ["Innovación", "/innovacion/"],
            ["Calidad y trazabilidad", "/calidad-trazabilidad/"],
            ["Sostenibilidad", "/sostenibilidad/"],
            ["Preguntas frecuentes", "/preguntas-frecuentes/"],
          ].map(([t, u]) => (
            <Link key={u} href={u}>
              {t}
            </Link>
          ))}
        </div>
        <div>
          <h2>Conversemos</h2>
          <Link href="/contacto/?interes=subproducto">
            Evaluar un subproducto
          </Link>
          <Link href="/contacto/?interes=formulacion">
            Consultar una formulación
          </Link>
          <Link href="/contacto/?interes=colaboracion">
            Iniciar una colaboración
          </Link>
          <Link href="/casos/">Aplicaciones industriales</Link>
          <Link href="/actualidad/">Actualidad</Link>
          {site.email && <a href={`mailto:${site.email}`}>{site.email}</a>}
        </div>
      </div>
      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} {site.legalName} · RUT {site.rut}
        </p>
        <div>
          <Link href="/privacidad/">Privacidad</Link>
          <Link href="/terminos/">Términos de uso</Link>
        </div>
      </div>
    </footer>
  );
}
