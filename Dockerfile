FROM node:22-bookworm-slim@sha256:2f3571619daafc6b53232ebf2fcc0817c1e64795e92de317c1684a915d13f1a5 AS build

WORKDIR /code
COPY *.json ./
COPY *.js ./
COPY ./src ./src
COPY ./public ./public
COPY ./scripts ./scripts

ENV GENERATE_SOURCEMAP=false
RUN npm install
RUN npm run build

FROM openresty/openresty:latest@sha256:9695c0f3e3de4f993e45b5030cd43eaaccfbdd0e6dddd39e848f89654c6edbcb
COPY --from=build /code/build /usr/share/nginx/html
COPY nginx.conf /usr/local/openresty/nginx/conf/nginx.conf