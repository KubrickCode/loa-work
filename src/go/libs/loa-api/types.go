package loaApi

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
