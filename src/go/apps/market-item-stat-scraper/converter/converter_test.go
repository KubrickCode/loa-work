package converter

import (
	"errors"
	"testing"

	"github.com/KubrickCode/loa-work/src/go/libs/loadb"
	"github.com/shopspring/decimal"
	"github.com/stretchr/testify/assert"
	"go.uber.org/mock/gomock"
)

func TestGetMarketItemCurrentMinPrice(t *testing.T) {
	t.Run("정상적인 가격 계산", func(t *testing.T) {
		ctrl := gomock.NewController(t)
		defer ctrl.Finish()

		mockDB := loadb.NewMockDB(ctrl)
		mockMarketItemDB := loadb.NewMockMarketItemDB(ctrl)

		itemName := "테스트 아이템"
		marketItem := loadb.MarketItem{
			Name:            itemName,
			CurrentMinPrice: 1000,
			BundleCount:     10,
		}

		mockDB.EXPECT().MarketItem().Return(mockMarketItemDB).AnyTimes()
		mockMarketItemDB.EXPECT().FindByName(itemName).Return(marketItem, nil)

		converter := NewConverter(mockDB)

		result, err := converter.getMarketItemCurrentMinPrice(itemName, mockDB)

		assert.NoError(t, err)
		expectedPrice := decimal.NewFromInt(100) // 1000 / 10 = 100
		assert.True(t, expectedPrice.Equal(result), "예상 가격은 %s이지만, 실제 가격은 %s입니다", expectedPrice, result)
	})

	t.Run("번들 수량이 1인 경우", func(t *testing.T) {
		ctrl := gomock.NewController(t)
		defer ctrl.Finish()

		mockDB := loadb.NewMockDB(ctrl)
		mockMarketItemDB := loadb.NewMockMarketItemDB(ctrl)

		itemName := "단일 아이템"
		marketItem := loadb.MarketItem{
			Name:            itemName,
			CurrentMinPrice: 500,
			BundleCount:     1,
		}

		mockDB.EXPECT().MarketItem().Return(mockMarketItemDB).AnyTimes()
		mockMarketItemDB.EXPECT().FindByName(itemName).Return(marketItem, nil)

		converter := NewConverter(mockDB)

		result, err := converter.getMarketItemCurrentMinPrice(itemName, mockDB)

		// 검증
		assert.NoError(t, err)
		expectedPrice := decimal.NewFromInt(500) // 500 / 1 = 500
		assert.True(t, expectedPrice.Equal(result), "예상 가격은 %s이지만, 실제 가격은 %s입니다", expectedPrice, result)
	})

	t.Run("아이템을 찾을 수 없는 경우", func(t *testing.T) {
		// 컨트롤러 및 모의 객체 설정
		ctrl := gomock.NewController(t)
		defer ctrl.Finish()

		mockDB := loadb.NewMockDB(ctrl)
		mockMarketItemDB := loadb.NewMockMarketItemDB(ctrl)

		itemName := "존재하지 않는 아이템"
		expectedError := errors.New("item not found")

		mockDB.EXPECT().MarketItem().Return(mockMarketItemDB).AnyTimes()
		mockMarketItemDB.EXPECT().FindByName(itemName).Return(loadb.MarketItem{}, expectedError)

		converter := NewConverter(mockDB)

		result, err := converter.getMarketItemCurrentMinPrice(itemName, mockDB)

		assert.Error(t, err)
		assert.Equal(t, expectedError, err)
		assert.True(t, decimal.Zero.Equal(result), "에러 발생 시 0을 반환해야 합니다")
	})

	t.Run("가격이 0인 경우", func(t *testing.T) {
		ctrl := gomock.NewController(t)
		defer ctrl.Finish()

		mockDB := loadb.NewMockDB(ctrl)
		mockMarketItemDB := loadb.NewMockMarketItemDB(ctrl)

		itemName := "가격 없는 아이템"
		marketItem := loadb.MarketItem{
			Name:            itemName,
			CurrentMinPrice: 0,
			BundleCount:     10,
		}

		mockDB.EXPECT().MarketItem().Return(mockMarketItemDB).AnyTimes()
		mockMarketItemDB.EXPECT().FindByName(itemName).Return(marketItem, nil)

		converter := NewConverter(mockDB)

		result, err := converter.getMarketItemCurrentMinPrice(itemName, mockDB)

		assert.NoError(t, err)
		expectedPrice := decimal.Zero
		assert.True(t, expectedPrice.Equal(result), "예상 가격은 %s이지만, 실제 가격은 %s입니다", expectedPrice, result)
	})

	t.Run("번들 수량이 큰 경우 소수점 계산", func(t *testing.T) {
		ctrl := gomock.NewController(t)
		defer ctrl.Finish()

		mockDB := loadb.NewMockDB(ctrl)
		mockMarketItemDB := loadb.NewMockMarketItemDB(ctrl)

		itemName := "대량 번들 아이템"
		marketItem := loadb.MarketItem{
			Name:            itemName,
			CurrentMinPrice: 333,
			BundleCount:     10,
		}

		mockDB.EXPECT().MarketItem().Return(mockMarketItemDB).AnyTimes()
		mockMarketItemDB.EXPECT().FindByName(itemName).Return(marketItem, nil)

		converter := NewConverter(mockDB)

		result, err := converter.getMarketItemCurrentMinPrice(itemName, mockDB)

		assert.NoError(t, err)
		expected := decimal.NewFromInt(333).Div(decimal.NewFromInt(10))
		assert.True(t, expected.Equal(result), "예상 가격은 %s이지만, 실제 가격은 %s입니다", expected, result)
	})
}

