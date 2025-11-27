package main

import (
	"log"

	"github.com/KubrickCode/loa-work/src/go/apps/market-item-scraper/scraper"
	"github.com/KubrickCode/loa-work/src/go/libs/loaApi/request"
	"github.com/KubrickCode/loa-work/src/go/libs/loadb"
)

func main() {
	db, err := loadb.New()
	if err != nil {
		log.Fatal(err)
	}

	client := request.NewClient()
	scraper := scraper.NewScraper(client, db)

	err = scraper.Start()
	if err != nil {
		log.Fatal(err)
	}
}
