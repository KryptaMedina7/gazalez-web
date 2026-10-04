"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { getSectionIntro } from "@/lib/section-intros";
import { SectionIntro } from "./section-intro";

export function BrandIntro() {
  const path = usePathname();
  const section = getSectionIntro(path);
  return section ? <SectionIntro key={path} {...section} /> : <RuralIntro />;
}

/** Rural opening with immediate skip; never waits for a media download. */
function RuralIntro() {
  const [visible, setVisible] = useState(true);
  const [leaving, setLeaving] = useState(false);
  const finishTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const overlay = useRef<HTMLDivElement>(null);
  const skip = useRef<HTMLButtonElement>(null);
  const dismiss = useCallback((immediate = false) => {
    try {
      sessionStorage.setItem("gazal-intro-seen", "1");
    } catch {
      /* Optional storage. */
    }
    if (finishTimer.current) clearTimeout(finishTimer.current);
    if (immediate) setVisible(false);
    else {
      setLeaving(true);
      finishTimer.current = setTimeout(() => setVisible(false), 900);
    }
  }, []);
  useEffect(() => {
    if (!visible || !overlay.current) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    let seen = false;
    try {
      seen = sessionStorage.getItem("gazal-intro-seen") === "1";
    } catch {
      /* Still allow access. */
    }
    if (reduced.matches || seen) {
      const frame = requestAnimationFrame(() => dismiss(true));
      return () => cancelAnimationFrame(frame);
    }
    const previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    const siblings = Array.from(document.body.children).filter(
      (element): element is HTMLElement =>
        element instanceof HTMLElement && element !== overlay.current,
    );
    const previousInert = siblings.map((element) => element.inert);
    siblings.forEach((element) => {
      element.inert = true;
    });
    const previousFocus = document.activeElement;
    skip.current?.focus({ preventScroll: true });
    const timer = setTimeout(dismiss, 1200);
    const keyboard = (event: KeyboardEvent) => {
      if (event.key === "Escape") dismiss(true);
      if (event.key === "Tab") {
        event.preventDefault();
        skip.current?.focus({ preventScroll: true });
      }
    };
    const preference = () => {
      if (reduced.matches) dismiss(true);
    };
    document.addEventListener("keydown", keyboard);
    reduced.addEventListener("change", preference);
    return () => {
      clearTimeout(timer);
      if (finishTimer.current) clearTimeout(finishTimer.current);
      document.removeEventListener("keydown", keyboard);
      reduced.removeEventListener("change", preference);
      document.documentElement.style.overflow = previousOverflow;
      siblings.forEach((element, index) => {
        element.inert = previousInert[index];
      });
      if (
        previousFocus instanceof HTMLElement &&
        previousFocus !== document.body
      )
        previousFocus.focus({ preventScroll: true });
    };
  }, [dismiss, visible]);
  if (!visible) return null;
  return (
    <div
      ref={overlay}
      className={`video-intro brand-opening ${leaving ? "is-leaving" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label="Bienvenida a GAZAL"
      data-testid="brand-intro"
    >
      <picture className="brand-opening-landscape">
        <source
          media="(max-width:760px)"
          srcSet="/assets/campo/campo-800.webp"
        />
        <img
          src="/assets/campo/campo-1600.webp"
          alt=""
          width="1536"
          height="1024"
          loading="lazy"
          decoding="async"
        />
      </picture>
      <Image
        className="brand-opening-mark"
        src="/assets/gazal/gazal-solo-nombre-transparente.webp"
        alt="GAZAL"
        width="560"
        height="160"
      />
      <button
        ref={skip}
        className="video-intro-skip"
        onClick={() => dismiss(true)}
      >
        Omitir y entrar
      </button>
    </div>
  );
}
