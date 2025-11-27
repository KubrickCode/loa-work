package converter

import (
	"log/slog"

	"github.com/KubrickCode/loa-work/src/go/libs/loadb"
	"github.com/KubrickCode/loa-work/src/go/libs/loadb/models"
	"github.com/ericlagergren/decimal"
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

		items, err := tx.Item().FindManyByKind(models.ItemKindMARKET)
		if err != nil {
			return err
		}

		for _, item := range items {
			if item.Name == FateFragmentName {
				price, err := s.getSmallFateFragmentBuyPricePerOne(tx)
				if err != nil {
					return err
				}
				if err := tx.Item().UpdateItemPrice(item, price); err != nil {
					return err
				}
			} else {
				price, err := s.getMarketItemCurrentMinPrice(item.Name, tx)
				if err != nil {
					return err
				}
				if err := tx.Item().UpdateItemPrice(item, price); err != nil {
					return err
				}
			}
		}

		slog.Info("market item stats converted to content reward item price")

		return nil
	})

	return err
}

func (s *Converter) getMarketItemCurrentMinPrice(itemName string, tx loadb.DB) (loadb.Decimal, error) {
	item, err := tx.MarketItem().FindByName(itemName)
	if err != nil {
		return loadb.ZeroDecimal(), err
	}

	bundleCount := new(decimal.Big).SetUint64(uint64(item.BundleCount))
	currentPrice := new(decimal.Big).SetUint64(uint64(item.CurrentMinPrice))
	result := new(decimal.Big).Quo(currentPrice, bundleCount)

	return loadb.NewDecimal(result), nil
}

func (s *Converter) getSmallFateFragmentBuyPricePerOne(tx loadb.DB) (loadb.Decimal, error) {
	item, err := tx.MarketItem().FindByName(SmallFateFragmentName)
	if err != nil {
		return loadb.ZeroDecimal(), err
	}

	bundleCount := new(decimal.Big).SetUint64(uint64(SmallFateFragmentBundleCount))
	currentPrice := new(decimal.Big).SetUint64(uint64(item.CurrentMinPrice))
	result := new(decimal.Big).Quo(currentPrice, bundleCount)

	return loadb.NewDecimal(result), nil
}

func (s *Converter) updateMarketItems(tx loadb.DB) error {
	marketItemsWithStats, err := tx.MarketItem().FindAll()
	if err != nil {
		return err
	}

	for _, item := range marketItemsWithStats {
		stats, err := tx.MarketItemStat().GetLatestStatsByItemID(item.ID, 1)
		if err != nil {
			return err
		}
		if len(stats) == 0 {
			continue
		}

		latestStat := stats[0]

		item.CurrentMinPrice = latestStat.CurrentMinPrice
		item.RecentPrice = latestStat.RecentPrice
		item.YDayAvgPrice = latestStat.YDayAvgPrice

		if err := tx.MarketItem().UpdateStat(item); err != nil {
			return err
		}
	}

	slog.Info("market item stats converted to market item")

	return nil
}
