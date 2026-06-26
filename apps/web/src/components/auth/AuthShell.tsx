import { BadgeCheck, ShieldCheck, Sparkles } from "lucide-react";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";

import authImage from "../../assets/auth-seafood-stand.webp";
import { Badge } from "../ui/Badge";

type AuthShellProps = {
  children: ReactNode;
  eyebrow: string;
  title: string;
  subtitle: string;
};

export function AuthShell({ children, eyebrow, subtitle, title }: AuthShellProps) {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <div className="grid min-h-screen lg:grid-cols-[minmax(0,1fr)_minmax(480px,560px)]">
        <section className="relative hidden overflow-hidden bg-slate-900 lg:block">
          <img
            alt="Puesto de mariscos certificado con ingredientes frescos"
            className="absolute inset-0 h-full w-full object-cover"
            src={authImage}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/45 to-transparent" />
          <div className="relative flex h-full flex-col justify-between p-10 text-white">
            <Link className="text-lg font-semibold tracking-normal" to="/">
              MarTrust
            </Link>
            <div className="max-w-xl">
              <Badge className="bg-white/10 text-white ring-white/20" tone="slate">
                <ShieldCheck aria-hidden="true" className="mr-1" size={14} />
                Plataforma de confianza
              </Badge>
              <h2 className="mt-5 text-4xl font-semibold tracking-normal">
                Certificados, opiniones y reputacion en un solo lugar.
              </h2>
              <div className="mt-6 grid gap-3 text-sm text-white/80">
                <span className="flex items-center gap-2">
                  <BadgeCheck aria-hidden="true" size={18} />
                  Indice de confianza calculado en backend.
                </span>
                <span className="flex items-center gap-2">
                  <Sparkles aria-hidden="true" size={18} />
                  Experiencia preparada para clientes y vendedores.
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="flex items-center justify-center px-4 py-8 sm:px-6 lg:px-10">
          <div className="w-full max-w-xl">
            <Link className="mb-8 inline-flex text-lg font-semibold text-trust-sea lg:hidden" to="/">
              MarTrust
            </Link>
            <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
              <p className="text-sm font-semibold text-trust-sea">{eyebrow}</p>
              <h1 className="mt-2 text-2xl font-semibold tracking-normal text-slate-950">
                {title}
              </h1>
              <p className="mt-2 text-sm leading-6 text-slate-600">{subtitle}</p>
              <div className="mt-6">{children}</div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
