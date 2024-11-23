package loadb

import (
	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

type MarketItemDB interface {
	FindStatScraperEnabledAll() ([]MarketItem, error)
	UpsertMany(items []MarketItem) error
}

type marketItemDB struct {
	gdb *gorm.DB
}

func NewMarketItemDB(gdb *gorm.DB) *marketItemDB {
	return &marketItemDB{
		gdb: gdb,
	}
}

func (db *marketItemDB) FindStatScraperEnabledAll() ([]MarketItem, error) {
	var items []MarketItem
	err := db.gdb.Where("is_stat_scraper_enabled = ?", true).Find(&items).Error

	return items, err
}

func (db *marketItemDB) UpsertMany(items []MarketItem) error {
	err := db.gdb.Clauses(clause.OnConflict{
		Columns:   []clause.Column{{Name: "ref_id"}},
		DoUpdates: clause.AssignmentColumns([]string{"bundle_count", "name", "image_src"}),
	}).Create(&items).Error

	return err
}
