package loadb

import (
	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

type MarketItemCategoryDB interface {
	UpsertMany(categories []MarketItemCategory) error
}

type marketItemCategoryDB struct {
	gdb *gorm.DB
}

func NewMarketItemCategoryDB(gdb *gorm.DB) *marketItemCategoryDB {
	return &marketItemCategoryDB{
		gdb: gdb,
	}
}

func (db *marketItemCategoryDB) UpsertMany(categories []MarketItemCategory) error {
	err := db.gdb.Clauses(clause.OnConflict{
		Columns:   []clause.Column{{Name: "code"}},
		DoUpdates: clause.AssignmentColumns([]string{"name"}),
	}).Create(&categories).Error

	return err
}
