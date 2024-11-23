package loadb

import "time"

type MarketItem struct {
	ID        int       `gorm:"primaryKey"`
	CreatedAt time.Time `gorm:"column:created_at;default:CURRENT_TIMESTAMP"`
	UpdatedAt time.Time `gorm:"column:updated_at;autoUpdateTime"`

	BundleCount int    `gorm:"column:bundle_count;not null"`
	Name        string `gorm:"column:name;not null"`
	ImageSrc    string `gorm:"column:image_src;not null"`
	RefID       int    `gorm:"column:ref_id;unique;not null"`

	// Relations
	MarketItemCategoryID int                `gorm:"column:market_item_category_id;not null"`
	MarketItemCategory   MarketItemCategory `gorm:"foreignKey:market_item_category_id"`
}

type MarketItemCategory struct {
	ID        int       `gorm:"primaryKey"`
	CreatedAt time.Time `gorm:"column:created_at;default:CURRENT_TIMESTAMP"`
	UpdatedAt time.Time `gorm:"column:updated_at;autoUpdateTime"`

	Code int    `gorm:"unique;not null"`
	Name string `gorm:"not null"`
}
