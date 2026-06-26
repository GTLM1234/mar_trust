import { BadgeCheck, BarChart3, Heart, Users } from "lucide-react";

import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";

const stats = [
  { label: "Visitas", value: "328", icon: BarChart3 },
  { label: "Favoritos", value: "74", icon: Heart },
  { label: "Seguidores", value: "41", icon: Users },
];

export function SellerDashboardPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <Badge tone="green">
          <BadgeCheck aria-hidden="true" className="mr-1" size={14} />
          Vendedor
        </Badge>
        <h1 className="mt-3 text-2xl font-semibold tracking-normal text-slate-950">
          Gestiona la confianza de tu puesto
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
          Este dashboard queda conectado al login de vendedor. La gestion de
          puesto, menu, certificados, promociones y horarios se implementara por modulos.
        </p>
        <Button className="mt-5">Completar perfil del puesto</Button>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm" key={stat.label}>
              <Icon aria-hidden="true" className="text-trust-sea" size={20} />
              <p className="mt-4 text-2xl font-semibold text-slate-950">{stat.value}</p>
              <p className="text-sm text-slate-500">{stat.label}</p>
            </article>
          );
        })}
      </section>
    </div>
  );
}
