# ADR 0001 - Estructura monorepo

## Estado

Aprobada para el arranque del proyecto.

## Contexto

MarTrust necesita frontend, backend, documentacion e infraestructura en una fase
temprana. Separar todo en multiples repositorios aumentaria la carga operativa
del MVP y complicaria la trazabilidad entre contratos de API y pantallas.

## Decision

Usar un monorepo con esta estructura base:

```text
apps/
  api/
  web/
docs/
infra/
.github/
```

## Consecuencias positivas

- Historial unico de decisiones tecnicas.
- Pull Requests con cambios coordinados entre API y frontend.
- Documentacion versionada junto al codigo.
- Menor friccion para CI/CD inicial.

## Consecuencias negativas

- Requiere disciplina para no mezclar responsabilidades.
- Los comandos deben indicar claramente si aplican a `apps/api` o `apps/web`.

## Reglas

- `apps/api` contiene backend FastAPI.
- `apps/web` contiene frontend React.
- `docs` contiene roadmap, arquitectura, ADRs y guias.
- `infra` contiene configuracion de despliegue e infraestructura.
- Ningun modulo de negocio debe duplicarse entre frontend y backend.
