package main

import (
	"log"

	"github.com/KubrickCode/loa-life/src/go/apps/market-item-category-scraper/scraper"
	"github.com/KubrickCode/loa-life/src/go/libs/loadb"
)

func main() {
	db, err := loadb.New()
	if err != nil {
		log.Fatal(err)
	}

	scraper := scraper.NewScraper(db)

	err = scraper.Start()
	if err != nil {
		log.Fatal(err)
	}
}
