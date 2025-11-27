package request

import (
	"net/http"

	"github.com/KubrickCode/loa-work/src/go/libs/loaApi"
	"github.com/pkg/errors"
)

func (c *Client) GetMarketItemList(params *loaApi.GetMarketItemListParams) (*loaApi.GetMarketItemListResponse, error) {
	req, err := c.api.NewRequest().
		Method(http.MethodPost).
		Path("/markets/items").
		JSON(params).
		Build()
	if err != nil {
		return nil, errors.Wrap(err, "RequestBuilder")
	}

	var resp loaApi.GetMarketItemListResponse
	if err = c.api.Do(req, &resp); err != nil {
		return nil, errors.Wrap(err, "GetMarketItemList")
	}

	return &resp, nil
}
