package converter

import (
	"fmt"
	"log"

	"github.com/KubrickCode/loa-life/src/go/libs/loadb"
	"github.com/shopspring/decimal"
)

type Converter struct {
	db loadb.DB
}

func NewConverter(db loadb.DB) *Converter {
	return &Converter{db: db}
}

func (s *Converter) Start() error {
	items, err := s.db.ContentRewardItem().FindManyByKind(loadb.ContentRewardItemKind.AUCTION_ITEM)
	if err != nil {
		return err
	}

	var itemsToUpdate []loadb.ContentRewardItem
	for _, item := range items {
		if item.Name == OneLevelGemName {
			price, err := s.get1LevelGemPrice()
			if err != nil {
				return err
			}
			itemsToUpdate = append(itemsToUpdate, loadb.ContentRewardItem{
				ID:           item.ID,
				DefaultPrice: price,
			})
		} else {
			return fmt.Errorf("unknown item: %s", item.Name)
		}
	}

	if err := s.db.ContentRewardItem().UpdateMany(itemsToUpdate); err != nil {
		return err
	}

	log.Println("Auction Item Stats Converted To Content Reward Item Done")

	return nil
}

func (s *Converter) get1LevelGemPrice() (decimal.Decimal, error) {
	damageGem, err := s.db.AuctionItem().FindWithStatsByName(OneLevelDamageGemName, RecentGemStatsCount)
	if err != nil {
		return decimal.Decimal{}, err
	}
	coolDownGem, err := s.db.AuctionItem().FindWithStatsByName(OneLevelCoolDownGemName, RecentGemStatsCount)
	if err != nil {
		return decimal.Decimal{}, err
	}

	damageGemPrice := calculateAveragePrice(damageGem.AuctionItemStats)
	coolDownGemPrice := calculateAveragePrice(coolDownGem.AuctionItemStats)

	averagePrice := damageGemPrice.Add(coolDownGemPrice).Div(decimal.NewFromInt(2))
	return averagePrice, nil
}
