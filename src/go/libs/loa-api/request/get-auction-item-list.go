package request

import (
	"fmt"
	"net/http"

	"github.com/KubrickCode/loa-work/src/go/libs/loaApi"
)

func (c *Client) GetAuctionItemList(params *loaApi.GetAuctionItemListParams) (*loaApi.GetAuctionItemListResponse, error) {
	req, err := c.api.NewRequest().
		Method(http.MethodPost).
		Path("/auctions/items").
		JSON(params).
		Build()
	if err != nil {
		return nil, fmt.Errorf("loa-api: build request: %w", err)
	}

	var resp loaApi.GetAuctionItemListResponse
	if err = c.api.Do(req, &resp); err != nil {
		return nil, fmt.Errorf("loa-api: get auction item list: %w", err)
	}

	return &resp, nil
}
