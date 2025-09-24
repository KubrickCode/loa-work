package loadb

import (
	"context"

	"github.com/KubrickCode/loa-work/src/go/libs/loadb/models"
	"github.com/aarondl/sqlboiler/v4/boil"
	"github.com/aarondl/sqlboiler/v4/queries/qm"
)

type AuctionItemStatRepository interface {
	CreateMany(stats []*models.AuctionItemStat) error
	GetLatestStatsByItemID(itemID int, limit int) ([]*models.AuctionItemStat, error)
	GetLatestStatsByItemIDs(itemIDs []int, limit int) (map[int][]*models.AuctionItemStat, error)
}

type auctionItemStatRepository struct {
	db *database
}

func NewAuctionItemStatRepository(db *database) AuctionItemStatRepository {
	return &auctionItemStatRepository{db: db}
}

func (r *auctionItemStatRepository) CreateMany(stats []*models.AuctionItemStat) error {
	for _, stat := range stats {
		if err := stat.Insert(context.Background(), r.db.db, boil.Infer()); err != nil {
			return err
		}
	}
	return nil
}

func (r *auctionItemStatRepository) GetLatestStatsByItemID(itemID int, limit int) ([]*models.AuctionItemStat, error) {
	return models.AuctionItemStats(
		qm.Where("auction_item_id = ?", itemID),
		qm.OrderBy("created_at DESC"),
		qm.Limit(limit),
	).All(context.Background(), r.db.db)
}

func (r *auctionItemStatRepository) GetLatestStatsByItemIDs(itemIDs []int, limit int) (map[int][]*models.AuctionItemStat, error) {
	if len(itemIDs) == 0 {
		return make(map[int][]*models.AuctionItemStat), nil
	}

	itemIDsInterface := make([]interface{}, len(itemIDs))
	for i, id := range itemIDs {
		itemIDsInterface[i] = id
	}

	stats, err := models.AuctionItemStats(
		qm.Where("auction_item_id IN ?", itemIDsInterface...),
		qm.Where(`id IN (
			SELECT id FROM (
				SELECT id, ROW_NUMBER() OVER (PARTITION BY auction_item_id ORDER BY created_at DESC) as rn
				FROM auction_item_stats
				WHERE auction_item_id IN ?
			) t WHERE t.rn <= ?
		)`, itemIDsInterface, limit),
		qm.OrderBy("auction_item_id, created_at DESC"),
	).All(context.Background(), r.db.db)

	if err != nil {
		return nil, err
	}

	result := make(map[int][]*models.AuctionItemStat)
	for _, stat := range stats {
		result[stat.AuctionItemID] = append(result[stat.AuctionItemID], stat)
	}

	return result, nil
}
