# Kruit Website

React + TypeScript + Vite frontend for kruit.ai, built with shadcn/ui and Tailwind CSS. Served in production via Nginx on Google Cloud Run, with a companion Node.js contact-form service also deployed to Cloud Run.

## Tech stack

- React 19 + TypeScript
- Vite 7 (build/dev tooling)
- Tailwind CSS 4 + shadcn/ui (Radix-based components)
- Redux Toolkit + React Redux (state)
- React Router 7
- Nginx (production static file serving)

## Code structure

```
.
├── src/
│   ├── app/            # Redux store setup and typed hooks
│   ├── assets/         # Images and static assets
│   ├── components/     # Shared/presentational components (landing sections, nav, footer, auth UI)
│   │   ├── auth/       # Auth-related components
│   │   └── ui/         # shadcn/ui primitives (button, input, etc.)
│   ├── features/       # Feature-scoped logic (e.g. auth slice/state)
│   ├── hooks/          # Reusable React hooks
│   ├── lib/            # Utility functions (e.g. className merging)
│   ├── pages/          # Route-level page components (Blog, Pricing, Login, Dashboard, etc.)
│   ├── services/       # API client/service modules (e.g. auth.service.ts)
│   ├── types/          # Shared TypeScript types
│   ├── config.ts       # Runtime config (reads window.__env__ in prod, import.meta.env in dev)
│   ├── App.tsx          # Root component / route definitions
│   └── main.tsx         # App entry point
├── public/
│   └── env-config.js    # Dev placeholder; overwritten at container startup in prod
├── cloud-run/           # Standalone Node.js/Express contact-form microservice (own package.json, Dockerfile, deploy scripts)
├── Dockerfile            # Multi-stage build: Vite build -> Nginx runtime
├── docker-entrypoint.sh  # Injects VITE_* env vars into window.__env__ at container start
├── nginx.conf            # Nginx server config for the built SPA
├── deploy.sh             # Deploys the frontend to the PROD GCP project
├── deploy-qa.sh          # Deploys the frontend to the QA GCP project
└── vite.config.ts
```

### How runtime config works

The app is built once and the same static bundle is deployed to every environment. Environment-specific values (API URLs) are **not** baked in at build time — they're injected at container startup:

1. `docker-entrypoint.sh` reads all `VITE_*` environment variables set on the Cloud Run service and writes them into `public/env-config.js` as `window.__env__`.
2. `src/config.ts` reads from `window.__env__` first, falling back to Vite's `import.meta.env` (used during local dev), falling back to a hardcoded local default.

This is why `deploy.sh` / `deploy-qa.sh` pass env vars via `--set-env-vars` rather than the build needing per-environment `.env` files.

## Local development

### Prerequisites

- Node.js (repo tested with v22/v23) and npm

### Frontend

```bash
npm ci
npm run dev
```

App runs at the Vite dev server URL printed in the terminal (default `http://localhost:5173`). In local dev, `src/config.ts` falls back to:
- `VITE_AUTH_API_BASE_URL` → `http://localhost:8001`
- `VITE_RESUME_VETTING_URL` → `http://localhost:5174`

Override these by creating a `.env` file at the repo root with `VITE_AUTH_API_BASE_URL` / `VITE_RESUME_VETTING_URL` if you need to point at different local/remote services.

Other scripts:

```bash
npm run build     # type-check (tsc -b) + production build to dist/
npm run lint      # eslint
npm run preview   # preview the production build locally
```

### Contact-form service (cloud-run/)

The demo/contact form on the site posts to a separate Express + Nodemailer microservice.

```bash
cd cloud-run
npm ci
cp .env.example .env
# Edit .env:
#   GMAIL_USER         — Gmail address used to send emails
#   GMAIL_APP_PASSWORD — 16-char Gmail App Password
#   TO_EMAIL           — internal recipient (e.g. sales@chintanlabs.com)
npm run dev
# → available at http://localhost:8080
```

Point the frontend at it locally by setting `VITE_CLOUD_RUN_URL=http://localhost:8080` in your root `.env`.

Test the endpoint directly:

```bash
curl -X POST http://localhost:8080/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Smith",
    "email": "jane@example.com",
    "phone": "+1 555 000 0000",
    "company": "Acme Corp",
    "message": "I would love a demo focused on AI-native assessments."
  }'
```

See `cloud-run/README.md` for Gmail SMTP setup details and the full API reference.

## Docker (build locally)

The frontend Dockerfile does a multi-stage build (Vite build → Nginx runtime) and injects env vars at container start:

```bash
docker build -t kruit-website .
docker run -p 8080:8080 \
  -e VITE_AUTH_API_BASE_URL=http://localhost:8001 \
  -e VITE_RESUME_VETTING_URL=http://localhost:5174 \
  -e VITE_CLOUD_RUN_URL=http://localhost:8080 \
  kruit-website
```

App is served at `http://localhost:8080`.

## Deployment

Deployment is manual — there is no CI/CD pipeline configured. An engineer with `gcloud` access to the relevant GCP project runs the deploy script directly, which builds from source and deploys to Cloud Run via `gcloud run deploy --source .`.

### QA

```bash
gcloud auth login   # if not already authenticated
bash deploy-qa.sh
```

- GCP project: `kruit-dev-500707`
- Service: `kruit-website` (region `us-central1`, max 2 instances)
- Script auto-discovers and wires in:
  - `VITE_AUTH_API_BASE_URL` — from the `auth-service` Cloud Run service (must be deployed first; see script output if missing)
  - `VITE_CLOUD_RUN_URL` — from the `kruit-contact` Cloud Run service (deploy via `cloud-run/deploy-qa.sh` first; contact form won't work without it)
  - `VITE_RESUME_VETTING_URL` — hardcoded to `https://resintel.viverekruit.ai/`

### Production

```bash
gcloud auth login   # if not already authenticated
bash deploy.sh
```

- GCP project: `kruit-prod-500707`
- Service: `kruit-website` (region `us-central1`, max 5 instances)
- Same env var auto-discovery as QA, but:
  - `VITE_RESUME_VETTING_URL` — hardcoded to `https://resintel.kruit.ai/`

Both scripts also ensure the `run`, `cloudbuild`, and `artifactregistry` GCP APIs are enabled, create the Artifact Registry repo (`cloud-run-source-deploy`) and the runtime service account if they don't already exist, and print the deployed service URL and a log-tailing command at the end.

### Deploying the contact-form service

The `cloud-run/` service has its own deploy script (`cloud-run/deploy.sh` — a single script, no separate QA variant currently) and should generally be deployed **before** the frontend, since the frontend deploy scripts look up its URL to wire in `VITE_CLOUD_RUN_URL`. See `cloud-run/README.md` for details.
