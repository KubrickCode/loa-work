package request

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"os"
	"testing"

	"github.com/KubrickCode/loa-work/src/go/libs/loaApi"
	"github.com/stretchr/testify/assert"
)

func TestMain(m *testing.M) {
	os.Setenv("LOA_API_TOKEN", "test-token")
	code := m.Run()
	os.Exit(code)
}

func TestNewClient_ShouldCreateClient(t *testing.T) {
	client := NewClient()

	assert.NotNil(t, client)
	assert.NotNil(t, client.api)
}

func TestClient_GetAuctionItemList_Success(t *testing.T) {
	expectedResp := &loaApi.GetAuctionItemListResponse{
		PageNo:     1,
		PageSize:   10,
		TotalCount: 100,
		Items: []loaApi.AuctionItem{
			{
				Name:  "Test Item",
				Grade: "영웅",
				Tier:  3,
				Level: 1540,
			},
		},
	}

	server := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		assert.Equal(t, http.MethodPost, r.Method)
		assert.Equal(t, "/auctions/items", r.URL.Path)
		assert.Equal(t, "Bearer test-token", r.Header.Get("Authorization"))

		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(expectedResp)
	}))
	defer server.Close()

	client := NewClient()
	client.api = loaApi.NewClientWithBaseURL(server.URL)

	params := &loaApi.GetAuctionItemListParams{
		CategoryCode: 200000,
		ItemName:     "Test",
		PageNo:       1,
	}

	resp, err := client.GetAuctionItemList(params)

	assert.NoError(t, err)
	assert.NotNil(t, resp)
	assert.Equal(t, expectedResp.PageNo, resp.PageNo)
	assert.Equal(t, expectedResp.TotalCount, resp.TotalCount)
	assert.Len(t, resp.Items, 1)
	assert.Equal(t, "Test Item", resp.Items[0].Name)
}

func TestClient_GetAuctionItemList_ServerError(t *testing.T) {
	server := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusInternalServerError)
	}))
	defer server.Close()

	client := NewClient()
	client.api = loaApi.NewClientWithBaseURL(server.URL)
	client.api.Client().Client.RetryMax = 1
	client.api.Client().Client.RetryWaitMin = 0
	client.api.Client().Client.RetryWaitMax = 0

	params := &loaApi.GetAuctionItemListParams{
		CategoryCode: 200000,
	}

	resp, err := client.GetAuctionItemList(params)

	assert.Error(t, err)
	assert.Nil(t, resp)
	assert.Contains(t, err.Error(), "loa-api")
}

func TestClient_GetMarketItemList_Success(t *testing.T) {
	expectedResp := &loaApi.GetMarketItemListResponse{
		PageNo:     1,
		PageSize:   10,
		TotalCount: 50,
		Items: []loaApi.MarketItem{
			{
				ID:              12345,
				Name:            "Market Item",
				Grade:           "전설",
				BundleCount:     10,
				CurrentMinPrice: 1000,
			},
		},
	}

	server := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		assert.Equal(t, http.MethodPost, r.Method)
		assert.Equal(t, "/markets/items", r.URL.Path)
		assert.Equal(t, "Bearer test-token", r.Header.Get("Authorization"))

		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(expectedResp)
	}))
	defer server.Close()

	client := NewClient()
	client.api = loaApi.NewClientWithBaseURL(server.URL)

	params := &loaApi.GetMarketItemListParams{
		CategoryCode: 50000,
		PageNo:       1,
	}

	resp, err := client.GetMarketItemList(params)

	assert.NoError(t, err)
	assert.NotNil(t, resp)
	assert.Equal(t, expectedResp.PageNo, resp.PageNo)
	assert.Equal(t, expectedResp.TotalCount, resp.TotalCount)
	assert.Len(t, resp.Items, 1)
	assert.Equal(t, "Market Item", resp.Items[0].Name)
}

func TestClient_GetMarketItemList_InvalidJSON(t *testing.T) {
	server := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("invalid json"))
	}))
	defer server.Close()

	client := NewClient()
	client.api = loaApi.NewClientWithBaseURL(server.URL)

	params := &loaApi.GetMarketItemListParams{
		CategoryCode: 50000,
		PageNo:       1,
	}

	resp, err := client.GetMarketItemList(params)

	assert.Error(t, err)
	assert.Nil(t, resp)
}

