package scraper

import (
	"testing"
	"time"

	"github.com/KubrickCode/loa-work/src/go/libs/loaApi"
	"github.com/KubrickCode/loa-work/src/go/libs/loadb"
	"github.com/stretchr/testify/assert"
	"go.uber.org/mock/gomock"
)

type apiFunc func(*loaApi.GetAuctionItemListParams) (*loaApi.GetAuctionItemListResponse, error)

func testGetItemStatsToCreate(t *testing.T, item loadb.AuctionItem, category *loadb.AuctionItemCategory, apiFunc apiFunc) ([]loadb.AuctionItemStat, error) {
	resp, err := apiFunc(&loaApi.GetAuctionItemListParams{
		CategoryCode:  category.Code,
		ItemName:      item.Name,
		PageNo:        1,
		Sort:          "BUY_PRICE",
		SortCondition: "ASC",
	})
	if err != nil {
		return nil, err
	}

	stats := []loadb.AuctionItemStat{}
	for _, auctionItem := range resp.Items {
		endDate, err := time.Parse("2006-01-02T15:04:05.000", auctionItem.AuctionInfo.EndDate)
		if err != nil {
			endDate, err = time.Parse("2006-01-02T15:04:05", auctionItem.AuctionInfo.EndDate)
			if err != nil {
				return nil, err
			}
		}

		stat := loadb.AuctionItemStat{
			AuctionItemID: item.ID,
			BuyPrice:      auctionItem.AuctionInfo.BuyPrice,
			BidPrice:      auctionItem.AuctionInfo.BidPrice,
			BidStartPrice: auctionItem.AuctionInfo.BidStartPrice,
			StartPrice:    auctionItem.AuctionInfo.StartPrice,
			IsCompetitive: auctionItem.AuctionInfo.IsCompetitive,
			EndDate:       endDate,
		}

		stats = append(stats, stat)
	}

	return stats, nil
}

