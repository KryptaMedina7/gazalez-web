import type { ReactNode } from "react";

/** GAZAL adaptation of the supplied curtain reveal: native hover/focus,
 * persistent copy and links, and visible media on touch/reduced motion. */
export function CardCurtainReveal({ children, media }: { children: ReactNode; media: ReactNode }) {
  return (
    <article className="card-curtain-reveal">
      <div className="curtain-body">{children}</div>
      <div className="curtain-media"><div className="curtain-media-inner">{media}</div></div>
    </article>
  );
}
