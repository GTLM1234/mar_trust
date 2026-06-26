import { MapPin, Search, Star } from "lucide-react";
import { Link } from "react-router-dom";

import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";

const stalls = [
  { id: "cevicheria-brisa", name: "Cevicheria Brisa Marina", district: "Chorrillos", rating: "4.8", trust: 92 },
  { id: "mariscos-la-red", name: "Mariscos La Red", district: "Barranco", rating: "4.6", trust: 88 },
];

export function PublicSearchPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_220px_auto]">
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Buscar</span>
            <input className="mt-1 h-11 w-full rounded-md border border-slate-300 px-3 text-sm outline-none focus:border-trust-sea focus:ring-2 focus:ring-trust-sea/20" placeholder="Ceviche, jalea, parihuela..." />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Distrito</span>
            <select className="mt-1 h-11 w-full rounded-md border border-slate-300 px-3 text-sm outline-none focus:border-trust-sea focus:ring-2 focus:ring-trust-sea/20">
              <option>Todos</option>
              <option>Chorrillos</option>
              <option>Barranco</option>
            </select>
          </label>
          <Button className="self-end">
            <Search aria-hidden="true" size={17} />
            Buscar
          </Button>
        </div>
      </div>

      <div className="mt-6 grid gap-4">
        {stalls.map((stall) => (
          <Link className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:border-trust-sea" key={stall.id} to={`/puestos/${stall.id}`}>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-950">{stall.name}</h2>
                <p className="mt-1 flex items-center gap-2 text-sm text-slate-500">
                  <MapPin aria-hidden="true" size={16} />
                  {stall.district}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge tone="green">Confianza {stall.trust}</Badge>
                <Badge tone="blue">
                  <Star aria-hidden="true" className="mr-1" size={13} />
                  {stall.rating}
                </Badge>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
