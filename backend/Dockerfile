FROM node:20 AS builder

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install

COPY . .

RUN yarn prisma generate
RUN yarn build

FROM node:20

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/static ./static

ENV PORT=5000
EXPOSE 5000

CMD [ "yarn", "start:prod" ]
