package main

import (
	"log"
	"time"

	"github.com/KubrickCode/loa-life/src/go/apps/market-item-scraper/scraper"
	"github.com/KubrickCode/loa-life/src/go/libs/loadb"
	"github.com/KubrickCode/loa-life/src/go/libs/schedule"
)

func main() {
	db, err := loadb.New()
	if err != nil {
		log.Fatal(err)
	}

	scraper := scraper.NewScraper(db)

	scheduler := schedule.NewScheduler()
	scheduler.AddTask(schedule.NewTask("Market Item Scraping", time.Minute, scraper.Start))

	err = scheduler.Run()
	if err != nil {
		log.Fatal(err)
	}
}
