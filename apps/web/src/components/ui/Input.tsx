import type { InputHTMLAttributes, ReactNode } from "react";

import { cn } from "../../utils/cn";

type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "id"> & {
  error?: string;
  icon?: ReactNode;
  id: string;
  label: string;
};

export function Input({
  className,
  error,
  icon,
  id,
  label,
  ...props
}: InputProps) {
  const hasIcon = Boolean(icon);

  return (
    <label className="block" htmlFor={id}>
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <span className="relative mt-1 block">
        {icon ? (
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            {icon}
          </span>
        ) : null}
        <input
          aria-invalid={Boolean(error)}
          className={cn(
            "h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-trust-sea focus:ring-2 focus:ring-trust-sea/20",
            hasIcon && "pl-10",
            error && "border-rose-400 focus:border-rose-500 focus:ring-rose-100",
            className,
          )}
          id={id}
          {...props}
        />
      </span>
      {error ? <span className="mt-1 block text-xs text-rose-600">{error}</span> : null}
    </label>
  );
}
