// Restored from the owner-provided official website, 2026-10-01.
// Geometry and stages preserved; uses the existing React runtime, not the bundled copy.
"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
var clamp = (A, U = 0, G = 1) => Math.min(G, Math.max(U, A)),
  smoothstep = (A) => A * A * (3 - 2 * A),
  range = (A, U, G) => smoothstep(clamp((A - U) / (G - U))),
  lerp = (A, U, G) => A + (U - A) * G,
  interval = (A, U, G, Z = 0.05) =>
    range(A, U - Z, U) * (1 - range(A, G, G + Z)),
  centerX = 450,
  centerY = 300,
  nodes = [
    [105, -8, 6],
    [160, -42, 4],
    [240, -48, 4],
    [320, -25, 6],
    [350, 12, 4],
    [285, 44, 4],
    [205, 51, 6],
    [130, 28, 4],
    [190, -8, 4],
    [265, 10, 6],
    [220, 28, 4],
    [150, 7, 4],
  ],
  bonds = [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 4],
    [4, 5],
    [5, 6],
    [6, 7],
    [7, 0],
    [0, 8],
    [1, 8],
    [2, 8],
    [2, 9],
    [3, 9],
    [4, 9],
    [5, 10],
    [6, 10],
    [7, 11],
    [8, 11],
    [8, 9],
    [9, 10],
    [10, 11],
    [6, 11],
  ],
  water = [
    [115, -4, 12],
    [172, -30, 18],
    [254, -33, 14],
    [321, -4, 18],
    [270, 29, 12],
    [190, 25, 16],
    [228, -2, 10],
  ],
  waterTargets = [
    [128, 8],
    [178, -22],
    [262, -20],
    [318, 4],
    [252, 30],
    [176, 30],
    [226, 4],
  ],
  bacteria = [
    [135, -4, -34],
    [202, -27, 24],
    [287, -13, -30],
    [302, 25, 30],
    [211, 30, -32],
  ],
  bacteriaTargets = [
    [146, 16, -20],
    [214, -20, 40],
    [292, -8, -50],
    [292, 26, 15],
    [204, 38, -10],
  ],
  cards = {
    matriz: {
      tag: "Componente 01",
      title: "Matriz de hidrogel",
      body: "Estructura basada en biopolímeros, estudiados por su capacidad para retener agua.",
      note: "Representación conceptual sin escala.",
    },
    agua: {
      tag: "Componente 02",
      title: "Retención hídrica",
      body: "El hidrogel absorbe y retiene agua. La tecnología busca abordar el déficit hídrico a partir de ese comportamiento.",
      note: "Representación conceptual, no una simulación.",
    },
    bacterias: {
      tag: "Componente 03",
      title: "Bacterias benéficas",
      body: "Microorganismos incorporados a la matriz para explorar su aplicación en plantas.",
      note: "Las especies utilizadas no están publicadas en las fuentes disponibles.",
    },
    raiz: {
      tag: "Aplicación",
      title: "Zona radicular",
      body: "HIDROBAC está orientada a mitigar el estrés hídrico en plantas, en la zona donde se desarrolla la raíz.",
      note: "Los resultados dependen de la validación y de las condiciones de aplicación.",
    },
    evidencia: {
      tag: "Resultados experimentales / laboratorio",
      title: "Evidencia",
      body: "Tecnología desarrollada en la Facultad de Agronomía de la Universidad de Concepción y licenciada a Gazalez e Hija durante 2025, hito público confirmado. Las fuentes del proyecto aún no publican resultados experimentales validados; se incorporarán cuando exista respaldo.",
      note: "No constituye una garantía comercial ni una certificación de desempeño.",
    },
  },
  chapters = [
    {
      label: "Sistema",
      at: 0,
    },
    {
      label: "Matriz",
      at: 0.2,
      card: "matriz",
    },
    {
      label: "Agua",
      at: 0.45,
      card: "agua",
    },
    {
      label: "Bacterias",
      at: 0.66,
      card: "bacterias",
    },
    {
      label: "Raíz",
      at: 0.84,
      card: "raiz",
    },
    {
      label: "Evidencia",
      at: 1,
      card: "evidencia",
    },
  ],
  duration = 14000;
