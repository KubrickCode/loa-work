package loadb

import (
	"gorm.io/gorm"
)

type ContentRewardItemPriceDB interface {
	CreateMany(items []ContentRewardItemPrice) error
}

type contentRewardItemPriceDB struct {
	gdb *gorm.DB
}

func NewContentRewardItemPriceDB(gdb *gorm.DB) *contentRewardItemPriceDB {
	return &contentRewardItemPriceDB{
		gdb: gdb,
	}
}

func (db *contentRewardItemPriceDB) CreateMany(items []ContentRewardItemPrice) error {
	return db.gdb.Create(&items).Error
}