func TestGetSmallFateFragmentBuyPricePerOne(t *testing.T) {
	t.Run("정상적인 운명의 파편 가격 계산", func(t *testing.T) {
		ctrl := gomock.NewController(t)
		defer ctrl.Finish()

		mockDB := loadb.NewMockDB(ctrl)
		mockMarketItemDB := loadb.NewMockMarketItemDB(ctrl)

		marketItem := loadb.MarketItem{
			Name:            SmallFateFragmentName,
			CurrentMinPrice: 1000,
			BundleCount:     SmallFateFragmentBundleCount,
		}

		mockDB.EXPECT().MarketItem().Return(mockMarketItemDB).AnyTimes()
		mockMarketItemDB.EXPECT().FindByName(SmallFateFragmentName).Return(marketItem, nil)

		converter := NewConverter(mockDB)

		result, err := converter.getSmallFateFragmentBuyPricePerOne(mockDB)

		assert.NoError(t, err)
		expectedPrice := decimal.NewFromInt(1000).Div(decimal.NewFromInt(int64(SmallFateFragmentBundleCount)))
		assert.True(t, expectedPrice.Equal(result), "예상 가격은 %s이지만, 실제 가격은 %s입니다", expectedPrice, result)
	})

	t.Run("운명의 파편을 찾을 수 없는 경우", func(t *testing.T) {
		ctrl := gomock.NewController(t)
		defer ctrl.Finish()

		mockDB := loadb.NewMockDB(ctrl)
		mockMarketItemDB := loadb.NewMockMarketItemDB(ctrl)

		expectedError := errors.New("item not found")
		mockDB.EXPECT().MarketItem().Return(mockMarketItemDB).AnyTimes()
		mockMarketItemDB.EXPECT().FindByName(SmallFateFragmentName).Return(loadb.MarketItem{}, expectedError)

		converter := NewConverter(mockDB)

		result, err := converter.getSmallFateFragmentBuyPricePerOne(mockDB)

		assert.Error(t, err)
		assert.Equal(t, expectedError, err)
		assert.True(t, decimal.Zero.Equal(result), "에러 발생 시 0을 반환해야 합니다")
	})

	t.Run("운명의 파편 가격이 0인 경우", func(t *testing.T) {
		ctrl := gomock.NewController(t)
		defer ctrl.Finish()

		mockDB := loadb.NewMockDB(ctrl)
		mockMarketItemDB := loadb.NewMockMarketItemDB(ctrl)

		marketItem := loadb.MarketItem{
			Name:            SmallFateFragmentName,
			CurrentMinPrice: 0,
			BundleCount:     SmallFateFragmentBundleCount,
		}

		mockDB.EXPECT().MarketItem().Return(mockMarketItemDB).AnyTimes()
		mockMarketItemDB.EXPECT().FindByName(SmallFateFragmentName).Return(marketItem, nil)

		converter := NewConverter(mockDB)

		result, err := converter.getSmallFateFragmentBuyPricePerOne(mockDB)

		assert.NoError(t, err)
		assert.True(t, decimal.Zero.Equal(result), "가격이 0인 경우 0을 반환해야 합니다")
	})

	t.Run("기본 번들 개수가 변경된 경우", func(t *testing.T) {
		ctrl := gomock.NewController(t)
		defer ctrl.Finish()

		mockDB := loadb.NewMockDB(ctrl)
		mockMarketItemDB := loadb.NewMockMarketItemDB(ctrl)

		customBundleCount := 100

		marketItem := loadb.MarketItem{
			Name:            SmallFateFragmentName,
			CurrentMinPrice: 10000,
			BundleCount:     customBundleCount,
		}

		mockDB.EXPECT().MarketItem().Return(mockMarketItemDB).AnyTimes()
		mockMarketItemDB.EXPECT().FindByName(SmallFateFragmentName).Return(marketItem, nil)

		converter := NewConverter(mockDB)

		result, err := converter.getSmallFateFragmentBuyPricePerOne(mockDB)

		assert.NoError(t, err)

		expectedPrice := decimal.NewFromInt(10000).Div(decimal.NewFromInt(int64(SmallFateFragmentBundleCount)))
		assert.True(t, expectedPrice.Equal(result), "예상 가격은 %s이지만, 실제 가격은 %s입니다", expectedPrice, result)

		differentExpectedPrice := decimal.NewFromInt(10000).Div(decimal.NewFromInt(int64(customBundleCount)))
		assert.False(t, differentExpectedPrice.Equal(result), "DB의 번들 개수를 사용한 결과(%s)와 하드코딩된 상수를 사용한 결과(%s)는 달라야 합니다", differentExpectedPrice, result)
	})

	t.Run("큰 가격에 대한 계산", func(t *testing.T) {
		ctrl := gomock.NewController(t)
		defer ctrl.Finish()

		mockDB := loadb.NewMockDB(ctrl)
		mockMarketItemDB := loadb.NewMockMarketItemDB(ctrl)

		largePrice := 9999999
		marketItem := loadb.MarketItem{
			Name:            SmallFateFragmentName,
			CurrentMinPrice: largePrice,
			BundleCount:     SmallFateFragmentBundleCount,
		}

		mockDB.EXPECT().MarketItem().Return(mockMarketItemDB).AnyTimes()
		mockMarketItemDB.EXPECT().FindByName(SmallFateFragmentName).Return(marketItem, nil)

		converter := NewConverter(mockDB)

		result, err := converter.getSmallFateFragmentBuyPricePerOne(mockDB)

		assert.NoError(t, err)
		expectedPrice := decimal.NewFromInt(int64(largePrice)).Div(decimal.NewFromInt(int64(SmallFateFragmentBundleCount)))
		assert.True(t, expectedPrice.Equal(result), "예상 가격은 %s이지만, 실제 가격은 %s입니다", expectedPrice, result)
	})
}

