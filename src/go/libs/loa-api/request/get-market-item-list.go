package request

import (
	"fmt"
	"net/http"

	"github.com/KubrickCode/loa-work/src/go/libs/loaApi"
)

func (c *Client) GetMarketItemList(params *loaApi.GetMarketItemListParams) (*loaApi.GetMarketItemListResponse, error) {
	req, err := c.api.NewRequest().
		Method(http.MethodPost).
		Path("/markets/items").
		JSON(params).
		Build()
	if err != nil {
		return nil, fmt.Errorf("loa-api: build request: %w", err)
	}

	var resp loaApi.GetMarketItemListResponse
	if err = c.api.Do(req, &resp); err != nil {
		return nil, fmt.Errorf("loa-api: get market item list: %w", err)
	}

	return &resp, nil
}
