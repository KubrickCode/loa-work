package scraper

import (
	"context"
	"fmt"
	"log"
	"time"

	"github.com/KubrickCode/loa-work/src/go/libs/loaApi"
	"github.com/KubrickCode/loa-work/src/go/libs/loaApi/request"
	"github.com/KubrickCode/loa-work/src/go/libs/loadb"
	"github.com/KubrickCode/loa-work/src/go/libs/loadb/models"
	"github.com/ericlagergren/decimal"
	"golang.org/x/time/rate"
)

type Scraper struct {
	db          loadb.DB
	rateLimiter *rate.Limiter
}

func NewScraper(db loadb.DB) *Scraper {
	return &Scraper{db: db, rateLimiter: rate.NewLimiter(rate.Every(time.Second), 1)}
}

func (s *Scraper) ScrapeItem() error {
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

func (s *Scraper) ScrapeStat() error {
	items, err := s.getItemsToScrape()
	if err != nil {
		return fmt.Errorf("failed to get market items: %w", err)
	}

	err = s.saveItemStats(items)
	if err != nil {
		return fmt.Errorf("failed to save market item stats: %w", err)
	}

	return nil
}

func (s *Scraper) saveItemStats(items []*models.MarketItem) error {
	var statsToCreate []*models.MarketItemStat

	for _, item := range items {
		category, err := s.getCategoryByItem(item)
		if err != nil {
			return fmt.Errorf("failed to get market item category: %w", err)
		}

		stat, err := s.getItemStatToCreate(category, item)
		if err != nil {
			return fmt.Errorf("failed to get market item stat: %w", err)
		}

		statsToCreate = append(statsToCreate, stat)
	}

	if len(statsToCreate) > 0 {
		err := s.db.MarketItemStat().CreateMany(statsToCreate)
		if err != nil {
			return fmt.Errorf("failed to create market item stats: %w", err)
		}
	}

	log.Println("Market item stat saved successfully")

	return nil
}

func (s *Scraper) getItemsToScrape() ([]*models.MarketItem, error) {
	items, err := s.db.MarketItem().FindStatScraperEnabledAll()
	if err != nil {
		return nil, err
	}

	if len(items) == 0 {
		return nil, fmt.Errorf("no market items found")
	}

	return items, nil
}

func (s *Scraper) getCategoryByItem(item *models.MarketItem) (*models.MarketItemCategory, error) {
	category, err := s.db.MarketItemCategory().FindByID(item.MarketItemCategoryID)
	if err != nil {
		return nil, err
	}

	if category == nil {
		return nil, fmt.Errorf("market item category not found")
	}

	return category, nil
}

func (s *Scraper) getItemStatToCreate(category *models.MarketItemCategory, item *models.MarketItem) (*models.MarketItemStat, error) {
	if err := s.rateLimiter.Wait(context.Background()); err != nil {
		return nil, fmt.Errorf("rate limiter error: %w", err)
	}

	marketItem, err := request.GetMarketItem(&loaApi.GetMarketItemParams{
		CategoryCode: category.Code,
		ItemName:     item.Name,
		ItemGrade:    item.Grade,
	})
	if err != nil {
		return nil, err
	}

	ydayAvgDecimal := new(decimal.Big).SetFloat64(marketItem.YDayAvgPrice)

	stat := &models.MarketItemStat{
		CurrentMinPrice: marketItem.CurrentMinPrice,
		RecentPrice:     marketItem.RecentPrice,
		YDayAvgPrice:    loadb.NewDecimal(ydayAvgDecimal).ToSQLBoilerDecimal(),
		MarketItemID:    item.ID,
	}

	return stat, nil

}

func (s *Scraper) getCategoriesToScrape() ([]*models.MarketItemCategory, error) {
	categories, err := s.db.MarketItemCategory().FindItemScraperEnabledAll()
	if err != nil {
		return nil, err
	}

	if len(categories) == 0 {
		return nil, fmt.Errorf("no market item categories found")
	}

	return categories, nil
}

func (s *Scraper) getItemsToSave(categories []*models.MarketItemCategory) ([]*models.MarketItem, error) {
	var itemsToUpsert []*models.MarketItem
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
					itemsToUpsert = append(itemsToUpsert, &models.MarketItem{
						BundleCount:          item.BundleCount,
						Grade:                item.Grade,
						MarketItemCategoryID: category.ID,
						Name:                 item.Name,
						ImageURL:             item.Icon,
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

func (s *Scraper) saveItems(items []*models.MarketItem) error {
	log.Println("Market items saved successfully")

	return s.db.MarketItem().UpsertMany(items)
}
