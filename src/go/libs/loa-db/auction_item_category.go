package loadb

import (
	"context"

	"github.com/KubrickCode/loa-work/src/go/libs/loadb/models"
)

type AuctionItemCategoryRepository interface {
	FindByID(id int) (*models.AuctionItemCategory, error)
}

type auctionItemCategoryRepository struct {
	db *database
}

func NewAuctionItemCategoryRepository(db *database) AuctionItemCategoryRepository {
	return &auctionItemCategoryRepository{db: db}
}

func (r *auctionItemCategoryRepository) FindByID(id int) (*models.AuctionItemCategory, error) {
	return models.FindAuctionItemCategory(context.Background(), r.db.db, id)
}