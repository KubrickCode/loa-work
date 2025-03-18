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
