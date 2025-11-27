package httpclient

import (
	"encoding/json"
	"errors"
	"testing"
)

func TestRequestBuilder_JSONError_ShouldReturnErrorOnBuild(t *testing.T) {
	rb := NewRequestBuilder("https://example.com")

	unmarshalableData := make(chan int)
	req, err := rb.
		Method("POST").
		Path("/api/test").
		JSON(unmarshalableData).
		Build()

	if err == nil {
		t.Errorf("Build() should return error when JSON() fails, got nil")
	}
	if req != nil {
		t.Errorf("Build() should return nil request when error exists, got %v", req)
	}
	var jsonErr *json.UnsupportedTypeError
	if !errors.As(err, &jsonErr) {
		t.Errorf("Build() error should wrap a json.UnsupportedTypeError, got type %T", err)
	}
}

func TestRequestBuilder_JSONError_ShouldStopChaining(t *testing.T) {
	rb := NewRequestBuilder("https://example.com")

	unmarshalableData := make(chan int)
	req, err := rb.
		Method("POST").
		JSON(unmarshalableData).
		Path("/api/test").
		AddHeader("X-Test", "value").
		AddQueryParam("key", "value").
		Build()

	if err == nil {
		t.Errorf("Build() should return error when JSON() fails in chain, got nil")
	}
	if req != nil {
		t.Errorf("Build() should return nil request when error exists, got %v", req)
	}
}

func TestRequestBuilder_ValidJSON_ShouldSucceed(t *testing.T) {
	rb := NewRequestBuilder("https://example.com")

	type TestData struct {
		Name  string `json:"name"`
		Value int    `json:"value"`
	}

	data := TestData{
		Name:  "test",
		Value: 123,
	}

	req, err := rb.
		Method("POST").
		Path("/api/test").
		JSON(data).
		AddHeader("X-Custom", "header").
		AddQueryParam("param", "value").
		Build()

	if err != nil {
		t.Errorf("Build() should succeed with valid data, got error: %v", err)
	}
	if req == nil {
		t.Errorf("Build() should return request with valid data, got nil")
	}
	if req != nil {
		if req.Method != "POST" {
			t.Errorf("expected method POST, got %s", req.Method)
		}
		if req.URL.Path != "/api/test" {
			t.Errorf("expected path /api/test, got %s", req.URL.Path)
		}
		if req.Header.Get("Content-Type") != "application/json" {
			t.Errorf("expected Content-Type application/json, got %s", req.Header.Get("Content-Type"))
		}
		if req.Header.Get("X-Custom") != "header" {
			t.Errorf("expected X-Custom header, got %s", req.Header.Get("X-Custom"))
		}
		if req.URL.Query().Get("param") != "value" {
			t.Errorf("expected query param value, got %s", req.URL.Query().Get("param"))
		}
	}
}

func TestRequestBuilder_BasicRequest_ShouldSucceed(t *testing.T) {
	rb := NewRequestBuilder("https://example.com")

	req, err := rb.
		Method("GET").
		Path("/api/users").
		AddHeader("Authorization", "Bearer token").
		AddQueryParam("page", 1).
		AddQueryParam("limit", 10).
		Build()

	if err != nil {
		t.Errorf("Build() should succeed with basic request, got error: %v", err)
	}
	if req == nil {
		t.Errorf("Build() should return request, got nil")
	}
	if req != nil {
		if req.Method != "GET" {
			t.Errorf("expected method GET, got %s", req.Method)
		}
		if req.URL.Path != "/api/users" {
			t.Errorf("expected path /api/users, got %s", req.URL.Path)
		}
		q := req.URL.Query()
		if q.Get("page") != "1" {
			t.Errorf("expected query param page=1, got %s", q.Get("page"))
		}
		if q.Get("limit") != "10" {
			t.Errorf("expected query param limit=10, got %s", q.Get("limit"))
		}
		if req.Header.Get("Authorization") != "Bearer token" {
			t.Errorf("expected Authorization header, got %s", req.Header.Get("Authorization"))
		}
	}
}

func TestRequestBuilder_MultipleJSONErrors_ShouldReturnFirstError(t *testing.T) {
	rb := NewRequestBuilder("https://example.com")

	unmarshalableData := make(chan int)
	req, err := rb.
		JSON(unmarshalableData).
		JSON(unmarshalableData).
		Build()

	if err == nil {
		t.Errorf("Build() should return error, got nil")
	}
	if req != nil {
		t.Errorf("Build() should return nil request, got %v", req)
	}
	var jsonErr *json.UnsupportedTypeError
	if !errors.As(err, &jsonErr) {
		t.Errorf("Build() error should wrap a json.UnsupportedTypeError, got type %T", err)
	}
}

func TestRequestBuilder_EmptyBuilder_ShouldSucceed(t *testing.T) {
	rb := NewRequestBuilder("https://example.com")

	req, err := rb.
		Method("GET").
		Path("/").
		Build()

	if err != nil {
		t.Errorf("Build() should succeed with minimal request, got error: %v", err)
	}
	if req == nil {
		t.Errorf("Build() should return request, got nil")
	}
}

func TestRequestBuilder_ChainOrder_ShouldNotMatter(t *testing.T) {
	type TestData struct {
		Value string `json:"value"`
	}

	rb1 := NewRequestBuilder("https://example.com")
	req1, err1 := rb1.
		Method("POST").
		Path("/test").
		JSON(TestData{Value: "test"}).
		AddHeader("X-Test", "1").
		Build()

	rb2 := NewRequestBuilder("https://example.com")
	req2, err2 := rb2.
		AddHeader("X-Test", "1").
		JSON(TestData{Value: "test"}).
		Path("/test").
		Method("POST").
		Build()

	if err1 != nil || err2 != nil {
		t.Errorf("Both builds should succeed, got errors: %v, %v", err1, err2)
	}
	if req1 == nil || req2 == nil {
		t.Errorf("Both builds should return requests, got: %v, %v", req1, req2)
	}
	if req1 != nil && req2 != nil {
		if req1.Method != req2.Method {
			t.Errorf("methods should match: %s != %s", req1.Method, req2.Method)
		}
		if req1.URL.Path != req2.URL.Path {
			t.Errorf("paths should match: %s != %s", req1.URL.Path, req2.URL.Path)
		}
		if req1.Header.Get("X-Test") != req2.Header.Get("X-Test") {
			t.Errorf("headers should match: %s != %s", req1.Header.Get("X-Test"), req2.Header.Get("X-Test"))
		}
	}
}
