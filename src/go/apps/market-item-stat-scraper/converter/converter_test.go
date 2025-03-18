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
