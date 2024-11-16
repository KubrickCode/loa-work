package main

import (
	"log"
	"time"

	"github.com/KubrickCode/loa-life/src/go/libs/schedule"
)

func main() {
	scraper := NewScraper()

	scheduler := schedule.NewScheduler()
	scheduler.AddTask(schedule.NewTask("Minimum wage scraping", time.Hour*24*7, scraper.Start))

	err := scheduler.Run()
	if err != nil {
		log.Fatal(err)
	}
}
