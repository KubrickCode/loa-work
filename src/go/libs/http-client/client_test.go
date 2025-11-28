package httpclient

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
)

type TestResponse struct {
	Message string `json:"message" validate:"required"`
	Code    int    `json:"code" validate:"required"`
}

func TestNewClient_ShouldSetDefaultConfiguration(t *testing.T) {
	client := NewClient()

	assert.NotNil(t, client)
	assert.NotNil(t, client.Client)
	assert.Equal(t, maxRetries, client.Client.RetryMax)
	assert.Equal(t, retryInterval, client.Client.RetryWaitMin)
	assert.Equal(t, retryInterval, client.Client.RetryWaitMax)
	assert.Equal(t, timeOut, client.Client.HTTPClient.Timeout)
	assert.Nil(t, client.Client.Logger)
}

func TestClient_Do_SuccessfulRequest(t *testing.T) {
	expectedResp := TestResponse{Message: "success", Code: 200}
	server := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(expectedResp)
	}))
	defer server.Close()

	client := NewClient()
	req, err := http.NewRequest(http.MethodGet, server.URL, nil)
	assert.NoError(t, err)

	var resp TestResponse
	err = client.Do(req, &resp)

	assert.NoError(t, err)
	assert.Equal(t, expectedResp.Message, resp.Message)
	assert.Equal(t, expectedResp.Code, resp.Code)
}

func TestClient_Do_RetryOnFailure_SuccessAfterRetry(t *testing.T) {
	requestCount := 0
	server := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		requestCount++
		if requestCount < 3 {
			w.WriteHeader(http.StatusInternalServerError)
			return
		}
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(TestResponse{Message: "success", Code: 200})
	}))
	defer server.Close()

	client := NewClient()
	client.Client.RetryWaitMin = time.Millisecond
	client.Client.RetryWaitMax = time.Millisecond

	req, err := http.NewRequest(http.MethodGet, server.URL, nil)
	assert.NoError(t, err)

	var resp TestResponse
	err = client.Do(req, &resp)

	assert.NoError(t, err)
	assert.Equal(t, "success", resp.Message)
	assert.Equal(t, 3, requestCount)
}

func TestClient_Do_RetryOnFailure_MaxRetriesExceeded(t *testing.T) {
	server := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusInternalServerError)
	}))
	defer server.Close()

	client := NewClient()
	client.Client.RetryWaitMin = time.Millisecond
	client.Client.RetryWaitMax = time.Millisecond
	client.Client.RetryMax = 2

	req, err := http.NewRequest(http.MethodGet, server.URL, nil)
	assert.NoError(t, err)

	var resp TestResponse
	err = client.Do(req, &resp)

	assert.Error(t, err)
	assert.Contains(t, err.Error(), "http-client")
}

func TestClient_Do_TimeoutError(t *testing.T) {
	server := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		time.Sleep(200 * time.Millisecond)
		w.WriteHeader(http.StatusOK)
	}))
	defer server.Close()

	client := NewClient()
	client.Client.HTTPClient.Timeout = 50 * time.Millisecond
	client.Client.RetryMax = 1
	client.Client.RetryWaitMin = time.Millisecond
	client.Client.RetryWaitMax = time.Millisecond

	req, err := http.NewRequest(http.MethodGet, server.URL, nil)
	assert.NoError(t, err)

	var resp TestResponse
	err = client.Do(req, &resp)

	assert.Error(t, err)
}

func TestClient_Do_JSONDecodingError(t *testing.T) {
	server := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("invalid json"))
	}))
	defer server.Close()

	client := NewClient()
	req, err := http.NewRequest(http.MethodGet, server.URL, nil)
	assert.NoError(t, err)

	var resp TestResponse
	err = client.Do(req, &resp)

	assert.Error(t, err)
	assert.Contains(t, err.Error(), "decode JSON response")
}

func TestClient_Do_ValidationError(t *testing.T) {
	server := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(map[string]interface{}{
			"message": "test",
		})
	}))
	defer server.Close()

	client := NewClient()
	req, err := http.NewRequest(http.MethodGet, server.URL, nil)
	assert.NoError(t, err)

	var resp TestResponse
	err = client.Do(req, &resp)

	assert.Error(t, err)
	assert.Contains(t, err.Error(), "validation failed")
}

