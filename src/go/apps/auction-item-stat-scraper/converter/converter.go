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

func (s *Converter) Start() error {
	err := s.db.WithTransaction(func(tx loadb.DB) error {
		if err := s.updateAuctionItems(tx); err != nil {
			return err
		}

		items, err := tx.ContentRewardItem().FindManyByKind(loadb.ContentRewardItemKind.AUCTION_ITEM)
		if err != nil {
			return err
		}

		var itemsToUpdate []loadb.ContentRewardItem
		for _, item := range items {
			if item.Name == OneLevelGemName {
				price, err := s.get1LevelGemPrice(tx)
				if err != nil {
					return err
				}
				item.Price = price
				itemsToUpdate = append(itemsToUpdate, item)
			} else {
				return fmt.Errorf("unknown item: %s", item.Name)
			}
		}

		if err := tx.ContentRewardItem().UpdateMany(itemsToUpdate); err != nil {
			return err
		}

		log.Println("Auction Item Stats Converted To Content Reward Item Price Done")

		return nil
	})

	return err
}

func (s *Converter) get1LevelGemPrice(tx loadb.DB) (decimal.Decimal, error) {
	damageGem, err := tx.AuctionItem().FindByName(OneLevelDamageGemName)
	if err != nil {
		return decimal.Decimal{}, err
	}
	coolDownGem, err := tx.AuctionItem().FindByName(OneLevelCoolDownGemName)
	if err != nil {
		return decimal.Decimal{}, err
	}

	averagePrice := damageGem.AvgBuyPrice.Add(coolDownGem.AvgBuyPrice).Div(decimal.NewFromInt(2))
	return averagePrice, nil
}

func (s *Converter) updateAuctionItems(tx loadb.DB) error {
	const recentStatsCount = 10

	auctionItems, err := tx.AuctionItem().FindAllWithRecentStats(recentStatsCount)
	if err != nil {
		return err
	}

	for _, item := range auctionItems {
		item.AvgBuyPrice = calculateAveragePrice(item.AuctionItemStats)

		if err := tx.AuctionItem().UpdateStat(item); err != nil {
			return err
		}
	}

	log.Println("Auction Items Updated With Recent Stats")
	return nil
}