func TestClient_GetMarketItem_Success(t *testing.T) {
	expectedItem := loaApi.MarketItem{
		ID:              12345,
		Name:            "Specific Item",
		Grade:           "전설",
		BundleCount:     10,
		CurrentMinPrice: 1000,
	}

	server := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		assert.Equal(t, http.MethodPost, r.Method)
		assert.Equal(t, "/markets/items", r.URL.Path)

		resp := loaApi.GetMarketItemListResponse{
			PageNo:   1,
			PageSize: 10,
			Items:    []loaApi.MarketItem{expectedItem},
		}

		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(resp)
	}))
	defer server.Close()

	client := NewClient()
	client.api = loaApi.NewClientWithBaseURL(server.URL)

	params := &loaApi.GetMarketItemParams{
		CategoryCode: 50000,
		ItemName:     "Specific Item",
		ItemGrade:    "전설",
	}

	resp, err := client.GetMarketItem(params)

	assert.NoError(t, err)
	assert.NotNil(t, resp)
	assert.Equal(t, expectedItem.ID, resp.ID)
	assert.Equal(t, expectedItem.Name, resp.Name)
}

func TestClient_GetMarketItem_NoItemsFound(t *testing.T) {
	server := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		resp := loaApi.GetMarketItemListResponse{
			PageNo:   1,
			PageSize: 10,
			Items:    []loaApi.MarketItem{},
		}

		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(resp)
	}))
	defer server.Close()

	client := NewClient()
	client.api = loaApi.NewClientWithBaseURL(server.URL)

	params := &loaApi.GetMarketItemParams{
		CategoryCode: 50000,
		ItemName:     "Nonexistent Item",
	}

	resp, err := client.GetMarketItem(params)

	assert.Error(t, err)
	assert.Nil(t, resp)
	assert.Contains(t, err.Error(), "no items found")
}

func TestClient_GetMarketItem_MultipleItemsFound(t *testing.T) {
	server := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		resp := loaApi.GetMarketItemListResponse{
			PageNo:   1,
			PageSize: 10,
			Items: []loaApi.MarketItem{
				{ID: 1, Name: "Item 1"},
				{ID: 2, Name: "Item 2"},
			},
		}

		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(resp)
	}))
	defer server.Close()

	client := NewClient()
	client.api = loaApi.NewClientWithBaseURL(server.URL)

	params := &loaApi.GetMarketItemParams{
		CategoryCode: 50000,
		ItemName:     "Item",
	}

	resp, err := client.GetMarketItem(params)

	assert.Error(t, err)
	assert.Nil(t, resp)
	assert.Contains(t, err.Error(), "multiple items found")
}

func TestClient_GetCategoryList_Success(t *testing.T) {
	expectedResp := &loaApi.GetCategoryListResponse{
		Categories: []loaApi.Category{
			{
				Code:     50000,
				CodeName: "Enhancement Materials",
				Subs: []loaApi.SubCategory{
					{Code: 50010, CodeName: "Honing Materials"},
				},
			},
		},
		ItemGrades: []string{"일반", "고급", "희귀"},
		ItemTiers:  []int{1, 2, 3},
		Classes:    []string{"Warrior", "Mage"},
	}

	server := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		assert.Equal(t, http.MethodGet, r.Method)
		assert.Equal(t, "/markets/options", r.URL.Path)
		assert.Equal(t, "Bearer test-token", r.Header.Get("Authorization"))

		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(expectedResp)
	}))
	defer server.Close()

	client := NewClient()
	client.api = loaApi.NewClientWithBaseURL(server.URL)

	resp, err := client.GetCategoryList()

	assert.NoError(t, err)
	assert.NotNil(t, resp)
	assert.Len(t, resp.Categories, 1)
	assert.Equal(t, 50000, resp.Categories[0].Code)
	assert.Len(t, resp.ItemGrades, 3)
	assert.Len(t, resp.ItemTiers, 3)
	assert.Len(t, resp.Classes, 2)
}

func TestClient_GetCategoryList_ServerError(t *testing.T) {
	server := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusInternalServerError)
	}))
	defer server.Close()

	client := NewClient()
	client.api = loaApi.NewClientWithBaseURL(server.URL)
	client.api.Client().Client.RetryMax = 1
	client.api.Client().Client.RetryWaitMin = 0
	client.api.Client().Client.RetryWaitMax = 0

	resp, err := client.GetCategoryList()

	assert.Error(t, err)
	assert.Nil(t, resp)
	assert.Contains(t, err.Error(), "loa-api")
}
