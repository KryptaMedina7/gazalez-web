"use client";
import { usePathname as useNextPathname } from "next/navigation";
import { stripLocale } from "./routing.mjs";
export {
  useRouter,
  useSearchParams,
  notFound,
  redirect,
} from "next/navigation";
export function usePathname() {
  return stripLocale(useNextPathname());
}
