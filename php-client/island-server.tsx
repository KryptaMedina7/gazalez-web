import { createElement, type ComponentType, type ReactElement } from "react";
import { renderToString, renderToStaticMarkup } from "react-dom/server";
let serial = 0;
export function resetIslands() {
  serial = 0;
}
export function island<P extends object>(
  name: string,
  Component: ComponentType<P>,
  incoming: P = {} as P,
) {
  const id = `g-${++serial}-`;
  const props = { ...incoming } as Record<string, unknown>;
  if (name === "hero") {
    const child = props.children as ReactElement<{ children: React.ReactNode }>;
    props.copyHtml = renderToStaticMarkup(
      createElement("div", null, child.props.children),
    ).slice(5, -6);
    delete props.children;
  }
  const actual =
    name === "hero"
      ? {
          children: createElement("div", {
            className: "hero-copy",
            dangerouslySetInnerHTML: { __html: props.copyHtml },
          }),
        }
      : props;
  const html = renderToString(createElement(Component, actual as P), {
    identifierPrefix: id,
  });
  const json = JSON.stringify(props).replace(/</g, "\\u003c");
  return (
    <div
      className="php-island"
      data-island={name}
      data-prefix={id}
      data-props={json}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
