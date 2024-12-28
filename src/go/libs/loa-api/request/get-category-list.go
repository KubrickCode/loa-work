package request

import (
	"net/http"

	"github.com/KubrickCode/loa-work/src/go/libs/loaApi"
	"github.com/pkg/errors"
)

func GetCategoryList() (*loaApi.GetCategoryListResponse, error) {
	client := loaApi.NewClient()

	req, err := client.NewRequest().
		Method(http.MethodGet).
		Path("/markets/options").
		Build()
	if err != nil {
		return nil, errors.Wrap(err, "RequestBuilder")
	}

	var resp loaApi.GetCategoryListResponse
	err = client.Do(req, &resp)
	if err != nil {
		return nil, errors.Wrap(err, "GetOrderList")
	}

	return &resp, nil
}
