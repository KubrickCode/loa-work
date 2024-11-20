package main

type Scraper struct {
}

func NewScraper() *Scraper {
	return &Scraper{}
}

func (s *Scraper) Start() error {
	return nil
}