func TestClient_Do_UnknownFieldsError(t *testing.T) {
	server := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(map[string]interface{}{
			"message":       "test",
			"code":          200,
			"unknown_field": "value",
		})
	}))
	defer server.Close()

	client := NewClient()
	req, err := http.NewRequest(http.MethodGet, server.URL, nil)
	assert.NoError(t, err)

	var resp TestResponse
	err = client.Do(req, &resp)

	assert.Error(t, err)
	assert.Contains(t, err.Error(), "decode JSON response")
}

func TestClient_DoRaw_SuccessfulRequest(t *testing.T) {
	expectedBody := "raw response body"
	server := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte(expectedBody))
	}))
	defer server.Close()

	client := NewClient()
	req, err := http.NewRequest(http.MethodGet, server.URL, nil)
	assert.NoError(t, err)

	resp, err := client.DoRaw(req)

	assert.NoError(t, err)
	assert.NotNil(t, resp)
	defer resp.Body.Close()

	body, _ := io.ReadAll(resp.Body)
	assert.Equal(t, expectedBody, string(body))
}

func TestClient_DoRaw_RetryOnNon2xxStatus(t *testing.T) {
	requestCount := 0
	server := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		requestCount++
		if requestCount < 2 {
			w.WriteHeader(http.StatusBadRequest)
			w.Write([]byte("error"))
			return
		}
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("success"))
	}))
	defer server.Close()

	client := NewClient()
	client.Client.RetryWaitMin = time.Millisecond
	client.Client.RetryWaitMax = time.Millisecond

	req, err := http.NewRequest(http.MethodGet, server.URL, nil)
	assert.NoError(t, err)

	resp, err := client.DoRaw(req)

	assert.NoError(t, err)
	defer resp.Body.Close()
	assert.Equal(t, 2, requestCount)
}

func TestParseResponse_Success(t *testing.T) {
	body := strings.NewReader(`{"message": "test", "code": 123}`)
	var resp TestResponse

	err := parseResponse(body, &resp)

	assert.NoError(t, err)
	assert.Equal(t, "test", resp.Message)
	assert.Equal(t, 123, resp.Code)
}

func TestParseResponse_ReadError(t *testing.T) {
	body := &errorReader{}
	var resp TestResponse

	err := parseResponse(body, &resp)

	assert.Error(t, err)
	assert.Contains(t, err.Error(), "read response body")
}

func TestTruncateBody_ShortBody(t *testing.T) {
	body := []byte("short message")
	result := truncateBody(body)

	assert.Equal(t, "short message", result)
}

func TestTruncateBody_LongBody(t *testing.T) {
	body := make([]byte, maxBodyInError+100)
	for i := range body {
		body[i] = 'a'
	}

	result := truncateBody(body)

	assert.Len(t, result, maxBodyInError+3)
	assert.True(t, strings.HasSuffix(result, "..."))
}

func TestClient_CheckRetry_NetworkError(t *testing.T) {
	client := NewClient()

	shouldRetry, err := client.Client.CheckRetry(nil, nil, fmt.Errorf("network error"))

	assert.NoError(t, err)
	assert.True(t, shouldRetry)
}

func TestClient_CheckRetry_4xxStatusCode(t *testing.T) {
	client := NewClient()
	resp := &http.Response{
		StatusCode: http.StatusBadRequest,
		Body:       io.NopCloser(strings.NewReader("bad request")),
	}

	shouldRetry, err := client.Client.CheckRetry(nil, resp, nil)

	assert.NoError(t, err)
	assert.True(t, shouldRetry)
}

func TestClient_CheckRetry_5xxStatusCode(t *testing.T) {
	client := NewClient()
	resp := &http.Response{
		StatusCode: http.StatusInternalServerError,
		Body:       io.NopCloser(strings.NewReader("server error")),
	}

	shouldRetry, err := client.Client.CheckRetry(nil, resp, nil)

	assert.NoError(t, err)
	assert.True(t, shouldRetry)
}

func TestClient_CheckRetry_SuccessStatusCode(t *testing.T) {
	client := NewClient()
	resp := &http.Response{
		StatusCode: http.StatusOK,
		Body:       io.NopCloser(strings.NewReader("success")),
	}

	shouldRetry, err := client.Client.CheckRetry(nil, resp, nil)

	assert.NoError(t, err)
	assert.False(t, shouldRetry)
}

type errorReader struct{}

func (e *errorReader) Read(p []byte) (n int, err error) {
	return 0, fmt.Errorf("read error")
}
