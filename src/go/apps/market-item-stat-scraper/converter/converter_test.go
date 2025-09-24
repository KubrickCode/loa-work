package converter

import (
	"errors"
	"testing"

	"github.com/KubrickCode/loa-work/src/go/libs/loadb"
	"github.com/KubrickCode/loa-work/src/go/libs/loadb/models"
	"github.com/ericlagergren/decimal"
	"github.com/stretchr/testify/assert"
	"go.uber.org/mock/gomock"
)

func TestGetMarketItemCurrentMinPrice(t *testing.T) {
	t.Run("정상적인 가격 계산", func(t *testing.T) {
		ctrl := gomock.NewController(t)
		defer ctrl.Finish()

		mockDB := loadb.NewMockDB(ctrl)
		mockMarketItemRepo := loadb.NewMockMarketItemRepository(ctrl)

		itemName := "테스트 아이템"
		marketItem := &models.MarketItem{
			Name:            itemName,
			CurrentMinPrice: 1000,
			BundleCount:     10,
		}

		mockDB.EXPECT().MarketItem().Return(mockMarketItemRepo).AnyTimes()
		mockMarketItemRepo.EXPECT().FindByName(itemName).Return(marketItem, nil)

		converter := NewConverter(mockDB)

		result, err := converter.getMarketItemCurrentMinPrice(itemName, mockDB)

		assert.NoError(t, err)
		expected := new(decimal.Big).SetUint64(100) // 1000 / 10 = 100
		expectedDecimal := loadb.NewDecimal(expected)
		assert.True(t, expectedDecimal.Big().Cmp(result.Big()) == 0, "예상 가격은 %s이지만, 실제 가격은 %s입니다", expectedDecimal.Big().String(), result.Big().String())
	})

	t.Run("번들 수량이 1인 경우", func(t *testing.T) {
		ctrl := gomock.NewController(t)
		defer ctrl.Finish()

		mockDB := loadb.NewMockDB(ctrl)
		mockMarketItemRepo := loadb.NewMockMarketItemRepository(ctrl)

		itemName := "단일 아이템"
		marketItem := &models.MarketItem{
			Name:            itemName,
			CurrentMinPrice: 500,
			BundleCount:     1,
		}

		mockDB.EXPECT().MarketItem().Return(mockMarketItemRepo).AnyTimes()
		mockMarketItemRepo.EXPECT().FindByName(itemName).Return(marketItem, nil)

		converter := NewConverter(mockDB)

		result, err := converter.getMarketItemCurrentMinPrice(itemName, mockDB)

		// 검증
		assert.NoError(t, err)
		expected := new(decimal.Big).SetUint64(500) // 500 / 1 = 500
		expectedDecimal := loadb.NewDecimal(expected)
		assert.True(t, expectedDecimal.Big().Cmp(result.Big()) == 0, "예상 가격은 %s이지만, 실제 가격은 %s입니다", expectedDecimal.Big().String(), result.Big().String())
	})

	t.Run("아이템을 찾을 수 없는 경우", func(t *testing.T) {
		// 컨트롤러 및 모의 객체 설정
		ctrl := gomock.NewController(t)
		defer ctrl.Finish()

		mockDB := loadb.NewMockDB(ctrl)
		mockMarketItemRepo := loadb.NewMockMarketItemRepository(ctrl)

		itemName := "존재하지 않는 아이템"
		expectedError := errors.New("item not found")

		mockDB.EXPECT().MarketItem().Return(mockMarketItemRepo).AnyTimes()
		mockMarketItemRepo.EXPECT().FindByName(itemName).Return(nil, expectedError)

		converter := NewConverter(mockDB)

		result, err := converter.getMarketItemCurrentMinPrice(itemName, mockDB)

		assert.Error(t, err)
		assert.Equal(t, expectedError, err)
		emptyDecimal := loadb.ZeroDecimal()
		assert.True(t, emptyDecimal.Big().Cmp(result.Big()) == 0, "에러 발생 시 0을 반환해야 합니다")
	})

	t.Run("가격이 0인 경우", func(t *testing.T) {
		ctrl := gomock.NewController(t)
		defer ctrl.Finish()

		mockDB := loadb.NewMockDB(ctrl)
		mockMarketItemRepo := loadb.NewMockMarketItemRepository(ctrl)

		itemName := "가격 없는 아이템"
		marketItem := &models.MarketItem{
			Name:            itemName,
			CurrentMinPrice: 0,
			BundleCount:     10,
		}

		mockDB.EXPECT().MarketItem().Return(mockMarketItemRepo).AnyTimes()
		mockMarketItemRepo.EXPECT().FindByName(itemName).Return(marketItem, nil)

		converter := NewConverter(mockDB)

		result, err := converter.getMarketItemCurrentMinPrice(itemName, mockDB)

		assert.NoError(t, err)
		expected := new(decimal.Big).SetUint64(0)
		expectedDecimal := loadb.NewDecimal(expected)
		assert.True(t, expectedDecimal.Big().Cmp(result.Big()) == 0, "예상 가격은 %s이지만, 실제 가격은 %s입니다", expectedDecimal.Big().String(), result.Big().String())
	})

	t.Run("번들 수량이 큰 경우 소수점 계산", func(t *testing.T) {
		ctrl := gomock.NewController(t)
		defer ctrl.Finish()

		mockDB := loadb.NewMockDB(ctrl)
		mockMarketItemRepo := loadb.NewMockMarketItemRepository(ctrl)

		itemName := "대량 번들 아이템"
		marketItem := &models.MarketItem{
			Name:            itemName,
			CurrentMinPrice: 333,
			BundleCount:     10,
		}

		mockDB.EXPECT().MarketItem().Return(mockMarketItemRepo).AnyTimes()
		mockMarketItemRepo.EXPECT().FindByName(itemName).Return(marketItem, nil)

		converter := NewConverter(mockDB)

		result, err := converter.getMarketItemCurrentMinPrice(itemName, mockDB)

		assert.NoError(t, err)
		price := new(decimal.Big).SetUint64(333)
		bundleCount := new(decimal.Big).SetUint64(10)
		expected := new(decimal.Big).Quo(price, bundleCount)
		expectedDecimal := loadb.NewDecimal(expected)
		assert.True(t, expectedDecimal.Big().Cmp(result.Big()) == 0, "예상 가격은 %s이지만, 실제 가격은 %s입니다", expectedDecimal.Big().String(), result.Big().String())
	})
}

