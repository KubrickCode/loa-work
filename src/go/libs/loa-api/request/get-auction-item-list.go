package request

import (
	"net/http"

	"github.com/KubrickCode/loa-work/src/go/libs/loaApi"
	"github.com/pkg/errors"
)

func (c *Client) GetAuctionItemList(params *loaApi.GetAuctionItemListParams) (*loaApi.GetAuctionItemListResponse, error) {
	req, err := c.api.NewRequest().
		Method(http.MethodPost).
		Path("/auctions/items").
		JSON(params).
		Build()
	if err != nil {
		return nil, errors.Wrap(err, "RequestBuilder")
	}

	var resp loaApi.GetAuctionItemListResponse
	if err = c.api.Do(req, &resp); err != nil {
		return nil, errors.Wrap(err, "GetAuctionItemList")
	}

	return &resp, nil
}
