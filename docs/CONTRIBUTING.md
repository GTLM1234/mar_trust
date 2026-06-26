# Guia de contribucion

## Flujo de ramas

### Modo rapido actual

Por urgencia de despliegue, `main` queda como rama operativa unica. Los cambios
criticos deben commitearse con mensajes claros y validarse antes de hacer push.

### Flujo recomendado cuando haya mas tiempo

1. Crear cambios desde `develop` o desde la rama tecnica correspondiente.
2. Usar commits pequenos y descriptivos.
3. Abrir Pull Request hacia `develop`.
4. Fusionar a `main` solo cuando el cambio este validado.

## Convencion de commits

Usar Conventional Commits:

```text
docs: add project roadmap
chore: scaffold monorepo structure
feat(api): add authentication service
fix(web): handle empty search results
```

Tipos recomendados:

- `docs`: documentacion.
- `chore`: estructura, herramientas o mantenimiento.
- `feat`: nueva funcionalidad.
- `fix`: correccion.
- `refactor`: mejora interna sin cambiar comportamiento.
- `test`: pruebas.

## Reglas de arquitectura

- El frontend consume la API mediante HTTP; no accede directamente a tablas.
- Las reglas de negocio viven en servicios del backend.
- El indice de confianza se calcula en backend.
- Las integraciones de pago quedan encapsuladas para poder reemplazarse despues.
- Las migraciones de base de datos deben ser revisables y reproducibles.

## Seguridad

- No commitear archivos `.env`.
- No usar variables privadas con prefijo `VITE_`.
- No exponer cadenas de conexion de Supabase en el navegador.
- No registrar secretos en logs.
