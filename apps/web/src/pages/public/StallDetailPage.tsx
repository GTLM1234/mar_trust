import { BadgeCheck, Clock, MapPin, Star } from "lucide-react";
import { useParams } from "react-router-dom";

import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";

export function StallDetailPage() {
  const { stallId } = useParams();

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <Badge tone="green">
          <BadgeCheck aria-hidden="true" className="mr-1" size={14} />
          Certificado vigente
        </Badge>
        <div className="mt-5 grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div>
            <h1 className="text-3xl font-semibold tracking-normal text-slate-950">
              {stallId === "mariscos-la-red" ? "Mariscos La Red" : "Cevicheria Brisa Marina"}
            </h1>
            <p className="mt-3 flex items-center gap-2 text-sm text-slate-500">
              <MapPin aria-hidden="true" size={16} />
              Chorrillos, Lima
            </p>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-600">
              Detalle publico preparado para consumir datos reales desde FastAPI:
              menu, fotos, promociones, certificados, ubicacion y opiniones.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Badge tone="blue">
                <Star aria-hidden="true" className="mr-1" size={13} />
                4.8 calificacion
              </Badge>
              <Badge tone="slate">
                <Clock aria-hidden="true" className="mr-1" size={13} />
                Abierto hoy
              </Badge>
            </div>
          </div>
          <aside className="rounded-md bg-slate-950 p-5 text-white">
            <p className="text-sm text-white/70">Indice de confianza</p>
            <p className="mt-3 text-5xl font-semibold">92</p>
            <Button className="mt-6 w-full" variant="secondary">
              Guardar favorito
            </Button>
          </aside>
        </div>
      </section>
    </main>
  );
}
