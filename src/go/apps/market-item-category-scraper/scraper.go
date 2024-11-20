package main

import "fmt"

type Scraper struct {
}

func NewScraper() *Scraper {
	return &Scraper{}
}

func (s *Scraper) Start() error {
	resp, err := GetCategoryList()
	if err != nil {
		return err
	}

	fmt.Println(resp)

	return nil
}