export function HydrobacLab() {
  const seekTween = useRef(null);
  useEffect(() => () => seekTween.current?.kill(), []);
  let [progress, setProgress] = useState(0),
    [time, setTime] = useState(0),
    [playing, setPlaying] = useState(false),
    [card, setCard] = useState(null),
    [visible, setVisible] = useState(false),
    root = useRef(null),
    progressRef = useRef(0);
  useEffect(() => {
    progressRef.current = progress;
  }, [progress]);
  useEffect(() => {
    let I = root.current;
    if (!I) return;
    let g = new IntersectionObserver(
      ([B0]) => setVisible(!!B0?.isIntersecting),
      {
        threshold: 0.05,
      },
    );
    return (g.observe(I), () => g.disconnect());
  }, []);
  useEffect(() => {
    if (!visible || !playing) return;
    let I = window.matchMedia("(prefers-reduced-motion: reduce)").matches,
      g = 0,
      B0 = performance.now(),
      i = (U0) => {
        let HA = Math.min(U0 - B0, 50);
        B0 = U0;
        if (document.hidden) {
          g = requestAnimationFrame(i);
          return;
        }
        if (!I) setTime((SA) => SA + HA / 1000);
        if (playing) {
          let SA = Math.min(1, progressRef.current + HA / duration);
          if ((setProgress(SA), SA >= 1)) setPlaying(false);
        }
        g = requestAnimationFrame(i);
      };
    return ((g = requestAnimationFrame(i)), () => cancelAnimationFrame(g));
  }, [visible, playing]);
  useEffect(() => {
    let I = (g) => g.key === "Escape" && setCard(null);
    return (
      window.addEventListener("keydown", I),
      () => window.removeEventListener("keydown", I)
    );
  }, []);
  let seek = (I, immediate = false) => {
      setPlaying(false);
      seekTween.current?.kill();
      if (immediate || matchMedia("(prefers-reduced-motion: reduce)").matches)
        setProgress(clamp(I));
      else {
        const cursor = { value: progressRef.current };
        seekTween.current = gsap.to(cursor, {
          value: clamp(I),
          duration: 0.65,
          ease: "power2.inOut",
          onUpdate: () => setProgress(cursor.value),
        });
      }
    },
    Q = range(progress, 0, 0.25),
    j = range(progress, 0.7, 0.86),
    f = range(progress, 0.27, 0.48),
    v = range(progress, 0.5, 0.69),
    W = range(progress, 0.7, 0.85),
    B = range(progress, 0.78, 0.98),
    q = lerp(lerp(1, 1.5, Q), 0.46, j),
    _ = lerp(lerp(0, 40, Q), 30, j),
    V = 1 + Math.sin(time * 1.1) * 0.006 * (1 - j * 0.5),
    C = 24 + 92 * Q - 70 * range(progress, 0.3, 0.62),
    F = (1 + 0.07 * f) * V,
    x = `translate(${centerX} ${centerY + _}) scale(${q}) translate(${-centerX} ${-centerY})`,
    T = (I, g) => [
      centerX + (I - centerX) * q,
      centerY + _ + (g - centerY) * q,
    ],
    k = centerY - C,
    a0 = centerY - C * 2,
    JU = 1 - 0.6 * Q,
    YU = (I) => I + 225,
    B9 = [
      {
        id: "matriz",
        ...point(T(centerX + 175 * F, centerY - 10)),
        o: interval(progress, 0.1, 0.3),
      },
      {
        id: "agua",
        ...point(T(centerX + 60, centerY - 40)),
        o: interval(progress, 0.34, 0.52),
      },
      {
        id: "bacterias",
        ...point(T(centerX - 90, centerY + 20)),
        o: interval(progress, 0.58, 0.74),
      },
      {
        id: "raiz",
        ...point(T(centerX + 170, centerY + 360)),
        o: range(progress, 0.88, 0.95),
      },
    ],
    W9 = [
      {
        text: "Matriz de hidrogel",
        o: interval(progress, 0.08, 0.3),
        at: T(centerX - 175 * F, centerY),
      },
      {
        text: "Retención hídrica",
        o: interval(progress, 0.33, 0.52),
        at: T(centerX - 175 * F, centerY - 6),
      },
      {
        text: "Bacterias benéficas",
        o: interval(progress, 0.56, 0.74),
        at: T(centerX - 175 * F, centerY + 4),
      },
      {
        text: "Aplicación",
        o: range(progress, 0.86, 0.94),
        at: T(centerX - 200, centerY - 40),
      },
    ],
    percent = (progress * 100).toFixed(1),
    activeChapter = chapters.reduce(
      (I, g, B0) => (progress >= g.at - 0.04 ? B0 : I),
      0,
    );
  return (
    <section
      ref={root}
      className="hb-lab"
      aria-label="Explorador interactivo HIDROBAC"
    >
      <header className="hb-lab-head">
        <span
          className="hb-lab-eyebrow"
          style={{
            opacity: 1 - range(progress, 0.02, 0.1) * 0.55,
          }}
        >
          {"Explorar HIDROBAC"}
        </span>
        <h2>{"Una tecnología, cinco niveles de lectura."}</h2>
        <p>
          {
            "Arrastra la línea para recorrer la escena: del sistema completo a su aplicación en la raíz."
          }
        </p>
      </header>
      <div className="hb-lab-stage">
        <svg
          viewBox="0 0 900 600"
          role="img"
          aria-label={`Representación conceptual de HIDROBAC al ${percent}%`}
        >
          <defs>
            <linearGradient id="hbl-gel" x1="0" y1="0" x2="0.8" y2="1">
              <stop stopColor="#eff8e0" />
              <stop offset="1" stopColor="#86ad82" />
            </linearGradient>
            <linearGradient id="hbl-water" x1="0" y1="0" x2="0.8" y2="1">
              <stop stopColor="#effcf5" />
              <stop offset="1" stopColor="#6eafa5" />
            </linearGradient>
            <linearGradient id="hbl-soil" x1="0" y1="0" x2="0" y2="1">
              <stop stopColor="#c9b894" />
              <stop offset="0.35" stopColor="#a58f69" />
              <stop offset="1" stopColor="#6f5f45" />
            </linearGradient>
            <radialGradient id="hbl-halo">
              <stop stopColor="#dcebc9" stopOpacity="0.9" />
              <stop offset="1" stopColor="#dcebc9" stopOpacity="0" />
            </radialGradient>
          </defs>
          <g transform={x}>
            <g opacity={W}>
              <rect
                x={-700}
                y={-120}
                width={2300}
                height={1300}
                fill="url(#hbl-soil)"
              />
              <path
                d="M-700 -120 Q 0 -150 450 -122 T 1600 -118"
                stroke="#6b5a3e"
                strokeWidth={4}
                fill="none"
              />
              {Array.from({
                length: 70,
              }).map((I, g) => {
                let B0 = ((g * 137) % 2200) - 650,
                  i = ((g * 89) % 1100) - 80;
                return (
                  <circle
                    cx={B0}
                    cy={i}
                    r={3 + (g % 4) * 2.2}
                    fill="#5d4f38"
                    opacity={0.28}
                    key={g}
                  />
                );
              })}
              <path
                d="M450 -122 C 445 -220 470 -300 455 -390"
                stroke="#4d7a44"
                strokeWidth={10}
                fill="none"
                strokeLinecap="round"
              />
              <path
                d="M455 -300 C 520 -330 560 -320 600 -360 C 540 -370 490 -350 455 -300Z"
                fill="#6f9a5c"
              />
              <path
                d="M452 -250 C 390 -280 350 -270 310 -300 C 370 -315 420 -300 452 -250Z"
                fill="#7ea866"
              />
            </g>
            <g opacity={W}>
              {[
                "M450 -122 C 440 40 470 160 430 300 C 400 430 460 560 440 760",
                "M446 20 C 380 60 320 90 250 170",
                "M455 120 C 540 160 610 180 690 270",
                "M432 330 C 360 380 300 420 230 520",
                "M438 480 C 520 520 580 560 640 660",
              ].map((I, g) => (
                <path
                  d={I}
                  pathLength={1}
                  stroke="#e9dcc0"
                  strokeWidth={g === 0 ? 12 : 6}
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={1}
                  strokeDashoffset={1 - clamp(B * 1.25 - g * 0.12)}
                  key={g}
                />
              ))}
              <circle
                cx={centerX}
                cy={centerY}
                r={340}
                fill="url(#hbl-halo)"
                opacity={range(progress, 0.86, 1) * 0.8}
              />
            </g>
            <g
              transform={`translate(0 ${a0 - centerY})`}
              opacity={(1 - v) * JU * (1 - range(progress, 0.45, 0.5) * 0.3)}
            >
              <ellipse
                cx={centerX}
                cy={centerY + 12}
                rx={165}
                ry={66}
                fill="#a5bea0"
              />
              <ellipse
                cx={centerX}
                cy={centerY}
                rx={165}
                ry={66}
                fill="#e4eed8"
                stroke="#678e60"
                strokeWidth={1.5}
              />
            </g>
            <g transform={`translate(0 ${k - centerY})`} opacity={(1 - f) * JU}>
              <ellipse
                cx={centerX}
                cy={centerY + 12}
                rx={165}
                ry={66}
                fill="#a1c9bd"
              />
              <ellipse
                cx={centerX}
                cy={centerY}
                rx={165}
                ry={66}
                fill="#d1e7dd"
                stroke="#57948a"
                strokeWidth={1.5}
              />
            </g>
            <g
              transform={`translate(${centerX} ${centerY}) scale(${F}) translate(${-centerX} ${-centerY})`}
            >
              <ellipse
                cx={centerX}
                cy={centerY + 12}
                rx={165}
                ry={66}
                fill="#a5bea0"
              />
              <ellipse
                cx={centerX}
                cy={centerY}
                rx={165}
                ry={66}
                fill="url(#hbl-gel)"
                stroke="#678e60"
                strokeWidth={1.5}
              />
              <ellipse
                cx={centerX}
                cy={centerY}
                rx={160}
                ry={62}
                fill="#9fd0c3"
                opacity={f * 0.35}
              />
              <g stroke="#436e4d" strokeWidth={2}>
                {bonds.map(([I, g], B0) => {
                  let i = nodes[I ?? 0],
                    U0 = nodes[g ?? 0],
                    HA = Math.sin(time * 0.8 + B0) * 0.8;
                  return (
                    <line
                      x1={YU(i[0])}
                      y1={centerY + i[1] + HA}
                      x2={YU(U0[0])}
                      y2={centerY + U0[1] - HA}
                      key={B0}
                    />
                  );
                })}
              </g>
              <g fill="#315e40" stroke="#edf5e4" strokeWidth={2}>
                {nodes.map(([I, g, B0], i) => (
                  <circle
                    cx={YU(I)}
                    cy={centerY + g + Math.sin(time + i) * 0.8}
                    r={B0}
                    key={i}
                  />
                ))}
              </g>
            </g>
            <g opacity={JU + (1 - JU) * f}>
              {water.map(([I, g, B0], i) => {
                let U0 = range(progress, 0.27 + i * 0.018, 0.44 + i * 0.012),
                  HA = lerp(YU(I), YU(waterTargets[i][0]), U0),
                  SA = Math.sin(U0 * Math.PI) * -26,
                  W6 =
                    lerp(k + g, centerY + waterTargets[i][1], U0) +
                    SA +
                    Math.sin(time * 1.3 + i) * 1.2,
                  fG =
                    lerp(B0, B0 * 0.72, U0) *
                    (1 + 0.04 * Math.sin(time * 2 + i));
                return (
                  <g transform={`translate(${HA} ${W6})`} key={i}>
                    <circle
                      r={fG}
                      fill="url(#hbl-water)"
                      stroke="#367c75"
                      strokeWidth={1.5}
                      opacity={0.95 - U0 * 0.2}
                    />
                    <path
                      d={`M${-fG * 0.4} ${-fG * 0.35}q3 -5 7 -4`}
                      stroke="#f5fff9"
                      strokeWidth={2.5}
                      strokeLinecap="round"
                      fill="none"
                    />
                  </g>
                );
              })}
            </g>
            <g>
              {bacteria.map(([I, g, B0], i) => {
                let U0 = range(progress, 0.5 + i * 0.02, 0.64 + i * 0.012),
                  [HA, SA, W6] = bacteriaTargets[i],
                  fG =
                    lerp(YU(I), YU(HA), U0) +
                    Math.sin(time * 0.9 + i * 2) * 1.6 * U0,
                  M9 =
                    lerp(a0 + g, centerY + SA, U0) +
                    Math.cos(time * 1.1 + i) * 1.2 * U0,
                  q9 = lerp(B0, W6, U0) + Math.sin(time * 0.7 + i) * 4 * U0,
                  w9 = lerp(0.75, 0.62, U0),
                  Q9 =
                    lerp(JU * 0.85, 1, U0) *
                    (0.35 + 0.65 * Math.max(1 - Q * 0.8, U0));
                return (
                  <g
                    transform={`translate(${fG} ${M9}) rotate(${q9}) scale(${w9})`}
                    opacity={Q9}
                    key={i}
                  >
                    <rect
                      x={-8}
                      y={-20}
                      width={16}
                      height={40}
                      rx={8}
                      fill="#234c36"
                      stroke="#a8c791"
                      strokeWidth={2}
                    />
                    <path
                      d="M-2 -10v18"
                      stroke="#d2e5bc"
                      strokeWidth={2}
                      strokeLinecap="round"
                    />
                  </g>
                );
              })}
            </g>
          </g>
          {W9.map((I) =>
            I.o > 0.01 ? (
              <g opacity={I.o} className="hb-lab-label" key={I.text}>
                <path d={`M${I.at[0] - 8} ${I.at[1]}H24`} stroke="#688468" />
                <text x={24} y={I.at[1] - 12}>
                  {I.text}
                </text>
              </g>
            ) : null,
          )}
          {B9.map((I) =>
            I.o > 0.05 ? (
              <g
                className="hb-lab-hot"
                transform={`translate(${I.x} ${I.y})`}
                opacity={I.o}
                role="button"
                tabIndex={0}
                aria-label={`Ver ${cards[I.id].title}`}
                onClick={() => setCard(I.id)}
                onKeyDown={(g) =>
                  (g.key === "Enter" || g.key === " ") && setCard(I.id)
                }
                key={I.id}
              >
                <circle
                  r={16 + Math.sin(time * 2) * 1.5}
                  className="hb-lab-hot-pulse"
                />
                <circle r={12} className="hb-lab-hot-dot" />
                <path
                  d="M-5 0H5M0 -5V5"
                  stroke="currentColor"
                  strokeWidth={1.8}
                  strokeLinecap="round"
                />
              </g>
            ) : null,
          )}
        </svg>
        <ol
          className="hb-lab-transfer"
          style={{
            opacity: range(progress, 0.9, 1),
            transform: `translateY(${(1 - range(progress, 0.9, 1)) * 10}px)`,
          }}
          aria-hidden={progress < 0.9}
        >
          <li>{"Investigación"}</li>
          <li aria-hidden="true">{"→"}</li>
          <li>{"Tecnología"}</li>
          <li aria-hidden="true">{"→"}</li>
          <li>{"Industria"}</li>
        </ol>
        {progress >= 0.9 && (
          <button
            type="button"
            className="hb-lab-evidence"
            onClick={() => setCard("evidencia")}
          >
            {"+ Evidencia"}
          </button>
        )}
        {card && (
          <div
            className="hb-lab-card"
            role="dialog"
            aria-label={cards[card].title}
          >
            <button
              type="button"
              className="hb-lab-card-close"
              aria-label="Cerrar"
              onClick={() => setCard(null)}
            >
              {"×"}
            </button>
            <span className="hb-lab-card-tag">{cards[card].tag}</span>
            <h3>{cards[card].title}</h3>
            <p>{cards[card].body}</p>
            {cards[card].note && <small>{cards[card].note}</small>}
            {card === "evidencia" && (
              <a
                className="text-link"
                href="https://es.linkedin.com/posts/facultad-de-agronom%C3%ADa-udec_felicitamos-con-orgullo-a-nuestros-acad%C3%A9micos-activity-7422318170062954496-X-u-"
                target="_blank"
                rel="noreferrer"
              >
                {"Consultar la fuente UdeC ↗"}
              </a>
            )}
          </div>
        )}
      </div>
      <div className="hb-lab-timeline">
        <button
          type="button"
          className="hb-lab-play"
          onClick={() => {
            seekTween.current?.kill();
            if (playing) return setPlaying(false);
            if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
              seek(chapters[(activeChapter + 1) % chapters.length].at);
              return;
            }
            if (progress >= 1) setProgress(0);
            setCard(null);
            setPlaying(true);
          }}
        >
          {playing ? "❚❚ Pausa" : "▶ Explorar animación"}
        </button>
        <div className="hb-lab-track">
          <input
            type="range"
            min={0}
            max={1000}
            value={Math.round(progress * 1000)}
            aria-label="Progreso de exploración HIDROBAC"
            aria-valuetext={`${percent}% · ${chapters[activeChapter].label}`}
            onPointerDown={() => setPlaying(false)}
            onChange={(I) => seek(Number(I.target.value) / 1000, true)}
            style={{
              ["--hb-p"]: `${progress * 100}%`,
            }}
          />
          <ol>
            {chapters.map((I, g) => (
              <li
                style={{
                  left: `${I.at * 100}%`,
                }}
                data-active={g === activeChapter || void 0}
                key={I.label}
              >
                <button
                  type="button"
                  onClick={() => {
                    seek(I.at);
                    setCard(I.card ?? null);
                  }}
                >
                  {I.label}
                </button>
              </li>
            ))}
          </ol>
        </div>
        <span className="hb-lab-pct">
          {percent}
          {"%"}
        </span>
      </div>
      <span className="form-help">
        {
          "Representación conceptual sin escala. Información basada en fuentes públicas de la Universidad de Concepción."
        }
      </span>
    </section>
  );
}
function point([A, U]) {
  return {
    x: A,
    y: U,
  };
}
