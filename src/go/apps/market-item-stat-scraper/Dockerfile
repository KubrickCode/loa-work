FROM golang:1.23-alpine AS builder

WORKDIR /app

COPY . .

WORKDIR /app/src/go/apps/market-item-stat-scraper

RUN go mod download

RUN CGO_ENABLED=0 GOOS=linux go build -o market-item-stat-scraper .

FROM alpine:latest

WORKDIR /app

RUN apk --no-cache add tzdata
ENV TZ=Asia/Seoul

COPY --from=builder /app/src/go/apps/market-item-stat-scraper/market-item-stat-scraper /app/market-item-stat-scraper

CMD ["/app/market-item-stat-scraper"] 
