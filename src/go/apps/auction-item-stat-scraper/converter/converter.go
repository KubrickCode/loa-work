package converter

import (
	"fmt"
	"log"

	"github.com/KubrickCode/loa-work/src/go/libs/loadb"
	"github.com/KubrickCode/loa-work/src/go/libs/loadb/models"
	"github.com/ericlagergren/decimal"
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

		items, err := tx.Item().FindManyByKind(models.ItemKindAUCTION)
		if err != nil {
			return err
		}

		for _, item := range items {
			if item.Name == OneLevelGemName {
				price, err := s.get1LevelGemPrice(tx)
				if err != nil {
					return err
				}
				if err := tx.Item().UpdateItemPrice(item, price); err != nil {
					return err
				}
			} else {
				return fmt.Errorf("unknown item: %s", item.Name)
			}
		}

		log.Println("Auction Item Stats Converted To Content Reward Item Price Done")

		return nil
	})

	return err
}

func (s *Converter) get1LevelGemPrice(tx loadb.DB) (loadb.Decimal, error) {
	damageGem, err := tx.AuctionItem().FindByName(OneLevelDamageGemName)
	if err != nil {
		return loadb.ZeroDecimal(), err
	}
	coolDownGem, err := tx.AuctionItem().FindByName(OneLevelCoolDownGemName)
	if err != nil {
		return loadb.ZeroDecimal(), err
	}

	sum := new(decimal.Big).Add(damageGem.AvgBuyPrice.Big, coolDownGem.AvgBuyPrice.Big)
	two := decimal.New(2, 0)
	averagePrice := new(decimal.Big).Quo(sum, two)

	return loadb.NewDecimal(averagePrice), nil
}

func (s *Converter) updateAuctionItems(tx loadb.DB) error {
	const recentStatsCount = 10

	auctionItems, err := tx.AuctionItem().FindStatScraperEnabledAll()
	if err != nil {
		return err
	}

	for _, item := range auctionItems {
		stats, err := tx.AuctionItemStat().GetLatestStatsByItemID(item.ID, recentStatsCount)
		if err != nil {
			return err
		}

		if len(stats) == 0 {
			continue
		}

		avgPrice := calculateAveragePrice(stats)
		if err := tx.AuctionItem().UpdateAvgBuyPrice(item, loadb.NewDecimal(avgPrice)); err != nil {
			return err
		}
	}

	log.Println("Auction Items Updated With Recent Stats")
	return nil
}
