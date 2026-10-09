"use client";
import { usePathname } from "next/navigation";
import { Globe2 } from "lucide-react";
import { localeOf, localHref } from "@/i18n/routing.mjs";

export function LanguageSwitcher() {
  const path = usePathname();
  const locale = localeOf(path);
  return (
    <label className="language-switcher">
      <Globe2 aria-hidden="true" />
      <span className="sr-only">Language / Idioma</span>
      <select
        value={locale}
        aria-label="Language / Idioma"
        onChange={(event) => {
          // Explicit language choice; keep route and allowed enquiry context, never a form draft.
          const current = new URL(location.href);
          const destination = new URL(
            localHref(path, event.target.value),
            current.origin,
          );
          for (const key of ["interes", "familia"]) {
            const value = current.searchParams.get(key);
            if (value) destination.searchParams.set(key, value);
          }
          destination.hash = current.hash;
          location.assign(destination.href);
        }}
      >
        <option value="es" lang="es">
          ES · Español
        </option>
        <option value="en" lang="en">
          EN · English
        </option>
        <option value="pt" lang="pt-BR">
          PT · Português
        </option>
      </select>
    </label>
  );
}
