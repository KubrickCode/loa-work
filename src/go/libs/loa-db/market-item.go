package loadb

import (
	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

type MarketItemDB interface {
	FindWithStatsByName(name string) (MarketItem, error)
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

func (db *marketItemDB) FindWithStatsByName(name string) (MarketItem, error) {
	var item MarketItem
	err := db.gdb.
		Preload("MarketItemStats", func(db *gorm.DB) *gorm.DB {
			return db.Order("created_at desc")
		}).
		Where("name = ?", name).
		First(&item).Error

	return item, err
}

func (db *marketItemDB) FindStatScraperEnabledAll() ([]MarketItem, error) {
	var items []MarketItem
	err := db.gdb.Where("is_stat_scraper_enabled = ?", true).Find(&items).Error

	return items, err
}

func (db *marketItemDB) UpsertMany(items []MarketItem) error {
	err := db.gdb.Clauses(clause.OnConflict{
		Columns:   []clause.Column{{Name: "ref_id"}},
		DoUpdates: clause.AssignmentColumns([]string{"bundle_count", "name", "image_url", "grade"}),
	}).Create(&items).Error

	return err
}
