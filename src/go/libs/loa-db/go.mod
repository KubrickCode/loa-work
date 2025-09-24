module github.com/KubrickCode/loa-work/src/go/libs/loadb

go 1.23.0

toolchain go1.23.12

require (
	github.com/KubrickCode/loa-work/src/go/libs/env v0.0.0-00010101000000-000000000000
	github.com/aarondl/null/v8 v8.1.3
	github.com/aarondl/sqlboiler/v4 v4.19.5
	github.com/aarondl/strmangle v0.0.9
	github.com/ericlagergren/decimal v0.0.0-20190420051523-6335edbaa640
	github.com/friendsofgo/errors v0.9.2
	github.com/lib/pq v1.10.9
	github.com/shopspring/decimal v1.4.0
)

replace github.com/KubrickCode/loa-work/src/go/libs/env => ../env

require (
	github.com/aarondl/inflect v0.0.2 // indirect
	github.com/aarondl/randomize v0.0.2 // indirect
	github.com/gofrs/uuid v4.2.0+incompatible // indirect
	github.com/spf13/cast v1.5.0 // indirect
	golang.org/x/xerrors v0.0.0-20220609144429-65e65417b02f // indirect
)
