import { useSyncExternalStore } from "react";
import { config, localUrl } from "./config";
let serverPath = "/";
export function setServerPath(path: string) {
  serverPath = path;
}
const subscribe = () => () => {};
export function usePathname() {
  return typeof document === "undefined" ? serverPath : config().path;
}
export function useSearchParams() {
  const query = useSyncExternalStore(
    subscribe,
    () => location.search,
    () => "",
  );
  return new URLSearchParams(query);
}
const router = {
  push: (url: string) => location.assign(localUrl(url)),
  replace: (url: string) => location.replace(localUrl(url)),
};
export function useRouter() {
  return router;
}
export function notFound(): never {
  throw new Error("Unknown route in PHP template migration");
}
