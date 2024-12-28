package httpclient

import (
	"bufio"
	"bytes"
	"encoding/json"
	"io"
	"log"
	"net/http"
	"time"

	"github.com/go-playground/validator/v10"
	"github.com/pkg/errors"
)

const (
	maxRetries    = 5
	retryInterval = time.Second * 3
	timeOut       = time.Second * 30
)

type Client struct {
	Client *http.Client
}

func NewClient() *Client {
	return &Client{
		Client: &http.Client{
			Timeout: timeOut,
		},
	}
}

func (c *Client) Do(req *http.Request, out interface{}) error {
	resp, err := c.retry(req)
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	return parseResponse(resp.Body, out)
}

func (c *Client) retry(req *http.Request) (*http.Response, error) {
	var resp *http.Response
	var err error

	for i := 0; i < maxRetries; i++ {
		resp, err = c.Client.Do(req)
		if err != nil {
			err = errors.Wrapf(err, "failed to send request")
		} else if resp.StatusCode < 200 || resp.StatusCode >= 300 {
			bodyBytes, _ := io.ReadAll(resp.Body)
			err = errors.Errorf("received non-2xx response status: %v body: %s", resp.StatusCode, string(bodyBytes))
		} else {
			return resp, nil
		}

		log.Printf("failed to send request: %s, retrying in %v...\n", err, retryInterval)
		time.Sleep(retryInterval)
	}

	return nil, errors.Wrapf(err, "failed to send request after %d attempts", maxRetries)
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
