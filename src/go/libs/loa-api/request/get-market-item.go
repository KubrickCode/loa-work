package request

import (
	"fmt"
	"net/http"

	"github.com/KubrickCode/loa-life/src/go/libs/loaApi"
	"github.com/pkg/errors"
)

func GetMarketItem(params *loaApi.GetMarketItemParams) (*loaApi.GetMarketItemResponse, error) {
	client := loaApi.NewClient()

	req, err := client.NewRequest().
		Method(http.MethodPost).
		Path("/markets/items").
		JSON(params).
		Build()
	if err != nil {
		return nil, errors.Wrap(err, "RequestBuilder")
	}

	var resp loaApi.GetMarketItemListResponse
	err = client.Do(req, &resp)
	if err != nil {
		return nil, errors.Wrap(err, "GetMarketItem")
	}

	if len(resp.Items) == 0 {
		return nil, fmt.Errorf("no items found for params: %+v", params)
	}

	if len(resp.Items) > 1 {
		return nil, fmt.Errorf("multiple items found for params: %+v", params)
	}

	return &resp.Items[0], nil
}
