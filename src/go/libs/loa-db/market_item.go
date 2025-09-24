package loadb

import (
	"context"

	"github.com/KubrickCode/loa-work/src/go/libs/loadb/models"
	"github.com/aarondl/sqlboiler/v4/boil"
	"github.com/aarondl/sqlboiler/v4/queries/qm"
)

type MarketItemRepository interface {
	UpsertMany(items []*models.MarketItem) error
	FindByName(name string) (*models.MarketItem, error)
	FindAll() ([]*models.MarketItem, error)
	UpdateStat(item *models.MarketItem) error
	FindStatScraperEnabledAll() ([]*models.MarketItem, error)
}

type marketItemRepository struct {
	db *database
}

func NewMarketItemRepository(db *database) MarketItemRepository {
	return &marketItemRepository{db: db}
}

func (r *marketItemRepository) UpsertMany(items []*models.MarketItem) error {
	for _, item := range items {
		updateCols := boil.Whitelist("bundle_count", "grade", "market_item_category_id", "name", "image_url", "updated_at")
		insertCols := boil.Infer()

		if err := item.Upsert(context.Background(), r.db.db, true, []string{"ref_id"}, updateCols, insertCols); err != nil {
			return err
		}
	}
	return nil
}

func (r *marketItemRepository) FindByName(name string) (*models.MarketItem, error) {
	return models.MarketItems(qm.Where("name = ?", name)).One(context.Background(), r.db.db)
}

func (r *marketItemRepository) FindAll() ([]*models.MarketItem, error) {
	return models.MarketItems().All(context.Background(), r.db.db)
}

func (r *marketItemRepository) UpdateStat(item *models.MarketItem) error {
	_, err := item.Update(context.Background(), r.db.db, boil.Infer())
	return err
}

func (r *marketItemRepository) FindStatScraperEnabledAll() ([]*models.MarketItem, error) {
	return models.MarketItems(qm.Where("is_stat_scraper_enabled = ?", true)).All(context.Background(), r.db.db)
}
