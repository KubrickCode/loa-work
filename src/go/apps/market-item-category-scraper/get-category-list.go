package main

import (
	"net/http"

	"github.com/KubrickCode/loa-life/src/go/libs/loaApi"
	"github.com/pkg/errors"
)

type GetCategoryListResponse struct {
	Categories []Category `json:"Categories"`
	ItemGrades []string   `json:"ItemGrades"`
	ItemTiers  []int      `json:"ItemTiers"`
	Classes    []string   `json:"Classes"`
}

type Category struct {
	Code     int           `json:"Code"`
	CodeName string        `json:"CodeName"`
	Subs     []SubCategory `json:"Subs"`
}

type SubCategory struct {
	Code     int    `json:"Code"`
	CodeName string `json:"CodeName"`
}

func GetCategoryList() (*GetCategoryListResponse, error) {
	client := loaApi.NewClient()

	req, err := client.NewRequest().
		Method(http.MethodGet).
		Path("/markets/options").
		Build()
	if err != nil {
		return nil, errors.Wrap(err, "RequestBuilder")
	}

	var resp GetCategoryListResponse
	err = client.Do(req, &resp)
	if err != nil {
		return nil, errors.Wrap(err, "GetOrderList")
	}

	return &resp, nil
}
