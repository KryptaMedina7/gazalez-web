"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play, RotateCcw } from "lucide-react";

export type SectionFilmId = "avicola" | "nucleos" | "innovacion";
const descriptions = {
  avicola: "Animación de GAZAL: una gallina se acerca a un comedero en el campo.",
  nucleos: "Animación de GAZAL: gránulos caen sobre una bandeja en un entorno rural.",
  innovacion: "Animación de GAZAL: cadenas de ADN giran alrededor de la marca.",
};

function loadFilm(video: HTMLVideoElement, base: string) {
  if (video.getAttribute("src")) return;
  const variant = window.matchMedia("(max-width: 760px)").matches ? "mobile" : "desktop";
  const format = video.canPlayType('video/webm; codecs="vp9"') ? "webm" : "mp4";
  video.src = `${base}-${variant}.${format}`;
  video.load();
}

/** One short film per route. Offscreen, reduced motion and data saving keep it still. */
export function SectionFilm({ film }: { film: SectionFilmId }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const manuallyPaused = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [ended, setEnded] = useState(false);
  const [failed, setFailed] = useState(false);
  const base = `/assets/section-videos/${film}`;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    let visible = false;
    let disposed = false;
    const update = () => {
      if (!visible || document.hidden || motion.matches || connection?.saveData || document.querySelector(".brand-opening")) {
        video.pause();
        return;
      }
      if (!manuallyPaused.current && !video.ended && !video.error) {
        // Assign only when visible: skipped animations do not fetch video bytes.
        loadFilm(video, base);
        void video.play().then(() => {
          if (disposed || !visible || document.hidden || motion.matches) video.pause();
        }).catch(() => { /* Autoplay denial leaves an explicit play control. */ });
      }
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting && entry.intersectionRatio >= 0.35;
      update();
    }, { threshold: [0, 0.35] });
    observer.observe(video);
    // A direct visit can show the welcome above this page; wait for its removal.
    const openingObserver = new MutationObserver(() => {
      if (!document.querySelector(".brand-opening")) {
        openingObserver.disconnect();
        update();
      }
    });
    if (document.querySelector(".brand-opening")) openingObserver.observe(document.body, { childList: true });
    document.addEventListener("visibilitychange", update);
    motion.addEventListener("change", update);
    return () => {
      disposed = true;
      observer.disconnect();
      openingObserver.disconnect();
      document.removeEventListener("visibilitychange", update);
      motion.removeEventListener("change", update);
      video.pause();
      video.removeAttribute("src");
      video.load();
    };
  }, [base]);

  const toggle = () => {
    const video = videoRef.current;
    if (!video) return;
    if (!video.paused) {
      manuallyPaused.current = true;
      video.pause();
    } else {
      manuallyPaused.current = false;
      loadFilm(video, base);
      void video.play().catch(() => { /* Keep the still and allow another attempt. */ });
    }
  };

  return (
    <figure className="section-film">
      <video
        ref={videoRef}
        poster={`${base}-poster.webp`}
        width={1280}
        height={720}
        muted
        playsInline
        preload="none"
        aria-label={descriptions[film]}
        onPlay={() => { setPlaying(true); setEnded(false); }}
        onPause={() => setPlaying(false)}
        onEnded={() => { setEnded(true); setPlaying(false); }}
        onError={() => { setFailed(true); setPlaying(false); }}
      />
      <figcaption>
        {failed ? (
          <span role="status">La animación no está disponible. Puedes seguir explorando la página.</span>
        ) : (
          <button type="button" className="section-film-control" onClick={toggle} aria-label={`${playing ? "Pausar" : ended ? "Repetir" : "Reproducir"} animación`}>
            {playing ? <Pause aria-hidden="true" /> : ended ? <RotateCcw aria-hidden="true" /> : <Play aria-hidden="true" />}
            {playing ? "Pausar" : ended ? "Repetir" : "Reproducir"}
          </button>
        )}
      </figcaption>
    </figure>
  );
}
