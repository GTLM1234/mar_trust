import { ArrowRight, BadgeCheck, MapPin, Search, ShieldCheck, Star } from "lucide-react";
import { Link } from "react-router-dom";

import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";

const trustSignals = [
  { label: "Certificados vigentes", icon: ShieldCheck },
  { label: "Opiniones reales", icon: Star },
  { label: "Ubicacion clara", icon: MapPin },
];

export function HomePage() {
  return (
    <main>
      <section className="mx-auto grid min-h-[calc(100vh-4rem)] w-full max-w-6xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,1fr)_420px] lg:px-8">
        <div className="flex flex-col justify-center">
          <Badge className="w-fit" tone="blue">
            <BadgeCheck aria-hidden="true" className="mr-1" size={14} />
            Plataforma de confianza
          </Badge>
          <h1 className="mt-5 max-w-3xl text-4xl font-semibold tracking-normal text-slate-950 sm:text-5xl">
            Encuentra puestos de mariscos certificados cerca de ti.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
            MarTrust conecta clientes con puestos que muestran certificados,
            opiniones, menu, promociones e indice de confianza.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link to="/buscar">
              <Button className="w-full sm:w-auto">
                Buscar puestos
                <Search aria-hidden="true" size={17} />
              </Button>
            </Link>
            <Link to="/register?role=vendedor">
              <Button className="w-full sm:w-auto" variant="secondary">
                Registrar mi puesto
                <ArrowRight aria-hidden="true" size={17} />
              </Button>
            </Link>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {trustSignals.map((signal) => {
              const Icon = signal.icon;

              return (
                <div className="rounded-md border border-slate-200 bg-white p-4 shadow-sm" key={signal.label}>
                  <Icon aria-hidden="true" className="text-trust-sea" size={20} />
                  <p className="mt-3 text-sm font-semibold text-slate-800">
                    {signal.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <aside className="flex items-center">
          <div className="w-full rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <div className="rounded-md bg-slate-950 p-5 text-white">
              <p className="text-sm text-white/70">Indice de confianza</p>
              <div className="mt-4 flex items-end justify-between">
                <span className="text-5xl font-semibold">92</span>
                <Badge className="bg-emerald-400/15 text-emerald-100 ring-emerald-300/30" tone="green">
                  Certificado
                </Badge>
              </div>
              <div className="mt-6 h-2 overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-[92%] rounded-full bg-emerald-400" />
              </div>
            </div>
            <div className="mt-4 space-y-3">
              {["Certificado sanitario vigente", "4.8 de calificacion promedio", "Perfil completo"].map((item) => (
                <div className="flex items-center justify-between rounded-md border border-slate-200 px-3 py-2 text-sm" key={item}>
                  <span className="text-slate-600">{item}</span>
                  <Badge tone="green">OK</Badge>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}