func TestGetSmallFateFragmentBuyPricePerOne(t *testing.T) {
	t.Run("정상적인 운명의 파편 가격 계산", func(t *testing.T) {
		ctrl := gomock.NewController(t)
		defer ctrl.Finish()

		mockDB := loadb.NewMockDB(ctrl)
		mockMarketItemRepo := loadb.NewMockMarketItemRepository(ctrl)

		marketItem := &models.MarketItem{
			Name:            SmallFateFragmentName,
			CurrentMinPrice: 1000,
			BundleCount:     SmallFateFragmentBundleCount,
		}

		mockDB.EXPECT().MarketItem().Return(mockMarketItemRepo).AnyTimes()
		mockMarketItemRepo.EXPECT().FindByName(SmallFateFragmentName).Return(marketItem, nil)

		converter := NewConverter(mockDB)

		result, err := converter.getSmallFateFragmentBuyPricePerOne(mockDB)

		assert.NoError(t, err)
		price := new(decimal.Big).SetUint64(1000)
		bundleCount := new(decimal.Big).SetUint64(uint64(SmallFateFragmentBundleCount))
		expected := new(decimal.Big).Quo(price, bundleCount)
		expectedDecimal := loadb.NewDecimal(expected)
		assert.True(t, expectedDecimal.Big().Cmp(result.Big()) == 0, "예상 가격은 %s이지만, 실제 가격은 %s입니다", expectedDecimal.Big().String(), result.Big().String())
	})

	t.Run("운명의 파편을 찾을 수 없는 경우", func(t *testing.T) {
		ctrl := gomock.NewController(t)
		defer ctrl.Finish()

		mockDB := loadb.NewMockDB(ctrl)
		mockMarketItemRepo := loadb.NewMockMarketItemRepository(ctrl)

		expectedError := errors.New("item not found")
		mockDB.EXPECT().MarketItem().Return(mockMarketItemRepo).AnyTimes()
		mockMarketItemRepo.EXPECT().FindByName(SmallFateFragmentName).Return(nil, expectedError)

		converter := NewConverter(mockDB)

		result, err := converter.getSmallFateFragmentBuyPricePerOne(mockDB)

		assert.Error(t, err)
		assert.Equal(t, expectedError, err)
		emptyDecimal := loadb.ZeroDecimal()
		assert.True(t, emptyDecimal.Big().Cmp(result.Big()) == 0, "에러 발생 시 0을 반환해야 합니다")
	})

	t.Run("운명의 파편 가격이 0인 경우", func(t *testing.T) {
		ctrl := gomock.NewController(t)
		defer ctrl.Finish()

		mockDB := loadb.NewMockDB(ctrl)
		mockMarketItemRepo := loadb.NewMockMarketItemRepository(ctrl)

		marketItem := &models.MarketItem{
			Name:            SmallFateFragmentName,
			CurrentMinPrice: 0,
			BundleCount:     SmallFateFragmentBundleCount,
		}

		mockDB.EXPECT().MarketItem().Return(mockMarketItemRepo).AnyTimes()
		mockMarketItemRepo.EXPECT().FindByName(SmallFateFragmentName).Return(marketItem, nil)

		converter := NewConverter(mockDB)

		result, err := converter.getSmallFateFragmentBuyPricePerOne(mockDB)

		assert.NoError(t, err)
		expected := new(decimal.Big).SetUint64(0)
		expectedDecimal := loadb.NewDecimal(expected)
		assert.True(t, expectedDecimal.Big().Cmp(result.Big()) == 0, "가격이 0인 경우 0을 반환해야 합니다")
	})

	t.Run("기본 번들 개수가 변경된 경우", func(t *testing.T) {
		ctrl := gomock.NewController(t)
		defer ctrl.Finish()

		mockDB := loadb.NewMockDB(ctrl)
		mockMarketItemRepo := loadb.NewMockMarketItemRepository(ctrl)

		customBundleCount := 100

		marketItem := &models.MarketItem{
			Name:            SmallFateFragmentName,
			CurrentMinPrice: 10000,
			BundleCount:     customBundleCount,
		}

		mockDB.EXPECT().MarketItem().Return(mockMarketItemRepo).AnyTimes()
		mockMarketItemRepo.EXPECT().FindByName(SmallFateFragmentName).Return(marketItem, nil)

		converter := NewConverter(mockDB)

		result, err := converter.getSmallFateFragmentBuyPricePerOne(mockDB)

		assert.NoError(t, err)

		price := new(decimal.Big).SetUint64(10000)
		bundleCount := new(decimal.Big).SetUint64(uint64(SmallFateFragmentBundleCount))
		expected := new(decimal.Big).Quo(price, bundleCount)
		expectedDecimal := loadb.NewDecimal(expected)
		assert.True(t, expectedDecimal.Big().Cmp(result.Big()) == 0, "예상 가격은 %s이지만, 실제 가격은 %s입니다", expectedDecimal.Big().String(), result.Big().String())

		differentBundleCount := new(decimal.Big).SetUint64(uint64(customBundleCount))
		differentExpected := new(decimal.Big).Quo(price, differentBundleCount)
		differentExpectedDecimal := loadb.NewDecimal(differentExpected)
		assert.False(t, differentExpectedDecimal.Big().Cmp(result.Big()) == 0, "DB의 번들 개수를 사용한 결과(%s)와 하드코딩된 상수를 사용한 결과(%s)는 달라야 합니다", differentExpectedDecimal.Big().String(), result.Big().String())
	})

	t.Run("큰 가격에 대한 계산", func(t *testing.T) {
		ctrl := gomock.NewController(t)
		defer ctrl.Finish()

		mockDB := loadb.NewMockDB(ctrl)
		mockMarketItemRepo := loadb.NewMockMarketItemRepository(ctrl)

		largePrice := 9999999
		marketItem := &models.MarketItem{
			Name:            SmallFateFragmentName,
			CurrentMinPrice: largePrice,
			BundleCount:     SmallFateFragmentBundleCount,
		}

		mockDB.EXPECT().MarketItem().Return(mockMarketItemRepo).AnyTimes()
		mockMarketItemRepo.EXPECT().FindByName(SmallFateFragmentName).Return(marketItem, nil)

		converter := NewConverter(mockDB)

		result, err := converter.getSmallFateFragmentBuyPricePerOne(mockDB)

		assert.NoError(t, err)
		price := new(decimal.Big).SetUint64(uint64(largePrice))
		bundleCount := new(decimal.Big).SetUint64(uint64(SmallFateFragmentBundleCount))
		expected := new(decimal.Big).Quo(price, bundleCount)
		expectedDecimal := loadb.NewDecimal(expected)
		assert.True(t, expectedDecimal.Big().Cmp(result.Big()) == 0, "예상 가격은 %s이지만, 실제 가격은 %s입니다", expectedDecimal.Big().String(), result.Big().String())
	})
}

