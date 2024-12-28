package main

import (
	"log"
	"time"

	"github.com/KubrickCode/loa-work/src/go/apps/market-item-stat-scraper/converter"
	"github.com/KubrickCode/loa-work/src/go/apps/market-item-stat-scraper/scraper"
	"github.com/KubrickCode/loa-work/src/go/libs/loadb"
	"github.com/KubrickCode/loa-work/src/go/libs/schedule"
)

func main() {
	db, err := loadb.New()
	if err != nil {
		log.Fatal(err)
	}

	scraper := scraper.NewScraper(db)
	converter := converter.NewConverter(db)

	combinedTask := func() error {
		if err := scraper.Start(); err != nil {
			return err
		}
		return converter.Start()
	}

	scheduler := schedule.NewScheduler()
	scheduler.AddTask(schedule.NewTask("Market item stat scraping and converting", time.Minute, combinedTask))

	err = scheduler.Run()
	if err != nil {
		log.Fatal(err)
	}
}
