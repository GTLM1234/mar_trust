# MarTrust - Roadmap del Proyecto

## 1. Vision del producto

MarTrust es una plataforma de confianza para puestos de mariscos certificados.
Su objetivo principal es ayudar a clientes a descubrir puestos confiables y ayudar
a vendedores a demostrar reputacion, certificaciones, promociones y presencia
digital.

Slogan:

> La plataforma que conecta clientes con puestos de mariscos certificados.

MarTrust no es un marketplace, no procesa pedidos, no administra delivery y no
administra repartidores. Cualquier funcionalidad relacionada con pagos debe
entenderse como registro manual de intencion y confirmacion, no como una pasarela
de pago.

## 2. Objetivos del MVP

El MVP debe validar tres hipotesis:

1. Los clientes quieren encontrar puestos certificados y confiables.
2. Los vendedores quieren mostrar informacion sanitaria, menu, fotos y promociones.
3. El indice de confianza ayuda a tomar mejores decisiones antes de visitar un puesto.

Alcance minimo del MVP:

- Registro e inicio de sesion con roles.
- Perfil de cliente y vendedor.
- Registro y edicion de puestos.
- Busqueda de puestos por nombre, distrito y tipo de plato.
- Visualizacion de puesto con ubicacion, fotos, menu, promociones, certificados y opiniones.
- Favoritos.
- Opiniones y calificaciones.
- Calculo backend del indice de confianza.
- Registro manual de intencion de pago Yape/Plin.
- Panel basico de vendedor con visitas, favoritos y estado del perfil.

Fuera del MVP:

- Marketplace de pedidos.
- Carrito de compras.
- Delivery.
- Integracion API de Yape o Plin.
- Cashback real.
- Recomendaciones IA avanzadas.
- Campanas pagadas automatizadas.
- App movil nativa.

## 3. Arquitectura objetivo

Flujo principal:

```text
Usuario
  |
  v
React 19 + Vite + TypeScript (Vercel)
  |
  | HTTPS / REST API
  v
FastAPI + SQLAlchemy 2.0 (Render)
  |
  | ORM / PostgreSQL protocol
  v
PostgreSQL (Supabase)
```

Almacenamiento de archivos:

```text
FastAPI
  |
  v
Supabase Storage
```

Regla arquitectonica:

- El frontend no calcula reglas criticas de negocio.
- El indice de confianza se calcula exclusivamente en backend.
- El frontend no accede directamente a tablas de PostgreSQL.
- Las claves privadas de Supabase nunca se exponen con prefijo `VITE_`.

## 4. Decisiones arquitectonicas iniciales

### 4.1 Backend

Stack:

- Python.
- FastAPI.
- SQLAlchemy 2.0.
- Pydantic.
- Alembic.
- JWT access token.
- Refresh token.
- PostgreSQL en Supabase.

Estructura logica:

```text
Presentation / API Routers
  -> Services
  -> Repositories
  -> Database / SQLAlchemy
```

Capas esperadas:

- `routers`: endpoints REST.
- `schemas`: DTOs y contratos Pydantic.
- `models`: modelos SQLAlchemy.
- `services`: casos de uso y reglas de negocio.
- `repositories`: acceso a datos.
- `core`: configuracion, settings, seguridad y dependencias globales.
- `middlewares`: CORS, logging y manejo transversal.
- `security`: JWT, hashing, refresh tokens y permisos.
- `utils`: helpers sin logica de dominio.

### 4.2 Frontend

Stack:

- React 19.
- Vite.
- TypeScript strict.
- React Router.
- Axios.
- TanStack Query.
- TailwindCSS.

Criterios UX:

- Interfaz moderna, minimalista y responsive.
- Inspiracion: Airbnb, Google Maps y Uber Eats, sin copiar disenos.
- Prioridad en busqueda, mapa, reputacion y claridad de certificados.
- La experiencia debe comunicar confianza, higiene, cercania y transparencia.

### 4.3 Base de datos

Reglas:

