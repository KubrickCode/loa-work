package loadb

import (
	"gorm.io/gorm"
)

type MarketItemStatDB interface {
	Create(stat MarketItemStat) error
}

type marketItemStatDB struct {
	gdb *gorm.DB
}

func NewMarketItemStatDB(gdb *gorm.DB) *marketItemStatDB {
	return &marketItemStatDB{
		gdb: gdb,
	}
}

func (db *marketItemStatDB) Create(stat MarketItemStat) error {
	err := db.gdb.Create(&stat).Error
	return err
}
