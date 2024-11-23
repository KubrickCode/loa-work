package loadb

import (
	"github.com/KubrickCode/loa-life/src/go/libs/env"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
	"gorm.io/gorm/schema"
)

type DB interface {
	Gorm() *gorm.DB
	WithTransaction(action func(tx DB) error) error

	MarketItem() MarketItemDB
	MarketItemCategory() MarketItemCategoryDB
}

type database struct {
	gdb *gorm.DB

	marketItem         MarketItemDB
	marketItemCategory MarketItemCategoryDB
}

func New() (DB, error) {
	dsn := env.GetEnvFallback("DATABASE_URL", "postgres://postgres:postgres@localhost:5432/postgres")
	return Open(dsn)
}

func Open(dsn string) (DB, error) {
	pg := postgres.Open(dsn)

	cfg := &gorm.Config{
		NamingStrategy: schema.NamingStrategy{
			SingularTable: true,
		},
		Logger: logger.Default.LogMode(logger.Silent),
	}

	gdb, err := gorm.Open(pg, cfg)
	if err != nil {
		return nil, err
	}

	db := &database{gdb: gdb}
	db.initRepos()

	return db, nil
}

func (db *database) initRepos() {
	gdb := db.gdb
	db.marketItem = NewMarketItemDB(gdb)
	db.marketItemCategory = NewMarketItemCategoryDB(gdb)
}

func (db *database) WithTransaction(action func(tx DB) error) error {
	tx := db.gdb.Begin()
	defer func() {
		if r := recover(); r != nil {
			tx.Rollback()
			panic(r)
		}
	}()

	txDB := &database{gdb: tx}
	txDB.initRepos()

	if err := action(txDB); err != nil {
		tx.Rollback()
		return err
	}

	return tx.Commit().Error
}

func (db database) Gorm() *gorm.DB { return db.gdb }

func (db database) MarketItem() MarketItemDB { return db.marketItem }

func (db database) MarketItemCategory() MarketItemCategoryDB { return db.marketItemCategory }
