package ratelimit

import (
	"context"
	"testing"
	"time"
)

func TestNewLimiter(t *testing.T) {
	limiter := NewLimiter(10, 1)
	if limiter == nil {
		t.Fatal("Expected limiter to be created, got nil")
	}
}

func TestNewLimiterPerDuration(t *testing.T) {
	limiter := NewLimiterPerDuration(time.Second, 1)
	if limiter == nil {
		t.Fatal("Expected limiter to be created, got nil")
	}
}

func TestLimiter_Wait_RateLimiting(t *testing.T) {
	limiter := NewLimiter(10, 1) // 10 req/sec

	start := time.Now()

	for i := 0; i < 3; i++ {
		if err := limiter.Wait(context.Background()); err != nil {
			t.Fatalf("Wait() returned unexpected error: %v", err)
		}
	}

	elapsed := time.Since(start)

	// 3 calls at 10 req/sec should take at least 200ms (first is immediate, then 2 waits)
	expectedMin := 200 * time.Millisecond
	if elapsed < expectedMin {
		t.Errorf("Expected at least %v for 3 calls, got %v", expectedMin, elapsed)
	}
}

func TestLimiter_Wait_ContextCancellation(t *testing.T) {
	limiter := NewLimiter(0.1, 1) // Very slow: 1 req per 10 sec

	// First call is immediate (uses burst)
	if err := limiter.Wait(context.Background()); err != nil {
		t.Fatalf("First Wait() returned unexpected error: %v", err)
	}

	// Second call should wait, but we cancel context
	ctx, cancel := context.WithTimeout(context.Background(), 50*time.Millisecond)
	defer cancel()

	err := limiter.Wait(ctx)
	if err == nil {
		t.Error("Expected context cancellation error, got nil")
	}
}