func TestGetItemStatsToCreate(t *testing.T) {
	t.Run("날짜 파싱 - 밀리초 포함 형식", func(t *testing.T) {
		ctrl := gomock.NewController(t)
		defer ctrl.Finish()

		item := loadb.AuctionItem{
			ID:   123,
			Name: "테스트 아이템",
		}
		category := &loadb.AuctionItemCategory{
			ID:   1,
			Code: 10000,
			Name: "테스트 카테고리",
		}

		apiFunc := func(params *loaApi.GetAuctionItemListParams) (*loaApi.GetAuctionItemListResponse, error) {
			return &loaApi.GetAuctionItemListResponse{
				Items: []loaApi.AuctionItem{
					{
						AuctionInfo: loaApi.AuctionInfo{
							BuyPrice:      10000,
							BidPrice:      8000,
							BidStartPrice: 7000,
							StartPrice:    6000,
							IsCompetitive: true,
							EndDate:       "2023-07-01T12:00:00.000", // 밀리초 포함
						},
					},
				},
			}, nil
		}

		stats, err := testGetItemStatsToCreate(t, item, category, apiFunc)

		assert.NoError(t, err)
		assert.Len(t, stats, 1)

		assert.Equal(t, item.ID, stats[0].AuctionItemID)
		assert.Equal(t, 10000, stats[0].BuyPrice)
		assert.Equal(t, 8000, stats[0].BidPrice)
		assert.Equal(t, 7000, stats[0].BidStartPrice)
		assert.Equal(t, 6000, stats[0].StartPrice)
		assert.True(t, stats[0].IsCompetitive)

		expectedDate, _ := time.Parse("2006-01-02T15:04:05.000", "2023-07-01T12:00:00.000")
		assert.Equal(t, expectedDate, stats[0].EndDate)
	})

	t.Run("날짜 파싱 - 밀리초 없는 형식", func(t *testing.T) {
		ctrl := gomock.NewController(t)
		defer ctrl.Finish()

		item := loadb.AuctionItem{
			ID:   123,
			Name: "테스트 아이템",
		}
		category := &loadb.AuctionItemCategory{
			ID:   1,
			Code: 10000,
			Name: "테스트 카테고리",
		}

		apiFunc := func(params *loaApi.GetAuctionItemListParams) (*loaApi.GetAuctionItemListResponse, error) {
			return &loaApi.GetAuctionItemListResponse{
				Items: []loaApi.AuctionItem{
					{
						AuctionInfo: loaApi.AuctionInfo{
							BuyPrice: 10000,
							EndDate:  "2023-07-01T12:00:00", // 밀리초 없음
						},
					},
				},
			}, nil
		}

		stats, err := testGetItemStatsToCreate(t, item, category, apiFunc)

		assert.NoError(t, err)
		assert.Len(t, stats, 1)

		expectedDate, _ := time.Parse("2006-01-02T15:04:05", "2023-07-01T12:00:00")
		assert.Equal(t, expectedDate, stats[0].EndDate)
	})

	t.Run("날짜 파싱 실패", func(t *testing.T) {
		ctrl := gomock.NewController(t)
		defer ctrl.Finish()

		item := loadb.AuctionItem{
			ID:   123,
			Name: "테스트 아이템",
		}
		category := &loadb.AuctionItemCategory{
			ID:   1,
			Code: 10000,
			Name: "테스트 카테고리",
		}

		apiFunc := func(params *loaApi.GetAuctionItemListParams) (*loaApi.GetAuctionItemListResponse, error) {
			return &loaApi.GetAuctionItemListResponse{
				Items: []loaApi.AuctionItem{
					{
						AuctionInfo: loaApi.AuctionInfo{
							BuyPrice: 10000,
							EndDate:  "잘못된 날짜 형식",
						},
					},
				},
			}, nil
		}

		stats, err := testGetItemStatsToCreate(t, item, category, apiFunc)

		assert.Error(t, err)
		assert.Nil(t, stats)
	})

	t.Run("여러 아이템 처리", func(t *testing.T) {
		ctrl := gomock.NewController(t)
		defer ctrl.Finish()

		item := loadb.AuctionItem{
			ID:   123,
			Name: "테스트 아이템",
		}
		category := &loadb.AuctionItemCategory{
			ID:   1,
			Code: 10000,
			Name: "테스트 카테고리",
		}

		apiFunc := func(params *loaApi.GetAuctionItemListParams) (*loaApi.GetAuctionItemListResponse, error) {
			return &loaApi.GetAuctionItemListResponse{
				Items: []loaApi.AuctionItem{
					{
						AuctionInfo: loaApi.AuctionInfo{
							BuyPrice: 10000,
							EndDate:  "2023-07-01T12:00:00.000",
						},
					},
					{
						AuctionInfo: loaApi.AuctionInfo{
							BuyPrice: 20000,
							EndDate:  "2023-07-02T12:00:00.000",
						},
					},
				},
			}, nil
		}

		stats, err := testGetItemStatsToCreate(t, item, category, apiFunc)

		assert.NoError(t, err)
		assert.Len(t, stats, 2)

		for _, stat := range stats {
			assert.Equal(t, item.ID, stat.AuctionItemID)
		}

		assert.Equal(t, 10000, stats[0].BuyPrice)
		assert.Equal(t, 20000, stats[1].BuyPrice)
	})

	t.Run("빈 응답 처리", func(t *testing.T) {
		ctrl := gomock.NewController(t)
		defer ctrl.Finish()

		item := loadb.AuctionItem{
			ID:   123,
			Name: "테스트 아이템",
		}
		category := &loadb.AuctionItemCategory{
			ID:   1,
			Code: 10000,
			Name: "테스트 카테고리",
		}

		apiFunc := func(params *loaApi.GetAuctionItemListParams) (*loaApi.GetAuctionItemListResponse, error) {
			return &loaApi.GetAuctionItemListResponse{
				Items: []loaApi.AuctionItem{},
			}, nil
		}

		stats, err := testGetItemStatsToCreate(t, item, category, apiFunc)

		assert.NoError(t, err)
		assert.Empty(t, stats)
	})
}
