module github.com/KubrickCode/loa-work/src/go/apps/market-item-scraper

go 1.23.0

toolchain go1.23.12

require (
	github.com/KubrickCode/loa-work/src/go/libs/loaApi v0.0.0
	github.com/KubrickCode/loa-work/src/go/libs/loadb v0.0.0
	github.com/KubrickCode/loa-work/src/go/libs/ratelimit v0.0.0-20251127142251-a379535be213
)

require (
	github.com/KubrickCode/loa-work/src/go/libs/env v0.0.0 // indirect
	github.com/KubrickCode/loa-work/src/go/libs/httpclient v0.0.0 // indirect
	github.com/aarondl/inflect v0.0.2 // indirect
	github.com/aarondl/null/v8 v8.1.3 // indirect
	github.com/aarondl/randomize v0.0.2 // indirect
	github.com/aarondl/sqlboiler/v4 v4.19.5 // indirect
	github.com/aarondl/strmangle v0.0.9 // indirect
	github.com/ericlagergren/decimal v0.0.0-20190420051523-6335edbaa640 // indirect
	github.com/friendsofgo/errors v0.9.2 // indirect
	github.com/gabriel-vasile/mimetype v1.4.6 // indirect
	github.com/go-playground/locales v0.14.1 // indirect
	github.com/go-playground/universal-translator v0.18.1 // indirect
	github.com/go-playground/validator/v10 v10.22.1 // indirect
	github.com/gofrs/uuid v4.2.0+incompatible // indirect
	github.com/hashicorp/go-cleanhttp v0.5.2 // indirect
	github.com/hashicorp/go-retryablehttp v0.7.7 // indirect
	github.com/leodido/go-urn v1.4.0 // indirect
	github.com/lib/pq v1.10.9 // indirect
	github.com/pkg/errors v0.9.1 // indirect
	github.com/spf13/cast v1.5.0 // indirect
	go.uber.org/mock v0.5.0 // indirect
	golang.org/x/crypto v0.38.0 // indirect
	golang.org/x/net v0.31.0 // indirect
	golang.org/x/sys v0.33.0 // indirect
	golang.org/x/text v0.25.0 // indirect
	golang.org/x/time v0.9.0 // indirect
	golang.org/x/xerrors v0.0.0-20220609144429-65e65417b02f // indirect
)

replace (
	github.com/KubrickCode/loa-work/src/go/libs/env => ../../libs/env
	github.com/KubrickCode/loa-work/src/go/libs/httpclient => ../../libs/http-client
	github.com/KubrickCode/loa-work/src/go/libs/loaApi => ../../libs/loa-api
	github.com/KubrickCode/loa-work/src/go/libs/loadb => ../../libs/loa-db
)
