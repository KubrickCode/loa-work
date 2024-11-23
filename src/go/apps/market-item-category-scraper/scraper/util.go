package scraper

import (
	"github.com/KubrickCode/loa-life/src/go/libs/loaApi"
	"github.com/KubrickCode/loa-life/src/go/libs/loadb"
)

func GetFlattenCategories(categories []loaApi.Category) []loadb.MarketItemCategory {
	var output []loadb.MarketItemCategory

	for _, category := range categories {
		output = append(output, loadb.MarketItemCategory{
			Code: category.Code,
			Name: category.CodeName,
		})

		for _, sub := range category.Subs {
			output = append(output, loadb.MarketItemCategory{
				Code: sub.Code,
				Name: sub.CodeName,
			})
		}
	}

	return output
}
