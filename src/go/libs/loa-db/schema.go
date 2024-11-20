package loadb

import "time"

type MarketItemCategory struct {
	ID        int       `gorm:"primaryKey"`
	CreatedAt time.Time `gorm:"column:created_at;default:CURRENT_TIMESTAMP"`
	UpdatedAt time.Time `gorm:"column:updated_at;autoUpdateTime"`

	Code int    `gorm:"unique;not null"`
	Name string `gorm:"not null"`
}
