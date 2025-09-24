package scraper

import (
	"github.com/KubrickCode/loa-work/src/go/libs/loaApi"
	"github.com/KubrickCode/loa-work/src/go/libs/loadb/models"
)

func GetFlattenCategories(categories []loaApi.Category) []*models.MarketItemCategory {
	var output []*models.MarketItemCategory

	for _, category := range categories {
		output = append(output, &models.MarketItemCategory{
			Code: category.Code,
			Name: category.CodeName,
		})

		for _, sub := range category.Subs {
			output = append(output, &models.MarketItemCategory{
				Code: sub.Code,
				Name: sub.CodeName,
			})
		}
	}

	return output
}
