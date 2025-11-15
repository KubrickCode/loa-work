FROM node:22.11.0-alpine AS build
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@9.15.0 --activate

COPY src/backend/package.json src/backend/pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile
COPY src/backend/ .
RUN pnpm prisma generate
RUN pnpm build
FROM node:22.11.0-alpine
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@9.15.0 --activate

COPY src/backend/package.json src/backend/pnpm-lock.yaml ./

RUN pnpm install --prod --frozen-lockfile

COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma ./prisma
COPY frontend-build ./dist/frontend
EXPOSE 3000
CMD ["pnpm", "start:prod"]