- PostgreSQL normalizado.
- UUID como claves primarias.
- `created_at`, `updated_at`, `deleted_at` en tablas principales.
- Soft delete por defecto.
- Relaciones mediante claves foraneas.
- Indices en columnas de busqueda y filtros frecuentes.
- Migraciones versionadas con Alembic.

## 5. Inconsistencias y aclaraciones detectadas

### 5.1 Pagos

El prompt indica que el cliente puede elegir metodo de pago, pero tambien indica
que no se debe implementar integracion con APIs de Yape o Plin.

Decision recomendada:

- El vendedor registra numero y/o QR de Yape y Plin.
- El cliente selecciona "Pagar".
- El sistema muestra monto, metodo, QR o numero.
- El sistema registra una intencion de pago.
- La confirmacion del pago es manual.
- No se marca como pago procesado por una pasarela externa.

Esto mantiene la arquitectura preparada para integrar un proveedor real en el
futuro sin convertir el MVP en marketplace.

### 5.2 Supabase Auth vs JWT propio

El prompt pide JWT y refresh token. Lovable suele generar MVPs conectados a
Supabase desde frontend.

Decision recomendada:

- Para la arquitectura objetivo, FastAPI debe emitir y validar tokens.
- Supabase se usa como PostgreSQL y Storage.
- Si el MVP actual de Lovable ya usa Supabase Auth, se debe migrar de forma
  gradual para no romper el frontend.

### 5.3 Freemium

El modelo freemium tiene funciones que dependen de analitica, IA o pagos.

Decision recomendada:

- El MVP debe incluir flags de plan y permisos.
- Las funciones premium avanzadas se modelan en base de datos y permisos, pero
  se implementan en fases posteriores.

## 6. Roadmap por fases

### Fase 0 - Preparacion del repositorio

Objetivo:

Establecer una base profesional de trabajo antes de escribir modulos.

Entregables:

- Rama `main` para produccion.
- Rama `develop` para integracion.
- Rama `frontend/vercel-deploy` para frontend.
- Rama `backend/fastapi-render` para backend.
- Rama `database/supabase-postgres` para base de datos.
- Documentacion inicial en `docs/`.
- Convenciones de commits y pull requests.
- Archivo `.gitignore`.
- README actualizado.

Criterio de aceptacion:

- El equipo puede saber donde trabajar cada cambio.
- El repositorio tiene documentacion minima para arrancar.

Estado:

- Ramas creadas.
- Repositorio conectado a GitHub.
- Documentacion inicial en progreso.

### Fase 1 - Roadmap y arquitectura de alto nivel

Objetivo:

Definir el plan completo antes de crear codigo productivo.

Entregables:

- Roadmap del proyecto.
- Alcance del MVP.
- No-alcance del MVP.
- Riesgos.
- Decisiones iniciales.
- Orden recomendado de implementacion.

Criterio de aceptacion:

- El roadmap es aprobado antes de crear estructura de carpetas, modelos o
  migraciones.

### Fase 2 - Estructura de carpetas

Objetivo:

Crear la estructura base del monorepo o repo modular.

Decision recomendada:

Usar un monorepo simple:

```text
mar_trust/
  apps/
    web/
    api/
  docs/
  infra/
  .github/
```

Ventajas:

- Un solo repositorio para frontend, backend, documentacion e infra.
- Pull requests mas faciles de revisar.
- Versionado sincronizado entre API y frontend.

Desventajas:

- Requiere convenciones claras para evitar mezcla de responsabilidades.

Alternativa:

- Repos separados para frontend y backend.

No recomendada para este MVP porque agrega complejidad operativa prematura.

### Fase 3 - Arquitectura tecnica detallada

Objetivo:

Documentar como se comunican frontend, backend, base de datos y storage.

Entregables:

- Diagrama de arquitectura.
- Contratos REST iniciales.
- Estrategia de autenticacion.
- Estrategia de autorizacion por roles.
- Estrategia de errores.
- Estrategia de logging.
- Estrategia de configuracion por ambiente.

Criterio de aceptacion:

