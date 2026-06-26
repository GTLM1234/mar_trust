import type { ReactNode } from "react";

import { cn } from "../../utils/cn";

type BadgeTone = "blue" | "green" | "coral" | "slate";

type BadgeProps = {
  children: ReactNode;
  className?: string;
  tone?: BadgeTone;
};

const toneClasses: Record<BadgeTone, string> = {
  blue: "bg-sky-50 text-trust-sea ring-sky-200",
  green: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  coral: "bg-orange-50 text-trust-coral ring-orange-200",
  slate: "bg-slate-100 text-slate-700 ring-slate-200",
};

export function Badge({ children, className, tone = "slate" }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2 py-1 text-xs font-semibold ring-1 ring-inset",
        toneClasses[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
