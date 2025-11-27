package request

import (
	"net/http"

	"github.com/KubrickCode/loa-work/src/go/libs/loaApi"
	"github.com/pkg/errors"
)

func (c *Client) GetCategoryList() (*loaApi.GetCategoryListResponse, error) {
	req, err := c.api.NewRequest().
		Method(http.MethodGet).
		Path("/markets/options").
		Build()
	if err != nil {
		return nil, errors.Wrap(err, "RequestBuilder")
	}

	var resp loaApi.GetCategoryListResponse
	if err = c.api.Do(req, &resp); err != nil {
		return nil, errors.Wrap(err, "GetCategoryList")
	}

	return &resp, nil
}
