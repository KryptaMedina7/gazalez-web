"use client";
import { useCallback, useEffect, useRef, useState } from "react";

/** A document-entry welcome. Client-side route changes do not replay it. */
export function BrandIntro() {
  const [visible, setVisible] = useState(true);
  const [leaving, setLeaving] = useState(false);
  const video = useRef<HTMLVideoElement>(null);
  const overlay = useRef<HTMLDivElement>(null);
  const skip = useRef<HTMLButtonElement>(null);
  const finishing = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dismiss = useCallback((immediate = false) => {
    if (finishing.current) return;
    finishing.current = true;
    try {
      sessionStorage.setItem("gazal-intro-seen", "1");
    } catch {
      /* Storage may be unavailable. */
    }
    video.current?.pause();
    if (immediate) setVisible(false);
    else {
      setLeaving(true);
      timer.current = setTimeout(() => setVisible(false), 180);
    }
  }, []);

  useEffect(() => {
    if (!visible) return;
    const media = video.current;
    const root = overlay.current;
    if (!media || !root) return;
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

    // Keep the destination at its opening while the welcome owns interaction.
    // Preserve explicit deep links; never redirect a visitor's requested route.
    if (!location.hash)
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    const previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    const siblings = Array.from(document.body.children).filter(
      (element): element is HTMLElement =>
        element instanceof HTMLElement && element !== root,
    );
    const previousInert = siblings.map((element) => element.inert);
    siblings.forEach((element) => {
      element.inert = true;
    });
    const previousFocus = document.activeElement;
    skip.current?.focus({ preventScroll: true });

    let cancelled = false;
    let lastTime = -1;
    let lastProgress = performance.now();
    const watchdog = setInterval(() => {
      // Background tabs can suspend playback; do not count that as a failure.
      if (document.hidden || media.currentTime !== lastTime) {
        lastTime = media.currentTime;
        lastProgress = performance.now();
      } else if (performance.now() - lastProgress > 4000) dismiss(true);
    }, 1000);
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

    // Assign only after checking reduced motion, avoiding an unwanted download.
    media.muted = true;
    const portrait = matchMedia(
      "(max-width: 800px) and (orientation: portrait)",
    ).matches;
    media.poster = portrait
      ? "/assets/intro/gazal-welcome-mobile-poster.webp"
      : "/assets/intro/gazal-welcome-poster.webp";
    media.src = portrait
      ? "/assets/intro/gazal-welcome-mobile-portrait.mp4"
      : "/assets/intro/gazal-welcome.mp4";
    void media.play().catch(() => {
      if (!cancelled) dismiss(true);
    });

    return () => {
      cancelled = true;
      clearInterval(watchdog);
      if (timer.current) clearTimeout(timer.current);
      media.pause();
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
      className={`video-intro ${leaving ? "is-leaving" : ""}`}
      data-testid="brand-intro"
      role="dialog"
      aria-modal="true"
      aria-label="Bienvenida a GAZAL"
    >
      <video
        ref={video}
        className="video-intro-film"
        width={1920}
        height={1080}
        muted
        playsInline
        preload="none"
        aria-hidden="true"
        disablePictureInPicture
        onEnded={() => dismiss()}
        onError={() => dismiss(true)}
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
