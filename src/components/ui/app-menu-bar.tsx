"use client";

import Link from "next/link";
import { Fragment, useState } from "react";
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
import { navigationGroups } from "@/lib/navigation";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";

type Destination = (typeof navigationGroups)[number]["links"][number][1];
const destinationIcons: Record<Destination, LucideIcon> = {
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
  const [keyboard, setKeyboard] = useState(false);
  return (
    <Menubar
      className={`desktop-nav topbar-navigation ${keyboard ? "keyboard-navigation" : ""}`}
      aria-label="Navegación principal"
      value={value}
      onValueChange={setValue}
      onKeyDownCapture={() => setKeyboard(true)}
      onPointerDownCapture={() => setKeyboard(false)}
      onPointerMove={() => setKeyboard(false)}
    >
      {navigationGroups.map((group, groupIndex) => {
        const GroupIcon = destinationIcons[group.links[0][1]];
        return (
          <MenubarMenu key={group.label} value={group.label}>
            <MenubarTrigger
              className="topbar-trigger"
              onPointerEnter={(event) => event.preventDefault()}
              onClick={(event) => {
                // The clicked group wins over dismissal from an exiting panel.
                if (event.detail > 0) setValue(group.label);
              }}
              data-current={
                group.links.some(([, href]) => path === href) || undefined
              }
            >
              <GroupIcon aria-hidden="true" strokeWidth={1.6} />
              <span>{group.label}</span>
              <ChevronDown className="topbar-chevron" aria-hidden="true" />
            </MenubarTrigger>
            <MenubarContent
              onPointerDownOutside={(event) => {
                // Switching triggers belongs to the menubar, not outside dismissal.
                if (
                  event.target instanceof Element &&
                  event.target.closest(".topbar-trigger")
                )
                  event.preventDefault();
              }}
              align={
                groupIndex === navigationGroups.length - 1 ? "end" : "start"
              }
              className={keyboard ? "keyboard-navigation" : undefined}
            >
              {group.links.map(([label, href], index) => {
                const DestinationIcon = destinationIcons[href];
                const separator = groupIndex === 3 ? index === 2 : index === 1;
                return (
                  <Fragment key={href}>
                    {separator && (
                      <MenubarSeparator className="topbar-separator" />
                    )}
                    <MenubarItem asChild onSelect={() => setValue("")}>
                      <Link
                        href={href}
                        className="topbar-destination"
                        aria-current={path === href ? "page" : undefined}
                      >
                        <DestinationIcon aria-hidden="true" strokeWidth={1.6} />
                        <span>{label}</span>
                        {path === href && (
                          <Check
                            className="topbar-current"
                            aria-hidden="true"
                          />
                        )}
                      </Link>
                    </MenubarItem>
                  </Fragment>
                );
              })}
            </MenubarContent>
          </MenubarMenu>
        );
      })}
    </Menubar>
  );
}
