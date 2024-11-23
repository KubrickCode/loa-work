package scraper

import (
	"fmt"
	"log"

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

	if len(categories) == 0 {
		return fmt.Errorf("no market item categories found")
	}

	var itemsToUpsert []loadb.MarketItem

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
				for _, item := range resp.Items {
					itemsToUpsert = append(itemsToUpsert, loadb.MarketItem{
						BundleCount:          item.BundleCount,
						MarketItemCategoryID: category.ID,
						Name:                 item.Name,
						ImageSrc:             item.Icon,
						RefID:                item.ID,
					})
				}
			}

			if itemCounts < resp.PageSize {
				break
			}

			pageNo++
		}
	}

	if len(itemsToUpsert) == 0 {
		return fmt.Errorf("no market items found")
	}

	err = s.db.MarketItem().UpsertMany(itemsToUpsert)
	if err != nil {
		return fmt.Errorf("failed to upsert market items: %w", err)
	}

	log.Println("Market items saved successfully")

	return nil
}
