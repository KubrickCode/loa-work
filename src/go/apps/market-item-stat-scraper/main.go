package main

import (
	"log"
	"strconv"
	"time"

	"github.com/KubrickCode/loa-work/src/go/apps/market-item-stat-scraper/converter"
	"github.com/KubrickCode/loa-work/src/go/apps/market-item-stat-scraper/scraper"
	"github.com/KubrickCode/loa-work/src/go/libs/env"
	"github.com/KubrickCode/loa-work/src/go/libs/loadb"
	"github.com/KubrickCode/loa-work/src/go/libs/monitoring"
	"github.com/KubrickCode/loa-work/src/go/libs/schedule"
)

func main() {
	metricsPort, err := strconv.Atoi(env.GetEnvFallback("METRICS_PORT", "3003"))
	if err != nil {
		log.Fatal(err)
	}

	monitor := monitoring.NewMonitor("market-item-stat-scraper", metricsPort)
	monitor.Start()

	db, err := loadb.New()
	if err != nil {
		log.Fatal(err)
	}

	scraper := scraper.NewScraper(db)
	converter := converter.NewConverter(db)

	combinedTask := func() error {
		if err := scraper.ScrapeStat(); err != nil {
			return err
		}
		return converter.Start()
	}

	scheduler := schedule.NewScheduler()
	scheduler.AddTask(schedule.NewTask("Market item stat scraping and converting", 10*time.Minute, combinedTask))
	// 아예 수집되지 않을 시 아이템의 bundle_count 등이 갱신되지 않는 문제가 있어서 수집 스케쥴에 포함시킴.
	// 단, 거의 변하지 않는 정보이기에 1시간 정도에 한 번만 수집되도록 설정함.
	// TODO: 또한 최초 seed data가 없을 시 단순히 수집에 실패하는 구조로 되어있기에 개선이 필요함.
	scheduler.AddTask(schedule.NewTask("Market item scraping and converting", 1*time.Hour, scraper.ScrapeItem))

	err = scheduler.Run()
	if err != nil {
		log.Fatal(err)
	}
}
