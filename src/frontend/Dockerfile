FROM node:22.11.0 as builder
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .

ARG VITE_GOOGLE_LOGIN_URL
ARG VITE_DISCORD_LOGIN_URL
ARG VITE_KAKAO_LOGIN_URL

RUN yarn build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
