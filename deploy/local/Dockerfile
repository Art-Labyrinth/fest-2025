FROM node:22-bookworm-slim

WORKDIR /workspace

COPY package.json package-lock.json ./
COPY apps/main/package.json ./apps/main/package.json
COPY apps/site-2025/package.json ./apps/site-2025/package.json
COPY apps/site-2026/package.json ./apps/site-2026/package.json
COPY packages/shared/package.json ./packages/shared/package.json

RUN npm ci

CMD ["bash"]
