package scraper

import (
	"fmt"
	"log"

	"github.com/KubrickCode/loa-work/src/go/libs/loaApi"
	"github.com/KubrickCode/loa-work/src/go/libs/loaApi/request"
	"github.com/KubrickCode/loa-work/src/go/libs/loadb"
)

type Scraper struct {
	db loadb.DB
}

func NewScraper(db loadb.DB) *Scraper {
	return &Scraper{db: db}
}

// TODO: Test 작성
func (s *Scraper) Start() error {
	categories, err := s.getCategoriesToScrape()
	if err != nil {
		return fmt.Errorf("failed to get market item categories: %w", err)
	}

	itemsToSave, err := s.getItemsToSave(categories)
	if err != nil {
		return fmt.Errorf("failed to get market items: %w", err)
	}

	err = s.saveItems(itemsToSave)
	if err != nil {
		return fmt.Errorf("failed to save market items: %w", err)
	}

	return nil
}

// TODO: Test 작성
func (s *Scraper) getCategoriesToScrape() ([]loadb.MarketItemCategory, error) {
	categories, err := s.db.MarketItemCategory().FindItemScraperEnabledAll()
	if err != nil {
		return nil, err
	}

	if len(categories) == 0 {
		return nil, fmt.Errorf("no market item categories found")
	}

	return categories, nil
}

// TODO: Test 작성
func (s *Scraper) getItemsToSave(categories []loadb.MarketItemCategory) ([]loadb.MarketItem, error) {
	var itemsToUpsert []loadb.MarketItem
	seenItems := make(map[string]bool)

	for _, category := range categories {
		pageNo := 1

		for {
			resp, err := request.GetMarketItemList(&loaApi.GetMarketItemListParams{
				CategoryCode: category.Code,
				PageNo:       pageNo,
			})
			if err != nil {
				return nil, fmt.Errorf("failed to get market items for category %d: %w", category.Code, err)
			}

			itemCounts := len(resp.Items)

			if itemCounts > 0 {
				for _, item := range resp.Items {
					uniqueKey := fmt.Sprintf("%s-%s", item.Name, item.Grade)

					if seenItems[uniqueKey] {
						log.Printf("중복 아이템 스킵: 이름=%s, 등급=%s, ID=%d",
							item.Name, item.Grade, item.ID)
						continue
					}

					seenItems[uniqueKey] = true
					itemsToUpsert = append(itemsToUpsert, loadb.MarketItem{
						BundleCount:          item.BundleCount,
						Grade:                item.Grade,
						MarketItemCategoryID: category.ID,
						Name:                 item.Name,
						ImageUrl:             item.Icon,
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
		return nil, fmt.Errorf("no market items found")
	}

	return itemsToUpsert, nil
}

// TODO: Test 작성
func (s *Scraper) saveItems(items []loadb.MarketItem) error {
	log.Println("Market items saved successfully")

	return s.db.MarketItem().UpsertMany(items)
}
