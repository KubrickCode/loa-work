package loadb

import (
	"gorm.io/gorm"
)

type AuctionItemDB interface {
	FindAllWithRecentStats(take int) ([]AuctionItem, error)
	FindStatScraperEnabledAll() ([]AuctionItem, error)
	FindWithStatsByName(name string, take int) (AuctionItem, error)
	UpdateStat(item AuctionItem) error
}

type auctionItemDB struct {
	gdb *gorm.DB
}

func NewAuctionItemDB(gdb *gorm.DB) *auctionItemDB {
	return &auctionItemDB{
		gdb: gdb,
	}
}

// TODO: Test 작성
func (db *auctionItemDB) FindAllWithRecentStats(take int) ([]AuctionItem, error) {
	var items []AuctionItem

	err := db.gdb.Find(&items).Error
	if err != nil {
		return nil, err
	}

	for i := range items {
		err = db.gdb.Where("auction_item_id = ?", items[i].ID).
			Order("created_at DESC").
			Limit(take).
			Find(&items[i].AuctionItemStats).Error
		if err != nil {
			return nil, err
		}
	}

	return items, err
}

func (db *auctionItemDB) FindStatScraperEnabledAll() ([]AuctionItem, error) {
	var items []AuctionItem
	err := db.gdb.Where("is_stat_scraper_enabled = ?", true).Find(&items).Error

	return items, err
}

func (db *auctionItemDB) FindWithStatsByName(name string, take int) (AuctionItem, error) {
	var item AuctionItem
	err := db.gdb.
		Preload("AuctionItemStats", func(db *gorm.DB) *gorm.DB {
			return db.Order("created_at desc").Limit(take)
		}).
		Where("name = ?", name).
		First(&item).Error

	return item, err
}

func (db *auctionItemDB) UpdateStat(item AuctionItem) error {
	fieldsToUpdate := GetColumnNames(item, "id", "created_at", "name", "image_url", "is_stat_scraper_enabled")

	return db.gdb.Model(&item).
		Select(fieldsToUpdate).
		Updates(item).Error
}
