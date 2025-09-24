package converter

import (
	"testing"

	"github.com/KubrickCode/loa-work/src/go/libs/loadb/models"
	"github.com/ericlagergren/decimal"
)

func TestCalculateAveragePrice(t *testing.T) {
	tests := []struct {
		name     string
		stats    []*models.AuctionItemStat
		expected *decimal.Big
	}{
		{
			name: "정상적인 가격",
			stats: []*models.AuctionItemStat{
				{BuyPrice: 100},
				{BuyPrice: 200},
				{BuyPrice: 300},
			},
			expected: new(decimal.Big).SetUint64(200),
		},
		{
			name:     "빈 배열",
			stats:    []*models.AuctionItemStat{},
			expected: new(decimal.Big).SetUint64(0),
		},
		{
			name: "하나의 가격",
			stats: []*models.AuctionItemStat{
				{BuyPrice: 150},
			},
			expected: new(decimal.Big).SetUint64(150),
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			result := calculateAveragePrice(tt.stats)
			if result.Cmp(tt.expected) != 0 {
				t.Errorf("expected %s, got %s", tt.expected.String(), result.String())
			}
		})
	}
}
