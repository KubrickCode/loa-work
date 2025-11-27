package main

import (
	"log/slog"
	"os"
	"strconv"
	"time"

	"github.com/KubrickCode/loa-work/src/go/apps/auction-item-stat-scraper/converter"
	"github.com/KubrickCode/loa-work/src/go/apps/auction-item-stat-scraper/scraper"
	"github.com/KubrickCode/loa-work/src/go/libs/env"
	"github.com/KubrickCode/loa-work/src/go/libs/loaApi/request"
	"github.com/KubrickCode/loa-work/src/go/libs/loadb"
	"github.com/KubrickCode/loa-work/src/go/libs/monitoring"
	"github.com/KubrickCode/loa-work/src/go/libs/schedule"
)

func main() {
	slog.SetDefault(slog.New(slog.NewJSONHandler(os.Stdout, nil)))

	metricsPort, err := strconv.Atoi(env.GetEnvFallback("METRICS_PORT", "3002"))
	if err != nil {
		slog.Error("failed to parse METRICS_PORT", "error", err)
		os.Exit(1)
	}

	monitor := monitoring.NewMonitor("auction-item-stat-scraper", metricsPort)
	monitor.Start()

	db, err := loadb.New()
	if err != nil {
		slog.Error("failed to initialize database", "error", err)
		os.Exit(1)
	}

	client := request.NewClient()
	scraper := scraper.NewScraper(client, db)
	converter := converter.NewConverter(db)

	combinedTask := func() error {
		if err := scraper.Start(); err != nil {
			return err
		}
		return converter.Start()
	}

	scheduler := schedule.NewScheduler()
	scheduler.AddTask(schedule.NewTask("Auction item stat scraping and converting", 10*time.Minute, combinedTask))

	if err := scheduler.Run(); err != nil {
		slog.Error("scheduler failed", "error", err)
		os.Exit(1)
	}
}
