FROM golang:1.23-alpine AS builder

ARG APP_PATH

WORKDIR /app
COPY . .

WORKDIR /app/${APP_PATH}
RUN go mod download
RUN CGO_ENABLED=0 GOOS=linux go build -o app .

FROM alpine:latest

ARG APP_PATH

WORKDIR /app

RUN apk --no-cache add tzdata
ENV TZ=Asia/Seoul
ENV METRICS_PORT=3000

COPY --from=builder /app/${APP_PATH}/app /app/app
CMD ["/app/app"]
