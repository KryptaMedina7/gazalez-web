"use client";

import { useEffect, useRef, useState } from "react";
import { RotateCcw, Rotate3D } from "lucide-react";
import { materialIndices, materialPosition } from "@/lib/process-volume.mjs";
import type { MaterialScene } from "@/lib/material-scene";

const colors = ["#285540", "#73966c", "#aec5a0"];
const stageLabels = [
  ["Origen", "Composición", "Antecedentes"],
  ["Fracción 1", "Fracción 2", "Fracción 3"],
  ["Composición", "Objetivo", "Aplicación"],
  ["Origen", "Proceso", "Aplicación"],
];

export function ProcessScene({
  stage,
  instant,
}: {
  stage: number;
  instant: boolean;
}) {
  const host = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const controller = useRef<MaterialScene | null>(null);
  const latest = useRef({ stage, instant });
  const [ready, setReady] = useState(false);
  const [turned, setTurned] = useState(false);

  useEffect(() => {
    latest.current = { stage, instant };
    controller.current?.setStage(stage, instant);
  }, [stage, instant]);

  useEffect(() => {
    const element = canvas.current;
    const container = host.current;
    if (!element || !container) return;
    let cancelled = false;
    let loading = false;
    let failed = false;
    let visible = false;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)");
    const destroy = () => {
      controller.current?.dispose();
      controller.current = null;
      setReady(false);
      setTurned(false);
    };
    const sync = async () => {
      controller.current?.setActive(visible && !document.hidden);
      if (
        reduce.matches ||
        document.hidden ||
        !visible ||
        controller.current ||
        loading ||
        failed
      )
        return;
      loading = true;
      try {
        const { createMaterialScene } = await import("@/lib/material-scene");
        if (cancelled || reduce.matches) return;
        const scene = createMaterialScene(element, () => {
          failed = true;
          destroy();
        });
        controller.current = scene;
        scene.setStage(latest.current.stage, true);
        scene.setActive(visible && !document.hidden);
        setReady(true);
      } catch {
        failed = true;
        destroy();
      } finally {
        loading = false;
      }
    };
    const preference = () => {
      if (reduce.matches) destroy();
      else void sync();
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        void sync();
      },
      { rootMargin: "80px" },
    );
    observer.observe(container);
    document.addEventListener("visibilitychange", sync);
    reduce.addEventListener("change", preference);
    return () => {
      cancelled = true;
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
      reduce.removeEventListener("change", preference);
      controller.current?.dispose();
      controller.current = null;
    };
  }, []);

  return (
    <div
      className="material-explorer"
      ref={host}
      data-renderer={ready ? "webgl" : "svg"}
    >
      <div
        className="material-viewport"
        role="group"
        aria-label={`Transformación de materia, etapa ${stage + 1} de 4. ${stageLabels[stage].join(", ")}.`}
      >
        <svg
          className="material-fallback"
          viewBox="0 0 600 380"
          aria-hidden="true"
          style={{ visibility: ready ? "hidden" : "visible" }}
        >
          <ellipse cx="300" cy="292" rx="200" ry="48" fill="#c7d8bd" />
          {materialIndices(true, false).map((i) => {
            const p = materialPosition(stage, i);
            const x = 300 + p.x * 65;
            const y = 245 - p.y * 55 + p.z * 25;
            return (
              <circle
                key={i}
                cx={x}
                cy={y}
                r={5 + (i % 3)}
                fill={colors[i % 3]}
                stroke="#edf3e9"
                strokeWidth="1"
              />
            );
          })}
        </svg>
        <canvas
          ref={canvas}
          className="material-canvas"
          aria-hidden="true"
          style={{ visibility: ready ? "visible" : "hidden" }}
        />
        {ready && (
          <button
            type="button"
            className="material-rotate"
            aria-pressed={turned}
            onClick={(e) => {
              controller.current?.setView(turned ? 0 : 0.6, e.detail === 0);
              setTurned(!turned);
            }}
          >
            {turned ? <RotateCcw size={17} /> : <Rotate3D size={17} />}
            {turned ? "Restablecer vista" : "Girar vista"}
          </button>
        )}
      </div>
      <div className="material-labels" aria-hidden="true">
        {stageLabels[stage].map((label, i) => (
          <span key={i}>
            <i style={{ background: colors[i] }} />
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}
