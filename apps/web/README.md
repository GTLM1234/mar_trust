# MarTrust Web

Frontend de MarTrust construido con React, Vite, TypeScript, React Router,
TanStack Query, Axios y TailwindCSS.

## Responsabilidad

El frontend presenta la experiencia de busqueda, detalle de puestos, favoritos,
opiniones y panel de vendedor. Las reglas criticas de negocio deben venir desde
la API.

## Ejecutar localmente

```bash
npm install
npm run dev
```

## Variables de entorno

Crear un archivo `.env.local` basado en `.env.example`.

```bash
VITE_API_URL=http://localhost:8000
```

Solo variables publicas deben usar el prefijo `VITE_`.
