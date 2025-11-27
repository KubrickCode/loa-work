package request

import (
	"fmt"
	"net/http"

	"github.com/KubrickCode/loa-work/src/go/libs/loaApi"
)

func (c *Client) GetCategoryList() (*loaApi.GetCategoryListResponse, error) {
	req, err := c.api.NewRequest().
		Method(http.MethodGet).
		Path("/markets/options").
		Build()
	if err != nil {
		return nil, fmt.Errorf("loa-api: build request: %w", err)
	}

	var resp loaApi.GetCategoryListResponse
	if err = c.api.Do(req, &resp); err != nil {
		return nil, fmt.Errorf("loa-api: get category list: %w", err)
	}

	return &resp, nil
}
