package main

import (
	"github.com/KubrickCode/loa-life/src/go/libs/httpclient"
)

type Scraper struct {
	client *httpclient.Client
}

func NewScraper() *Scraper {
	client := httpclient.NewClient()
	return &Scraper{client: client}
}

func (s *Scraper) Start() error {
	return nil
}
