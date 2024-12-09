package loadb

import (
	"gorm.io/gorm"
)

type ContentRewardItemDB interface {
	FindManyByKind(kind string) ([]ContentRewardItem, error)
	UpdateMany(items []ContentRewardItem) error
}

type contentRewardItemDB struct {
	gdb *gorm.DB
}

func NewContentRewardItemDB(gdb *gorm.DB) *contentRewardItemDB {
	return &contentRewardItemDB{
		gdb: gdb,
	}
}

func (db *contentRewardItemDB) FindManyByKind(kind string) ([]ContentRewardItem, error) {
	var items []ContentRewardItem
	err := db.gdb.Where("kind = ?", kind).Find(&items).Error

	return items, err
}

func (db *contentRewardItemDB) UpdateMany(items []ContentRewardItem) error {
	for _, item := range items {
		fieldsToUpdate := GetColumnNames(item, "id", "created_at", "kind", "name")

		err := db.gdb.Model(&ContentRewardItem{}).
			Where("id = ?", item.ID).
			Select(fieldsToUpdate).
			Updates(item).Error
		if err != nil {
			return err
		}
	}
	return nil
}
