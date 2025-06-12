package httpclient

import (
	"bufio"
	"bytes"
	"context"
	"encoding/json"
	"io"
	"log"
	"net/http"
	"time"

	"github.com/go-playground/validator/v10"
	"github.com/hashicorp/go-retryablehttp"
	"github.com/pkg/errors"
)

const (
	maxRetries    = 5
	retryInterval = time.Minute * 1
	timeOut       = time.Second * 30
)

type Client struct {
	Client *retryablehttp.Client
}

func NewClient() *Client {
	retryClient := retryablehttp.NewClient()
	retryClient.HTTPClient.Timeout = timeOut
	retryClient.RetryWaitMin = retryInterval
	retryClient.RetryWaitMax = retryInterval
	retryClient.RetryMax = maxRetries
	retryClient.Logger = nil
	retryClient.CheckRetry = func(ctx context.Context, resp *http.Response, err error) (bool, error) {
		if err != nil {
			log.Printf("failed to send request: %s, retrying in %v...", err, retryInterval)
			return true, nil
		}
		if resp.StatusCode < 200 || resp.StatusCode >= 300 {
			bodyBytes, _ := io.ReadAll(resp.Body)
			resp.Body.Close()
			resp.Body = io.NopCloser(bytes.NewReader(bodyBytes))

			log.Printf("failed to send request: received non-2xx response status: %v body: %s, retrying in %v...",
				resp.StatusCode, string(bodyBytes), retryInterval)
			return true, nil
		}
		return false, nil
	}

	return &Client{
		Client: retryClient,
	}
}

func (c *Client) Do(req *http.Request, out interface{}) error {
	retryReq, err := retryablehttp.FromRequest(req)
	if err != nil {
		return errors.Wrapf(err, "failed to convert request")
	}

	resp, err := c.Client.Do(retryReq)
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	return parseResponse(resp.Body, out)
}

func (c *Client) DoRaw(req *http.Request) (resp *http.Response, err error) {
	retryReq, err := retryablehttp.FromRequest(req)
	if err != nil {
		return nil, errors.Wrapf(err, "failed to convert request")
	}

	return c.Client.Do(retryReq)
}

func parseResponse(body io.Reader, out interface{}) error {
	bodyBytes, err := io.ReadAll(body)
	if err != nil {
		return errors.Wrapf(err, "failed to read response body")
	}

	decoder := json.NewDecoder(bufio.NewReader(bytes.NewBuffer(bodyBytes)))
	decoder.DisallowUnknownFields()
	err = decoder.Decode(out)
	if err != nil {
		return errors.Wrapf(err, "failed to decode JSON response: %s", string(bodyBytes))
	}

	validate := validator.New(validator.WithRequiredStructEnabled())
	err = validate.Struct(out)
	if err != nil {
		return errors.Wrapf(err, "validation failed: %s", string(bodyBytes))
	}

	return nil
}
