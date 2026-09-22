/* eslint-disable @next/next/no-img-element -- PHP uses local image files, not a Next image service. */
import type { ComponentProps } from "react";
import { localUrl } from "./config";
type Props = Omit<ComponentProps<"img">, "src"> & {
  src: string;
  priority?: boolean;
  unoptimized?: boolean;
};
export default function Image({
  src = "",
  priority,
  unoptimized: _unoptimized,
  alt = "",
  ...props
}: Props) {
  void _unoptimized;
  // PHP serves the optimized project assets directly, without the Next image service.
  return (
    <img
      {...props}
      alt={alt}
      src={localUrl(src)}
      loading={priority ? "eager" : props.loading || "lazy"}
      decoding="async"
    />
  );
}
