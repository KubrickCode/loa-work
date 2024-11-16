package main

import (
	"log"
	"time"

	"github.com/KubrickCode/loa-life/src/go/libs/schedule"
)

func main() {
	scraper := NewScraper()

	scheduler := schedule.NewScheduler()
	scheduler.AddTask(schedule.NewTask("Shopee order data converting", time.Second, scraper.Start))

	err := scheduler.Run()
	if err != nil {
		log.Fatal(err)
	}
}
