package loadb

import "gorm.io/gorm"

type MarketItemCategoryDB interface {
}

type marketItemCategoryDB struct {
	gdb *gorm.DB
}

func NewMarketItemCategoryDB(gdb *gorm.DB) *marketItemCategoryDB {
	return &marketItemCategoryDB{
		gdb: gdb,
	}
}
