"use client";
import { useId, useState, type CSSProperties } from "react";
import { hydrobacPlanePositions } from "@/lib/hydrobac-layout.mjs";
import { Dna, Droplets, Network, Layers3, RotateCcw } from "lucide-react";

const stages = [
  {
    label: "Hidrogel",
    icon: Network,
    title: "Una matriz que conecta.",
    text: "Una red de polímeros capaz de incorporar agua en su estructura.",
  },
  {
    label: "Agua",
    icon: Droplets,
    title: "El agua, dentro de la red.",
    text: "Explora cómo el agua se integra en la matriz del hidrogel.",
  },
  {
    label: "Bacterias benéficas",
    icon: Dna,
    title: "Biología y materiales, juntos.",
    text: "HIDROBAC combina hidrogeles y bacterias benéficas para abordar el estrés hídrico en plantas.",
  },
];
const nodes = [
  [105, -8],
  [160, -42],
  [240, -48],
  [320, -25],
  [350, 12],
  [285, 44],
  [205, 51],
  [130, 28],
  [190, -8],
  [265, 10],
  [220, 28],
  [150, 7],
];
const bonds = [
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
];
const water = [
  [115, 0, 12],
  [172, -26, 18],
  [254, -29, 14],
  [321, 0, 18],
  [270, 33, 12],
  [190, 29, 16],
  [228, 2, 10],
];
const bacteria = [
  [135, -4, -34],
  [202, -27, 24],
  [287, -13, -30],
  [302, 25, 30],
  [211, 30, -32],
];

