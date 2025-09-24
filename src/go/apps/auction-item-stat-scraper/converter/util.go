package converter

import (
	"github.com/KubrickCode/loa-work/src/go/libs/loadb/models"
	"github.com/ericlagergren/decimal"
)

func calculateAveragePrice(stats []*models.AuctionItemStat) *decimal.Big {
	if len(stats) == 0 {
		return new(decimal.Big).SetUint64(0)
	}

	totalPrice := new(decimal.Big).SetUint64(0)
	for _, stat := range stats {
		price := new(decimal.Big).SetUint64(uint64(stat.BuyPrice))
		totalPrice = new(decimal.Big).Add(totalPrice, price)
	}

	count := new(decimal.Big).SetUint64(uint64(len(stats)))
	return new(decimal.Big).Quo(totalPrice, count)
}
