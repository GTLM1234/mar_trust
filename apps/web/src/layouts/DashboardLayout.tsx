import {
  BarChart3,
  Bell,
  Camera,
  Clock,
  CreditCard,
  Heart,
  LogOut,
  Menu,
  Search,
  Settings,
  ShieldCheck,
  Store,
  Tag,
  UserRound,
  Users,
} from "lucide-react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

import { Button } from "../components/ui/Button";
import { roleDashboardPath } from "../contexts/AuthContext";
import { useAuth } from "../hooks/useAuth";
import type { UserRole } from "../types/auth";
import { cn } from "../utils/cn";

type DashboardLayoutProps = {
  role: Extract<UserRole, "CLIENT" | "SELLER">;
};

const clientNav = [
  { to: "/cliente", label: "Inicio", icon: UserRound },
  { to: "/cliente/buscar", label: "Buscar", icon: Search },
  { to: "/cliente/favoritos", label: "Favoritos", icon: Heart },
  { to: "/cliente/promociones", label: "Promociones", icon: Tag },
  { to: "/cliente/pagos", label: "Metodos de pago", icon: CreditCard },
  { to: "/cliente/configuracion", label: "Configuracion", icon: Settings },
];

const sellerNav = [
  { to: "/vendedor", label: "Inicio", icon: BarChart3 },
  { to: "/vendedor/puesto", label: "Mi puesto", icon: Store },
  { to: "/vendedor/menu", label: "Menu", icon: Menu },
  { to: "/vendedor/fotografias", label: "Fotografias", icon: Camera },
  { to: "/vendedor/certificados", label: "Certificados", icon: ShieldCheck },
  { to: "/vendedor/horarios", label: "Horarios", icon: Clock },
  { to: "/vendedor/clientes", label: "Clientes", icon: Users },
  { to: "/vendedor/configuracion", label: "Configuracion", icon: Settings },
];

export function DashboardLayout({ role }: DashboardLayoutProps) {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const navItems = role === "SELLER" ? sellerNav : clientNav;

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <aside className="fixed inset-y-0 left-0 hidden w-72 border-r border-slate-200 bg-white px-4 py-5 lg:block">
        <NavLink className="flex items-center gap-3 px-2 text-lg font-semibold text-trust-sea" to={roleDashboardPath(role)}>
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-trust-sea text-white">
            <ShieldCheck aria-hidden="true" size={18} />
          </span>
          MarTrust
        </NavLink>

        <div className="mt-8 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition",
                    isActive
                      ? "bg-sky-50 text-trust-sea"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-950",
                  )
                }
                end={item.to === roleDashboardPath(role)}
                key={item.to}
                to={item.to}
              >
                <Icon aria-hidden="true" size={18} />
                {item.label}
              </NavLink>
            );
          })}
        </div>
      </aside>

      <div className="lg:pl-72">
        <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 backdrop-blur">
          <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                {role === "SELLER" ? "Panel vendedor" : "Panel cliente"}
              </p>
              <p className="text-sm font-semibold text-slate-950">
                {user?.name ?? "MarTrust"}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button className="flex h-10 w-10 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50">
                <Bell aria-hidden="true" size={18} />
              </button>
              <Button onClick={handleLogout} variant="secondary">
                <LogOut aria-hidden="true" size={16} />
                Salir
              </Button>
            </div>
          </div>
        </header>

        <main className="px-4 py-6 sm:px-6 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
