package request

import (
	"net/http"

	"github.com/KubrickCode/loa-work/src/go/libs/loaApi"
	"github.com/pkg/errors"
)

func GetAuctionItemList(params *loaApi.GetAuctionItemListParams) (*loaApi.GetAuctionItemListResponse, error) {
	client := loaApi.NewClient()

	req, err := client.NewRequest().
		Method(http.MethodPost).
		Path("/auctions/items").
		JSON(params).
		Build()
	if err != nil {
		return nil, errors.Wrap(err, "RequestBuilder")
	}

	var resp loaApi.GetAuctionItemListResponse
	err = client.Do(req, &resp)
	if err != nil {
		return nil, errors.Wrap(err, "GetAuctionItemList")
	}

	return &resp, nil
}
