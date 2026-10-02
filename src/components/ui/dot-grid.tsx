"use client";
import { useEffect, useRef } from "react";

/** Kexsio-inspired dot field: scoped input, capped raster, idle/offscreen suspension. */
export function DotGrid({ surface = "dark" }: { surface?: "dark" | "light" }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const element = canvas.current;
    const host = element?.parentElement;
    const ctx = element?.getContext("2d");
    if (!element || !host || !ctx) return;
    const motion = matchMedia(
      "(prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine)",
    );
    let width = 0,
      height = 0,
      frame = 0,
      visible = false;
    let pointerX = -1000,
      pointerY = -1000;
    let dots: { x: number; y: number; dx: number; dy: number }[] = [];
    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };
    const draw = () => {
      frame = 0;
      if (!visible || document.hidden) return;
      ctx.clearRect(0, 0, width, height);
      let moving = false;
      for (const dot of dots) {
        const dx = dot.x - pointerX,
          dy = dot.y - pointerY;
        const distance = Math.hypot(dx, dy);
        const strength = motion.matches ? Math.max(0, 1 - distance / 140) : 0;
        const targetX = distance > 0 ? (dx / distance) * strength * 9 : 0;
        const targetY = distance > 0 ? (dy / distance) * strength * 9 : 0;
        dot.dx += (targetX - dot.dx) * 0.18;
        dot.dy += (targetY - dot.dy) * 0.18;
        if (Math.abs(targetX - dot.dx) + Math.abs(targetY - dot.dy) > 0.035)
          moving = true;
        ctx.fillStyle =
          surface === "light"
            ? `rgba(66,99,75,${0.16 + strength * 0.16})`
            : `rgba(174,197,160,${0.2 + strength * 0.2})`;
        ctx.beginPath();
        ctx.arc(
          dot.x + dot.dx,
          dot.y + dot.dy,
          surface === "light" ? 1.1 + strength * 0.45 : 1.25,
          0,
          Math.PI * 2,
        );
        ctx.fill();
      }
      if (moving && motion.matches) frame = requestAnimationFrame(draw);
    };
    const schedule = () => {
      if (!frame && visible && !document.hidden)
        frame = requestAnimationFrame(draw);
    };
    const resize = () => {
      const rect = host.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      if (!width || !height) return;
      const ratio = Math.min(
        devicePixelRatio || 1,
        1.5,
        Math.sqrt(2_000_000 / (width * height)),
      );
      element.width = Math.round(width * ratio);
      element.height = Math.round(height * ratio);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      dots = [];
      const gap = Math.max(
        surface === "light" ? 38 : 30,
        Math.sqrt((width * height) / (surface === "light" ? 650 : 350)),
      );
      for (let y = 18; y < height; y += gap)
        for (let x = 18; x < width; x += gap) dots.push({ x, y, dx: 0, dy: 0 });
      schedule();
    };
    const move = (event: PointerEvent) => {
      if (!motion.matches || event.pointerType !== "mouse" || !visible) return;
      const rect = host.getBoundingClientRect();
      pointerX = event.clientX - rect.left;
      pointerY = event.clientY - rect.top;
      schedule();
    };
    const leave = () => {
      pointerX = -1000;
      pointerY = -1000;
      schedule();
    };
    const visibility = () => {
      if (document.hidden) stop();
      else schedule();
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) schedule();
      else stop();
    });
    observer.observe(host);
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);
    resize();
    host.addEventListener("pointermove", move, { passive: true });
    host.addEventListener("pointerleave", leave);
    document.addEventListener("visibilitychange", visibility);
    motion.addEventListener("change", leave);
    return () => {
      stop();
      observer.disconnect();
      resizeObserver.disconnect();
      host.removeEventListener("pointermove", move);
      host.removeEventListener("pointerleave", leave);
      document.removeEventListener("visibilitychange", visibility);
      motion.removeEventListener("change", leave);
    };
  }, [surface]);
  return (
    <canvas
      ref={canvas}
      className={`gazal-dot-grid gazal-dot-grid--${surface}`}
      aria-hidden="true"
    />
  );
}
