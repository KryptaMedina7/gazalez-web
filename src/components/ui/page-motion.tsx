"use client";
import { useCallback, useEffect, useLayoutEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import gsap from "gsap";
import { motionPolicy } from "@/lib/motion-policy";

export function PageMotion() {
  const path = usePathname();
  const previousPath = useRef(path);
  const router = useRouter();
  const curtain = useRef<HTMLDivElement>(null);
  const pending = useRef<string | null>(null);
  const tween = useRef<gsap.core.Tween | null>(null);
  const watchdog = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reveal = useCallback(() => {
    if (watchdog.current) clearTimeout(watchdog.current);
    pending.current = null;
    const root = curtain.current;
    if (!root) return;
    tween.current?.kill();
    root.dataset.phase = "revealing";
    tween.current = gsap.to(root.children, {
      x: 0,
      xPercent: -101,
      duration: motionPolicy.routeReveal,
      stagger: 0.035,
      ease: "power3.inOut",
      onComplete: () => {
        root.dataset.phase = "idle";
      },
    });
  }, []);

  useEffect(() => {
    const root = curtain.current;
    if (!root) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)");
    const panels = root.children;
    const follow = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        event.detail === 0 ||
        reduce.matches
      )
        return;
      const link = (event.target as Element)?.closest<HTMLAnchorElement>(
        "a[href]",
      );
      if (
        !link ||
        link.hasAttribute("download") ||
        (link.target && link.target !== "_self")
      )
        return;
      const destination = new URL(link.href, location.href);
      if (
        destination.origin !== location.origin ||
        destination.pathname === location.pathname
      )
        return;
      event.preventDefault();
      tween.current?.kill();
      if (watchdog.current) clearTimeout(watchdog.current);
      // Cover before changing the route, then reveal only when the new route commits.
      if (!pending.current) gsap.set(panels, { x: 0, xPercent: 101 });
      pending.current = destination.pathname;
      root.dataset.phase = "covering";
      tween.current = gsap.to(panels, {
        x: 0,
        xPercent: 0,
        duration: 0.18,
        stagger: 0.025,
        ease: "power2.out",
        onComplete: () => {
          root.dataset.phase = "navigating";
          router.push(
            destination.pathname + destination.search + destination.hash,
            { scroll: false },
          );
        },
      });
      watchdog.current = setTimeout(reveal, 1500);
    };
    const stopMotion = () => {
      if (!reduce.matches) return;
      tween.current?.kill();
      if (watchdog.current) clearTimeout(watchdog.current);
      gsap.set(panels, { x: 0, xPercent: -101 });
      pending.current = null;
      root.dataset.phase = "idle";
    };
    document.addEventListener("click", follow, true);
    reduce.addEventListener("change", stopMotion);
    return () => {
      document.removeEventListener("click", follow, true);
      reduce.removeEventListener("change", stopMotion);
      tween.current?.kill();
      if (watchdog.current) clearTimeout(watchdog.current);
    };
  }, [router, reveal]);

  useLayoutEffect(() => {
    let frame = 0;
    let settle: ReturnType<typeof setTimeout> | undefined;
    let userMoved = false;
    const cancelReset = () => {
      userMoved = true;
    };
    const reset = () => {
      if (userMoved || window.location.hash) return;
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    };
    if (previousPath.current !== path) {
      previousPath.current = path;
      reset();
      // Wait for Next's layout work and the outgoing dialog's focus restoration.
      // A real user scroll cancels settlement, so reading is never pulled back.
      window.addEventListener("wheel", cancelReset, { passive: true });
      window.addEventListener("touchstart", cancelReset, { passive: true });
      window.addEventListener("keydown", cancelReset);
      frame = requestAnimationFrame(() => {
        frame = requestAnimationFrame(() => {
          reset();
          settle = setTimeout(reset, 360);
        });
      });
    }
    if (pending.current === path) reveal();
    return () => {
      cancelAnimationFrame(frame);
      if (settle) clearTimeout(settle);
      window.removeEventListener("wheel", cancelReset);
      window.removeEventListener("touchstart", cancelReset);
      window.removeEventListener("keydown", cancelReset);
    };
  }, [path, reveal]);

  return (
    <div
      className="page-curtain"
      aria-hidden="true"
      data-phase="idle"
      ref={curtain}
    >
      <span className="page-curtain-panel" />
      <span className="page-curtain-panel" />
      <span className="page-curtain-panel" />
    </div>
  );
}
