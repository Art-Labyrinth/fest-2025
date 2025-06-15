FROM node:22-bookworm-slim

WORKDIR /code
COPY *.json ./
COPY *.js ./
COPY ./src ./src
COPY ./public ./public
COPY ./scripts ./scripts

ENV GENERATE_SOURCEMAP=false
RUN npm install
RUN npm run build

FROM openresty/openresty:latest
COPY --from=build /code/build /usr/share/nginx/html
COPY nginx.conf /usr/local/openresty/nginx/conf/nginx.conf