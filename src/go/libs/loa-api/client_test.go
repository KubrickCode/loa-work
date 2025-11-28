package loaApi

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"os"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestMain(m *testing.M) {
	os.Setenv("LOA_API_TOKEN", "test-api-token")
	code := m.Run()
	os.Exit(code)
}

func TestNewClient_ShouldSetDefaultConfiguration(t *testing.T) {
	client := NewClient()

	assert.NotNil(t, client)
	assert.Equal(t, loaApiBaseURL, client.baseURL)
	assert.NotNil(t, client.client)
	assert.Equal(t, "test-api-token", client.token)
}

func TestNewClientWithBaseURL_ShouldUseCustomBaseURL(t *testing.T) {
	customURL := "https://custom.api.com"
	client := NewClientWithBaseURL(customURL)

	assert.NotNil(t, client)
	assert.Equal(t, customURL, client.baseURL)
	assert.NotNil(t, client.client)
	assert.Equal(t, "test-api-token", client.token)
}

func TestClient_Client_ShouldReturnHTTPClient(t *testing.T) {
	client := NewClient()
	httpClient := client.Client()

	assert.NotNil(t, httpClient)
	assert.Equal(t, client.client, httpClient)
}

func TestClient_NewRequest_ShouldSetAuthorizationHeader(t *testing.T) {
	client := NewClient()
	rb := client.NewRequest()

	req, err := rb.Method(http.MethodGet).Path("/test").Build()

	assert.NoError(t, err)
	assert.NotNil(t, req)
	assert.Equal(t, "Bearer test-api-token", req.Header.Get("Authorization"))
	assert.Equal(t, loaApiBaseURL+"/test", req.URL.String())
}

func TestClient_Do_Success(t *testing.T) {
	type TestResponse struct {
		Message string `json:"message"`
	}

	expectedResp := TestResponse{Message: "success"}
	server := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(expectedResp)
	}))
	defer server.Close()

	client := NewClientWithBaseURL(server.URL)
	req, err := http.NewRequest(http.MethodGet, server.URL+"/test", nil)
	assert.NoError(t, err)

	var resp TestResponse
	err = client.Do(req, &resp)

	assert.NoError(t, err)
	assert.Equal(t, expectedResp.Message, resp.Message)
}

func TestClient_Do_UnmarshallableResponse(t *testing.T) {
	type TestResponse struct {
		Channel chan int `json:"channel"`
	}

	server := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		w.Write([]byte(`{"channel": null}`))
	}))
	defer server.Close()

	client := NewClientWithBaseURL(server.URL)
	req, err := http.NewRequest(http.MethodGet, server.URL+"/test", nil)
	assert.NoError(t, err)

	var resp TestResponse
	err = client.Do(req, &resp)

	assert.Error(t, err)
	assert.Contains(t, err.Error(), "marshal output")
}

func TestClient_Do_HTTPError(t *testing.T) {
	type TestResponse struct {
		Message string `json:"message"`
	}

	server := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusInternalServerError)
	}))
	defer server.Close()

	client := NewClientWithBaseURL(server.URL)
	client.client.Client.RetryMax = 1
	client.client.Client.RetryWaitMin = 0
	client.client.Client.RetryWaitMax = 0

	req, err := http.NewRequest(http.MethodGet, server.URL+"/test", nil)
	assert.NoError(t, err)

	var resp TestResponse
	err = client.Do(req, &resp)

	assert.Error(t, err)
}