func TestUpdateMarketItems(t *testing.T) {
	t.Run("여러 아이템의 통계 업데이트", func(t *testing.T) {
		ctrl := gomock.NewController(t)
		defer ctrl.Finish()

		mockDB := loadb.NewMockDB(ctrl)
		mockMarketItemDB := loadb.NewMockMarketItemDB(ctrl)

		marketItems := []loadb.MarketItem{
			{
				ID:              1,
				Name:            "아이템1",
				CurrentMinPrice: 100,
				RecentPrice:     100,
				YDayAvgPrice:    decimal.NewFromInt(100),
				MarketItemStats: []loadb.MarketItemStat{
					{
						ID:              11,
						MarketItemID:    1,
						CurrentMinPrice: 200,
						RecentPrice:     250,
						YDayAvgPrice:    decimal.NewFromInt(220),
					},
				},
			},
			{
				ID:              2,
				Name:            "아이템2",
				CurrentMinPrice: 300,
				RecentPrice:     300,
				YDayAvgPrice:    decimal.NewFromInt(300),
				MarketItemStats: []loadb.MarketItemStat{
					{
						ID:              22,
						MarketItemID:    2,
						CurrentMinPrice: 350,
						RecentPrice:     370,
						YDayAvgPrice:    decimal.NewFromInt(360),
					},
				},
			},
			{
				ID:              3,
				Name:            "통계없음",
				CurrentMinPrice: 500,
				RecentPrice:     500,
				YDayAvgPrice:    decimal.NewFromInt(500),
				MarketItemStats: []loadb.MarketItemStat{},
			},
		}

		mockDB.EXPECT().MarketItem().Return(mockMarketItemDB).AnyTimes()
		mockMarketItemDB.EXPECT().FindAllWithLatestStats().Return(marketItems, nil)

		mockMarketItemDB.EXPECT().UpdateStat(gomock.Any()).Do(func(item loadb.MarketItem) {
			if item.ID == 1 {
				assert.Equal(t, 200, item.CurrentMinPrice)
				assert.Equal(t, 250, item.RecentPrice)
				assert.True(t, decimal.NewFromInt(220).Equal(item.YDayAvgPrice))
			} else if item.ID == 2 {
				assert.Equal(t, 350, item.CurrentMinPrice)
				assert.Equal(t, 370, item.RecentPrice)
				assert.True(t, decimal.NewFromInt(360).Equal(item.YDayAvgPrice))
			}
		}).Return(nil).Times(2)

		converter := NewConverter(mockDB)
		err := converter.updateMarketItems(mockDB)
		assert.NoError(t, err)
	})

	t.Run("통계 조회 중 오류 발생", func(t *testing.T) {
		ctrl := gomock.NewController(t)
		defer ctrl.Finish()

		mockDB := loadb.NewMockDB(ctrl)
		mockMarketItemDB := loadb.NewMockMarketItemDB(ctrl)

		expectedError := errors.New("데이터베이스 조회 오류")
		mockDB.EXPECT().MarketItem().Return(mockMarketItemDB).AnyTimes()
		mockMarketItemDB.EXPECT().FindAllWithLatestStats().Return(nil, expectedError)

		converter := NewConverter(mockDB)
		err := converter.updateMarketItems(mockDB)
		assert.Error(t, err)
		assert.Equal(t, expectedError, err)
	})

	t.Run("아이템 업데이트 중 오류 발생", func(t *testing.T) {
		ctrl := gomock.NewController(t)
		defer ctrl.Finish()

		mockDB := loadb.NewMockDB(ctrl)
		mockMarketItemDB := loadb.NewMockMarketItemDB(ctrl)

		marketItems := []loadb.MarketItem{
			{
				ID:              1,
				Name:            "아이템1",
				CurrentMinPrice: 100,
				RecentPrice:     100,
				YDayAvgPrice:    decimal.NewFromInt(100),
				MarketItemStats: []loadb.MarketItemStat{
					{
						ID:              11,
						MarketItemID:    1,
						CurrentMinPrice: 200,
						RecentPrice:     200,
						YDayAvgPrice:    decimal.NewFromInt(200),
					},
				},
			},
		}

		updateError := errors.New("업데이트 중 오류 발생")
		mockDB.EXPECT().MarketItem().Return(mockMarketItemDB).AnyTimes()
		mockMarketItemDB.EXPECT().FindAllWithLatestStats().Return(marketItems, nil)
		mockMarketItemDB.EXPECT().UpdateStat(gomock.Any()).Return(updateError)

		converter := NewConverter(mockDB)
		err := converter.updateMarketItems(mockDB)
		assert.Error(t, err)
		assert.Equal(t, updateError, err)
	})

	t.Run("빈 아이템 목록 처리", func(t *testing.T) {
		ctrl := gomock.NewController(t)
		defer ctrl.Finish()

		mockDB := loadb.NewMockDB(ctrl)
		mockMarketItemDB := loadb.NewMockMarketItemDB(ctrl)

		emptyItems := []loadb.MarketItem{}
		mockDB.EXPECT().MarketItem().Return(mockMarketItemDB).AnyTimes()
		mockMarketItemDB.EXPECT().FindAllWithLatestStats().Return(emptyItems, nil)

		converter := NewConverter(mockDB)
		err := converter.updateMarketItems(mockDB)
		assert.NoError(t, err)
	})

	t.Run("모든 아이템에 통계가 없는 경우", func(t *testing.T) {
		ctrl := gomock.NewController(t)
		defer ctrl.Finish()

		mockDB := loadb.NewMockDB(ctrl)
		mockMarketItemDB := loadb.NewMockMarketItemDB(ctrl)

		marketItems := []loadb.MarketItem{
			{
				ID:              1,
				Name:            "통계없음1",
				CurrentMinPrice: 100,
				RecentPrice:     100,
				YDayAvgPrice:    decimal.NewFromInt(100),
				MarketItemStats: []loadb.MarketItemStat{},
			},
			{
				ID:              2,
				Name:            "통계없음2",
				CurrentMinPrice: 200,
				RecentPrice:     200,
				YDayAvgPrice:    decimal.NewFromInt(200),
				MarketItemStats: []loadb.MarketItemStat{},
			},
		}

		mockDB.EXPECT().MarketItem().Return(mockMarketItemDB).AnyTimes()
		mockMarketItemDB.EXPECT().FindAllWithLatestStats().Return(marketItems, nil)

		converter := NewConverter(mockDB)
		err := converter.updateMarketItems(mockDB)
		assert.NoError(t, err)
	})
}
