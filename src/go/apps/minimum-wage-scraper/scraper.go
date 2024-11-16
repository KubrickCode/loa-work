package main

import "fmt"

// TODO: 동적 계산
const currentYear = 2024

type Scraper struct {
	client *Client
}

func NewScraper() *Scraper {
	client := NewClient()
	return &Scraper{client: client}
}

func (s *Scraper) Start() error {
	minimumWage, err := s.getMinimumWage()
	if err != nil {
		return fmt.Errorf("failed to get minimum wage: %w", err)
	}

	fmt.Println(*minimumWage)

	return nil
}

func (s *Scraper) getMinimumWage() (*int, error) {
	resp, err := s.client.GetMinimumWageList()
	if err != nil {
		return nil, err
	}

	minimumWageData := resp.Data[0]
	if minimumWageData.Year != currentYear {
		return nil, fmt.Errorf("unexpected year: %d", minimumWageData.Year)
	}

	return &minimumWageData.Wage, nil
}
