"use client";
// Adaptation of the Sterling Gate source supplied by the user (21st.dev).
// Radix preserves focus trapping, Escape and focus return; all GSAP selectors are scoped.
import { useLayoutEffect, useRef } from "react";
import { DrilldownMenu } from "./drilldown-menu";
import Image from "next/image";
import * as Dialog from "@radix-ui/react-dialog";
import gsap from "gsap";
import { Icon } from "@/components/icon";
import { navigationGroups } from "@/lib/navigation";
import { motionPolicy } from "@/lib/motion-policy";

export function SterlingGateNavigation({
  path,
  close,
  instant,
}: {
  path: string;
  close: () => void;
  instant: boolean;
}) {
  const root = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    if (!root.current || instant) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.fromTo(
          ".kinetic-backdrop",
          { xPercent: 101 },
          { xPercent: 0, duration: motionPolicy.menuEnter, stagger: 0.055 },
          0,
        ).fromTo(
          ".kinetic-menu-art",
          { opacity: 0, scale: 0.97 },
          { opacity: 1, scale: 1, duration: 0.35 },
          0.12,
        );
      }, root);
      return () => ctx.revert();
    });
    return () => mm.revert();
  }, [instant]);
  return (
    <div className="kinetic-menu-inner" ref={root}>
      <div className="kinetic-backdrops" aria-hidden="true">
        <div className="kinetic-backdrop" />
        <div className="kinetic-backdrop" />
        <div className="kinetic-backdrop" />
      </div>
      <div className="kinetic-menu-body">
        <div className="menu-top">
          <Dialog.Title>Explora GAZALEZ</Dialog.Title>
          <Dialog.Close className="icon-button" aria-label="Cerrar menú">
            <Icon name="close" />
          </Dialog.Close>
        </div>
        <Dialog.Description className="menu-description">
          De subproducto a solución.
        </Dialog.Description>
        <div className="kinetic-menu-grid">
          <nav aria-label="Navegación móvil">
            <DrilldownMenu
              items={[
                ...navigationGroups.map((group) => ({
                  id: group.label,
                  label: group.label,
                  items: group.links.map(([label, href]) => ({
                    id: href,
                    label,
                    href,
                    current: path === href,
                  })),
                })),
                { id: "home", label: "Inicio", href: "/" },
              ]}
              onSelect={close}
            />
          </nav>
          <div className="kinetic-menu-art" aria-hidden="true">
            <Image
              src="/assets/gazalez-logo.png"
              alt=""
              width={350}
              height={350}
            />
            <p>
              Industria.
              <br />
              Ciencia.
              <br />
              Transformación.
            </p>
            <div className="menu-palette">
              <span />
              <span />
              <span />
            </div>
          </div>
        </div>
        <p className="menu-location">Coronel, Biobío · Chile</p>
      </div>
    </div>
  );
}
