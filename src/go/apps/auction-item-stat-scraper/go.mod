module github.com/KubrickCode/loa-work/src/go/apps/auction-item-stat-scraper

go 1.23

require (
	github.com/KubrickCode/loa-work/src/go/libs/env v0.0.0
	github.com/KubrickCode/loa-work/src/go/libs/loaApi v0.0.0
	github.com/KubrickCode/loa-work/src/go/libs/loadb v0.0.0
	github.com/KubrickCode/loa-work/src/go/libs/monitoring v0.0.0
	github.com/KubrickCode/loa-work/src/go/libs/schedule v0.0.0
	github.com/shopspring/decimal v1.4.0
	github.com/stretchr/testify v1.10.0
	go.uber.org/mock v0.5.0
)

require (
	github.com/KubrickCode/loa-work/src/go/libs/httpclient v0.0.0 // indirect
	github.com/beorn7/perks v1.0.1 // indirect
	github.com/cespare/xxhash/v2 v2.3.0 // indirect
	github.com/davecgh/go-spew v1.1.1 // indirect
	github.com/gabriel-vasile/mimetype v1.4.6 // indirect
	github.com/go-playground/locales v0.14.1 // indirect
	github.com/go-playground/universal-translator v0.18.1 // indirect
	github.com/go-playground/validator/v10 v10.22.1 // indirect
	github.com/jackc/pgpassfile v1.0.0 // indirect
	github.com/jackc/pgservicefile v0.0.0-20240606120523-5a60cdf6a761 // indirect
	github.com/jackc/pgx/v5 v5.7.1 // indirect
	github.com/jackc/puddle/v2 v2.2.2 // indirect
	github.com/jinzhu/inflection v1.0.0 // indirect
	github.com/jinzhu/now v1.1.5 // indirect
	github.com/k0kubun/pp v3.0.1+incompatible // indirect
	github.com/klauspost/compress v1.17.11 // indirect
	github.com/kr/text v0.2.0 // indirect
	github.com/leodido/go-urn v1.4.0 // indirect
	github.com/mattn/go-colorable v0.1.13 // indirect
	github.com/mattn/go-isatty v0.0.20 // indirect
	github.com/munnerz/goautoneg v0.0.0-20191010083416-a7dc8b61c822 // indirect
	github.com/pkg/errors v0.9.1 // indirect
	github.com/pmezard/go-difflib v1.0.0 // indirect
	github.com/prometheus/client_golang v1.21.0 // indirect
	github.com/prometheus/client_model v0.6.1 // indirect
	github.com/prometheus/common v0.62.0 // indirect
	github.com/prometheus/procfs v0.15.1 // indirect
	golang.org/x/crypto v0.31.0 // indirect
	golang.org/x/net v0.33.0 // indirect
	golang.org/x/sync v0.10.0 // indirect
	golang.org/x/sys v0.28.0 // indirect
	golang.org/x/text v0.21.0 // indirect
	google.golang.org/protobuf v1.36.1 // indirect
	gopkg.in/yaml.v3 v3.0.1 // indirect
	gorm.io/driver/postgres v1.5.9 // indirect
	gorm.io/gorm v1.25.12 // indirect
)

replace (
	github.com/KubrickCode/loa-work/src/go/libs/env => ../../libs/env
	github.com/KubrickCode/loa-work/src/go/libs/httpclient => ../../libs/http-client
	github.com/KubrickCode/loa-work/src/go/libs/loaApi => ../../libs/loa-api
	github.com/KubrickCode/loa-work/src/go/libs/loadb => ../../libs/loa-db
	github.com/KubrickCode/loa-work/src/go/libs/monitoring => ../../libs/monitoring
	github.com/KubrickCode/loa-work/src/go/libs/schedule => ../../libs/schedule
)
