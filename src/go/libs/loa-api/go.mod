module github.com/KubrickCode/loa-work/src/go/libs/loaApi

replace github.com/KubrickCode/loa-work/src/go/libs/env => ../env

replace github.com/KubrickCode/loa-work/src/go/libs/httpclient => ../http-client

go 1.23

require (
	github.com/KubrickCode/loa-work/src/go/libs/env v0.0.0-00010101000000-000000000000
	github.com/KubrickCode/loa-work/src/go/libs/httpclient v0.0.0-00010101000000-000000000000
)

require (
	github.com/gabriel-vasile/mimetype v1.4.6 // indirect
	github.com/go-playground/locales v0.14.1 // indirect
	github.com/go-playground/universal-translator v0.18.1 // indirect
	github.com/go-playground/validator/v10 v10.22.1 // indirect
	github.com/hashicorp/go-cleanhttp v0.5.2 // indirect
	github.com/hashicorp/go-retryablehttp v0.7.7 // indirect
	github.com/leodido/go-urn v1.4.0 // indirect
	golang.org/x/crypto v0.29.0 // indirect
	golang.org/x/net v0.31.0 // indirect
	golang.org/x/sys v0.27.0 // indirect
	golang.org/x/text v0.20.0 // indirect
)
