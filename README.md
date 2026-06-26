# MarTrust

La plataforma que conecta clientes con puestos de mariscos certificados.

MarTrust es una plataforma de confianza para puestos de mariscos. El sistema
ayuda a clientes a descubrir puestos con certificados, reputacion, ubicacion,
menu, promociones e indice de confianza; y ayuda a vendedores a demostrar la
calidad de su negocio.

## Arquitectura objetivo

```text
Usuario
  |
  v
React + Vite + TypeScript (Vercel)
  |
  | HTTPS / REST
  v
FastAPI + SQLAlchemy (Render)
  |
  v
PostgreSQL (Supabase)
```

## Estructura del repositorio

```text
apps/
  api/      Backend FastAPI.
  web/      Frontend React.
docs/       Roadmap, decisiones tecnicas y guias del proyecto.
infra/      Configuracion futura de despliegue e infraestructura.
.github/    Plantillas y automatizaciones de GitHub.
```

## Ramas principales

- `main`: produccion.
- `develop`: integracion estable.
- `frontend/vercel-deploy`: trabajo del frontend y Vercel.
- `backend/fastapi-render`: trabajo del backend y Render.
- `database/supabase-postgres`: modelo de datos, migraciones y Supabase.

## Comandos iniciales

Frontend:

```bash
cd apps/web
npm install
npm run dev
```

Backend:

```bash
cd apps/api
python -m venv .venv
.venv\Scripts\activate
pip install -e ".[dev]"
uvicorn app.main:app --reload
```

## Documentacion

- Roadmap: `docs/ROADMAP.md`
- Contribucion: `docs/CONTRIBUTING.md`
- Decisiones tecnicas: `docs/adr/`
