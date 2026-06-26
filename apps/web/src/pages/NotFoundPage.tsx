import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 text-slate-950">
      <section className="w-full max-w-md text-center">
        <p className="text-sm font-semibold text-trust-sea">404</p>
        <h1 className="mt-2 text-2xl font-semibold">Pagina no encontrada</h1>
        <Link
          className="mt-6 inline-flex h-11 items-center justify-center rounded-md bg-trust-sea px-5 text-sm font-semibold text-white transition hover:bg-trust-ink"
          to="/"
        >
          Volver al inicio
        </Link>
      </section>
    </main>
  );
}
