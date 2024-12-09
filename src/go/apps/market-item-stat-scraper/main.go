package main

import (
	"log"
	"time"

	"github.com/KubrickCode/loa-life/src/go/apps/market-item-stat-scraper/converter"
	"github.com/KubrickCode/loa-life/src/go/apps/market-item-stat-scraper/scraper"
	"github.com/KubrickCode/loa-life/src/go/libs/loadb"
	"github.com/KubrickCode/loa-life/src/go/libs/schedule"
)

func main() {
	db, err := loadb.New()
	if err != nil {
		log.Fatal(err)
	}

	scraper := scraper.NewScraper(db)
	converter := converter.NewConverter(db)

	scheduler := schedule.NewScheduler()
	scheduler.AddTask(schedule.NewTask("Market Item Stat Scraping", time.Minute, scraper.Start))
	scheduler.AddTask(schedule.NewTask("Market Item Stat Converting", time.Minute, converter.Start))

	err = scheduler.Run()
	if err != nil {
		log.Fatal(err)
	}
}
