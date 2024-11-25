package loaApi

type GetAuctionItemListParams struct {
	CategoryCode  int    `json:"CategoryCode"`
	ItemName      string `json:"ItemName"`
	PageNo        int    `json:"PageNo"`
	Sort          string `json:"Sort"`
	SortCondition string `json:"SortCondition"`
}

type GetAuctionItemListResponse struct {
	PageNo     int           `json:"PageNo"`
	PageSize   int           `json:"PageSize"`
	TotalCount int           `json:"TotalCount"`
	Items      []AuctionItem `json:"Items"`
}

type AuctionItem struct {
	Name         string              `json:"Name"`
	Grade        string              `json:"Grade"`
	Tier         int                 `json:"Tier"`
	Level        int                 `json:"Level"`
	Icon         string              `json:"Icon"`
	GradeQuality *int                `json:"GradeQuality"`
	AuctionInfo  AuctionInfo         `json:"AuctionInfo"`
	Options      []AuctionItemOption `json:"Options"`
}

type AuctionInfo struct {
	StartPrice      int    `json:"StartPrice"`
	BuyPrice        int    `json:"BuyPrice"`
	BidPrice        int    `json:"BidPrice"`
	EndDate         string `json:"EndDate"`
	BidCount        int    `json:"BidCount"`
	BidStartPrice   int    `json:"BidStartPrice"`
	IsCompetitive   bool   `json:"IsCompetitive"`
	TradeAllowCount int    `json:"TradeAllowCount"`
	UpgradeLevel    *int   `json:"UpgradeLevel"`
}

type AuctionItemOption struct {
	Type              string  `json:"Type"`
	OptionName        string  `json:"OptionName"`
	OptionNameTripod  string  `json:"OptionNameTripod"`
	Value             float64 `json:"Value"`
	IsPenalty         bool    `json:"IsPenalty"`
	ClassName         string  `json:"ClassName"`
	IsValuePercentage bool    `json:"IsValuePercentage"`
}

type GetCategoryListResponse struct {
	Categories []Category `json:"Categories"`
	ItemGrades []string   `json:"ItemGrades"`
	ItemTiers  []int      `json:"ItemTiers"`
	Classes    []string   `json:"Classes"`
}

type GetMarketItemParams struct {
	CategoryCode int    `json:"CategoryCode"`
	ItemName     string `json:"ItemName"`
}

type GetMarketItemResponse = MarketItem

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
