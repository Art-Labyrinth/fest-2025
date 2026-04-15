# Art-Labyrinth Fest Monorepo

This repository contains the Art-Labyrinth festival websites in a single monorepo.

## Structure

- `apps/main` — base website served at `/`
- `apps/site-2025` — 2025 festival website served at `/2025/`
- `apps/site-2026` — 2026 placeholder website served at `/2026/`
- `packages/shared` — shared modules and utilities
- `deploy/` — production and dev-server deployment infrastructure used by CI/CD
- `docker-compose.yml` — local unified development stack for running all apps behind one nginx proxy

## Workspace Commands

Run these commands from the repository root:

- `npm install` — install dependencies for all workspaces
- `npm run dev:main` — start the base website locally at http://localhost:3000/
- `npm run dev:2025` — start the 2025 website locally at http://localhost:3025/2025
- `npm run dev:2026` — start the 2026 website locally at http://localhost:3026/2026
- `npm run build:main` — build the base website for production
- `npm run build:2025` — build the 2025 website for production
- `npm run build:2026` — build the 2026 website for production
- `npm run build:all` — build all applications

## Deployment

All deployment-related files live in `deploy/`:

- `deploy/Dockerfile` — single multi-stage Docker build for all sites
- `deploy/nginx.conf` — nginx routing for `/`, `/2025/`, and `/2026/`
- `deploy/docker-compose.yml` — production compose configuration
- `deploy/dev/docker-compose.yml` — development compose configuration

### Production

```bash
docker compose -f ./deploy/docker-compose.yml up -d --build
```

### Development

For local unified development with one nginx entrypoint:

```bash
docker compose up -d --build
```

The local development stack starts all three apps behind one nginx entrypoint, so local routing matches production:

- main site: http://localhost:3000/
- 2025 site: http://localhost:3000/2025/
- 2026 site: http://localhost:3000/2026/

You can also use:

- npm run dev:stack
- npm run dev:stack:down

## CI/CD

The GitHub Actions workflow is defined in [.github/workflows/build.yml](.github/workflows/build.yml).

It:

- runs on pushes to `main` and `dev`
- only triggers when relevant files change: workflow files, `deploy/`, `apps/`, `packages/`, `package.json`, and `package-lock.json`
- enables `DOCKER_BUILDKIT=1`
- deploys with `docker compose ... up -d --build --remove-orphans`

## Docker Build Strategy

The Docker build is optimized for layer reuse:

- package manifests are copied first
- `npm ci` is cached in a dedicated dependency stage
- `main`, `2025`, and `2026` are built in separate stages

This means:

- dependency installation stays cached when manifests do not change
- rebuilding one site does not invalidate unrelated application build stages unnecessarily

## Notes

- Local public assets for nested sites should use `process.env.PUBLIC_URL`
- Translation arrays and objects in `react-i18next` should use `returnObjects: true`
