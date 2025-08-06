package scraper

import (
	"context"
	"fmt"
	"log"
	"time"

	"github.com/KubrickCode/loa-work/src/go/libs/loaApi"
	"github.com/KubrickCode/loa-work/src/go/libs/loaApi/request"
	"github.com/KubrickCode/loa-work/src/go/libs/loadb"
	"github.com/shopspring/decimal"
	"golang.org/x/time/rate"
)

type Scraper struct {
	db          loadb.DB
	rateLimiter *rate.Limiter
}

func NewScraper(db loadb.DB) *Scraper {
	return &Scraper{db: db, rateLimiter: rate.NewLimiter(rate.Every(time.Second), 1)}
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

func (s *Scraper) saveItemStats(items []loadb.MarketItem) error {
	var statsToCreate []loadb.MarketItemStat

	for _, item := range items {
		category, err := s.getCategoryByItem(item)
		if err != nil {
			return fmt.Errorf("failed to get market item category: %w", err)
		}

		stat, err := s.getItemStatToCreate(category, item)
		if err != nil {
			return fmt.Errorf("failed to get market item stat: %w", err)
		}

		statsToCreate = append(statsToCreate, *stat)
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

func (s *Scraper) getItemsToScrape() ([]loadb.MarketItem, error) {
	items, err := s.db.MarketItem().FindStatScraperEnabledAll()
	if err != nil {
		return nil, err
	}

	if len(items) == 0 {
		return nil, fmt.Errorf("no market items found")
	}

	return items, nil
}

func (s *Scraper) getCategoryByItem(item loadb.MarketItem) (*loadb.MarketItemCategory, error) {
	category, err := s.db.MarketItemCategory().FindByID(item.MarketItemCategoryID)
	if err != nil {
		return nil, err
	}

	if category == nil {
		return nil, fmt.Errorf("market item category not found")
	}

	return category, nil
}

func (s *Scraper) getItemStatToCreate(category *loadb.MarketItemCategory, item loadb.MarketItem) (*loadb.MarketItemStat, error) {
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

	stat := loadb.MarketItemStat{
		CurrentMinPrice: marketItem.CurrentMinPrice,
		RecentPrice:     marketItem.RecentPrice,
		YDayAvgPrice:    decimal.NewFromFloat(marketItem.YDayAvgPrice),
		MarketItemID:    item.ID,
	}

	return &stat, nil
}
