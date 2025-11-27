package scraper

import (
	"context"
	"errors"
	"testing"

	"github.com/KubrickCode/loa-work/src/go/libs/loaApi"
	"github.com/KubrickCode/loa-work/src/go/libs/ratelimit"
)

// noopLimiter implements ratelimit.Limiter with no delay
type noopLimiter struct{}

func (l *noopLimiter) Wait(ctx context.Context) error {
	return nil
}

type mockAPIClient struct {
	getAuctionItemListFunc func(params *loaApi.GetAuctionItemListParams) (*loaApi.GetAuctionItemListResponse, error)
	getCategoryListFunc    func() (*loaApi.GetCategoryListResponse, error)
	getMarketItemFunc      func(params *loaApi.GetMarketItemParams) (*loaApi.GetMarketItemResponse, error)
	getMarketItemListFunc  func(params *loaApi.GetMarketItemListParams) (*loaApi.GetMarketItemListResponse, error)
}

func (m *mockAPIClient) GetAuctionItemList(params *loaApi.GetAuctionItemListParams) (*loaApi.GetAuctionItemListResponse, error) {
	if m.getAuctionItemListFunc != nil {
		return m.getAuctionItemListFunc(params)
	}
	return nil, errors.New("not implemented")
}

func (m *mockAPIClient) GetCategoryList() (*loaApi.GetCategoryListResponse, error) {
	if m.getCategoryListFunc != nil {
		return m.getCategoryListFunc()
	}
	return nil, errors.New("not implemented")
}

func (m *mockAPIClient) GetMarketItem(params *loaApi.GetMarketItemParams) (*loaApi.GetMarketItemResponse, error) {
	if m.getMarketItemFunc != nil {
		return m.getMarketItemFunc(params)
	}
	return nil, errors.New("not implemented")
}

func (m *mockAPIClient) GetMarketItemList(params *loaApi.GetMarketItemListParams) (*loaApi.GetMarketItemListResponse, error) {
	if m.getMarketItemListFunc != nil {
		return m.getMarketItemListFunc(params)
	}
	return nil, errors.New("not implemented")
}

func TestGetCategories_Success(t *testing.T) {
	mockClient := &mockAPIClient{
		getCategoryListFunc: func() (*loaApi.GetCategoryListResponse, error) {
			return &loaApi.GetCategoryListResponse{
				Categories: []loaApi.Category{
					{
						Code:     10000,
						CodeName: "Test Category 1",
						Subs: []loaApi.SubCategory{
							{Code: 10001, CodeName: "Test Sub Category 1"},
						},
					},
					{
						Code:     20000,
						CodeName: "Test Category 2",
						Subs:     []loaApi.SubCategory{},
					},
				},
			}, nil
		},
	}

	scraper := &Scraper{
		client:      mockClient,
		db:          nil,
		rateLimiter: &noopLimiter{},
	}

	categories, err := scraper.getCategories()
	if err != nil {
		t.Fatalf("Expected no error, got %v", err)
	}

	if len(categories) != 3 {
		t.Errorf("Expected 3 categories (2 parent + 1 sub), got %d", len(categories))
	}

	expectedCodes := []int{10000, 10001, 20000}
	for i, category := range categories {
		if category.Code != expectedCodes[i] {
			t.Errorf("Expected category code %d, got %d", expectedCodes[i], category.Code)
		}
	}
}

func TestGetCategories_APIError(t *testing.T) {
	expectedErr := errors.New("API connection failed")
	mockClient := &mockAPIClient{
		getCategoryListFunc: func() (*loaApi.GetCategoryListResponse, error) {
			return nil, expectedErr
		},
	}

	scraper := &Scraper{
		client:      mockClient,
		db:          nil,
		rateLimiter: &noopLimiter{},
	}

	_, err := scraper.getCategories()
	if !errors.Is(err, expectedErr) {
		t.Fatalf("Expected error %v, got %v", expectedErr, err)
	}
}

func TestGetCategories_EmptyResponse(t *testing.T) {
	mockClient := &mockAPIClient{
		getCategoryListFunc: func() (*loaApi.GetCategoryListResponse, error) {
			return &loaApi.GetCategoryListResponse{
				Categories: []loaApi.Category{},
			}, nil
		},
	}

	scraper := &Scraper{
		client:      mockClient,
		db:          nil,
		rateLimiter: &noopLimiter{},
	}

	_, err := scraper.getCategories()
	if err == nil {
		t.Fatal("Expected error for empty categories, got nil")
	}

	if !errors.Is(err, ErrNoMarketItemCategories) {
		t.Errorf("Expected ErrNoMarketItemCategories, got %v", err)
	}
}

func TestGetFlattenCategories(t *testing.T) {
	categories := []loaApi.Category{
		{
			Code:     10000,
			CodeName: "Parent 1",
			Subs: []loaApi.SubCategory{
				{Code: 10001, CodeName: "Child 1-1"},
				{Code: 10002, CodeName: "Child 1-2"},
			},
		},
		{
			Code:     20000,
			CodeName: "Parent 2",
			Subs: []loaApi.SubCategory{
				{Code: 20001, CodeName: "Child 2-1"},
			},
		},
	}

	flattened := GetFlattenCategories(categories)

	if len(flattened) != 5 {
		t.Errorf("Expected 5 flattened categories, got %d", len(flattened))
	}

	expectedCodes := []int{10000, 10001, 10002, 20000, 20001}
	for i, category := range flattened {
		if category.Code != expectedCodes[i] {
			t.Errorf("At index %d: expected code %d, got %d", i, expectedCodes[i], category.Code)
		}
	}

	for _, category := range flattened {
		if category.ID != 0 {
			t.Errorf("Expected ID to be 0 (new record), got %d", category.ID)
		}
	}
}

func TestGetFlattenCategories_EmptySubCategories(t *testing.T) {
	categories := []loaApi.Category{
		{
			Code:     10000,
			CodeName: "Category without subs",
			Subs:     []loaApi.SubCategory{},
		},
	}

	flattened := GetFlattenCategories(categories)

	if len(flattened) != 1 {
		t.Errorf("Expected 1 category, got %d", len(flattened))
	}

	if flattened[0].Code != 10000 {
		t.Errorf("Expected code 10000, got %d", flattened[0].Code)
	}

	if flattened[0].Name != "Category without subs" {
		t.Errorf("Expected name 'Category without subs', got %s", flattened[0].Name)
	}
}

func TestNewScraper_RateLimiterInitialization(t *testing.T) {
	mockClient := &mockAPIClient{}
	scraper := NewScraper(mockClient, nil)

	if scraper.rateLimiter == nil {
		t.Fatal("Expected rateLimiter to be initialized, got nil")
	}
}

func TestRateLimiter_InterfaceCompliance(t *testing.T) {
	mockClient := &mockAPIClient{
		getCategoryListFunc: func() (*loaApi.GetCategoryListResponse, error) {
			return &loaApi.GetCategoryListResponse{
				Categories: []loaApi.Category{
					{Code: 10000, CodeName: "Test"},
				},
			}, nil
		},
	}

	// Test with real limiter
	scraper := &Scraper{
		client:      mockClient,
		db:          nil,
		rateLimiter: ratelimit.NewLimiterPerDuration(0, 1), // instant for test
	}

	categories, err := scraper.getCategories()
	if err != nil {
		t.Fatalf("Expected no error, got %v", err)
	}

	if len(categories) != 1 {
		t.Errorf("Expected 1 category, got %d", len(categories))
	}
}
