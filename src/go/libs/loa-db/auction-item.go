package loadb

import (
	"gorm.io/gorm"
)

type AuctionItemDB interface {
	FindStatScraperEnabledAll() ([]AuctionItem, error)
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
