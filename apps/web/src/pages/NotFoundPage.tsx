import { Link } from "react-router-dom";

import { Button } from "../components/ui/Button";

export function NotFoundPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 text-slate-950">
      <section className="w-full max-w-md text-center">
        <p className="text-sm font-semibold text-trust-sea">404</p>
        <h1 className="mt-2 text-2xl font-semibold">Pagina no encontrada</h1>
        <Link className="mt-6 inline-flex" to="/">
          <Button>Volver al inicio</Button>
        </Link>
      </section>
    </main>
  );
}
