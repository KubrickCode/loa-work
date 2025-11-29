module github.com/KubrickCode/loa-work/src/go/apps/auction-item-stat-scraper

go 1.24.0

require (
	github.com/KubrickCode/loa-work/src/go/libs/env v0.0.0
	github.com/KubrickCode/loa-work/src/go/libs/loaApi v0.0.0
	github.com/KubrickCode/loa-work/src/go/libs/loadb v0.0.0
	github.com/KubrickCode/loa-work/src/go/libs/monitoring v0.0.0
	github.com/KubrickCode/loa-work/src/go/libs/ratelimit v0.0.0-20251127142251-a379535be213
	github.com/KubrickCode/loa-work/src/go/libs/schedule v0.0.0
	github.com/ericlagergren/decimal v0.0.0-20190420051523-6335edbaa640
	github.com/stretchr/testify v1.10.0
	go.uber.org/mock v0.5.0
)

require (
	github.com/KubrickCode/loa-work/src/go/libs/httpclient v0.0.0 // indirect
	github.com/aarondl/inflect v0.0.2 // indirect
	github.com/aarondl/null/v8 v8.1.3 // indirect
	github.com/aarondl/randomize v0.0.2 // indirect
	github.com/aarondl/sqlboiler/v4 v4.19.5 // indirect
	github.com/aarondl/strmangle v0.0.9 // indirect
	github.com/beorn7/perks v1.0.1 // indirect
	github.com/cespare/xxhash/v2 v2.3.0 // indirect
	github.com/davecgh/go-spew v1.1.1 // indirect
	github.com/friendsofgo/errors v0.9.2 // indirect
	github.com/gabriel-vasile/mimetype v1.4.6 // indirect
	github.com/go-co-op/gocron/v2 v2.14.0 // indirect
	github.com/go-playground/locales v0.14.1 // indirect
	github.com/go-playground/universal-translator v0.18.1 // indirect
	github.com/go-playground/validator/v10 v10.22.1 // indirect
	github.com/gofrs/uuid v4.2.0+incompatible // indirect
	github.com/google/uuid v1.6.0 // indirect
	github.com/hashicorp/go-cleanhttp v0.5.2 // indirect
	github.com/hashicorp/go-retryablehttp v0.7.7 // indirect
	github.com/jonboulle/clockwork v0.4.0 // indirect
	github.com/klauspost/compress v1.17.11 // indirect
	github.com/leodido/go-urn v1.4.0 // indirect
	github.com/lib/pq v1.10.9 // indirect
	github.com/munnerz/goautoneg v0.0.0-20191010083416-a7dc8b61c822 // indirect
	github.com/pmezard/go-difflib v1.0.0 // indirect
	github.com/prometheus/client_golang v1.21.0 // indirect
	github.com/prometheus/client_model v0.6.1 // indirect
	github.com/prometheus/common v0.62.0 // indirect
	github.com/prometheus/procfs v0.15.1 // indirect
	github.com/robfig/cron/v3 v3.0.1 // indirect
	github.com/spf13/cast v1.5.0 // indirect
	golang.org/x/crypto v0.45.0 // indirect
	golang.org/x/exp v0.0.0-20240613232115-7f521ea00fb8 // indirect
	golang.org/x/net v0.47.0 // indirect
	golang.org/x/sys v0.38.0 // indirect
	golang.org/x/text v0.31.0 // indirect
	golang.org/x/time v0.11.0 // indirect
	golang.org/x/xerrors v0.0.0-20220609144429-65e65417b02f // indirect
	google.golang.org/protobuf v1.36.1 // indirect
	gopkg.in/yaml.v3 v3.0.1 // indirect
)

replace (
	github.com/KubrickCode/loa-work/src/go/libs/env => ../../libs/env
	github.com/KubrickCode/loa-work/src/go/libs/httpclient => ../../libs/http-client
	github.com/KubrickCode/loa-work/src/go/libs/loaApi => ../../libs/loa-api
	github.com/KubrickCode/loa-work/src/go/libs/loadb => ../../libs/loa-db
	github.com/KubrickCode/loa-work/src/go/libs/monitoring => ../../libs/monitoring
	github.com/KubrickCode/loa-work/src/go/libs/schedule => ../../libs/schedule
)
