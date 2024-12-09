package converter

import (
	"github.com/KubrickCode/loa-life/src/go/libs/loadb"
	"github.com/shopspring/decimal"
)

func calculateAveragePrice(stats []loadb.AuctionItemStat) decimal.Decimal {
	totalPrice := decimal.NewFromInt(0)
	for _, stat := range stats {
		totalPrice = totalPrice.Add(decimal.NewFromInt(int64(stat.BuyPrice)))
	}
	return totalPrice.Div(decimal.NewFromInt(int64(len(stats))))
}
