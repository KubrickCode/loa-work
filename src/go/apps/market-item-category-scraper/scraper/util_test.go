package scraper_test

import (
	"reflect"
	"testing"

	"github.com/KubrickCode/loa-life/src/go/apps/market-item-category-scraper/scraper"
	"github.com/KubrickCode/loa-life/src/go/libs/loaApi"
	"github.com/KubrickCode/loa-life/src/go/libs/loadb"
)

func TestFlattenCategories_FullInput(t *testing.T) {
	// 2024-11-23 기준 실제 API 응답
	input := []loaApi.Category{
		{
			Code:     10100,
			CodeName: "장비 상자",
			Subs:     []loaApi.SubCategory{},
		},
		{
			Code:     20000,
			CodeName: "아바타",
			Subs: []loaApi.SubCategory{
				{Code: 20005, CodeName: "무기"},
				{Code: 20010, CodeName: "머리"},
				{Code: 20020, CodeName: "얼굴1"},
				{Code: 20030, CodeName: "얼굴2"},
				{Code: 20050, CodeName: "상의"},
				{Code: 20060, CodeName: "하의"},
				{Code: 20070, CodeName: "상하의 세트"},
				{Code: 21400, CodeName: "악기"},
				{Code: 21500, CodeName: "아바타 상자"},
				{Code: 21600, CodeName: "이동 효과"},
			},
		},
		{
			Code:     40000,
			CodeName: "각인서",
			Subs:     []loaApi.SubCategory{},
		},
		{
			Code:     50000,
			CodeName: "강화 재료",
			Subs: []loaApi.SubCategory{
				{Code: 50010, CodeName: "재련 재료"},
				{Code: 50020, CodeName: "재련 추가 재료"},
				{Code: 51000, CodeName: "기타 재료"},
				{Code: 51100, CodeName: "무기 진화 재료"},
			},
		},
		{
			Code:     60000,
			CodeName: "전투 용품",
			Subs: []loaApi.SubCategory{
				{Code: 60200, CodeName: "배틀 아이템 -회복형"},
				{Code: 60300, CodeName: "배틀 아이템 -공격형"},
				{Code: 60400, CodeName: "배틀 아이템 -기능성"},
				{Code: 60500, CodeName: "배틀 아이템 -버프형"},
			},
		},
		{
			Code:     70000,
			CodeName: "요리",
			Subs:     []loaApi.SubCategory{},
		},
		{
			Code:     90000,
			CodeName: "생활",
			Subs: []loaApi.SubCategory{
				{Code: 90200, CodeName: "식물채집 전리품"},
				{Code: 90300, CodeName: "벌목 전리품"},
				{Code: 90400, CodeName: "채광 전리품"},
				{Code: 90500, CodeName: "수렵 전리품"},
				{Code: 90600, CodeName: "낚시 전리품"},
				{Code: 90700, CodeName: "고고학 전리품"},
				{Code: 90800, CodeName: "기타"},
			},
		},
		{
			Code:     100000,
			CodeName: "모험의 서",
			Subs:     []loaApi.SubCategory{},
		},
		{
			Code:     110000,
			CodeName: "항해",
			Subs: []loaApi.SubCategory{
				{Code: 110100, CodeName: "선박 재료"},
				{Code: 110110, CodeName: "선박 스킨"},
				{Code: 111900, CodeName: "선박 재료 상자"},
			},
		},
		{
			Code:     140000,
			CodeName: "펫",
			Subs: []loaApi.SubCategory{
				{Code: 140100, CodeName: "펫"},
				{Code: 140200, CodeName: "펫 상자"},
			},
		},
		{
			Code:     160000,
			CodeName: "탈것",
			Subs: []loaApi.SubCategory{
				{Code: 160100, CodeName: "탈것"},
				{Code: 160200, CodeName: "탈것 상자"},
			},
		},
		{
			Code:     170000,
			CodeName: "기타",
			Subs:     []loaApi.SubCategory{},
		},
		{
			Code:     220000,
			CodeName: "보석 상자",
			Subs:     []loaApi.SubCategory{},
		},
	}

	expectedOutput := []loadb.MarketItemCategory{
		{Code: 10100, Name: "장비 상자"},
		{Code: 20000, Name: "아바타"},
		{Code: 20005, Name: "무기"},
		{Code: 20010, Name: "머리"},
		{Code: 20020, Name: "얼굴1"},
		{Code: 20030, Name: "얼굴2"},
		{Code: 20050, Name: "상의"},
		{Code: 20060, Name: "하의"},
		{Code: 20070, Name: "상하의 세트"},
		{Code: 21400, Name: "악기"},
		{Code: 21500, Name: "아바타 상자"},
		{Code: 21600, Name: "이동 효과"},
		{Code: 40000, Name: "각인서"},
		{Code: 50000, Name: "강화 재료"},
		{Code: 50010, Name: "재련 재료"},
		{Code: 50020, Name: "재련 추가 재료"},
		{Code: 51000, Name: "기타 재료"},
		{Code: 51100, Name: "무기 진화 재료"},
		{Code: 60000, Name: "전투 용품"},
		{Code: 60200, Name: "배틀 아이템 -회복형"},
		{Code: 60300, Name: "배틀 아이템 -공격형"},
		{Code: 60400, Name: "배틀 아이템 -기능성"},
		{Code: 60500, Name: "배틀 아이템 -버프형"},
		{Code: 70000, Name: "요리"},
		{Code: 90000, Name: "생활"},
		{Code: 90200, Name: "식물채집 전리품"},
		{Code: 90300, Name: "벌목 전리품"},
		{Code: 90400, Name: "채광 전리품"},
		{Code: 90500, Name: "수렵 전리품"},
		{Code: 90600, Name: "낚시 전리품"},
		{Code: 90700, Name: "고고학 전리품"},
		{Code: 90800, Name: "기타"},
		{Code: 100000, Name: "모험의 서"},
		{Code: 110000, Name: "항해"},
		{Code: 110100, Name: "선박 재료"},
		{Code: 110110, Name: "선박 스킨"},
		{Code: 111900, Name: "선박 재료 상자"},
		{Code: 140000, Name: "펫"},
		{Code: 140100, Name: "펫"},
		{Code: 140200, Name: "펫 상자"},
		{Code: 160000, Name: "탈것"},
		{Code: 160100, Name: "탈것"},
		{Code: 160200, Name: "탈것 상자"},
		{Code: 170000, Name: "기타"},
		{Code: 220000, Name: "보석 상자"},
	}

	output := scraper.GetFlattenCategories(input)

	if !reflect.DeepEqual(output, expectedOutput) {
		t.Errorf("FlattenCategories() output mismatch.\nGot: %v\nWant: %v", output, expectedOutput)
	}
}
