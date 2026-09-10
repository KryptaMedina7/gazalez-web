"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";

export function ContentMotion() {
  const path = usePathname();
  useEffect(() => {
    const main = document.querySelector("main");
    if (!main) return;
    const media = gsap.matchMedia();
    media.add(
      {
        motion: "(prefers-reduced-motion: no-preference)",
        desktop: "(min-width: 1001px)",
      },
      (scope) => {
        if (!scope.conditions?.motion) return;
        const compact = !scope.conditions.desktop;
        const sequences = new Map<Element, gsap.core.Timeline>();
        const visible = new Set<Element>();
        const context = gsap.context(() => {}, main);
        const observer = new IntersectionObserver(
          (entries) => {
            for (const entry of entries) {
              if (entry.isIntersecting) visible.add(entry.target);
              else visible.delete(entry.target);
              let sequence = sequences.get(entry.target);
              if (entry.isIntersecting && !sequence) {
                context.add(() => {
                  const target = entry.target;
                  sequence = gsap.timeline({
                    paused: true,
                    defaults: { ease: "power3.out" },
                    onComplete: () => {
                      target.setAttribute("data-motion-complete", "true");
                    },
                  });
                  if (compact) {
                    sequence.from(
                      target.querySelectorAll(".trace-connection > span"),
                      {
                        scaleY: 0,
                        duration: 0.35,
                        stagger: 0.07,
                        transformOrigin: "top",
                      },
                      0,
                    );
                  } else if (target.matches(".trace-path,.horizontal-trace")) {
                    sequence
                      .from(
                        target.querySelectorAll("li"),
                        { x: -10, duration: 0.4, stagger: { amount: 0.3 } },
                        0,
                      )
                      .from(
                        target.querySelectorAll(".trace-node"),
                        {
                          scale: 0.6,
                          opacity: 0.25,
                          duration: 0.45,
                          stagger: { amount: 0.4 },
                        },
                        0,
                      );
                    if (target.matches(".trace-path")) {
                      const connections = target.querySelectorAll(
                        ".trace-connection > span",
                      );
                      sequence.fromTo(
                        connections,
                        { scaleY: 0 },
                        {
                          scaleY: 1,
                          duration: 0.45,
                          stagger: 0.42,
                          ease: "power1.inOut",
                        },
                        0.3,
                      );
                      sequence.to(
                        target.querySelectorAll(".trace-node"),
                        {
                          backgroundColor: "#a8905e",
                          borderColor: "#a8905e",
                          duration: 0.2,
                          stagger: 0.42,
                        },
                        0.3,
                      );
                    }
                  } else if (target.matches(".hydrobac-mechanism")) {
                    sequence.from(
                      target.children,
                      {
                        y: 12,
                        scale: 0.97,
                        duration: 0.5,
                        stagger: { amount: 0.18 },
                      },
                      0,
                    );
                  } else {
                    sequence.from(
                      target.children,
                      { x: -9, duration: 0.4, stagger: { amount: 0.22 } },
                      0,
                    );
                  }
                  sequences.set(target, sequence);
                });
              }
              if (sequence) {
                if (entry.isIntersecting && !document.hidden) sequence.play();
                else sequence.pause();
              }
            }
          },
          { threshold: 0.2 },
        );
        main
          .querySelectorAll(
            compact
              ? ".trace-path"
              : ".trace-path,.horizontal-trace,.solution-list,.solutions-directory,.hydrobac-mechanism,.news-list",
          )
          .forEach((e) => observer.observe(e));
        const visibility = () => {
          sequences.forEach((sequence, target) => {
            if (!document.hidden && visible.has(target)) sequence.play();
            else sequence.pause();
          });
        };
        document.addEventListener("visibilitychange", visibility);
        return () => {
          observer.disconnect();
          document.removeEventListener("visibilitychange", visibility);
          context.revert();
        };
      },
    );
    return () => media.revert();
  }, [path]);
  return null;
}
