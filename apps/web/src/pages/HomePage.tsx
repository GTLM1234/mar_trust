const districts = ["Miraflores", "Barranco", "Chorrillos", "San Miguel"];

export function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 py-6 sm:px-6 lg:px-8">
        <header className="flex items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <p className="text-sm font-semibold text-trust-sea">MarTrust</p>
            <h1 className="text-2xl font-semibold tracking-normal text-slate-950">
              Puestos de mariscos certificados
            </h1>
          </div>
          <button className="rounded-md bg-trust-sea px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-trust-ink">
            Ingresar
          </button>
        </header>

        <div className="grid flex-1 gap-6 py-6 lg:grid-cols-[minmax(0,1fr)_360px]">
          <section className="space-y-4">
            <div className="grid gap-3 rounded-md border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-[minmax(0,1fr)_220px_auto]">
              <label className="block">
                <span className="text-sm font-medium text-slate-700">
                  Buscar
                </span>
                <input
                  className="mt-1 h-11 w-full rounded-md border border-slate-300 px-3 text-sm outline-none transition focus:border-trust-sea focus:ring-2 focus:ring-trust-sea/20"
                  placeholder="Ceviche, jalea, parihuela..."
                  type="search"
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium text-slate-700">
                  Distrito
                </span>
                <select className="mt-1 h-11 w-full rounded-md border border-slate-300 px-3 text-sm outline-none transition focus:border-trust-sea focus:ring-2 focus:ring-trust-sea/20">
                  {districts.map((district) => (
                    <option key={district}>{district}</option>
                  ))}
                </select>
              </label>

              <button className="h-11 self-end rounded-md bg-trust-mint px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-trust-sea">
                Buscar
              </button>
            </div>

            <div className="rounded-md border border-dashed border-slate-300 bg-white p-8 text-center">
              <p className="text-sm font-medium text-slate-600">
                Los puestos certificados apareceran aqui cuando la API este
                conectada.
              </p>
            </div>
          </section>

          <aside className="rounded-md border border-slate-200 bg-white p-4 shadow-sm">
            <h2 className="text-base font-semibold text-slate-950">
              Indice de confianza
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              El puntaje sera calculado por FastAPI usando certificados,
              opiniones, calificacion, antiguedad y perfil completo.
            </p>
          </aside>
        </div>
      </section>
    </main>
  );
}
