package converter

import (
	"log"

	"github.com/KubrickCode/loa-work/src/go/libs/loadb"
	"github.com/shopspring/decimal"
)

type Converter struct {
	db loadb.DB
}

func NewConverter(db loadb.DB) *Converter {
	return &Converter{db: db}
}

func (s *Converter) Start() error {
	items, err := s.db.ContentRewardItem().FindManyByKind(loadb.ContentRewardItemKind.MARKET_ITEM)
	if err != nil {
		return err
	}

	var pricesToCreate []loadb.ContentRewardItemPrice
	for _, item := range items {
		if item.Name == FateFragmentName {
			price, err := s.getSmallFateFragmentBuyPricePerOne()
			if err != nil {
				return err
			}
			pricesToCreate = append(pricesToCreate, loadb.ContentRewardItemPrice{
				ContentRewardItemID: item.ID,
				Value:               price,
			})
		} else {
			price, err := s.getMarketItemCurrentMinPrice(item.Name)
			if err != nil {
				return err
			}
			pricesToCreate = append(pricesToCreate, loadb.ContentRewardItemPrice{
				ContentRewardItemID: item.ID,
				Value:               price,
			})
		}
	}

	if err := s.db.ContentRewardItemPrice().CreateMany(pricesToCreate); err != nil {
		return err
	}

	log.Println("Market Item Stats Converted To Content Reward Item Price Done")

	return nil
}

func (s *Converter) getMarketItemCurrentMinPrice(itemName string) (decimal.Decimal, error) {
	item, err := s.db.MarketItem().FindWithStatsByName(itemName)
	if err != nil {
		return decimal.Zero, err
	}

	bundleCount := decimal.NewFromInt(int64(item.BundleCount))
	currentPrice := decimal.NewFromInt(int64(item.MarketItemStats[0].CurrentMinPrice))

	return currentPrice.Div(bundleCount), nil
}

func (s *Converter) getSmallFateFragmentBuyPricePerOne() (decimal.Decimal, error) {
	item, err := s.db.MarketItem().FindWithStatsByName(SmallFateFragmentName)
	if err != nil {
		return decimal.Zero, err
	}

	bundleCount := decimal.NewFromInt(int64(SmallFateFragmentBundleCount))
	currentPrice := decimal.NewFromInt(int64(item.MarketItemStats[0].CurrentMinPrice))

	return currentPrice.Div(bundleCount), nil
}
