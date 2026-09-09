"use client";
// Adapted from the Drilldown Menu supplied by the user: stable rows, breadcrumb return,
// character presence, native destination links, and immediate keyboard interaction.
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  usePresence,
  useReducedMotion,
} from "motion/react";
import { CornerUpLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
export interface DrilldownMenuItem {
  id: string;
  label: string;
  href?: string;
  items?: DrilldownMenuItem[];
  onSelect?: () => void;
  current?: boolean;
}
interface DrilldownMenuProps {
  items: DrilldownMenuItem[];
  className?: string;
  onSelect?: (item: DrilldownMenuItem) => void;
}
const SPRING = {
  type: "spring" as const,
  stiffness: 520,
  damping: 46,
  mass: 0.9,
};
const MotionLink = motion.create(Link);
const chars = {
  hidden: {
    opacity: 0,
    scale: 0.9,
    filter: "blur(2px)",
    transition: { duration: 0.1 },
  },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.22, ease: [0.23, 1, 0.32, 1] as const },
  },
};
export function DrilldownMenu({
  items,
  className,
  onSelect,
}: DrilldownMenuProps) {
  const [trail, setTrail] = useState<DrilldownMenuItem[]>([]);
  const [keyboard, setKeyboard] = useState(false);
  const reduced = useReducedMotion();
  const level = trail.length ? (trail[trail.length - 1].items ?? []) : items;
  const rows = [
    ...trail.map((item, depth) => ({ item, depth, isTrail: true })),
    ...level.map((item) => ({ item, depth: trail.length, isTrail: false })),
  ];
  return (
    <div
      className={cn(
        "drilldown-menu",
        className,
        keyboard && "keyboard-navigation",
      )}
      onKeyDownCapture={() => setKeyboard(true)}
      onPointerDownCapture={() => setKeyboard(false)}
    >
      <div
        className="drilldown-grid"
        style={{ height: `${rows.length * 3.1}em` }}
      >
        <AnimatePresence initial={false}>
          {rows.map(({ item, depth, isTrail }, index) => (
            <DrillRow
              key={item.id}
              item={item}
              depth={depth}
              index={index}
              isTrail={isTrail}
              reduce={!!reduced || keyboard}
              activate={() => {
                if (isTrail) setTrail((current) => current.slice(0, depth));
                else if (item.items?.length)
                  setTrail((current) => [...current, item]);
                else {
                  item.onSelect?.();
                  onSelect?.(item);
                }
              }}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
function DrillRow({
  item,
  depth,
  index,
  isTrail,
  reduce,
  activate,
}: {
  item: DrilldownMenuItem;
  depth: number;
  index: number;
  isTrail: boolean;
  reduce: boolean;
  activate: () => void;
}) {
  const [present, safeToRemove] = usePresence();
  useEffect(() => {
    if (present) return;
    if (reduce) {
      safeToRemove?.();
      return;
    }
    const timeout = setTimeout(() => safeToRemove?.(), 350);
    return () => clearTimeout(timeout);
  }, [present, reduce, safeToRemove]);
  const label = (
    <>
      <span className="drill-return" aria-hidden="true">
        {isTrail ? <CornerUpLeft size={20} /> : null}
      </span>
      <span className="drill-label" aria-hidden="true">
        {item.label.split(" ").map((word, index) => (
          <span className="drill-word" key={index}>
            {Array.from(word).map((char, i) =>
              reduce ? (
                <span key={i}>{char}</span>
              ) : (
                <motion.span key={i} variants={chars}>
                  {char}
                </motion.span>
              ),
            )}
            {"\u00a0"}
          </span>
        ))}
      </span>
      <span className="drill-direction" aria-hidden="true">
        {isTrail ? null : item.items?.length ? (
          <ChevronRight size={18} />
        ) : (
          <ArrowUpRight size={18} />
        )}
      </span>
    </>
  );
  const common = {
    className: `drill-row ${isTrail ? "is-trail" : ""}`,
    initial: reduce ? false : "hidden",
    animate: present ? "visible" : "hidden",
    "aria-label": isTrail ? `Volver desde ${item.label}` : item.label,
    onAnimationComplete: () => {
      if (!present) safeToRemove?.();
    },
    transition: reduce
      ? { duration: 0 }
      : { staggerChildren: 0.005, staggerDirection: present ? 1 : -1 },
  };
  return (
    <motion.div
      className="drill-row-position"
      inert={!present}
      aria-hidden={!present || undefined}
      layout={reduce ? false : "position"}
      style={{ left: `${depth * 0.65}em`, right: 0, top: `${index * 3.1}em` }}
      transition={reduce ? { duration: 0 } : SPRING}
    >
      {item.href && !isTrail ? (
        <MotionLink
          {...common}
          href={item.href}
          aria-current={item.current ? "page" : undefined}
          onClick={(event) => {
            if (
              !event.ctrlKey &&
              !event.metaKey &&
              !event.shiftKey &&
              !event.altKey
            )
              activate();
          }}
        >
          {label}
        </MotionLink>
      ) : (
        <motion.button
          {...common}
          type="button"
          aria-expanded={item.items ? isTrail : undefined}
          onClick={activate}
        >
          {label}
        </motion.button>
      )}
    </motion.div>
  );
}
