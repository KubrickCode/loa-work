package scraper

import (
	"context"
	"database/sql"
	"errors"
	"testing"
	"time"

	"github.com/KubrickCode/loa-work/src/go/libs/loaApi"
	"github.com/KubrickCode/loa-work/src/go/libs/loadb"
	"github.com/KubrickCode/loa-work/src/go/libs/loadb/models"
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

type mockMarketItemCategoryRepository struct {
	findByIDFunc                  func(id int) (*models.MarketItemCategory, error)
	findItemScraperEnabledAllFunc func() ([]*models.MarketItemCategory, error)
	upsertManyFunc                func(categories []*models.MarketItemCategory) error
}

func (m *mockMarketItemCategoryRepository) FindByID(id int) (*models.MarketItemCategory, error) {
	if m.findByIDFunc != nil {
		return m.findByIDFunc(id)
	}
	return nil, errors.New("not implemented")
}

func (m *mockMarketItemCategoryRepository) FindItemScraperEnabledAll() ([]*models.MarketItemCategory, error) {
	if m.findItemScraperEnabledAllFunc != nil {
		return m.findItemScraperEnabledAllFunc()
	}
	return nil, errors.New("not implemented")
}

func (m *mockMarketItemCategoryRepository) UpsertMany(categories []*models.MarketItemCategory) error {
	if m.upsertManyFunc != nil {
		return m.upsertManyFunc(categories)
	}
	return errors.New("not implemented")
}

type mockMarketItemRepository struct {
	findAllFunc                   func() ([]*models.MarketItem, error)
	findByNameFunc                func(name string) (*models.MarketItem, error)
	findStatScraperEnabledAllFunc func() ([]*models.MarketItem, error)
	updateStatFunc                func(item *models.MarketItem) error
	upsertManyFunc                func(items []*models.MarketItem) error
}

func (m *mockMarketItemRepository) FindAll() ([]*models.MarketItem, error) {
	if m.findAllFunc != nil {
		return m.findAllFunc()
	}
	return nil, errors.New("not implemented")
}

func (m *mockMarketItemRepository) FindByName(name string) (*models.MarketItem, error) {
	if m.findByNameFunc != nil {
		return m.findByNameFunc(name)
	}
	return nil, errors.New("not implemented")
}

func (m *mockMarketItemRepository) FindStatScraperEnabledAll() ([]*models.MarketItem, error) {
	if m.findStatScraperEnabledAllFunc != nil {
		return m.findStatScraperEnabledAllFunc()
	}
	return nil, errors.New("not implemented")
}

func (m *mockMarketItemRepository) UpdateStat(item *models.MarketItem) error {
	if m.updateStatFunc != nil {
		return m.updateStatFunc(item)
	}
	return errors.New("not implemented")
}

func (m *mockMarketItemRepository) UpsertMany(items []*models.MarketItem) error {
	if m.upsertManyFunc != nil {
		return m.upsertManyFunc(items)
	}
	return errors.New("not implemented")
}

type mockDB struct {
	marketItemCategoryRepo loadb.MarketItemCategoryRepository
	marketItemRepo         loadb.MarketItemRepository
}

func (m *mockDB) AuctionItem() loadb.AuctionItemRepository {
	return nil
}

func (m *mockDB) AuctionItemCategory() loadb.AuctionItemCategoryRepository {
	return nil
}

func (m *mockDB) AuctionItemStat() loadb.AuctionItemStatRepository {
	return nil
}

func (m *mockDB) DB() *sql.DB {
	return nil
}

func (m *mockDB) Item() loadb.ItemRepository {
	return nil
}

func (m *mockDB) MarketItem() loadb.MarketItemRepository {
	return m.marketItemRepo
}

func (m *mockDB) MarketItemCategory() loadb.MarketItemCategoryRepository {
	return m.marketItemCategoryRepo
}

func (m *mockDB) MarketItemStat() loadb.MarketItemStatRepository {
	return nil
}

func (m *mockDB) WithTransaction(action func(tx loadb.DB) error) error {
	return errors.New("not implemented")
}

func TestNewScraper_RateLimiterInitialization(t *testing.T) {
	mockClient := &mockAPIClient{}
	mockDB := &mockDB{}
	scraper := NewScraper(mockClient, mockDB)

	if scraper.rateLimiter == nil {
		t.Fatal("Expected rateLimiter to be initialized, got nil")
	}
}

func TestRateLimiter_MultipleAPICalls(t *testing.T) {
	callCount := 0
	mockClient := &mockAPIClient{
		getMarketItemListFunc: func(params *loaApi.GetMarketItemListParams) (*loaApi.GetMarketItemListResponse, error) {
			callCount++
			return &loaApi.GetMarketItemListResponse{
				Items: []loaApi.MarketItem{
					{
						BundleCount: 10,
						Grade:       "전설",
						Icon:        "http://example.com/icon.png",
						ID:          callCount,
						Name:        "Test Item",
					},
				},
				PageSize: 10,
			}, nil
		},
	}

	mockDB := &mockDB{
		marketItemCategoryRepo: &mockMarketItemCategoryRepository{
			findItemScraperEnabledAllFunc: func() ([]*models.MarketItemCategory, error) {
				return []*models.MarketItemCategory{
					{ID: 1, Code: 10000, Name: "Category 1"},
					{ID: 2, Code: 20000, Name: "Category 2"},
					{ID: 3, Code: 30000, Name: "Category 3"},
				}, nil
			},
		},
		marketItemRepo: &mockMarketItemRepository{
			upsertManyFunc: func(items []*models.MarketItem) error {
				return nil
			},
		},
	}

	scraper := &Scraper{
		client:      mockClient,
		db:          mockDB,
		rateLimiter: ratelimit.NewLimiter(10, 1), // 10 req/sec for faster test
	}

	start := time.Now()
	_, err := scraper.getItemsToSave([]*models.MarketItemCategory{
		{ID: 1, Code: 10000, Name: "Category 1"},
		{ID: 2, Code: 20000, Name: "Category 2"},
		{ID: 3, Code: 30000, Name: "Category 3"},
	})
	elapsed := time.Since(start)

	if err != nil {
		t.Fatalf("Expected no error, got %v", err)
	}

	if callCount != 3 {
		t.Errorf("Expected 3 API calls, got %d", callCount)
	}

	expectedMinDuration := 200 * time.Millisecond
	if elapsed < expectedMinDuration {
		t.Errorf("Expected at least %v for 3 calls with 10 req/sec rate limiter, got %v", expectedMinDuration, elapsed)
	}
}

func TestGetCategoriesToScrape_Success(t *testing.T) {
	expectedCategories := []*models.MarketItemCategory{
		{ID: 1, Code: 10000, Name: "Category 1"},
		{ID: 2, Code: 20000, Name: "Category 2"},
	}

	mockDB := &mockDB{
		marketItemCategoryRepo: &mockMarketItemCategoryRepository{
			findItemScraperEnabledAllFunc: func() ([]*models.MarketItemCategory, error) {
				return expectedCategories, nil
			},
		},
	}

	scraper := &Scraper{
		client:      &mockAPIClient{},
		db:          mockDB,
		rateLimiter: &noopLimiter{},
	}

	categories, err := scraper.getCategoriesToScrape()
	if err != nil {
		t.Fatalf("Expected no error, got %v", err)
	}

	if len(categories) != 2 {
		t.Errorf("Expected 2 categories, got %d", len(categories))
	}

	if categories[0].Code != 10000 {
		t.Errorf("Expected first category code 10000, got %d", categories[0].Code)
	}
}

func TestGetCategoriesToScrape_EmptyResult(t *testing.T) {
	mockDB := &mockDB{
		marketItemCategoryRepo: &mockMarketItemCategoryRepository{
			findItemScraperEnabledAllFunc: func() ([]*models.MarketItemCategory, error) {
				return []*models.MarketItemCategory{}, nil
			},
		},
	}

	scraper := &Scraper{
		client:      &mockAPIClient{},
		db:          mockDB,
		rateLimiter: &noopLimiter{},
	}

	_, err := scraper.getCategoriesToScrape()
	if err == nil {
		t.Fatal("Expected error for empty categories, got nil")
	}
}

func TestGetCategoriesToScrape_DBError(t *testing.T) {
	expectedErr := errors.New("database connection failed")
	mockDB := &mockDB{
		marketItemCategoryRepo: &mockMarketItemCategoryRepository{
			findItemScraperEnabledAllFunc: func() ([]*models.MarketItemCategory, error) {
				return nil, expectedErr
			},
		},
	}

	scraper := &Scraper{
		client:      &mockAPIClient{},
		db:          mockDB,
		rateLimiter: &noopLimiter{},
	}

	_, err := scraper.getCategoriesToScrape()
	if err == nil {
		t.Fatal("Expected error, got nil")
	}

	if err != expectedErr {
		t.Errorf("Expected error %v, got %v", expectedErr, err)
	}
}

func TestGetItemsToSave_Success(t *testing.T) {
	mockClient := &mockAPIClient{
		getMarketItemListFunc: func(params *loaApi.GetMarketItemListParams) (*loaApi.GetMarketItemListResponse, error) {
			return &loaApi.GetMarketItemListResponse{
				Items: []loaApi.MarketItem{
					{
						BundleCount: 10,
						Grade:       "전설",
						Icon:        "http://example.com/icon1.png",
						ID:          123,
						Name:        "Item 1",
					},
					{
						BundleCount: 5,
						Grade:       "영웅",
						Icon:        "http://example.com/icon2.png",
						ID:          456,
						Name:        "Item 2",
					},
				},
				PageSize: 10,
			}, nil
		},
	}

	scraper := &Scraper{
		client:      mockClient,
		db:          &mockDB{},
		rateLimiter: &noopLimiter{},
	}

	categories := []*models.MarketItemCategory{
		{ID: 1, Code: 10000, Name: "Category 1"},
	}

	items, err := scraper.getItemsToSave(categories)
	if err != nil {
		t.Fatalf("Expected no error, got %v", err)
	}

	if len(items) != 2 {
		t.Errorf("Expected 2 items, got %d", len(items))
	}

	if items[0].Name != "Item 1" {
		t.Errorf("Expected first item name 'Item 1', got %s", items[0].Name)
	}

	if items[0].RefID != 123 {
		t.Errorf("Expected first item RefID 123, got %d", items[0].RefID)
	}

	if items[1].Grade != "영웅" {
		t.Errorf("Expected second item grade '영웅', got %s", items[1].Grade)
	}
}

func TestGetItemsToSave_DuplicateItems(t *testing.T) {
	callCount := 0
	mockClient := &mockAPIClient{
		getMarketItemListFunc: func(params *loaApi.GetMarketItemListParams) (*loaApi.GetMarketItemListResponse, error) {
			callCount++
			if callCount == 1 {
				return &loaApi.GetMarketItemListResponse{
					Items: []loaApi.MarketItem{
						{
							BundleCount: 10,
							Grade:       "전설",
							Icon:        "http://example.com/icon1.png",
							ID:          123,
							Name:        "Item 1",
						},
					},
					PageSize: 10,
				}, nil
			}
			return &loaApi.GetMarketItemListResponse{
				Items: []loaApi.MarketItem{
					{
						BundleCount: 10,
						Grade:       "전설",
						Icon:        "http://example.com/icon1.png",
						ID:          789,
						Name:        "Item 1",
					},
				},
				PageSize: 10,
			}, nil
		},
	}

	scraper := &Scraper{
		client:      mockClient,
		db:          &mockDB{},
		rateLimiter: &noopLimiter{},
	}

	categories := []*models.MarketItemCategory{
		{ID: 1, Code: 10000, Name: "Category 1"},
		{ID: 2, Code: 20000, Name: "Category 2"},
	}

	items, err := scraper.getItemsToSave(categories)
	if err != nil {
		t.Fatalf("Expected no error, got %v", err)
	}

	if len(items) != 1 {
		t.Errorf("Expected 1 item (duplicate filtered), got %d", len(items))
	}
}

func TestGetItemsToSave_APIError(t *testing.T) {
	expectedErr := errors.New("API connection failed")
	mockClient := &mockAPIClient{
		getMarketItemListFunc: func(params *loaApi.GetMarketItemListParams) (*loaApi.GetMarketItemListResponse, error) {
			return nil, expectedErr
		},
	}

	scraper := &Scraper{
		client:      mockClient,
		db:          &mockDB{},
		rateLimiter: &noopLimiter{},
	}

	categories := []*models.MarketItemCategory{
		{ID: 1, Code: 10000, Name: "Category 1"},
	}

	_, err := scraper.getItemsToSave(categories)
	if err == nil {
		t.Fatal("Expected error, got nil")
	}
}

func TestGetItemsToSave_Pagination(t *testing.T) {
	pageNo := 0
	mockClient := &mockAPIClient{
		getMarketItemListFunc: func(params *loaApi.GetMarketItemListParams) (*loaApi.GetMarketItemListResponse, error) {
			pageNo++
			if pageNo == 1 {
				return &loaApi.GetMarketItemListResponse{
					Items: []loaApi.MarketItem{
						{ID: 1, Name: "Item 1", Grade: "전설", BundleCount: 10},
						{ID: 2, Name: "Item 2", Grade: "영웅", BundleCount: 5},
					},
					PageSize: 2,
				}, nil
			}
			return &loaApi.GetMarketItemListResponse{
				Items: []loaApi.MarketItem{
					{ID: 3, Name: "Item 3", Grade: "희귀", BundleCount: 3},
				},
				PageSize: 2,
			}, nil
		},
	}

	scraper := &Scraper{
		client:      mockClient,
		db:          &mockDB{},
		rateLimiter: &noopLimiter{},
	}

	categories := []*models.MarketItemCategory{
		{ID: 1, Code: 10000, Name: "Category 1"},
	}

	items, err := scraper.getItemsToSave(categories)
	if err != nil {
		t.Fatalf("Expected no error, got %v", err)
	}

	if len(items) != 3 {
		t.Errorf("Expected 3 items from pagination, got %d", len(items))
	}

	if pageNo != 2 {
		t.Errorf("Expected 2 pages to be fetched, got %d", pageNo)
	}
}
