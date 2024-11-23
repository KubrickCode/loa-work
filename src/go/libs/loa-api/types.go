package loaApi

type GetCategoryListResponse struct {
	Categories []Category `json:"Categories"`
	ItemGrades []string   `json:"ItemGrades"`
	ItemTiers  []int      `json:"ItemTiers"`
	Classes    []string   `json:"Classes"`
}

type GetMarketItemListParams struct {
	CategoryCode int `json:"CategoryCode"`
	PageNo       int `json:"PageNo"`
}

type GetMarketItemListResponse struct {
	PageNo     int          `json:"PageNo"`
	PageSize   int          `json:"PageSize"`
	TotalCount int          `json:"TotalCount"`
	Items      []MarketItem `json:"Items"`
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

type MarketItem struct {
	ID               int     `json:"Id"`
	Name             string  `json:"Name"`
	Grade            string  `json:"Grade"`
	Icon             string  `json:"Icon"`
	BundleCount      int     `json:"BundleCount"`
	TradeRemainCount *int    `json:"TradeRemainCount"`
	YDayAvgPrice     float64 `json:"YDayAvgPrice"`
	RecentPrice      int     `json:"RecentPrice"`
	CurrentMinPrice  int     `json:"CurrentMinPrice"`
}
