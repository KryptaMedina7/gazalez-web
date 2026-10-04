"use client";

import { useEffect, useRef } from "react";

/** A route welcome, not page content. The native dialog owns focus/inertness. */
export function SectionIntro({ film, title }: { film: string; title: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const finishRef = useRef<(immediate?: boolean) => void>(() => {});
  const base = `/assets/section-videos/${film}`;

  useEffect(() => {
    const dialog = dialogRef.current;
    const video = videoRef.current;
    if (!dialog || !video) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    const key = `gazal-section-intro-seen:${film}`;
    let seen = false;
    try { seen = sessionStorage.getItem(key) === "1"; } catch { /* Storage is optional. */ }
    if (seen || reduce.matches || connection?.saveData) return;

    const previousOverflow = document.documentElement.style.overflow;
    let closing = false;
    let exit: Animation | undefined;
    const release = () => {
      dialog.close();
      document.documentElement.style.overflow = previousOverflow;
    };
    const finish = (immediate = false) => {
      if (closing) return;
      closing = true;
      clearTimeout(startup);
      clearTimeout(deadline);
      video.pause();
      // Moving focus to the new content avoids returning to an old menu trigger.
      const main = document.querySelector<HTMLElement>("main");
      const focusContent = () => {
        release();
        if (main) {
          const previous = main.getAttribute("tabindex");
          main.setAttribute("tabindex", "-1");
          main.focus({ preventScroll: true });
          if (previous === null) main.addEventListener("blur", () => main.removeAttribute("tabindex"), { once: true });
          else main.setAttribute("tabindex", previous);
        }
      };
      if (immediate || reduce.matches) focusContent();
      else {
        exit = dialog.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 220, easing: "ease-out", fill: "forwards" });
        exit.onfinish = focusContent;
      }
    };
    finishRef.current = finish;
    dialog.showModal();
    document.documentElement.style.overflow = "hidden";
    try {
      sessionStorage.setItem(key, "1");
      // Direct arrivals should not receive a second generic welcome afterwards.
      sessionStorage.setItem("gazal-intro-seen", "1");
    } catch { /* The skip control works without storage. */ }
    const variant = matchMedia("(max-width: 760px)").matches ? "mobile" : "desktop";
    const format = video.canPlayType('video/webm; codecs="vp9"') ? "webm" : "mp4";
    const onPlaying = () => clearTimeout(startup);
    const onEnd = () => finish();
    const onError = () => finish(true);
    const onPreference = () => { if (reduce.matches) finish(true); };
    const onVisibility = () => { if (document.hidden) finish(true); };
    video.addEventListener("playing", onPlaying);
    video.addEventListener("ended", onEnd);
    video.addEventListener("error", onError);
    reduce.addEventListener("change", onPreference);
    document.addEventListener("visibilitychange", onVisibility);
    // These are maximum waits, never mandatory delays before entering.
    const startup = setTimeout(() => finish(true), 2500);
    const deadline = setTimeout(() => finish(true), 6500);
    video.src = `${base}-${variant}.${format}`;
    video.load();
    void video.play().catch(() => finish(true));
    return () => {
      finishRef.current = () => {};
      clearTimeout(startup);
      clearTimeout(deadline);
      exit?.cancel();
      video.removeEventListener("playing", onPlaying);
      video.removeEventListener("ended", onEnd);
      video.removeEventListener("error", onError);
      reduce.removeEventListener("change", onPreference);
      document.removeEventListener("visibilitychange", onVisibility);
      video.pause();
      video.removeAttribute("src");
      video.load();
      release();
    };
  }, [base, film]);

  return (
    <dialog
      ref={dialogRef}
      className="section-intro"
      aria-label={`Introducción a ${title}`}
      onCancel={(event) => { event.preventDefault(); finishRef.current(true); }}
    >
      <div className="section-intro-atmosphere" aria-hidden="true" />
      <video ref={videoRef} poster={`${base}-poster.webp`} width={1280} height={720} muted playsInline preload="none" aria-hidden="true" />
      <div className="section-intro-footer">
        <p>{title}</p>
        <button type="button" autoFocus className="video-intro-skip" onClick={() => finishRef.current(true)}>Omitir y entrar</button>
      </div>
    </dialog>
  );
}
