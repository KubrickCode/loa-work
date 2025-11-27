package loaApi

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/KubrickCode/loa-work/src/go/libs/env"
	"github.com/KubrickCode/loa-work/src/go/libs/httpclient"
)

const loaApiBaseURL = "https://developer-lostark.game.onstove.com"

type Client struct {
	baseURL string
	client  *httpclient.Client
	token   string
}

func NewClient() *Client {
	token := env.MustGetEnv("LOA_API_TOKEN")

	return &Client{
		baseURL: loaApiBaseURL,
		client:  httpclient.NewClient(),
		token:   token,
	}
}

func (c *Client) NewRequest() *httpclient.RequestBuilder {
	rb := httpclient.NewRequestBuilder(c.baseURL)
	rb.AddHeader("Authorization", fmt.Sprintf("Bearer %s", c.token))
	return rb
}

func (c *Client) Do(req *http.Request, out interface{}) error {
	err := c.client.Do(req, out)
	if err != nil {
		return err
	}

	_, err = json.Marshal(out)
	if err != nil {
		return fmt.Errorf("loa-api: marshal output: %w", err)
	}

	return nil
}
