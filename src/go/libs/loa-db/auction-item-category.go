package loadb

import (
	"gorm.io/gorm"
)

type AuctionItemCategoryDB interface {
	FindByID(id int) (*AuctionItemCategory, error)
}

type auctionItemCategoryDB struct {
	gdb *gorm.DB
}

func NewAuctionItemCategoryDB(gdb *gorm.DB) *auctionItemCategoryDB {
	return &auctionItemCategoryDB{
		gdb: gdb,
	}
}

func (db *auctionItemCategoryDB) FindByID(id int) (*AuctionItemCategory, error) {
	var category AuctionItemCategory
	err := db.gdb.First(&category, id).Error

	return &category, err
}
