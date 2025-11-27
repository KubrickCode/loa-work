package main

import (
	"log/slog"
	"os"

	"github.com/KubrickCode/loa-work/src/go/apps/market-item-scraper/scraper"
	"github.com/KubrickCode/loa-work/src/go/libs/loaApi/request"
	"github.com/KubrickCode/loa-work/src/go/libs/loadb"
)

func main() {
	slog.SetDefault(slog.New(slog.NewJSONHandler(os.Stdout, nil)))

	db, err := loadb.New()
	if err != nil {
		slog.Error("failed to initialize database", "error", err)
		os.Exit(1)
	}

	client := request.NewClient()
	scraper := scraper.NewScraper(client, db)

	err = scraper.Start()
	if err != nil {
		slog.Error("scraper failed", "error", err)
		os.Exit(1)
	}
}
