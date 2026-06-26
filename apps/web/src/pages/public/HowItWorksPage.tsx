import { BadgeCheck, Search, Store } from "lucide-react";

const steps = [
  { title: "Busca", text: "Filtra por distrito, plato, calificacion e indice de confianza.", icon: Search },
  { title: "Compara", text: "Revisa certificados, menu, fotos, promociones y opiniones.", icon: BadgeCheck },
  { title: "Decide", text: "Guarda favoritos o sigue vendedores para volver facilmente.", icon: Store },
];

export function HowItWorksPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-semibold tracking-normal text-slate-950">
        Como funciona
      </h1>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {steps.map((step) => {
          const Icon = step.icon;

          return (
            <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm" key={step.title}>
              <Icon aria-hidden="true" className="text-trust-sea" size={22} />
              <h2 className="mt-4 text-lg font-semibold text-slate-950">{step.title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">{step.text}</p>
            </article>
          );
        })}
      </div>
    </main>
  );
}
