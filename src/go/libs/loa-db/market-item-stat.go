package loadb

import (
	"gorm.io/gorm"
)

type MarketItemStatDB interface {
	CreateMany(stats []MarketItemStat) error
}

type marketItemStatDB struct {
	gdb *gorm.DB
}

func NewMarketItemStatDB(gdb *gorm.DB) *marketItemStatDB {
	return &marketItemStatDB{
		gdb: gdb,
	}
}

func (db *marketItemStatDB) CreateMany(stats []MarketItemStat) error {
	err := db.gdb.Create(&stats).Error
	return err
}
