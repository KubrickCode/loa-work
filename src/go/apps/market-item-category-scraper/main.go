package main

import (
	"log"
	"time"

	"github.com/KubrickCode/loa-life/src/go/libs/schedule"
)

func main() {
	scraper := NewScraper()

	scheduler := schedule.NewScheduler()
	scheduler.AddTask(schedule.NewTask("Market Item Category Scraping", time.Hour, scraper.Start))

	err := scheduler.Run()
	if err != nil {
		log.Fatal(err)
	}
}
