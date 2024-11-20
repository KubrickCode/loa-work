package env

import (
	"fmt"
	"os"
)

func GetEnvFallback(key, fallback string) string {
	if value, ok := os.LookupEnv(key); ok {
		return value
	}
	return fallback
}

func MustGetEnv(key string) string {
	value, ok := os.LookupEnv(key)
	if !ok {
		panic(fmt.Errorf("required environment variable %s is not set", key))
	}
	return value
}