func TestUpdateMarketItems(t *testing.T) {
	t.Run("아이템 통계 업데이트", func(t *testing.T) {
		ctrl := gomock.NewController(t)
		defer ctrl.Finish()

		mockDB := loadb.NewMockDB(ctrl)
		mockMarketItemRepo := loadb.NewMockMarketItemRepository(ctrl)
		mockMarketItemStatRepo := loadb.NewMockMarketItemStatRepository(ctrl)

		marketItems := []*models.MarketItem{
			{
				ID:              1,
				Name:            "아이템1",
				CurrentMinPrice: 100,
				RecentPrice:     100,
			},
		}

		stats := []*models.MarketItemStat{
			{
				ID:              11,
				MarketItemID:    1,
				CurrentMinPrice: 200,
				RecentPrice:     250,
				YDayAvgPrice:    loadb.NewDecimal(new(decimal.Big).SetUint64(220)).ToSQLBoilerDecimal(),
			},
		}

		mockDB.EXPECT().MarketItem().Return(mockMarketItemRepo).AnyTimes()
		mockDB.EXPECT().MarketItemStat().Return(mockMarketItemStatRepo).AnyTimes()
		mockMarketItemRepo.EXPECT().FindAll().Return(marketItems, nil)
		mockMarketItemStatRepo.EXPECT().GetLatestStatsByItemID(1, 1).Return(stats, nil)
		mockMarketItemRepo.EXPECT().UpdateStat(gomock.Any()).Return(nil)

		converter := NewConverter(mockDB)
		err := converter.updateMarketItems(mockDB)
		assert.NoError(t, err)
	})

	t.Run("통계 조회 중 오류 발생", func(t *testing.T) {
		ctrl := gomock.NewController(t)
		defer ctrl.Finish()

		mockDB := loadb.NewMockDB(ctrl)
		mockMarketItemRepo := loadb.NewMockMarketItemRepository(ctrl)

		expectedError := errors.New("데이터베이스 조회 오류")
		mockDB.EXPECT().MarketItem().Return(mockMarketItemRepo).AnyTimes()
		mockMarketItemRepo.EXPECT().FindAll().Return(nil, expectedError)

		converter := NewConverter(mockDB)
		err := converter.updateMarketItems(mockDB)
		assert.Error(t, err)
		assert.Equal(t, expectedError, err)
	})

	t.Run("아이템 업데이트 중 오류 발생", func(t *testing.T) {
		ctrl := gomock.NewController(t)
		defer ctrl.Finish()

		mockDB := loadb.NewMockDB(ctrl)
		mockMarketItemRepo := loadb.NewMockMarketItemRepository(ctrl)
		mockMarketItemStatRepo := loadb.NewMockMarketItemStatRepository(ctrl)

		marketItems := []*models.MarketItem{
			{
				ID:              1,
				Name:            "아이템1",
				CurrentMinPrice: 100,
				RecentPrice:     100,
			},
		}

		stats := []*models.MarketItemStat{
			{
				ID:              11,
				MarketItemID:    1,
				CurrentMinPrice: 200,
				RecentPrice:     200,
				YDayAvgPrice:    loadb.NewDecimal(new(decimal.Big).SetUint64(200)).ToSQLBoilerDecimal(),
			},
		}

		updateError := errors.New("업데이트 중 오류 발생")
		mockDB.EXPECT().MarketItem().Return(mockMarketItemRepo).AnyTimes()
		mockDB.EXPECT().MarketItemStat().Return(mockMarketItemStatRepo).AnyTimes()
		mockMarketItemRepo.EXPECT().FindAll().Return(marketItems, nil)
		mockMarketItemStatRepo.EXPECT().GetLatestStatsByItemID(1, 1).Return(stats, nil)
		mockMarketItemRepo.EXPECT().UpdateStat(gomock.Any()).Return(updateError)

		converter := NewConverter(mockDB)
		err := converter.updateMarketItems(mockDB)
		assert.Error(t, err)
		assert.Equal(t, updateError, err)
	})

	t.Run("빈 아이템 목록 처리", func(t *testing.T) {
		ctrl := gomock.NewController(t)
		defer ctrl.Finish()

		mockDB := loadb.NewMockDB(ctrl)
		mockMarketItemRepo := loadb.NewMockMarketItemRepository(ctrl)

		emptyItems := []*models.MarketItem{}
		mockDB.EXPECT().MarketItem().Return(mockMarketItemRepo).AnyTimes()
		mockMarketItemRepo.EXPECT().FindAll().Return(emptyItems, nil)

		converter := NewConverter(mockDB)
		err := converter.updateMarketItems(mockDB)
		assert.NoError(t, err)
	})

	t.Run("모든 아이템에 통계가 없는 경우", func(t *testing.T) {
		ctrl := gomock.NewController(t)
		defer ctrl.Finish()

		mockDB := loadb.NewMockDB(ctrl)
		mockMarketItemRepo := loadb.NewMockMarketItemRepository(ctrl)
		mockMarketItemStatRepo := loadb.NewMockMarketItemStatRepository(ctrl)

		marketItems := []*models.MarketItem{
			{
				ID:              1,
				Name:            "통계없음1",
				CurrentMinPrice: 100,
				RecentPrice:     100,
			},
			{
				ID:              2,
				Name:            "통계없음2",
				CurrentMinPrice: 200,
				RecentPrice:     200,
			},
		}

		mockDB.EXPECT().MarketItem().Return(mockMarketItemRepo).AnyTimes()
		mockDB.EXPECT().MarketItemStat().Return(mockMarketItemStatRepo).AnyTimes()
		mockMarketItemRepo.EXPECT().FindAll().Return(marketItems, nil)
		mockMarketItemStatRepo.EXPECT().GetLatestStatsByItemID(1, 1).Return([]*models.MarketItemStat{}, nil)
		mockMarketItemStatRepo.EXPECT().GetLatestStatsByItemID(2, 1).Return([]*models.MarketItemStat{}, nil)

		converter := NewConverter(mockDB)
		err := converter.updateMarketItems(mockDB)
		assert.NoError(t, err)
	})
}
