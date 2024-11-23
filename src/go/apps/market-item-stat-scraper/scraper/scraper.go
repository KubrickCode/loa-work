package scraper

import (
	"fmt"
	"log"

	"github.com/KubrickCode/loa-life/src/go/libs/loaApi"
	"github.com/KubrickCode/loa-life/src/go/libs/loaApi/request"
	"github.com/KubrickCode/loa-life/src/go/libs/loadb"
	"github.com/shopspring/decimal"
)

type Scraper struct {
	db loadb.DB
}

func NewScraper(db loadb.DB) *Scraper {
	return &Scraper{db: db}
}

func (s *Scraper) Start() error {
	items, err := s.db.MarketItem().FindStatScraperEnabledAll()
	if err != nil {
		return fmt.Errorf("failed to get market items: %w", err)
	}

	for _, item := range items {
		category, err := s.db.MarketItemCategory().FindByID(item.MarketItemCategoryID)
		if err != nil {
			return fmt.Errorf("failed to get market item category: %w", err)
		}

		marketItem, err := request.GetMarketItem(&loaApi.GetMarketItemParams{
			CategoryCode: category.Code,
			ItemName:     item.Name,
		})
		if err != nil {
			return fmt.Errorf("failed to get market item: %w", err)
		}

		err = s.db.MarketItemStat().Create(loadb.MarketItemStat{
			CurrentMinPrice: marketItem.CurrentMinPrice,
			RecentPrice:     marketItem.RecentPrice,
			YDayAvgPrice:    decimal.NewFromFloat(marketItem.YDayAvgPrice),
			MarketItemID:    item.ID,
		})
		if err != nil {
			return fmt.Errorf("failed to create market item stat: %w", err)
		}
	}

	log.Println("Market item stat saved successfully")

	return nil
}