export function HydrobacExplorer() {
  const id = useId().replace(/:/g, "");
  const [active, setActive] = useState(0);
  const [opening, setOpening] = useState(0);
  const [dragging, setDragging] = useState(false);
  const amount = opening / 100;
  const positions = hydrobacPlanePositions(opening);
  const select = (index: number) => setActive(index);
  const plane = (index: number): CSSProperties => ({
    transform: `translateY(${positions[index]}px)`,
  });
  return (
    <div
      className="hydrobac-explorer"
      data-active={active}
      data-open={opening > 45}
      data-dragging={dragging}
    >
      <div className="hb-heading">
        <h3>Explora HIDROBAC</h3>
        <button
          type="button"
          className="hb-reset"
          aria-label="Restablecer exploración"
          onClick={() => {
            setActive(0);
            setOpening(0);
          }}
        >
          <RotateCcw size={17} aria-hidden="true" />
        </button>
      </div>
      <div className="hydrobac-figure">
        <svg
          viewBox="0 0 540 550"
          role="group"
          aria-label="Componentes de HIDROBAC. Representación conceptual sin escala."
        >
          <defs>
            <linearGradient id={`${id}-gel`} x1="0" y1="0" x2="0.8" y2="1">
              <stop stopColor="#eff8e0" />
              <stop offset="1" stopColor="#86ad82" />
            </linearGradient>
            <linearGradient id={`${id}-water`} x1="0" y1="0" x2="0.8" y2="1">
              <stop stopColor="#effcf5" />
              <stop offset="1" stopColor="#6eafa5" />
            </linearGradient>
          </defs>
          <path
            className="hb-axis"
            d="M228 48V495"
            stroke="#a2b7a0"
            strokeDasharray="3 7"
            fill="none"
            opacity={amount * 0.65}
          />
          {[0, 1, 2].map((index) => (
            <g
              key={index}
              className={`hb-plane hb-plane-${index}`}
              style={plane(index)}
            >
              <g
                className="hb-plane-content"
                role="button"
                tabIndex={0}
                aria-label={`Explorar ${stages[index].label}`}
                aria-pressed={active === index}
                onClick={() => select(index)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    select(index);
                  }
                }}
              >
                <ellipse
                  className="hb-plane-edge"
                  cx="225"
                  cy="12"
                  rx="165"
                  ry="66"
                  fill={index === 1 ? "#a1c9bd" : "#a5bea0"}
                />
                <ellipse
                  className="hb-plane-surface"
                  cx="225"
                  cy="0"
                  rx="165"
                  ry="66"
                  fill={
                    index === 1
                      ? "#d1e7dd"
                      : index === 2
                        ? "#e4eed8"
                        : `url(#${id}-gel)`
                  }
                  stroke={index === 1 ? "#57948a" : "#678e60"}
                  strokeWidth="1.5"
                />
                {index === 0 && (
                  <g fill="#315e40" stroke="#edf5e4">
                    {bonds.map(([a, b], i) => (
                      <line
                        key={i}
                        x1={nodes[a][0]}
                        y1={nodes[a][1]}
                        x2={nodes[b][0]}
                        y2={nodes[b][1]}
                        stroke="#436e4d"
                        strokeWidth="2"
                      />
                    ))}
                    {nodes.map(([x, y], i) => (
                      <circle
                        key={i}
                        cx={x}
                        cy={y}
                        r={i % 3 === 0 ? 6 : 4}
                        strokeWidth="2"
                      />
                    ))}
                  </g>
                )}
                {index === 1 && (
                  <g>
                    {water.map(([x, y, r], i) => (
                      <g key={i}>
                        <circle
                          cx={x}
                          cy={y - 4}
                          r={r}
                          fill={`url(#${id}-water)`}
                          stroke="#367c75"
                          strokeWidth="1.5"
                        />
                        <path
                          d={`M${x - 5} ${y - 8}q3 -5 7 -4`}
                          stroke="#f5fff9"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          fill="none"
                        />
                      </g>
                    ))}
                  </g>
                )}
                {index === 2 && (
                  <g>
                    {bacteria.map(([x, y, a], i) => (
                      <g
                        key={i}
                        transform={`translate(${x} ${y}) rotate(${a})`}
                      >
                        <rect
                          x="-8"
                          y="-20"
                          width="16"
                          height="40"
                          rx="8"
                          fill="#234c36"
                          stroke="#a8c791"
                          strokeWidth="2"
                        />
                        <path
                          d="M-2 -10v18"
                          stroke="#d2e5bc"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </g>
                    ))}
                  </g>
                )}
                <ellipse
                  className="hb-focus-ring"
                  cx="225"
                  cy="0"
                  rx="174"
                  ry="74"
                  fill="none"
                  stroke="#287452"
                  strokeWidth="3"
                />
              </g>
              <g
                className="hb-plane-label"
                style={{ opacity: amount }}
                aria-hidden="true"
              >
                <path d="M395 0H417" stroke="#688468" />
                <text x="431" y="6" fill="#2b503a">
                  {index === 0 ? "Matriz" : index === 1 ? "Agua" : "Biología"}
                </text>
              </g>
            </g>
          ))}
          <text
            className="hb-system-label"
            x="225"
            y="452"
            textAnchor="middle"
            opacity={1 - amount}
          >
            Sistema HIDROBAC
          </text>
        </svg>
      </div>
      <div className="hb-spread">
        <button
          className="hydrobac-depth-toggle"
          type="button"
          aria-pressed={opening > 0}
          onClick={() => setOpening(opening > 0 ? 0 : 100)}
        >
          <Layers3 size={18} aria-hidden="true" />
          {opening > 0 ? "Reunir capas" : "Separar capas"}
        </button>
        <label className="hb-range">
          <span className="sr-only">Separación de las capas</span>
          <input
            type="range"
            min="0"
            max="100"
            value={opening}
            aria-valuetext={
              opening === 0
                ? "Sistema unido"
                : opening === 100
                  ? "Capas separadas"
                  : `Separación ${opening}%`
            }
            onChange={(event) => setOpening(Number(event.target.value))}
            onPointerDown={() => setDragging(true)}
            onPointerUp={() => setDragging(false)}
            onPointerCancel={() => setDragging(false)}
            onBlur={() => setDragging(false)}
          />
        </label>
      </div>
      <div
        className="hydrobac-controls"
        role="group"
        aria-label="Explorar componentes de HIDROBAC"
      >
        {stages.map(({ label, icon: StageIcon }, index) => (
          <button
            key={label}
            type="button"
            aria-pressed={active === index}
            onClick={() => select(index)}
          >
            <StageIcon size={18} aria-hidden="true" />
            {label}
          </button>
        ))}
      </div>
      <div className="hb-detail" aria-live="polite" aria-atomic="true">
        <h4>{stages[active].title}</h4>
        <p>{stages[active].text}</p>
      </div>
      <p className="hydrobac-concept">Representación conceptual · sin escala</p>
    </div>
  );
}
