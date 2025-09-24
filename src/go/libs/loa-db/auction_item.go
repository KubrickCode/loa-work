package loadb

import (
	"context"

	"github.com/KubrickCode/loa-work/src/go/libs/loadb/models"
	"github.com/aarondl/sqlboiler/v4/boil"
	"github.com/aarondl/sqlboiler/v4/queries/qm"
)

type AuctionItemRepository interface {
	FindByName(name string) (*models.AuctionItem, error)
	FindAll() ([]*models.AuctionItem, error)
	UpdateStat(item *models.AuctionItem) error
	UpdateAvgBuyPrice(item *models.AuctionItem, price Decimal) error
	FindStatScraperEnabledAll() ([]*models.AuctionItem, error)
}

type auctionItemRepository struct {
	db *database
}

func NewAuctionItemRepository(db *database) AuctionItemRepository {
	return &auctionItemRepository{db: db}
}

func (r *auctionItemRepository) FindByName(name string) (*models.AuctionItem, error) {
	return models.AuctionItems(qm.Where("name = ?", name)).One(context.Background(), r.db.db)
}

func (r *auctionItemRepository) FindAll() ([]*models.AuctionItem, error) {
	return models.AuctionItems().All(context.Background(), r.db.db)
}

func (r *auctionItemRepository) UpdateStat(item *models.AuctionItem) error {
	_, err := item.Update(context.Background(), r.db.db, boil.Infer())
	return err
}

func (r *auctionItemRepository) UpdateAvgBuyPrice(item *models.AuctionItem, price Decimal) error {
	item.AvgBuyPrice = price.ToSQLBoilerDecimal()
	_, err := item.Update(context.Background(), r.db.db, boil.Infer())
	return err
}

func (r *auctionItemRepository) FindStatScraperEnabledAll() ([]*models.AuctionItem, error) {
	return models.AuctionItems(qm.Where("is_stat_scraper_enabled = ?", true)).All(context.Background(), r.db.db)
}
