FROM node:22.18.0-alpine AS build
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
RUN yarn prisma generate
RUN yarn build
FROM node:22.18.0-alpine
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json .
COPY --from=build /app/prisma ./prisma
COPY frontend-build ./dist/frontend
EXPOSE 3000
CMD ["yarn", "start:prod"]
