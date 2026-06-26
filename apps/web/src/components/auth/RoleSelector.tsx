import { Store, UserRound } from "lucide-react";

import { cn } from "../../utils/cn";
import type { UserRole } from "../../types/auth";

type RoleSelectorProps = {
  value: Extract<UserRole, "CLIENT" | "SELLER">;
  onChange: (role: Extract<UserRole, "CLIENT" | "SELLER">) => void;
};

const roles = [
  {
    value: "CLIENT" as const,
    title: "Cliente",
    description: "Descubre puestos certificados y guarda tus favoritos.",
    icon: UserRound,
  },
  {
    value: "SELLER" as const,
    title: "Vendedor",
    description: "Administra tu puesto, certificados, menu y promociones.",
    icon: Store,
  },
];

export function RoleSelector({ onChange, value }: RoleSelectorProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {roles.map((role) => {
        const Icon = role.icon;
        const isSelected = value === role.value;

        return (
          <button
            className={cn(
              "rounded-md border p-4 text-left transition focus:outline-none focus:ring-2 focus:ring-trust-sea/30",
              isSelected
                ? "border-trust-sea bg-sky-50"
                : "border-slate-200 bg-white hover:border-slate-300",
            )}
            key={role.value}
            onClick={() => onChange(role.value)}
            type="button"
          >
            <span className="flex items-center gap-3">
              <span
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-md",
                  isSelected
                    ? "bg-trust-sea text-white"
                    : "bg-slate-100 text-slate-600",
                )}
              >
                <Icon aria-hidden="true" size={18} />
              </span>
              <span>
                <span className="block text-sm font-semibold text-slate-950">
                  {role.title}
                </span>
                <span className="mt-1 block text-xs leading-5 text-slate-500">
                  {role.description}
                </span>
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
