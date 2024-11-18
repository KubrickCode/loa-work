FROM node:22.11.0-alpine AS build
WORKDIR /app
COPY . .
RUN yarn install
RUN yarn build

FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
