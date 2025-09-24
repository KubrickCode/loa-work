package loadb

import (
	"context"

	"github.com/KubrickCode/loa-work/src/go/libs/loadb/models"
	"github.com/aarondl/sqlboiler/v4/boil"
	"github.com/aarondl/sqlboiler/v4/queries/qm"
)

type MarketItemCategoryRepository interface {
	FindItemScraperEnabledAll() ([]*models.MarketItemCategory, error)
	FindByID(id int) (*models.MarketItemCategory, error)
	UpsertMany(categories []*models.MarketItemCategory) error
}

type marketItemCategoryRepository struct {
	db *database
}

func NewMarketItemCategoryRepository(db *database) MarketItemCategoryRepository {
	return &marketItemCategoryRepository{db: db}
}

func (r *marketItemCategoryRepository) FindItemScraperEnabledAll() ([]*models.MarketItemCategory, error) {
	return models.MarketItemCategories(qm.Where("is_item_scraper_enabled = ?", true)).All(context.Background(), r.db.db)
}

func (r *marketItemCategoryRepository) FindByID(id int) (*models.MarketItemCategory, error) {
	return models.FindMarketItemCategory(context.Background(), r.db.db, id)
}

func (r *marketItemCategoryRepository) UpsertMany(categories []*models.MarketItemCategory) error {
	for _, category := range categories {
		updateCols := boil.Whitelist("name", "updated_at")
		insertCols := boil.Infer()

		if err := category.Upsert(context.Background(), r.db.db, true, []string{"code"}, updateCols, insertCols); err != nil {
			return err
		}
	}
	return nil
}
