# MarTrust - Guia de conexion y despliegue

## Objetivo

Desplegar MarTrust con esta arquitectura:

```text
React + Vite (Vercel)
  -> HTTPS REST
FastAPI (Render)
  -> SQLAlchemy
PostgreSQL (Supabase)
```

El frontend no debe conectarse directamente a PostgreSQL. Las reglas de negocio,
autenticacion, permisos e indice de confianza deben vivir en FastAPI.

## 1. Supabase

### 1.1 Crear el proyecto

1. Entra a Supabase.
2. Crea un proyecto llamado `martrust`.
3. Guarda de forma segura el password de la base de datos.
4. En el dashboard, usa el boton `Connect` para obtener el connection string.

### 1.2 Elegir connection string

Para Render se recomienda usar el pooler de Supabase porque Render puede operar
en entornos donde IPv4/IPv6 importa.

Opcion recomendada para Render:

```text
Transaction pooler
Puerto: 6543
```

Formato esperado:

```text
postgresql+psycopg://[db-user].[project-ref]:[db-password]@[region].pooler.supabase.com:6543/postgres
```

Notas:

- En Supabase puede aparecer como `postgres://...`; en SQLAlchemy usaremos
  `postgresql+psycopg://...`.
- No subas este valor a GitHub.
- Guardalo en Render como `DATABASE_URL`.
- Si luego usas conexion directa, cambia `DATABASE_POOL_MODE=direct`.

### 1.3 Storage

Crear buckets previstos:

- `stall-photos`: fotografias de puestos.
- `certificates`: certificados sanitarios.
- `payment-qr`: QR de Yape/Plin subidos por vendedores.

Regla inicial:

- El backend debe firmar/controlar subidas.
- No exponer service role key en Vercel.

## 2. Render - Backend FastAPI

### 2.1 Rama recomendada

Conecta Render a la rama:

```text
backend/fastapi-render
```

Antes de crear el servicio, esa rama debe estar sincronizada con `develop`.

### 2.2 Opcion A - Blueprint

El repo incluye `render.yaml` en la raiz.

Render debe detectar:

```yaml
rootDir: apps/api
buildCommand: pip install -e .
startCommand: uvicorn app.main:app --host 0.0.0.0 --port $PORT
healthCheckPath: /api/v1/health
```

Variables que Render pedira o configurara:

```text
APP_ENV=production
FRONTEND_ORIGIN=https://tu-frontend.vercel.app
DATABASE_URL=postgresql+psycopg://...
DATABASE_POOL_MODE=transaction
JWT_SECRET_KEY=<generado por Render o secreto manual>
ACCESS_TOKEN_EXPIRE_MINUTES=30
REFRESH_TOKEN_EXPIRE_DAYS=7
```

### 2.3 Opcion B - Configuracion manual

Crear un Web Service:

```text
Language: Python
Root Directory: apps/api
Build Command: pip install -e .
Start Command: uvicorn app.main:app --host 0.0.0.0 --port $PORT
Health Check Path: /api/v1/health
```

Despues de desplegar, abre:

```text
https://TU-SERVICIO.onrender.com/api/v1/health
```

Debe responder:

```json
{"status":"ok","service":"martrust-api"}
```

## 3. Vercel - Frontend React

### 3.1 Rama recomendada

Conecta Vercel a la rama:

```text
frontend/vercel-deploy
```

### 3.2 Configuracion del proyecto

En Vercel:

```text
Framework Preset: Vite
Root Directory: apps/web
Install Command: npm install
Build Command: npm run build
Output Directory: dist
```

El archivo `apps/web/vercel.json` contiene el rewrite necesario para React
Router, evitando 404 al abrir rutas como `/login` o `/cliente` directamente.

### 3.3 Variables de entorno

En Vercel agrega:

```text
VITE_API_URL=https://TU-SERVICIO.onrender.com
```

No agregues `DATABASE_URL`, `JWT_SECRET_KEY` ni claves privadas de Supabase en
Vercel. Todo secreto debe vivir en Render.

## 4. Orden correcto de despliegue

1. Crear proyecto Supabase.
2. Crear connection string para Render.
3. Desplegar API en Render.
4. Verificar `/api/v1/health`.
5. Configurar `VITE_API_URL` en Vercel con la URL de Render.
6. Desplegar frontend en Vercel.
7. Configurar `FRONTEND_ORIGIN` en Render con la URL final de Vercel.
8. Redeploy de Render para aplicar CORS final.

## 5. Variables por ambiente

Backend local `apps/api/.env`:

```text
APP_ENV=local
FRONTEND_ORIGIN=http://localhost:5173
DATABASE_URL=postgresql+psycopg://...
DATABASE_POOL_MODE=transaction
JWT_SECRET_KEY=local-dev-secret
```

Frontend local `apps/web/.env.local`:

```text
VITE_API_URL=http://localhost:8000
```

Render:

```text
APP_ENV=production
FRONTEND_ORIGIN=https://tu-app.vercel.app
DATABASE_URL=postgresql+psycopg://...
DATABASE_POOL_MODE=transaction
JWT_SECRET_KEY=<secret>
```

Vercel:

```text
VITE_API_URL=https://tu-api.onrender.com
```

## 6. Checklist antes de produccion

- `frontend/vercel-deploy` tiene build verde.
- `backend/fastapi-render` tiene healthcheck verde.
- `database/supabase-postgres` tiene migraciones revisadas.
- `DATABASE_URL` no aparece en GitHub.
- `VITE_API_URL` apunta a Render.
- `FRONTEND_ORIGIN` apunta a Vercel.
- CORS no usa `*` en produccion.
- El login real todavia no debe considerarse seguro hasta integrar JWT backend.

## 7. Referencias oficiales

- Render FastAPI: https://render.com/docs/deploy-fastapi
- Render monorepos: https://render.com/docs/monorepo-support
- Vercel build/root directory: https://vercel.com/docs/builds/configure-a-build
- Supabase connection strings: https://supabase.com/docs/guides/database/connecting-to-postgres
- Supabase + SQLAlchemy: https://supabase.com/docs/guides/troubleshooting/using-sqlalchemy-with-supabase-FUqebT
