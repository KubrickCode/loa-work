package httpclient

import (
	"bytes"
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
}

func NewRequestBuilder(baseURL string) *RequestBuilder {
	return &RequestBuilder{
		baseURL:     baseURL,
		headers:     make(map[string]string),
		queryParams: url.Values{},
	}
}

func (rb *RequestBuilder) Method(method string) *RequestBuilder {
	rb.method = method
	return rb
}

func (rb *RequestBuilder) Path(path string) *RequestBuilder {
	rb.path = path
	return rb
}

func (rb *RequestBuilder) AddHeader(key, value string) *RequestBuilder {
	rb.headers[key] = value
	return rb
}

func (rb *RequestBuilder) AddQueryParam(key string, value interface{}) *RequestBuilder {
	rb.queryParams.Add(key, fmt.Sprintf("%v", value))
	return rb
}

func (rb *RequestBuilder) Build() (*http.Request, error) {
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
