"use client";
// Adapted from wasifgee0012 / Social Links, retrieved through 21st MCP.
// Keep the desktop reveal and mobile dock, with GAZALEZ greens and accessible controls.
import { useEffect, useRef, useState } from "react";
import { Mail, Share2, X } from "lucide-react";
export type SocialLink = { platform: "mail"; href: string };
export function SocialLinks({ links }: { links: SocialLink[] }) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    const outside = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", key);
    document.addEventListener("pointerdown", outside);
    return () => {
      document.removeEventListener("keydown", key);
      document.removeEventListener("pointerdown", outside);
    };
  }, [open]);
  if (!links.length) return null;
  return (
    <>
      <aside className="social-desktop" aria-label="Contacto directo">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            aria-label="Escribir a GAZALEZ por correo"
          >
            <Mail size={20} aria-hidden="true" />
            <span>Escríbenos</span>
          </a>
        ))}
      </aside>
      <div className="social-mobile" ref={root}>
        <div
          className={`social-mobile-links ${open ? "is-open" : ""}`}
          id="social-links"
          inert={!open}
        >
          {links.map((link) => (
            <a key={link.href} href={link.href}>
              <Mail size={20} aria-hidden="true" />
              Correo GAZALEZ
            </a>
          ))}
        </div>
        <button
          ref={toggle}
          className="social-toggle"
          aria-label={
            open ? "Cerrar contacto directo" : "Abrir contacto directo"
          }
          aria-expanded={open}
          aria-controls="social-links"
          onClick={() => setOpen(!open)}
        >
          {open ? (
            <X size={20} aria-hidden="true" />
          ) : (
            <Share2 size={20} aria-hidden="true" />
          )}
        </button>
      </div>
    </>
  );
}
