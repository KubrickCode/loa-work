package scraper

import (
	"context"
	"fmt"
	"log/slog"
	"time"

	"github.com/KubrickCode/loa-work/src/go/libs/loaApi"
	"github.com/KubrickCode/loa-work/src/go/libs/loaApi/request"
	"github.com/KubrickCode/loa-work/src/go/libs/loadb"
	"github.com/KubrickCode/loa-work/src/go/libs/loadb/models"
	"github.com/KubrickCode/loa-work/src/go/libs/ratelimit"
)

const (
	defaultRateLimitInterval = time.Second
	defaultRateLimitBurst    = 1
)

type Scraper struct {
	client      request.APIClient
	db          loadb.DB
	rateLimiter ratelimit.Limiter
}

func NewScraper(client request.APIClient, db loadb.DB) *Scraper {
	return &Scraper{
		client:      client,
		db:          db,
		rateLimiter: ratelimit.NewLimiterPerDuration(defaultRateLimitInterval, defaultRateLimitBurst),
	}
}

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
			if err := s.rateLimiter.Wait(context.Background()); err != nil {
				return nil, fmt.Errorf("rate limiter error: %w", err)
			}

			resp, err := s.client.GetMarketItemList(&loaApi.GetMarketItemListParams{
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
						slog.Debug("duplicate item skipped", "name", item.Name, "grade", item.Grade, "id", item.ID)
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
	slog.Info("market items saved successfully")

	return s.db.MarketItem().UpsertMany(items)
}
