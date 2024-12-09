package loadb

import (
	"gorm.io/gorm"
)

type AuctionItemDB interface {
	FindStatScraperEnabledAll() ([]AuctionItem, error)
	FindWithStatsByName(name string, take int) (AuctionItem, error)
}

type auctionItemDB struct {
	gdb *gorm.DB
}

func NewAuctionItemDB(gdb *gorm.DB) *auctionItemDB {
	return &auctionItemDB{
		gdb: gdb,
	}
}

func (db *auctionItemDB) FindStatScraperEnabledAll() ([]AuctionItem, error) {
	var items []AuctionItem
	err := db.gdb.Where("is_stat_scraper_enabled = ?", true).Find(&items).Error

	return items, err
}

func (db *auctionItemDB) FindWithStatsByName(name string, take int) (AuctionItem, error) {
	var item AuctionItem
	err := db.gdb.
		Preload("AuctionItemStats", func(db *gorm.DB) *gorm.DB {
			return db.Order("created_at desc").Limit(take)
		}).
		Where("name = ?", name).
		First(&item).Error

	return item, err
}
