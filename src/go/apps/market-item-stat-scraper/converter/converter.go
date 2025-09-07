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
	err := s.db.WithTransaction(func(tx loadb.DB) error {
		if err := s.updateMarketItems(tx); err != nil {
			return err
		}

		items, err := tx.Item().FindManyByKind(loadb.ItemKind.MARKET)
		if err != nil {
			return err
		}

		var itemsToUpdate []loadb.Item
		for _, item := range items {
			if item.Name == FateFragmentName {
				price, err := s.getSmallFateFragmentBuyPricePerOne(tx)
				if err != nil {
					return err
				}
				item.Price = price
				itemsToUpdate = append(itemsToUpdate, item)
			} else {
				price, err := s.getMarketItemCurrentMinPrice(item.Name, tx)
				if err != nil {
					return err
				}
				item.Price = price
				itemsToUpdate = append(itemsToUpdate, item)
			}
		}

		if err := tx.Item().UpdateMany(itemsToUpdate); err != nil {
			return err
		}

		log.Println("Market Item Stats Converted To Content Reward Item Price Done")

		return nil
	})

	return err
}

func (s *Converter) getMarketItemCurrentMinPrice(itemName string, tx loadb.DB) (decimal.Decimal, error) {
	item, err := tx.MarketItem().FindByName(itemName)
	if err != nil {
		return decimal.Zero, err
	}

	bundleCount := decimal.NewFromInt(int64(item.BundleCount))
	currentPrice := decimal.NewFromInt(int64(item.CurrentMinPrice))

	return currentPrice.Div(bundleCount), nil
}

func (s *Converter) getSmallFateFragmentBuyPricePerOne(tx loadb.DB) (decimal.Decimal, error) {
	item, err := tx.MarketItem().FindByName(SmallFateFragmentName)
	if err != nil {
		return decimal.Zero, err
	}

	bundleCount := decimal.NewFromInt(int64(SmallFateFragmentBundleCount))
	currentPrice := decimal.NewFromInt(int64(item.CurrentMinPrice))

	return currentPrice.Div(bundleCount), nil
}

func (s *Converter) updateMarketItems(tx loadb.DB) error {
	marketItemsWithStats, err := tx.MarketItem().FindAllWithLatestStats()
	if err != nil {
		return err
	}

	for _, item := range marketItemsWithStats {
		if len(item.MarketItemStats) == 0 {
			continue
		}

		latestStat := item.MarketItemStats[0]

		item.CurrentMinPrice = latestStat.CurrentMinPrice
		item.RecentPrice = latestStat.RecentPrice
		item.YDayAvgPrice = latestStat.YDayAvgPrice

		if err := tx.MarketItem().UpdateStat(item); err != nil {
			return err
		}
	}

	log.Println("Market Item Stats Converted To Market Item Done")

	return nil
}
