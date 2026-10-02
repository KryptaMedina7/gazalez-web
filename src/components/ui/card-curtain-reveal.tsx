import type { ReactNode } from "react";

/** Images and essential copy stay visible; hover only enriches the framing. */
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
