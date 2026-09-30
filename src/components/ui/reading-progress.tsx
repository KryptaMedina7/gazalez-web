"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/** Reading position follows native scroll directly, without a smoothing loop. */
export function ReadingProgress() {
  const fill = useRef<HTMLSpanElement>(null);
  const path = usePathname();
  useEffect(() => {
    let frame = 0;
    let distance = 1;
    const paint = () => {
      frame = 0;
      if (!fill.current || document.hidden) return;
      const progress = Math.max(0, Math.min(1, scrollY / distance));
      fill.current.style.transform = `scaleX(${progress})`;
    };
    const schedule = () => {
      if (!frame && !document.hidden) frame = requestAnimationFrame(paint);
    };
    const resize = () => {
      distance = Math.max(
        1,
        document.documentElement.scrollHeight - innerHeight,
      );
      schedule();
    };
    const observer = new ResizeObserver(resize);
    observer.observe(document.body);
    addEventListener("scroll", schedule, { passive: true });
    addEventListener("resize", resize, { passive: true });
    document.addEventListener("visibilitychange", schedule);
    resize();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      removeEventListener("scroll", schedule);
      removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", schedule);
    };
  }, [path]);
  return (
    <div className="reading-progress" aria-hidden="true">
      <span ref={fill} />
    </div>
  );
}
