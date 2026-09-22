import { forwardRef, type ComponentProps } from "react";
import { localUrl } from "./config";
type Props = ComponentProps<"a"> & {
  prefetch?: boolean;
  scroll?: boolean;
  replace?: boolean;
};
const Link = forwardRef<HTMLAnchorElement, Props>(function Link(
  {
    href = "",
    prefetch: _prefetch,
    scroll: _scroll,
    replace: _replace,
    ...props
  },
  ref,
) {
  void _prefetch;
  void _scroll;
  void _replace;
  return <a {...props} href={localUrl(href)} ref={ref} />;
});
export default Link;
