package loadb

import (
	"gorm.io/gorm"
)

type ItemDB interface {
	FindManyByKind(kind string) ([]Item, error)
	UpdateMany(items []Item) error
}

type itemDB struct {
	gdb *gorm.DB
}

func NewItemDB(gdb *gorm.DB) *itemDB {
	return &itemDB{
		gdb: gdb,
	}
}

func (db *itemDB) FindManyByKind(kind string) ([]Item, error) {
	var items []Item
	err := db.gdb.Where("kind = ?", kind).Find(&items).Error

	return items, err
}

func (db *itemDB) UpdateMany(items []Item) error {
	for _, item := range items {
		fieldsToUpdate := GetColumnNames(item, "id", "created_at", "kind", "name")

		err := db.gdb.Model(&Item{}).
			Where("id = ?", item.ID).
			Select(fieldsToUpdate).
			Updates(item).Error
		if err != nil {
			return err
		}
	}
	return nil
}
