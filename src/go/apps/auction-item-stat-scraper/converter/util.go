package converter

import (
	"github.com/KubrickCode/loa-work/src/go/libs/loadb"
	"github.com/shopspring/decimal"
)

func calculateAveragePrice(stats []loadb.AuctionItemStat) decimal.Decimal {
	if len(stats) == 0 {
		return decimal.NewFromInt(0)
	}

	totalPrice := decimal.NewFromInt(0)
	for _, stat := range stats {
		totalPrice = totalPrice.Add(decimal.NewFromInt(int64(stat.BuyPrice)))
	}
	return totalPrice.Div(decimal.NewFromInt(int64(len(stats))))
}
