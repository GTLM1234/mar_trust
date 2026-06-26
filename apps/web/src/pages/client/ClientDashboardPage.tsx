import { Heart, MapPin, Search, Star } from "lucide-react";

import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";

const stats = [
  { label: "Favoritos", value: "12", icon: Heart },
  { label: "Visitas", value: "8", icon: MapPin },
  { label: "Promedio guardado", value: "4.7", icon: Star },
];

export function ClientDashboardPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <Badge tone="blue">Cliente</Badge>
        <h1 className="mt-3 text-2xl font-semibold tracking-normal text-slate-950">
          Encuentra tu siguiente puesto confiable
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
          Este dashboard queda conectado al login de cliente. Los modulos de
          favoritos, visitas, pagos manuales y recomendaciones se ampliaran por fases.
        </p>
        <Button className="mt-5">
          <Search aria-hidden="true" size={17} />
          Buscar puestos
        </Button>
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
