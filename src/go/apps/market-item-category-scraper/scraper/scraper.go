package scraper

import (
	"fmt"
	"log"

	"github.com/KubrickCode/loa-work/src/go/libs/loaApi/request"
	"github.com/KubrickCode/loa-work/src/go/libs/loadb"
	"github.com/KubrickCode/loa-work/src/go/libs/loadb/models"
)

type Scraper struct {
	db loadb.DB
}

func NewScraper(db loadb.DB) *Scraper {
	return &Scraper{db: db}
}

func (s *Scraper) Start() error {
	categories, err := s.getCategories()
	if err != nil {
		return fmt.Errorf("failed to get market item categories: %w", err)
	}

	err = s.saveCategories(categories)
	if err != nil {
		return fmt.Errorf("failed to create market item categories: %w", err)
	}

	log.Println("Market item categories created successfully")

	return nil
}

func (s *Scraper) getCategories() ([]*models.MarketItemCategory, error) {
	resp, err := request.GetCategoryList()
	if err != nil {
		return nil, err
	}

	categories := GetFlattenCategories(resp.Categories)

	if len(categories) == 0 {
		return nil, fmt.Errorf("no market item categories found")
	}

	return categories, nil
}

func (s *Scraper) saveCategories(categories []*models.MarketItemCategory) error {
	return s.db.MarketItemCategory().UpsertMany(categories)
}
