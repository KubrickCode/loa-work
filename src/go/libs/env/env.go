package env

import (
	"fmt"
	"os"
)

func MustGetEnv(key string) string {
	value, ok := os.LookupEnv(key)
	if !ok {
		panic(fmt.Errorf("required environment variable %s is not set", key))
	}
	return value
}
