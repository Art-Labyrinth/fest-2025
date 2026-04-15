FROM node:22-bookworm-slim AS deps

WORKDIR /code
COPY package.json package-lock.json ./
COPY apps/main/package.json ./apps/main/package.json
COPY apps/site-2025/package.json ./apps/site-2025/package.json
COPY apps/site-2026/package.json ./apps/site-2026/package.json
COPY packages/shared/package.json ./packages/shared/package.json

ENV GENERATE_SOURCEMAP=false
RUN npm ci

FROM deps AS build-main
COPY apps/main ./apps/main
COPY packages ./packages
RUN npm run build:main

FROM deps AS build-2025
COPY apps/site-2025 ./apps/site-2025
COPY packages ./packages
RUN npm run build:2025

FROM deps AS build-2026
COPY apps/site-2026 ./apps/site-2026
COPY packages ./packages
RUN npm run build:2026

FROM openresty/openresty:latest
COPY --from=build-main /code/apps/main/build /usr/share/nginx/html/main
COPY --from=build-2025 /code/apps/site-2025/build /usr/share/nginx/html/2025
COPY --from=build-2026 /code/apps/site-2026/build /usr/share/nginx/html/2026
COPY deploy/nginx.conf /usr/local/openresty/nginx/conf/nginx.conf
