FROM node:20.11.1-alpine3.19 as build

RUN mkdir -p /app

WORKDIR /app

COPY ./package*.json ./tsconfig.json ./tsconfig.node.json ./index.html ./
COPY ./public ./public
COPY ./src ./src

RUN npm ci && \
    npm run build && \
    npm prune --production

FROM nginx:1.25.4-alpine3.18

COPY --from=build /app/dist /usr/share/nginx/html

COPY ./nginx/conf.d /etc/nginx/conf.d

