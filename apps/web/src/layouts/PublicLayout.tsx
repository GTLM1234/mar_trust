import { Link, NavLink, Outlet } from "react-router-dom";

import { Button } from "../components/ui/Button";

const navLinks = [
  { to: "/buscar", label: "Buscar puestos" },
  { to: "/como-funciona", label: "Como funciona" },
  { to: "/acerca", label: "Acerca de" },
];

export function PublicLayout() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur">
        <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link className="text-lg font-semibold text-trust-sea" to="/">
            MarTrust
          </Link>
          <div className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
            {navLinks.map((item) => (
              <NavLink className="transition hover:text-slate-950" key={item.to} to={item.to}>
                {item.label}
              </NavLink>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <Link to="/login">
              <Button className="hidden sm:inline-flex" variant="ghost">
                Iniciar sesion
              </Button>
            </Link>
            <Link to="/register">
              <Button>Registrarse</Button>
            </Link>
          </div>
        </nav>
      </header>

      <Outlet />

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 py-6 text-sm text-slate-500 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <span>MarTrust</span>
          <span>Confianza, certificados y reputacion para puestos de mariscos.</span>
        </div>
      </footer>
    </div>
  );
}
