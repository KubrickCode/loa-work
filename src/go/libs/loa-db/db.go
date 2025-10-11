package loadb

import (
	"database/sql"

	"github.com/KubrickCode/loa-work/src/go/libs/env"
	"github.com/aarondl/sqlboiler/v4/boil"
	_ "github.com/lib/pq"
)

type DB interface {
	DB() *sql.DB
	WithTransaction(action func(tx DB) error) error

	Item() ItemRepository
	AuctionItem() AuctionItemRepository
	AuctionItemCategory() AuctionItemCategoryRepository
	AuctionItemStat() AuctionItemStatRepository
	MarketItem() MarketItemRepository
	MarketItemCategory() MarketItemCategoryRepository
	MarketItemStat() MarketItemStatRepository
}

type database struct {
	db         boil.ContextExecutor
	originalDB *sql.DB // Keep reference to original DB for Begin() calls

	item                ItemRepository
	auctionItem         AuctionItemRepository
	auctionItemCategory AuctionItemCategoryRepository
	auctionItemStat     AuctionItemStatRepository
	marketItem          MarketItemRepository
	marketItemCategory  MarketItemCategoryRepository
	marketItemStat      MarketItemStatRepository
}

func New() (DB, error) {
	dsn := env.GetEnvFallback("DATABASE_URL", "postgres://postgres:postgres@localhost:5432/postgres?sslmode=disable")
	return Open(dsn)
}

func Open(dsn string) (DB, error) {
	db, err := sql.Open("postgres", dsn)
	if err != nil {
		return nil, err
	}

	if err := db.Ping(); err != nil {
		return nil, err
	}

	boil.SetDB(db)

	database := &database{db: db, originalDB: db}
	database.initRepositories()

	return database, nil
}

func (d *database) DB() *sql.DB {
	if sqlDB, ok := d.db.(*sql.DB); ok {
		return sqlDB
	}
	return d.originalDB
}

func (d *database) WithTransaction(action func(tx DB) error) error {
	tx, err := d.originalDB.Begin()
	if err != nil {
		return err
	}

	defer func() {
		if r := recover(); r != nil {
			tx.Rollback()
			panic(r)
		}
	}()

	txDB := &database{db: tx, originalDB: d.originalDB}
	txDB.initRepositories()

	if err := action(txDB); err != nil {
		tx.Rollback()
		return err
	}

	return tx.Commit()
}

func (d *database) initRepositories() {
	d.item = NewItemRepository(d)
	d.auctionItem = NewAuctionItemRepository(d)
	d.auctionItemCategory = NewAuctionItemCategoryRepository(d)
	d.auctionItemStat = NewAuctionItemStatRepository(d)
	d.marketItem = NewMarketItemRepository(d)
	d.marketItemCategory = NewMarketItemCategoryRepository(d)
	d.marketItemStat = NewMarketItemStatRepository(d)
}

func (d *database) Item() ItemRepository {
	return d.item
}

func (d *database) AuctionItem() AuctionItemRepository {
	return d.auctionItem
}

func (d *database) AuctionItemCategory() AuctionItemCategoryRepository {
	return d.auctionItemCategory
}

func (d *database) AuctionItemStat() AuctionItemStatRepository {
	return d.auctionItemStat
}

func (d *database) MarketItem() MarketItemRepository {
	return d.marketItem
}

func (d *database) MarketItemCategory() MarketItemCategoryRepository {
	return d.marketItemCategory
}

func (d *database) MarketItemStat() MarketItemStatRepository {
	return d.marketItemStat
}