- Existe una guia clara para implementar API y frontend sin improvisar contratos.

### Fase 4 - Modelo ER

Objetivo:

Disenar la base de datos normalizada.

Entidades iniciales:

- Usuario.
- Rol.
- Puesto.
- Horario.
- Menu.
- Categoria.
- Certificado.
- Promocion.
- Fotografia.
- Favorito.
- Opinion.
- Pago.
- Visita.
- Seguidor.
- IndiceConfianza.

Entidades tecnicas recomendadas:

- RefreshToken.
- AuditLog.
- PaymentIntent.
- SellerPaymentMethod.
- District.
- DishType.
- SubscriptionPlan.
- UserSubscription.

Criterio de aceptacion:

- Las relaciones, cardinalidades y restricciones quedan documentadas antes de
  escribir modelos SQLAlchemy.

### Fase 5 - Backend base

Objetivo:

Crear una API FastAPI limpia, testeable y lista para Render.

Entregables:

- Proyecto FastAPI.
- Configuracion por variables de entorno.
- Conexion SQLAlchemy a PostgreSQL.
- Healthcheck.
- CORS.
- Manejador de errores.
- Logging basico.
- Pytest configurado.
- Ruff o Flake8.
- Mypy opcional si no ralentiza el MVP.

Criterio de aceptacion:

- `GET /health` responde correctamente.
- La API arranca localmente.
- La API puede desplegarse en Render.

### Fase 6 - Modelos SQLAlchemy y migraciones

Objetivo:

Implementar modelos persistentes con Alembic.

Entregables:

- Modelos SQLAlchemy 2.0.
- Migracion inicial.
- Indices.
- Relaciones.
- Soft delete.
- Timestamps.
- Seeds minimos para roles.

Criterio de aceptacion:

- La migracion corre en PostgreSQL Supabase.
- El esquema queda versionado.

### Fase 7 - Autenticacion y autorizacion

Objetivo:

Proteger el sistema con JWT, refresh token y roles.

Entregables:

- Registro.
- Login.
- Refresh token.
- Logout.
- Hash de password.
- Dependencias de usuario actual.
- Permisos por rol: `CLIENTE`, `VENDEDOR`, `ADMIN`.

Criterio de aceptacion:

- Endpoints privados rechazan usuarios no autenticados.
- Endpoints por rol rechazan usuarios sin permiso.

### Fase 8 - Modulo de vendedores y puestos

Objetivo:

Permitir que un vendedor registre y administre su puesto.

Entregables:

- CRUD de puesto.
- Horarios.
- Ubicacion.
- Menu.
- Categorias.
- Fotos.
- Certificados.
- Promociones.
- Metodos manuales de pago Yape/Plin.

Criterio de aceptacion:

- Un vendedor puede crear y mantener su perfil comercial.
- Un cliente puede visualizar la informacion publica del puesto.

### Fase 9 - Modulo de busqueda y descubrimiento

Objetivo:

Permitir encontrar puestos por criterios utiles.

Entregables:

- Busqueda por nombre.
- Busqueda por distrito.
- Busqueda por tipo de plato.
- Filtros por certificado vigente.
- Orden por calificacion e indice de confianza.
- Endpoint para listado publico.

Criterio de aceptacion:

- El cliente encuentra puestos relevantes en pocos pasos.

### Fase 10 - Opiniones, favoritos y seguidores

Objetivo:

Construir senales de reputacion y relacion entre clientes y vendedores.

Entregables:

- Opinion con calificacion.
- Favoritos.
- Seguidores.
- Validaciones para evitar duplicados.
- Agregados para calificacion promedio.

Criterio de aceptacion:

- Las opiniones impactan el indice de confianza.
- El cliente puede guardar y seguir puestos/vendedores.

### Fase 11 - Indice de confianza

Objetivo:

Implementar el diferenciador principal de MarTrust.

Entregables:

- Servicio independiente `TrustIndexService`.
- Formula versionada.
- Factores:
  - Certificados vigentes.
  - Cantidad de opiniones.
  - Calificacion promedio.
  - Antiguedad.
  - Perfil completo.
