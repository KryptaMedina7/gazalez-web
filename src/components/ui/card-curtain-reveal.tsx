import type { ReactNode } from "react";

/** Stable reveal area: title, audience and action stay visible; desktop swaps
 * the summary for its image. Touch/reduced motion show both without a gesture. */
export function CardCurtainReveal({
  children,
  title,
  description,
  media,
}: {
  children: ReactNode;
  title: ReactNode;
  description: ReactNode;
  media: ReactNode;
}) {
  return (
    <article className="card-curtain-reveal">
      {title}
      <div className="curtain-content">
        <div className="curtain-summary">{description}</div>
        <div className="curtain-media">
          <div className="curtain-media-inner">{media}</div>
        </div>
      </div>
      <div className="curtain-body">{children}</div>
    </article>
  );
}
