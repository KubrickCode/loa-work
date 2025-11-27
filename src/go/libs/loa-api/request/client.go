package request

import (
	"github.com/KubrickCode/loa-work/src/go/libs/loaApi"
)

type APIClient interface {
	GetAuctionItemList(params *loaApi.GetAuctionItemListParams) (*loaApi.GetAuctionItemListResponse, error)
	GetCategoryList() (*loaApi.GetCategoryListResponse, error)
	GetMarketItem(params *loaApi.GetMarketItemParams) (*loaApi.GetMarketItemResponse, error)
	GetMarketItemList(params *loaApi.GetMarketItemListParams) (*loaApi.GetMarketItemListResponse, error)
}

type Client struct {
	api *loaApi.Client
}

func NewClient() *Client {
	return &Client{api: loaApi.NewClient()}
}
