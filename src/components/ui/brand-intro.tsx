"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { TextRoll } from "./text-roll";
import { motionPolicy } from "@/lib/motion-policy";

export function BrandIntro() {
  const [visible, setVisible] = useState(true);
  const [leaving, setLeaving] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dismiss = useCallback((immediate = false) => {
    if (timer.current) clearTimeout(timer.current);
    if (immediate) {
      setVisible(false);
      return;
    }
    setLeaving(true);
    timer.current = setTimeout(() => setVisible(false), 240);
  }, []);
  useEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) {
      const frame = requestAnimationFrame(() => setVisible(false));
      return () => cancelAnimationFrame(frame);
    }
    const end = setTimeout(() => dismiss(), motionPolicy.introMs);
    const keyboard = () => dismiss(true);
    const preference = () => {
      if (reduce.matches) dismiss(true);
    };
    addEventListener("keydown", keyboard, { once: true });
    addEventListener("touchstart", keyboard, { once: true, passive: true });
    addEventListener("wheel", keyboard, { once: true, passive: true });
    reduce.addEventListener("change", preference);
    return () => {
      clearTimeout(end);
      if (timer.current) clearTimeout(timer.current);
      removeEventListener("keydown", keyboard);
      removeEventListener("touchstart", keyboard);
      removeEventListener("wheel", keyboard);
      reduce.removeEventListener("change", preference);
    };
  }, [dismiss]);
  if (!visible) return null;
  return (
    <div
      className={`brand-intro ${leaving ? "is-leaving" : ""}`}
      data-testid="brand-intro"
    >
      <div className="intro-color-panel" />
      <div className="intro-signature" aria-hidden="true">
        <div className="intro-logo">
          <Image
            src="/assets/gazalez-logo.png"
            width={140}
            height={140}
            alt=""
            priority
          />
        </div>
        <TextRoll
          className="intro-wordmark"
          duration={0.36}
          getEnterDelay={(i) => i * 0.022}
          getExitDelay={(i) => i * 0.022 + 0.12}
        >
          Gazalez e Hija
        </TextRoll>
        <p>El valor de transformar.</p>
        <span className="intro-line" />
      </div>
      <button className="intro-skip" onClick={() => dismiss(true)}>
        Entrar al sitio
      </button>
    </div>
  );
}
