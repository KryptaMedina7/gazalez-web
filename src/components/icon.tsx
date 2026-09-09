import type { SVGProps } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Menu,
  X,
  Plus,
  Minus,
  Download,
  Check,
  ChevronDown,
} from "lucide-react";
// Lucide is the icon library used by the selected 21st.dev components.
const icons = {
  arrow: ArrowRight,
  diagonal: ArrowUpRight,
  menu: Menu,
  close: X,
  plus: Plus,
  minus: Minus,
  download: Download,
  check: Check,
  chevron: ChevronDown,
};
export function Icon({
  name = "arrow",
  ...props
}: SVGProps<SVGSVGElement> & { name?: keyof typeof icons }) {
  const Component = icons[name];
  return (
    <Component
      width={22}
      height={22}
      strokeWidth={1.5}
      aria-hidden="true"
      {...props}
    />
  );
}
