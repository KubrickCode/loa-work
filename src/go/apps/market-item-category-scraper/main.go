package main

import (
	"log"
	"time"

	"github.com/KubrickCode/loa-life/src/go/libs/loadb"
	"github.com/KubrickCode/loa-life/src/go/libs/schedule"
)

func main() {
	db, err := loadb.New()
	if err != nil {
		log.Fatal(err)
	}

	scraper := NewScraper(db)

	scheduler := schedule.NewScheduler()
	scheduler.AddTask(schedule.NewTask("Market Item Category Scraping", time.Hour, scraper.Start))

	err = scheduler.Run()
	if err != nil {
		log.Fatal(err)
	}
}
