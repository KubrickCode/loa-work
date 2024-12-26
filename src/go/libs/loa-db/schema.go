package loadb

import (
	"time"

	"github.com/shopspring/decimal"
)

type AuctionItem struct {
	ID        int       `gorm:"primaryKey"`
	CreatedAt time.Time `gorm:"column:created_at;default:CURRENT_TIMESTAMP"`
	UpdatedAt time.Time `gorm:"column:updated_at;autoUpdateTime"`

	Name                 string `gorm:"column:name;not null"`
	ImageUrl             string `gorm:"column:image_url;not null"`
	IsStatScraperEnabled bool   `gorm:"column:is_stat_scraper_enabled;not null"`

	// Relations
	AuctionItemCategoryID int                 `gorm:"column:auction_item_category_id;not null"`
	AuctionItemCategory   AuctionItemCategory `gorm:"foreignKey:auction_item_category_id"`
	AuctionItemStats      []AuctionItemStat   `gorm:"foreignKey:auction_item_id"`
}

type AuctionItemStat struct {
	ID        int       `gorm:"primaryKey"`
	CreatedAt time.Time `gorm:"column:created_at;default:CURRENT_TIMESTAMP"`

	BuyPrice      int       `gorm:"column:buy_price;not null"`
	BidPrice      int       `gorm:"column:bid_price;not null"`
	BidStartPrice int       `gorm:"column:bid_start_price;not null"`
	StartPrice    int       `gorm:"column:start_price;not null"`
	IsCompetitive bool      `gorm:"column:is_competitive;default:false;not null"`
	EndDate       time.Time `gorm:"column:end_date;not null"`

	// Relations
	AuctionItemID int         `gorm:"column:auction_item_id;not null"`
	AuctionItem   AuctionItem `gorm:"foreignKey:auction_item_id"`
}

type AuctionItemCategory struct {
	ID        int       `gorm:"primaryKey"`
	CreatedAt time.Time `gorm:"column:created_at;default:CURRENT_TIMESTAMP"`
	UpdatedAt time.Time `gorm:"column:updated_at;autoUpdateTime"`

	Code int    `gorm:"unique;not null"`
	Name string `gorm:"not null"`
}

type ContentRewardItem struct {
	ID        int       `gorm:"primaryKey"`
	CreatedAt time.Time `gorm:"column:created_at;default:CURRENT_TIMESTAMP"`
	UpdatedAt time.Time `gorm:"column:updated_at;autoUpdateTime"`

	Kind         string          `gorm:"column:kind;not null"`
	Name         string          `gorm:"column:name;unique;not null"`
	DefaultPrice decimal.Decimal `gorm:"column:default_price;type:decimal;default:0;not null"`
}

type ContentRewardItemPrice struct {
	ID        int       `gorm:"primaryKey"`
	CreatedAt time.Time `gorm:"column:created_at;default:CURRENT_TIMESTAMP"`

	Value decimal.Decimal `gorm:"column:value;type:decimal;default:0;not null"`

	// Relations
	ContentRewardItemID int               `gorm:"column:content_reward_item_id;not null"`
	ContentRewardItem   ContentRewardItem `gorm:"foreignKey:content_reward_item_id"`
}

type MarketItem struct {
	ID        int       `gorm:"primaryKey"`
	CreatedAt time.Time `gorm:"column:created_at;default:CURRENT_TIMESTAMP"`
	UpdatedAt time.Time `gorm:"column:updated_at;autoUpdateTime"`

	BundleCount int    `gorm:"column:bundle_count;not null"`
	Name        string `gorm:"column:name;not null"`
	Grade       string `gorm:"column:grade;not null"`
	ImageUrl    string `gorm:"column:image_url;not null"`
	RefID       int    `gorm:"column:ref_id;unique;not null"`

	// Relations
	MarketItemCategoryID int                `gorm:"column:market_item_category_id;not null"`
	MarketItemCategory   MarketItemCategory `gorm:"foreignKey:market_item_category_id"`
	MarketItemStats      []MarketItemStat   `gorm:"foreignKey:market_item_id"`
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
