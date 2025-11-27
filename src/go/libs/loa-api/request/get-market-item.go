package request

import (
	"fmt"
	"net/http"

	"github.com/KubrickCode/loa-work/src/go/libs/loaApi"
)

// 특정 거래소 아이템 정보를 조회하는 API.
// 가격 정보를 포함한 응답을 위해서 복수 items 를 조회하는 API를 활용하고, 어설션 이후 첫 번째 인덱스를 반환함.
func (c *Client) GetMarketItem(params *loaApi.GetMarketItemParams) (*loaApi.GetMarketItemResponse, error) {
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
		return nil, fmt.Errorf("loa-api: get market item: %w", err)
	}

	if len(resp.Items) == 0 {
		return nil, fmt.Errorf("loa-api: no items found for params: %+v", params)
	}

	if len(resp.Items) > 1 {
		return nil, fmt.Errorf("loa-api: multiple items found for params: %+v", params)
	}

	return &resp.Items[0], nil
}
