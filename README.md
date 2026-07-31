# Preston

Onboarding web + configuración de deploy para preston.com.ar.

## Estructura

- `onboarding-v1/` — Onboarding legacy publicado en `preston.com.ar/onboarding/` (mantiene compatibilidad con campañas activas).
- `onboarding-v2/` — Nueva web pública publicada en `preston.com.ar/`.
  - `web/` — SPA de un solo archivo (`index.html` + `assets/` + `Muli/` + `.htaccess`).
  - `categorias.md` — Catálogo de perfiles y requisitos por categoría.
  - `flujo.md` — Mapa funcional del recorrido y handoff a comercial.

## Deploy

**FTP (front)**: `ftp.preston.com.ar` (credenciales fuera del repo, ver `.ftp.json` local).

- `onboarding-v1/*` → `/onboarding/` en el servidor.
- `onboarding-v2/web/*` → raíz del servidor (`/`).

**Backend**: la API que consume el onboarding vive en `../api/` (repo `federicocuellosdev/indu`, deploy a Render como imagen Docker `federicocuellos/indu`). Endpoints:

- `POST /preston` — v1.
- `POST /preston-v2` — v2 (Paso 2: crea contacto + lead en pipeline "Embudo leads calientes").
- `PATCH /preston-v2/:leadId` — v2 (Paso 3: enriquece con datos + adjuntos y mueve a etapa completo).
