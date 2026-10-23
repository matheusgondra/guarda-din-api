FROM node:24-alpine AS base

WORKDIR /app

RUN corepack enable pnpm

COPY package.json pnpm-*.yaml ./
COPY prisma ./prisma
COPY prisma.config.ts ./

RUN pnpm install --frozen-lockfile

FROM base AS builder

WORKDIR /app

COPY . .

RUN pnpm prisma:generate
RUN pnpm build

FROM node:24-alpine AS production

WORKDIR /app

RUN corepack enable pnpm

ENV NODE_ENV=production

COPY package.json pnpm-*.yaml ./

RUN pnpm install --frozen-lockfile --prod

COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/main.js"]