package loadb

import (
	"time"

	"github.com/shopspring/decimal"
)

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

type MarketItemStat struct {
	ID        int       `gorm:"primaryKey"`
	CreatedAt time.Time `gorm:"column:created_at;default:CURRENT_TIMESTAMP"`

	CurrentMinPrice int             `gorm:"column:current_min_price;not null"`
	RecentPrice     int             `gorm:"column:recent_price;not null"`
	YDayAvgPrice    decimal.Decimal `gorm:"column:y_day_avg_price;type:decimal;not null"`

	// Relations
	MarketItemID int        `gorm:"column:market_item_id;not null"`
	MarketItem   MarketItem `gorm:"foreignKey:market_item_id"`
}

type MarketItemCategory struct {
	ID        int       `gorm:"primaryKey"`
	CreatedAt time.Time `gorm:"column:created_at;default:CURRENT_TIMESTAMP"`
	UpdatedAt time.Time `gorm:"column:updated_at;autoUpdateTime"`

	Code int    `gorm:"unique;not null"`
	Name string `gorm:"not null"`
}
