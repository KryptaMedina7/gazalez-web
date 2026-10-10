"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

/** One surface follows the selected control, including wrapped mobile rows. */
export function StageHighlight({ index }: { index: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const selected = useRef(index);
  const move = useRef<(immediate?: boolean) => void>(() => {});

  useLayoutEffect(() => {
    const marker = ref.current;
    const rail = marker?.parentElement;
    if (!marker || !rail) return;
    const options = Array.from(
      rail.querySelectorAll<HTMLElement>("[data-stage-option]"),
    );
    const reduce = matchMedia("(prefers-reduced-motion: reduce)");
    let keyboard = false;
    let ready = false;
    let animation: gsap.core.Tween | undefined;
    move.current = (immediate = false) => {
      const target = options[selected.current];
      if (!target) return;
      // Read geometry together; subsequent frames animate transforms only.
      const box = target.getBoundingClientRect();
      const base = rail.getBoundingClientRect();
      const markerStyle = getComputedStyle(marker);
      const radius = parseFloat(getComputedStyle(target).borderTopLeftRadius) || 0;
      if (!base.width || !base.height) return;
      const geometry = {
        x: box.left - base.left - rail.clientLeft,
        y: box.top - base.top - rail.clientTop,
        scaleX: box.width / parseFloat(markerStyle.width),
        scaleY: box.height / parseFloat(markerStyle.height),
      };
      animation?.kill();
      gsap.set(marker, { borderRadius: `${radius / geometry.scaleX}px / ${radius / geometry.scaleY}px` });
      if (!ready || immediate || keyboard || reduce.matches)
        gsap.set(marker, geometry);
      else
        animation = gsap.to(marker, {
          ...geometry,
          duration: 0.38,
          ease: "power3.inOut",
          overwrite: true,
        });
      ready = true;
      rail.dataset.stageReady = "true";
    };
    const onKey = () => {
      keyboard = true;
    };
    const onPointer = () => {
      keyboard = false;
    };
    const settle = () => move.current(true);
    const observer = new ResizeObserver(settle);
    observer.observe(rail);
    options.forEach((option) => observer.observe(option));
    rail.addEventListener("keydown", onKey, true);
    rail.addEventListener("pointerdown", onPointer, true);
    reduce.addEventListener("change", settle);
    move.current(true);
    return () => {
      animation?.kill();
      observer.disconnect();
      rail.removeEventListener("keydown", onKey, true);
      rail.removeEventListener("pointerdown", onPointer, true);
      reduce.removeEventListener("change", settle);
      delete rail.dataset.stageReady;
    };
  }, []);

  useLayoutEffect(() => {
    selected.current = index;
    move.current();
  }, [index]);

  return <span ref={ref} className="stage-highlight" aria-hidden="true" />;
}
