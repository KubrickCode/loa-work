FROM golang:1.23-alpine AS builder

WORKDIR /app

COPY . .

WORKDIR /app/src/go/apps/auction-item-stat-scraper

RUN go mod download

RUN CGO_ENABLED=0 GOOS=linux go build -o auction-item-stat-scraper .

FROM alpine:latest

WORKDIR /app

RUN apk --no-cache add tzdata
ENV TZ=Asia/Seoul

COPY --from=builder /app/src/go/apps/auction-item-stat-scraper/auction-item-stat-scraper /app/auction-item-stat-scraper

CMD ["/app/auction-item-stat-scraper"] 
