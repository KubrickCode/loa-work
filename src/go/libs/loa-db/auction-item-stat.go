package loadb

import (
	"gorm.io/gorm"
)

type AuctionItemStatDB interface {
	CreateMany(stats []AuctionItemStat) error
}

type auctionItemStatDB struct {
	gdb *gorm.DB
}

func NewAuctionItemStatDB(gdb *gorm.DB) *auctionItemStatDB {
	return &auctionItemStatDB{
		gdb: gdb,
	}
}

func (db *auctionItemStatDB) CreateMany(stats []AuctionItemStat) error {
	err := db.gdb.Create(&stats).Error
	return err
}
