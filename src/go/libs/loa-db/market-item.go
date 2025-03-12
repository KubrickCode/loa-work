package loadb

import (
	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

type MarketItemDB interface {
	FindAllWithLatestStats() ([]MarketItem, error)
	FindWithStatsByName(name string) (MarketItem, error)
	FindStatScraperEnabledAll() ([]MarketItem, error)
	UpdateStat(item MarketItem) error
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

// TODO: Test 작성
func (db *marketItemDB) FindAllWithLatestStats() ([]MarketItem, error) {
	var items []MarketItem

	subQuery := db.gdb.Model(&MarketItemStat{}).
		Select("market_item_id, MAX(created_at) as max_ct").
		Group("market_item_id")

	err := db.gdb.
		Model(&MarketItem{}).
		Preload("MarketItemStats", func(db *gorm.DB) *gorm.DB {
			return db.Joins(`
                JOIN (?) AS latest 
                ON market_item_stat.market_item_id = latest.market_item_id 
                AND market_item_stat.created_at = latest.max_ct
            `, subQuery)
		}).
		Find(&items).Error

	if err != nil {
		return nil, err
	}
	return items, nil
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

func (db *marketItemDB) UpdateStat(item MarketItem) error {
	fieldsToUpdate := GetColumnNames(item, "id", "created_at", "bundle_count", "name", "grade", "image_url", "ref_id")

	return db.gdb.Model(&item).
		Select(fieldsToUpdate).
		Updates(item).Error
}

func (db *marketItemDB) UpsertMany(items []MarketItem) error {
	err := db.gdb.Clauses(clause.OnConflict{
		Columns:   []clause.Column{{Name: "ref_id"}},
		DoUpdates: clause.AssignmentColumns([]string{"bundle_count", "name", "image_url", "grade"}),
	}).Create(&items).Error

	return err
}
