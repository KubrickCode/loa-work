package ratelimit

import (
	"context"
	"time"

	"golang.org/x/time/rate"
)

type Limiter interface {
	Wait(ctx context.Context) error
}

type limiter struct {
	rl *rate.Limiter
}

func NewLimiter(rps float64, burst int) Limiter {
	return &limiter{
		rl: rate.NewLimiter(rate.Limit(rps), burst),
	}
}

func NewLimiterPerDuration(d time.Duration, burst int) Limiter {
	return &limiter{
		rl: rate.NewLimiter(rate.Every(d), burst),
	}
}

func (l *limiter) Wait(ctx context.Context) error {
	return l.rl.Wait(ctx)
}
