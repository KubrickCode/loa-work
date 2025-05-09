module github.com/KubrickCode/loa-work/src/go/libs/loadb

go 1.23

require (
	github.com/KubrickCode/loa-work/src/go/libs/env v0.0.0-00010101000000-000000000000
	github.com/shopspring/decimal v1.4.0
	go.uber.org/mock v0.5.0
	gorm.io/driver/postgres v1.5.9
	gorm.io/gorm v1.25.12
)

replace github.com/KubrickCode/loa-work/src/go/libs/env => ../env

require (
	github.com/jackc/pgpassfile v1.0.0 // indirect
	github.com/jackc/pgservicefile v0.0.0-20240606120523-5a60cdf6a761 // indirect
	github.com/jackc/pgx/v5 v5.7.1 // indirect
	github.com/jackc/puddle/v2 v2.2.2 // indirect
	github.com/jinzhu/inflection v1.0.0 // indirect
	github.com/jinzhu/now v1.1.5 // indirect
	golang.org/x/crypto v0.29.0 // indirect
	golang.org/x/sync v0.9.0 // indirect
	golang.org/x/text v0.20.0 // indirect
)
