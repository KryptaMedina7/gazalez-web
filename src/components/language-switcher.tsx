"use client";
import { usePathname } from "next/navigation";
import { Globe2, ChevronDown, Check } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { localeOf, localHref } from "@/i18n/routing.mjs";

export function LanguageSwitcher() {
  const path = usePathname();
  const locale = localeOf(path);
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const outside = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", outside);
    return () => document.removeEventListener("pointerdown", outside);
  }, []);
  function change(next: string) {
    if (next === locale) {
      setOpen(false);
      trigger.current?.focus({ preventScroll: true });
      return;
    }
    const current = new URL(location.href);
    const destination = new URL(localHref(path, next), current.origin);
    for (const key of ["interes", "familia"]) {
      const value = current.searchParams.get(key);
      if (value) destination.searchParams.set(key, value);
    }
    destination.hash = current.hash;
    location.assign(destination.href);
  }
  return (
    <div
      ref={root}
      className="language-switcher"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          event.preventDefault();
          setOpen(false);
          trigger.current?.focus({ preventScroll: true });
        }
      }}
    >
      <button
        ref={trigger}
        type="button"
        className="language-trigger"
        aria-label="Language / Idioma"
        aria-expanded={open}
        aria-controls="gazal-languages"
        onPointerDown={(event) => {
          if (event.button !== 0) return;
          event.preventDefault();
          event.currentTarget.focus({ preventScroll: true });
        }}
        onClick={() => setOpen(!open)}
      >
        <Globe2 aria-hidden="true" />
        <span>{locale.toUpperCase()}</span>
        <ChevronDown aria-hidden="true" />
      </button>
      <div id="gazal-languages" className="language-panel" hidden={!open}>
        {[
          ["es", "Español"],
          ["en", "English"],
          ["pt", "Português"],
        ].map(([value, label]) => (
          <button
            key={value}
            type="button"
            lang={value === "pt" ? "pt-BR" : value}
            aria-current={locale === value ? "true" : undefined}
            onClick={() => change(value)}
          >
            <span>{label}</span>
            <small>{value.toUpperCase()}</small>
            {locale === value && <Check aria-hidden="true" />}
          </button>
        ))}
      </div>
    </div>
  );
}
