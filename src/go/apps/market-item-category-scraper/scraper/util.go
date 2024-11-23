package scraper

import (
	"github.com/KubrickCode/loa-life/src/go/apps/market-item-category-scraper/api"
	"github.com/KubrickCode/loa-life/src/go/libs/loadb"
)

func FlattenCategories(input []api.Category, output *[]loadb.MarketItemCategory) {
	for _, category := range input {
		*output = append(*output, loadb.MarketItemCategory{
			Code: category.Code,
			Name: category.CodeName,
		})

		for _, sub := range category.Subs {
			*output = append(*output, loadb.MarketItemCategory{
				Code: sub.Code,
				Name: sub.CodeName,
			})
		}
	}
}
