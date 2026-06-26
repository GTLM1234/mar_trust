# MarTrust API

Backend de MarTrust construido con FastAPI, SQLAlchemy 2.0 y PostgreSQL.

## Responsabilidad

La API concentra reglas de negocio, autenticacion, autorizacion, calculo del
indice de confianza y persistencia. El frontend no debe calcular reglas criticas
ni acceder directamente a tablas.

## Ejecutar localmente

```bash
python -m venv .venv
.venv\Scripts\activate
pip install -e ".[dev]"
uvicorn app.main:app --reload
```

## Endpoints base

- `GET /api/v1/health`: healthcheck de la API.

## Capas

```text
app/api          Routers HTTP.
app/services     Casos de uso y reglas de negocio.
app/repositories Acceso a datos.
app/models       Modelos SQLAlchemy.
app/schemas      Contratos Pydantic.
app/core         Configuracion y dependencias transversales.
```
