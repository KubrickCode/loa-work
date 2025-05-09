package loadb

import (
	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

type MarketItemCategoryDB interface {
	FindByID(id int) (*MarketItemCategory, error)
	FindItemScraperEnabledAll() ([]MarketItemCategory, error)
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

func (db *marketItemCategoryDB) FindByID(id int) (*MarketItemCategory, error) {
	var category MarketItemCategory
	err := db.gdb.First(&category, id).Error

	return &category, err
}

func (db *marketItemCategoryDB) FindItemScraperEnabledAll() ([]MarketItemCategory, error) {
	var categories []MarketItemCategory
	err := db.gdb.Where("is_item_scraper_enabled = ?", true).Find(&categories).Error

	return categories, err
}

func (db *marketItemCategoryDB) UpsertMany(categories []MarketItemCategory) error {
	err := db.gdb.Clauses(clause.OnConflict{
		Columns:   []clause.Column{{Name: "code"}},
		DoUpdates: clause.AssignmentColumns([]string{"name"}),
	}).Create(&categories).Error

	return err
}
