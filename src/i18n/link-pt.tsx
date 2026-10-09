"use client";
import Link from "next/link";
import type { ComponentProps } from "react";
import { localHref } from "./routing.mjs";
export default function LocalLink(props: ComponentProps<typeof Link>) {
  return (
    <Link
      {...props}
      href={
        typeof props.href === "string"
          ? localHref(props.href, "pt")
          : props.href
      }
    />
  );
}
