package scraper

import (
	"fmt"
	"log"
	"time"

	"github.com/KubrickCode/loa-work/src/go/libs/loaApi"
	"github.com/KubrickCode/loa-work/src/go/libs/loaApi/request"
	"github.com/KubrickCode/loa-work/src/go/libs/loadb"
)

type Scraper struct {
	db loadb.DB
}

func NewScraper(db loadb.DB) *Scraper {
	return &Scraper{db: db}
}

func (s *Scraper) Start() error {
	items, err := s.getItemsToScrape()
	if err != nil {
		return fmt.Errorf("failed to get auction items: %w", err)
	}

	err = s.saveItemStats(items)
	if err != nil {
		return fmt.Errorf("failed to save auction item stats: %w", err)
	}

	return nil
}

func (s *Scraper) getItemsToScrape() ([]loadb.AuctionItem, error) {
	items, err := s.db.AuctionItem().FindStatScraperEnabledAll()
	if err != nil {
		return nil, err
	}

	if len(items) == 0 {
		return nil, fmt.Errorf("no auction items found")
	}

	return items, nil
}

func (s *Scraper) getCategoryByItem(item loadb.AuctionItem) (*loadb.AuctionItemCategory, error) {
	category, err := s.db.AuctionItemCategory().FindByID(item.AuctionItemCategoryID)
	if err != nil {
		return nil, err
	}

	if category == nil {
		return nil, fmt.Errorf("auction item category not found")
	}

	return category, nil
}

// TODO: Test 작성
func (s *Scraper) getItemStatsToCreate(category *loadb.AuctionItemCategory, item loadb.AuctionItem) ([]loadb.AuctionItemStat, error) {
	auctionItemListResp, err := request.GetAuctionItemList(&loaApi.GetAuctionItemListParams{
		CategoryCode:  category.Code,
		ItemName:      item.Name,
		PageNo:        1,
		Sort:          "BUY_PRICE",
		SortCondition: "ASC",
	})
	if err != nil {
		return nil, err
	}

	stats := []loadb.AuctionItemStat{}

	for _, auctionItem := range auctionItemListResp.Items {
		endDate, err := time.Parse("2006-01-02T15:04:05.000", auctionItem.AuctionInfo.EndDate)
		if err != nil {
			endDate, err = time.Parse("2006-01-02T15:04:05", auctionItem.AuctionInfo.EndDate)
			if err != nil {
				return nil, err
			}
		}

		stat := loadb.AuctionItemStat{
			AuctionItemID: item.ID,
			BuyPrice:      auctionItem.AuctionInfo.BuyPrice,
			BidPrice:      auctionItem.AuctionInfo.BidPrice,
			BidStartPrice: auctionItem.AuctionInfo.BidStartPrice,
			StartPrice:    auctionItem.AuctionInfo.StartPrice,
			IsCompetitive: auctionItem.AuctionInfo.IsCompetitive,
			EndDate:       endDate,
		}

		stats = append(stats, stat)
	}

	return stats, nil
}

// TODO: Test 작성
func (s *Scraper) saveItemStats(items []loadb.AuctionItem) error {
	return s.db.WithTransaction(func(tx loadb.DB) error {
		for _, item := range items {
			category, err := s.getCategoryByItem(item)
			if err != nil {
				return fmt.Errorf("failed to get auction item category: %w", err)
			}

			statsToCreate, err := s.getItemStatsToCreate(category, item)
			if err != nil {
				return fmt.Errorf("failed to get auction item stat: %w", err)
			}

			if len(statsToCreate) > 0 {
				err := tx.AuctionItemStat().CreateMany(statsToCreate)
				if err != nil {
					return fmt.Errorf("failed to create auction item stats: %w", err)
				}
			}
		}

		log.Println("Auction item stat saved successfully")
		return nil
	})
}
