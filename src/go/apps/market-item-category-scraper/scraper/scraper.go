package scraper

import (
	"fmt"
	"log"

	"github.com/KubrickCode/loa-life/src/go/libs/loaApi/request"
	"github.com/KubrickCode/loa-life/src/go/libs/loadb"
)

type Scraper struct {
	db loadb.DB
}

func NewScraper(db loadb.DB) *Scraper {
	return &Scraper{db: db}
}

func (s *Scraper) Start() error {
	resp, err := request.GetCategoryList()
	if err != nil {
		return err
	}

	var categories []loadb.MarketItemCategory
	FlattenCategories(resp.Categories, &categories)

	if len(categories) == 0 {
		return fmt.Errorf("no market item categories found")
	}

	err = s.db.MarketItemCategory().UpsertMany(categories)
	if err != nil {
		return fmt.Errorf("failed to create market item categories: %w", err)
	}

	log.Println("Market item categories created successfully")

	return nil
}
