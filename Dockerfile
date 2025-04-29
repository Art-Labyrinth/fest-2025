FROM node:22-bookworm-slim@sha256:861b74f96b1b16af3410e435ac533d53e691a2166d768f200f758b540e3e9ba3 AS build

WORKDIR /code
COPY *.json ./
COPY *.js ./
COPY ./src ./src
COPY ./public ./public
COPY ./scripts ./scripts

ENV GENERATE_SOURCEMAP=false
RUN npm install
RUN npm run build

FROM openresty/openresty:latest@sha256:ba4e036fb78a9a25848ef948478e55ccdda9b8c4bd7ff18cb3aab80095b7173a
# COPY --from=build /code/build /usr/share/nginx/html
# COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /code/build /usr/local/openresty/html
COPY nginx.conf /usr/local/openresty/nginx/conf/nginx.conf
