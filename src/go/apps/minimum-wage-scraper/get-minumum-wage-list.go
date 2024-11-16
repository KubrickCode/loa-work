package main

import (
	"fmt"

	"github.com/KubrickCode/loa-life/src/go/libs/env"
)

// 고용노동부_연도별_최저임금_20230804
const path = "/15068774/v1/uddi:ea28d355-6222-40db-8237-ceda86c5675d"

type GetMinimumWageData struct {
	Count int `json:"순번"`
	Wage  int `json:"시간급"`
	Year  int `json:"연도"`
}

type GetMinimumWageListResponse struct {
	CurrentCount int                  `json:"currentCount"`
	Data         []GetMinimumWageData `json:"data"`
	MatchCount   int                  `json:"matchCount"`
	Page         int                  `json:"page"`
	PerPage      int                  `json:"perPage"`
	TotalCount   int                  `json:"totalCount"`
}

func (c *Client) GetMinimumWageList() (*GetMinimumWageListResponse, error) {
	serviceKey := env.MustGetEnv("PUBLIC_DATA_PORTAL_SERVICE_KEY")

	req, err := c.NewRequest().
		Method("GET").
		Path(path).
		AddQueryParam("serviceKey", serviceKey).
		Build()
	if err != nil {
		return nil, fmt.Errorf("failed to build get minimum wage request: %w", err)
	}

	var resp GetMinimumWageListResponse
	if err := c.client.Do(req, &resp); err != nil {
		return nil, fmt.Errorf("failed to get minimum wage request: %w", err)
	}

	return &resp, nil
}
