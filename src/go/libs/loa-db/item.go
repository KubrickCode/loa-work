package loadb

import (
	"context"

	"github.com/KubrickCode/loa-work/src/go/libs/loadb/models"
	"github.com/aarondl/sqlboiler/v4/boil"
	"github.com/aarondl/sqlboiler/v4/queries/qm"
)

type ItemRepository interface {
	FindManyByKind(kind models.ItemKind) ([]*models.Item, error)
	UpdateMany(items []*models.Item) error
	UpdateItemPrice(item *models.Item, price Decimal) error
}

type itemRepository struct {
	db *database
}

func NewItemRepository(db *database) ItemRepository {
	return &itemRepository{db: db}
}

func (r *itemRepository) FindManyByKind(kind models.ItemKind) ([]*models.Item, error) {
	return models.Items(qm.Where("kind = ?", kind)).All(context.Background(), r.db.db)
}

func (r *itemRepository) UpdateMany(items []*models.Item) error {
	for _, item := range items {
		if _, err := item.Update(context.Background(), r.db.db, boil.Infer()); err != nil {
			return err
		}
	}
	return nil
}

func (r *itemRepository) UpdateItemPrice(item *models.Item, price Decimal) error {
	item.Price = price.ToSQLBoilerDecimal()
	_, err := item.Update(context.Background(), r.db.db, boil.Infer())
	return err
}