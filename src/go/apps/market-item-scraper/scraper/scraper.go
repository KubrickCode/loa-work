package scraper

import (
	"fmt"

	"github.com/KubrickCode/loa-life/src/go/libs/loaApi"
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
	categories, err := s.db.MarketItemCategory().FindItemScraperEnabledAll()
	if err != nil {
		return fmt.Errorf("failed to get market item categories: %w", err)
	}

	var allItems []loaApi.MarketItem

	for _, category := range categories {
		pageNo := 1

		for {
			resp, err := request.GetMarketItemList(&loaApi.GetMarketItemListParams{
				CategoryCode: category.Code,
				PageNo:       pageNo,
			})
			if err != nil {
				return fmt.Errorf("failed to get market items for category %d: %w", category.Code, err)
			}

			itemCounts := len(resp.Items)

			if itemCounts > 0 {
				allItems = append(allItems, resp.Items...)
			}

			if itemCounts < resp.PageSize {
				break
			}

			pageNo++
		}
	}

	fmt.Printf("Total Items Collected: %d\n", len(allItems))
	for _, item := range allItems {
		fmt.Printf("- %s (ID: %d, Price: %d)\n", item.Name, item.ID, item.CurrentMinPrice)
	}

	return nil
}
