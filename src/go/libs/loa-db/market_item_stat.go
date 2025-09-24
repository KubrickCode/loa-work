package loadb

import (
	"context"

	"github.com/KubrickCode/loa-work/src/go/libs/loadb/models"
	"github.com/aarondl/sqlboiler/v4/boil"
	"github.com/aarondl/sqlboiler/v4/queries/qm"
)

type MarketItemStatRepository interface {
	CreateMany(stats []*models.MarketItemStat) error
	GetLatestStatsByItemID(itemID int, limit int) ([]*models.MarketItemStat, error)
}

type marketItemStatRepository struct {
	db *database
}

func NewMarketItemStatRepository(db *database) MarketItemStatRepository {
	return &marketItemStatRepository{db: db}
}

func (r *marketItemStatRepository) CreateMany(stats []*models.MarketItemStat) error {
	for _, stat := range stats {
		if err := stat.Insert(context.Background(), r.db.db, boil.Infer()); err != nil {
			return err
		}
	}
	return nil
}

func (r *marketItemStatRepository) GetLatestStatsByItemID(itemID int, limit int) ([]*models.MarketItemStat, error) {
	return models.MarketItemStats(
		qm.Where("market_item_id = ?", itemID),
		qm.OrderBy("created_at DESC"),
		qm.Limit(limit),
	).All(context.Background(), r.db.db)
}
