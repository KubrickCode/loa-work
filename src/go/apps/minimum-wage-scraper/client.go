package main

import (
	"github.com/KubrickCode/loa-life/src/go/libs/httpclient"
)

type Client struct {
	client *httpclient.Client
}

func NewClient() *Client {
	return &Client{
		client: httpclient.NewClient(),
	}
}

func (c *Client) NewRequest() *httpclient.RequestBuilder {
	baseURL := "https://api.odcloud.kr/api"
	rb := httpclient.NewRequestBuilder(baseURL)
	return rb
}
