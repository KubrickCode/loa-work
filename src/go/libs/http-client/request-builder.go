package httpclient

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
	"net/url"
)

type RequestBuilder struct {
	method      string
	baseURL     string
	path        string
	headers     map[string]string
	queryParams url.Values
	body        []byte
	errors      []error
}

func NewRequestBuilder(baseURL string) *RequestBuilder {
	return &RequestBuilder{
		baseURL:     baseURL,
		headers:     make(map[string]string),
		queryParams: url.Values{},
	}
}

func (rb *RequestBuilder) Method(method string) *RequestBuilder {
	if len(rb.errors) > 0 {
		return rb
	}
	rb.method = method
	return rb
}

func (rb *RequestBuilder) Path(path string) *RequestBuilder {
	if len(rb.errors) > 0 {
		return rb
	}
	rb.path = path
	return rb
}

func (rb *RequestBuilder) AddHeader(key, value string) *RequestBuilder {
	if len(rb.errors) > 0 {
		return rb
	}
	rb.headers[key] = value
	return rb
}

func (rb *RequestBuilder) AddQueryParam(key string, value interface{}) *RequestBuilder {
	if len(rb.errors) > 0 {
		return rb
	}
	rb.queryParams.Add(key, fmt.Sprintf("%v", value))
	return rb
}

func (rb *RequestBuilder) JSON(data interface{}) *RequestBuilder {
	if len(rb.errors) > 0 {
		return rb
	}
	body, err := json.Marshal(data)
	if err != nil {
		rb.errors = append(rb.errors, err)
		return rb
	}
	rb.headers["Content-Type"] = "application/json"
	rb.body = body
	return rb
}

func (rb *RequestBuilder) Build() (*http.Request, error) {
	if len(rb.errors) > 0 {
		return nil, fmt.Errorf("request builder has accumulated errors: %w", rb.errors[0])
	}

	u, err := url.Parse(rb.baseURL + rb.path)
	if err != nil {
		return nil, err
	}
	u.RawQuery = rb.queryParams.Encode()

	req, err := http.NewRequest(rb.method, u.String(), bytes.NewBuffer(rb.body))
	if err != nil {
		return nil, err
	}

	for key, value := range rb.headers {
		req.Header.Set(key, value)
	}

	return req, nil
}
