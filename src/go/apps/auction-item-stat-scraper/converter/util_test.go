package converter

import (
	"testing"

	"github.com/KubrickCode/loa-work/src/go/libs/loadb"
	"github.com/shopspring/decimal"
)

func TestCalculateAveragePrice(t *testing.T) {
	tests := []struct {
		name     string
		stats    []loadb.AuctionItemStat
		expected decimal.Decimal
	}{
		{
			name: "정상적인 가격",
			stats: []loadb.AuctionItemStat{
				{BuyPrice: 100},
				{BuyPrice: 200},
				{BuyPrice: 300},
			},
			expected: decimal.NewFromInt(200),
		},
		{
			name:     "빈 배열",
			stats:    []loadb.AuctionItemStat{},
			expected: decimal.NewFromInt(0),
		},
		{
			name: "하나의 가격",
			stats: []loadb.AuctionItemStat{
				{BuyPrice: 150},
			},
			expected: decimal.NewFromInt(150),
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			result := calculateAveragePrice(tt.stats)
			if !result.Equal(tt.expected) {
				t.Errorf("expected %s, got %s", tt.expected.String(), result.String())
			}
		})
	}
}
