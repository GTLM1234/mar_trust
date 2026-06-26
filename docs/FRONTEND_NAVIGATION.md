# MarTrust - Mapa de navegacion frontend

## Objetivo

Definir la navegacion base del frontend antes de ampliar modulos. Esta guia
mantiene conectado el flujo publico, cliente y vendedor sin construir todo el
sistema de una sola vez.

## Layouts

```text
PublicLayout
  Landing
  Acerca de
  Como funciona
  Buscar puestos
  Detalle de puesto
  Login
  Registro
  Recuperar contrasena

DashboardLayout CLIENTE
  Inicio
  Buscar puestos
  Favoritos
  Promociones
  Metodos de pago
  Perfil
  Configuracion

DashboardLayout VENDEDOR
  Inicio
  Mi puesto
  Menu
  Fotografias
  Certificados
  Promociones
  Horarios
  Metodos de pago
  Estadisticas
  Configuracion
```

## Flujo de autenticacion

```text
Visitante
  -> /login
      -> selecciona Cliente o Vendedor
      -> valida formulario
      -> crea sesion frontend temporal
      -> redirige a /cliente o /vendedor

Visitante
  -> /register
      -> selecciona Cliente o Vendedor
      -> valida formulario
      -> crea sesion frontend temporal
      -> redirige al dashboard correspondiente

Usuario autenticado
  -> ruta protegida
      -> valida rol
      -> permite acceso o redirige al dashboard correcto
```

## Estado actual

Implementado en esta fase:

- Login para Cliente y Vendedor.
- Registro para Cliente y Vendedor.
- Recuperacion de contrasena visual.
- Contexto frontend de autenticacion temporal.
- Proteccion de rutas por rol.
- Layout publico.
- Layout base para Cliente y Vendedor.

Pendiente para fase backend:

- Reemplazar sesion temporal por JWT emitido por FastAPI.
- Integrar refresh token.
- Normalizar errores de API.
- Persistir usuarios reales en PostgreSQL.
