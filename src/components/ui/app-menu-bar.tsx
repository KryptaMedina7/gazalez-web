"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  ArrowLeftRight,
  Building2,
  Check,
  ChevronDown,
  ClipboardCheck,
  CircleHelp,
  Dna,
  Droplets,
  Egg,
  Factory,
  FileText,
  FlaskConical,
  Layers3,
  Lightbulb,
  Mail,
  Microscope,
  Newspaper,
  Recycle,
  ShieldCheck,
  Sprout,
  Wheat,
  type LucideIcon,
} from "lucide-react";
import { activeNavigationGroup, navigationGroups } from "@/lib/navigation";
const destinationIcons: Record<string, LucideIcon> = {
  "/soluciones/": Layers3,
  "/soluciones/nutricion-animal/": Wheat,
  "/soluciones/nucleos-proteicos/": Egg,
  "/soluciones/formulacion-tecnica/": FlaskConical,
  "/soluciones/valorizacion-industrial/": Recycle,
  "/soluciones/bioprocesos/": Dna,
  "/innovacion/": Microscope,
  "/innovacion/hidrobac/": Droplets,
  "/innovacion/transferencia-tecnologica/": ArrowLeftRight,
  "/innovacion/proyectos/": Lightbulb,
  "/empresa/": Building2,
  "/sostenibilidad/": Sprout,
  "/casos/": Factory,
  "/actualidad/": Newspaper,
  "/calidad-trazabilidad/": ClipboardCheck,
  "/contacto/": Mail,
  "/preguntas-frecuentes/": CircleHelp,
  "/privacidad/": ShieldCheck,
  "/terminos/": FileText,
};

export default function AppMenuBar({ path }: { path: string }) {
  const [value, setValue] = useState("");
  const root = useRef<HTMLElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const activeGroup = activeNavigationGroup(path);
  function cancel() {
    if (timer.current) clearTimeout(timer.current);
  }
  function closeSoon() {
    cancel();
    timer.current = setTimeout(() => {
      if (!root.current?.contains(document.activeElement)) setValue("");
    }, 180);
  }
  useEffect(() => {
    const outside = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setValue("");
    };
    document.addEventListener("pointerdown", outside);
    return () => {
      document.removeEventListener("pointerdown", outside);
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);
  return (
    <nav
      ref={root}
      className="desktop-nav gazal-navigation"
      aria-label="Navegación principal"
      onPointerLeave={closeSoon}
      onPointerEnter={cancel}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setValue("");
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          const trigger = root.current?.querySelector<HTMLButtonElement>(
            '[aria-expanded="true"]',
          );
          setValue("");
          trigger?.focus({ preventScroll: true });
        }
      }}
    >
      {navigationGroups.map((group, groupIndex) => {
        const expanded = value === group.label;
        const panelId = `gazal-nav-${groupIndex}`;
        return (
          <div className="gazal-nav-group" key={group.label}>
            <button
              type="button"
              className="gazal-nav-trigger"
              aria-expanded={expanded}
              aria-controls={panelId}
              data-current={activeGroup === group.label || undefined}
              onPointerEnter={(event) => {
                if (event.pointerType !== "mouse") return;
                cancel();
                timer.current = setTimeout(() => setValue(group.label), 90);
              }}
              onClick={() => {
                cancel();
                setValue(expanded ? "" : group.label);
              }}
              onKeyDown={(event) => {
                if (event.key === "ArrowDown") {
                  event.preventDefault();
                  setValue(group.label);
                  requestAnimationFrame(() =>
                    document
                      .getElementById(panelId)
                      ?.querySelector<HTMLElement>("a")
                      ?.focus({ preventScroll: true }),
                  );
                }
              }}
            >
              <span>{group.label}</span>
              <ChevronDown aria-hidden="true" />
            </button>
            <div id={panelId} className="gazal-nav-panel" hidden={!expanded}>
              <div className="gazal-nav-overview">
                <span>{group.label}</span>
                <Link href={group.links[0][1]} onClick={() => setValue("")}>
                  {group.links[0][0]} <ArrowLeftRight aria-hidden="true" />
                </Link>
              </div>
              <ul>
                {group.links.slice(1).map(([label, href]) => {
                  const DestinationIcon = destinationIcons[href];
                  return (
                    <li key={href}>
                      <Link
                        href={href}
                        aria-current={path === href ? "page" : undefined}
                        onClick={() => setValue("")}
                      >
                        <DestinationIcon aria-hidden="true" strokeWidth={1.6} />
                        <span>{label}</span>
                        {path === href && <Check aria-hidden="true" />}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        );
      })}
    </nav>
  );
}