- Persistencia historica o ultimo valor calculado.
- Endpoint publico para visualizar el resultado.

Criterio de aceptacion:

- El indice se calcula en backend.
- El frontend solo consume el resultado.
- La formula se puede modificar sin reescribir endpoints.

### Fase 12 - Pagos manuales

Objetivo:

Registrar intenciones de pago sin procesar dinero.

Entregables:

- Metodos de pago del vendedor.
- Intencion de pago.
- Monto.
- Metodo seleccionado.
- Estado: `PENDING`, `MANUALLY_CONFIRMED`, `CANCELLED`.
- Confirmacion manual.

Criterio de aceptacion:

- El sistema registra trazabilidad sin afirmar que proceso el pago.

### Fase 13 - Frontend base

Objetivo:

Crear la aplicacion web profesional.

Entregables:

- React 19 + Vite + TypeScript.
- TailwindCSS.
- React Router.
- Axios.
- TanStack Query.
- Layout responsive.
- Manejo centralizado de API.
- Estados de carga, error y vacio.
- Configuracion de Vercel.

Criterio de aceptacion:

- La app corre localmente.
- La app despliega en Vercel.
- La app consume API desde variable `VITE_API_URL`.

### Fase 14 - Pantallas cliente

Objetivo:

Crear la experiencia publica y de cliente.

Entregables:

- Home/busqueda.
- Listado de puestos.
- Detalle de puesto.
- Mapa o placeholder preparado para mapa.
- Favoritos.
- Opiniones.
- Login/registro.
- Perfil de cliente.

Criterio de aceptacion:

- Un cliente puede descubrir, evaluar y guardar puestos.

### Fase 15 - Pantallas vendedor

Objetivo:

Crear experiencia de gestion para vendedores.

Entregables:

- Dashboard vendedor.
- Formulario de puesto.
- Gestion de menu.
- Gestion de certificados.
- Gestion de fotos.
- Gestion de promociones.
- Metodos de pago manual.
- Estadisticas basicas.

Criterio de aceptacion:

- Un vendedor puede mantener su presencia en MarTrust sin soporte tecnico.

### Fase 16 - Freemium y permisos de plan

Objetivo:

Introducir reglas de plan sin cobrar todavia.

Entregables:

- Planes.
- Limites de fotos para vendedor gratuito.
- Promociones limitadas o ilimitadas.
- Flags de premium.
- Preparacion para billing futuro.

Criterio de aceptacion:

- El sistema puede activar/desactivar capacidades segun plan.

### Fase 17 - Observabilidad, seguridad y calidad

Objetivo:

Endurecer el producto antes de produccion.

Entregables:

- Validaciones robustas.
- Rate limiting basico si aplica.
- Logs estructurados.
- Tests de servicios criticos.
- Tests de endpoints principales.
- Linter backend.
- ESLint y Prettier frontend.
- Reglas de CORS por ambiente.
- Checklist OWASP basico.

Criterio de aceptacion:

- Las rutas criticas tienen cobertura.
- Los errores no exponen informacion sensible.

### Fase 18 - CI/CD

Objetivo:

Automatizar validaciones y despliegues.

Entregables:

- GitHub Actions para backend.
- GitHub Actions para frontend.
- Build check.
- Lint check.
- Test check.
- Deploy frontend en Vercel por rama principal.
- Deploy backend en Render.

Criterio de aceptacion:

- Un PR no se fusiona si rompe tests o build.

### Fase 19 - Release MVP

Objetivo:

Publicar una version util y validable.

Entregables:

- Frontend en Vercel.
- Backend en Render.
- PostgreSQL Supabase.
- Storage Supabase.
- README operativo.
- Variables de entorno documentadas.
- Manual corto de uso.
- Checklist de produccion.

Criterio de aceptacion:

- Un cliente puede buscar y evaluar puestos.
- Un vendedor puede registrar y mantener su puesto.
- El indice de confianza es visible y calculado en backend.

