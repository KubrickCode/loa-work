package httpclient

import (
	"bufio"
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"io"
	"log/slog"
	"net/http"
	"time"

	"github.com/go-playground/validator/v10"
	"github.com/hashicorp/go-retryablehttp"
)

const (
	maxRetries     = 5
	retryInterval  = time.Minute * 1
	timeOut        = time.Second * 30
	maxBodyInError = 1024
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
			slog.Warn("request failed, retrying", "error", err, "retryInterval", retryInterval)
			return true, nil
		}
		if resp.StatusCode < 200 || resp.StatusCode >= 300 {
			bodyBytes, _ := io.ReadAll(resp.Body)
			resp.Body.Close()
			resp.Body = io.NopCloser(bytes.NewReader(bodyBytes))

			slog.Warn("received non-2xx response, retrying",
				"status", resp.StatusCode, "body", truncateBody(bodyBytes), "retryInterval", retryInterval)
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
		return fmt.Errorf("http-client: convert request: %w", err)
	}

	resp, err := c.Client.Do(retryReq)
	if err != nil {
		return fmt.Errorf("http-client: do request: %w", err)
	}
	defer resp.Body.Close()

	return parseResponse(resp.Body, out)
}

func (c *Client) DoRaw(req *http.Request) (resp *http.Response, err error) {
	retryReq, err := retryablehttp.FromRequest(req)
	if err != nil {
		return nil, fmt.Errorf("http-client: convert request: %w", err)
	}

	return c.Client.Do(retryReq)
}

func parseResponse(body io.Reader, out interface{}) error {
	bodyBytes, err := io.ReadAll(body)
	if err != nil {
		return fmt.Errorf("http-client: read response body: %w", err)
	}

	decoder := json.NewDecoder(bufio.NewReader(bytes.NewBuffer(bodyBytes)))
	decoder.DisallowUnknownFields()
	err = decoder.Decode(out)
	if err != nil {
		return fmt.Errorf("http-client: decode JSON response [%s]: %w", truncateBody(bodyBytes), err)
	}

	validate := validator.New(validator.WithRequiredStructEnabled())
	err = validate.Struct(out)
	if err != nil {
		return fmt.Errorf("http-client: validation failed [%s]: %w", truncateBody(bodyBytes), err)
	}

	return nil
}

func truncateBody(body []byte) string {
	if len(body) > maxBodyInError {
		return string(body[:maxBodyInError]) + "..."
	}
	return string(body)
}
