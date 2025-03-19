package loadb

import (
	"gorm.io/gorm"
)

type AuctionItemDB interface {
	FindAllWithRecentStats(take int) ([]AuctionItem, error)
	FindStatScraperEnabledAll() ([]AuctionItem, error)
	FindByName(name string) (AuctionItem, error)
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

func (db *auctionItemDB) FindByName(name string) (AuctionItem, error) {
	var item AuctionItem
	err := db.gdb.
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
