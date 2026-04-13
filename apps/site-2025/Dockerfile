FROM node:22-bookworm-slim AS build

WORKDIR /code
# Copy workspace root files first
COPY package.json ./
# Copy the app
COPY apps/site-2025 ./apps/site-2025
COPY apps/main ./apps/main
COPY packages ./packages

ENV GENERATE_SOURCEMAP=false
RUN npm install
RUN npm run build:main
RUN npm run build:2025

FROM openresty/openresty:latest
COPY --from=build /code/apps/main/build /usr/share/nginx/html/main
COPY --from=build /code/apps/site-2025/build /usr/share/nginx/html/2025
COPY apps/site-2025/nginx.conf /usr/local/openresty/nginx/conf/nginx.conf