## 7. Estrategia de ramas

Nota operativa:

Por urgencia de despliegue, el proyecto fue consolidado en `main` como rama
unica para Vercel y Render. La estrategia de ramas descrita abajo se conserva
como objetivo de trabajo ordenado cuando el proyecto tenga mas tiempo de ciclo.

Ramas principales:

- `main`: produccion.
- `develop`: integracion estable.

Ramas de trabajo:

- `frontend/vercel-deploy`: frontend y despliegue Vercel.
- `backend/fastapi-render`: backend y despliegue Render.
- `database/supabase-postgres`: modelo, migraciones y Supabase.

Flujo recomendado:

```text
feature branch -> develop -> main
```

Reglas:

- No trabajar directo en `main`.
- Cada fase debe cerrarse con commit claro.
- Cambios de API deben documentarse.
- Las migraciones deben revisarse antes de aplicarse a Supabase.

## 8. Riesgos principales

### Riesgo 1 - Lovable puede generar acoplamiento directo con Supabase

Mitigacion:

- Identificar llamadas directas desde frontend.
- Encapsular acceso HTTP con Axios.
- Migrar gradualmente hacia FastAPI.

### Riesgo 2 - El scope puede crecer hacia marketplace

Mitigacion:

- Mantener fuera pedidos, carrito y delivery.
- Documentar pagos como intenciones manuales.

### Riesgo 3 - El indice de confianza puede volverse poco transparente

Mitigacion:

- Versionar formula.
- Guardar factores usados.
- Mostrar al usuario razones del puntaje.

### Riesgo 4 - Datos sanitarios sensibles o falsos

Mitigacion:

- Estados de certificado.
- Revision/admin en fase posterior.
- Evidencia visual y fechas de vigencia.

### Riesgo 5 - Costos y limites de terceros

Mitigacion:

- Empezar con Supabase y Render en configuracion simple.
- Evitar IA avanzada en MVP.
- Usar storage con limites por plan.

## 9. Criterios de calidad

Backend:

- Separacion clara entre routers, services y repositories.
- Pydantic para entrada/salida.
- SQLAlchemy 2.0 tipado.
- Alembic para migraciones.
- Tests en servicios criticos.
- Errores consistentes.

Frontend:

- TypeScript strict.
- Componentes reutilizables.
- Axios centralizado.
- TanStack Query para estado remoto.
- Formularios validados.
- Estados de carga, error y vacio.
- Responsive desde el inicio.

Base de datos:

- UUID.
- Soft delete.
- Timestamps.
- Indices.
- Foreign keys.
- Migraciones reproducibles.

DevOps:

- Variables por ambiente.
- Builds reproducibles.
- CI antes de merge.
- Deploys separados: Vercel y Render.

## 10. Orden inmediato recomendado

Paso actual:

1. Aprobar este roadmap.

Siguientes pasos despues de aprobacion:

2. Crear estructura de carpetas del monorepo.
3. Crear documento de arquitectura tecnica.
4. Crear modelo ER.
5. Crear backend base FastAPI.
6. Crear modelos SQLAlchemy y migracion inicial.
7. Implementar autenticacion.
8. Implementar modulos por orden de prioridad.

## 11. Pendientes de decision

Antes de implementar codigo productivo se deben confirmar estas decisiones:

1. Pais/ciudad inicial del MVP.
2. Si el mapa usara Google Maps, Mapbox, Leaflet u otra alternativa.
3. Si Lovable seguira generando frontend o si el frontend se migrara manualmente.
4. Si Supabase Auth ya existe en el MVP actual.
5. Si los certificados tendran revision manual por ADMIN desde el MVP o fase posterior.
6. Si el monorepo `apps/web` y `apps/api` queda aprobado.

## 12. Estado de aprobacion

Estado actual:

- Pendiente de aprobacion del propietario del proyecto.

Una vez aprobado, la siguiente fase sera crear la estructura de carpetas del
proyecto sin implementar modulos de negocio todavia.
