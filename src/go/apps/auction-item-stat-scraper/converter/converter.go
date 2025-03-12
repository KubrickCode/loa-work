package converter

import (
	"fmt"
	"log"

	"github.com/KubrickCode/loa-work/src/go/libs/loadb"
	"github.com/shopspring/decimal"
)

type Converter struct {
	db loadb.DB
}

func NewConverter(db loadb.DB) *Converter {
	return &Converter{db: db}
}

// TODO: Test 작성
func (s *Converter) Start() error {
	err := s.db.WithTransaction(func(tx loadb.DB) error {
		items, err := tx.ContentRewardItem().FindManyByKind(loadb.ContentRewardItemKind.AUCTION_ITEM)
		if err != nil {
			return err
		}

		var pricesToCreate []loadb.ContentRewardItemPrice
		for _, item := range items {
			if item.Name == OneLevelGemName {
				price, err := s.get1LevelGemPrice(tx)
				if err != nil {
					return err
				}
				pricesToCreate = append(pricesToCreate, loadb.ContentRewardItemPrice{
					ContentRewardItemID: item.ID,
					Value:               price,
				})
			} else {
				return fmt.Errorf("unknown item: %s", item.Name)
			}
		}

		if err := tx.ContentRewardItemPrice().CreateMany(pricesToCreate); err != nil {
			return err
		}

		log.Println("Auction Item Stats Converted To Content Reward Item Price Done")

		return nil
	})

	return err
}

// TODO: Test 작성
func (s *Converter) get1LevelGemPrice(tx loadb.DB) (decimal.Decimal, error) {
	damageGem, err := tx.AuctionItem().FindWithStatsByName(OneLevelDamageGemName, RecentGemStatsCount)
	if err != nil {
		return decimal.Decimal{}, err
	}
	coolDownGem, err := tx.AuctionItem().FindWithStatsByName(OneLevelCoolDownGemName, RecentGemStatsCount)
	if err != nil {
		return decimal.Decimal{}, err
	}

	damageGemPrice := calculateAveragePrice(damageGem.AuctionItemStats)
	coolDownGemPrice := calculateAveragePrice(coolDownGem.AuctionItemStats)

	averagePrice := damageGemPrice.Add(coolDownGemPrice).Div(decimal.NewFromInt(2))
	return averagePrice, nil
}
