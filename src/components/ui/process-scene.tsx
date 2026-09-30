"use client";

import { useEffect, useRef, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  MoveHorizontal,
  RotateCcw,
} from "lucide-react";
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
  onInteract,
}: {
  stage: number;
  instant: boolean;
  onInteract: () => void;
}) {
  const host = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const controller = useRef<MaterialScene | null>(null);
  const latest = useRef({ stage, instant });
  const [ready, setReady] = useState(false);
  const drag = useRef<{
    id: number;
    x: number;
    y: number;
    angle: number;
    tilt: number;
    touch: boolean;
    moved: boolean;
  } | null>(null);
  const [dragging, setDragging] = useState(false);

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
      drag.current = null;
      setDragging(false);
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
        tabIndex={ready ? 0 : undefined}
        aria-describedby={ready ? "material-view-help" : undefined}
        aria-label={`Transformación de materia, etapa ${stage + 1} de 4. ${stageLabels[stage].join(", ")}.`}
        onKeyDown={(e) => {
          const scene = controller.current;
          if (!scene || e.target !== e.currentTarget) return;
          const v = scene.getView();
          if (
            ![
              "ArrowLeft",
              "ArrowRight",
              "ArrowUp",
              "ArrowDown",
              "Home",
            ].includes(e.key)
          )
            return;
          e.preventDefault();
          onInteract();
          scene.setView(
            e.key === "Home"
              ? -0.38
              : v.angle +
                  (e.key === "ArrowLeft"
                    ? -0.2
                    : e.key === "ArrowRight"
                      ? 0.2
                      : 0),
            true,
            e.key === "Home"
              ? 0
              : v.tilt +
                  (e.key === "ArrowUp"
                    ? -0.08
                    : e.key === "ArrowDown"
                      ? 0.08
                      : 0),
          );
        }}
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
          data-dragging={dragging}
          aria-hidden="true"
          style={{ visibility: ready ? "visible" : "hidden" }}
          onPointerDown={(e) => {
            if (!controller.current || !e.isPrimary || e.button !== 0) return;
            const v = controller.current.getView();
            drag.current = {
              id: e.pointerId,
              x: e.clientX,
              y: e.clientY,
              ...v,
              touch: e.pointerType === "touch",
              moved: false,
            };
            e.currentTarget.setPointerCapture(e.pointerId);
          }}
          onPointerMove={(e) => {
            const p = drag.current;
            const scene = controller.current;
            if (!p || !scene || p.id !== e.pointerId) return;
            const dx = e.clientX - p.x,
              dy = e.clientY - p.y;
            if (!p.moved) {
              if (Math.hypot(dx, dy) < 6) return;
              // A vertical touch remains native page scrolling, including cancellation.
              if (p.touch && Math.abs(dy) > Math.abs(dx)) return;
              p.moved = true;
              setDragging(true);
              onInteract();
            }
            scene.setView(
              p.angle + dx * 0.009,
              true,
              p.tilt + (p.touch ? 0 : dy * 0.003),
            );
          }}
          onPointerUp={(e) => {
            if (e.currentTarget.hasPointerCapture(e.pointerId))
              e.currentTarget.releasePointerCapture(e.pointerId);
            drag.current = null;
            setDragging(false);
          }}
          onPointerCancel={() => {
            drag.current = null;
            setDragging(false);
          }}
          onLostPointerCapture={() => {
            drag.current = null;
            setDragging(false);
          }}
        />
      </div>
      <div
        className="material-toolbar"
        style={{ visibility: ready ? "visible" : "hidden" }}
      >
        <p id="material-view-help">
          <MoveHorizontal size={16} aria-hidden="true" />
          <span>
            Arrastra para girar
            <span className="sr-only">
              . Con teclado: flechas para girar e inclinar; Inicio para
              restablecer.
            </span>
          </span>
        </p>
        <div
          className="material-view-controls"
          role="group"
          aria-label="Vista 3D"
        >
          {[-1, 1].map((direction) => (
            <button
              type="button"
              key={direction}
              aria-label={
                direction < 0 ? "Girar a la izquierda" : "Girar a la derecha"
              }
              onClick={(e) => {
                onInteract();
                const scene = controller.current;
                if (scene) {
                  const v = scene.getView();
                  scene.setView(
                    v.angle + direction * 0.45,
                    e.detail === 0,
                    v.tilt,
                  );
                }
              }}
            >
              {direction < 0 ? (
                <ChevronLeft size={18} />
              ) : (
                <ChevronRight size={18} />
              )}
            </button>
          ))}
          <button
            type="button"
            aria-label="Restablecer vista"
            onClick={(e) => {
              onInteract();
              controller.current?.setView(-0.38, e.detail === 0);
            }}
          >
            <RotateCcw size={17} />
          </button>
        </div>
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
