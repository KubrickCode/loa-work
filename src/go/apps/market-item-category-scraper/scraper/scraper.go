package scraper

import (
	"context"
	"errors"
	"fmt"
	"log"
	"time"

	"github.com/KubrickCode/loa-work/src/go/libs/loaApi/request"
	"github.com/KubrickCode/loa-work/src/go/libs/loadb"
	"github.com/KubrickCode/loa-work/src/go/libs/loadb/models"
	"github.com/KubrickCode/loa-work/src/go/libs/ratelimit"
)

const (
	defaultRateLimitInterval = time.Second
	defaultRateLimitBurst    = 1
)

var ErrNoMarketItemCategories = errors.New("no market item categories found")

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
	if err := s.rateLimiter.Wait(context.Background()); err != nil {
		return nil, fmt.Errorf("rate limiter error: %w", err)
	}

	resp, err := s.client.GetCategoryList()
	if err != nil {
		return nil, err
	}

	categories := GetFlattenCategories(resp.Categories)

	if len(categories) == 0 {
		return nil, ErrNoMarketItemCategories
	}

	return categories, nil
}

func (s *Scraper) saveCategories(categories []*models.MarketItemCategory) error {
	return s.db.MarketItemCategory().UpsertMany(categories)
}
