FROM node:20.11.1-alpine3.19 as build

RUN mkdir -p /app

WORKDIR /app

COPY ./package*.json ./tsconfig.json ./
COPY ./src ./src

RUN npm ci && \
    npm run build && \
    npm prune --production && \
    rm tsconfig.json

FROM node:20.11.1-alpine3.19

COPY --from=build /app /var/www/html/app

WORKDIR /var/www/html/app

RUN addgroup --system backend && \
    adduser --system --ingroup backend backend

USER backend

CMD ["/usr/local/bin/node", "./build/index.js"]

