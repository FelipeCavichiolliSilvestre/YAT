FROM node:20-slim as builder

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install

COPY . .

ENV VITE_BACKEND_URL="VITE_BACKEND_URL"
ENV VITE_WS_BACKEND_URL="VITE_WS_BACKEND_URL"
ENV VITE_FRONTEND_URL="VITE_FRONTEND_URL"

RUN yarn build

FROM nginx:stable-alpine3.17-slim

COPY --from=builder ./app/dist/ /usr/share/nginx/html
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY ./nginx/replace.sh /replace.sh

STOPSIGNAL SIGTERM

ENTRYPOINT /bin/sh -x /replace.sh && nginx -g 'daemon off;'