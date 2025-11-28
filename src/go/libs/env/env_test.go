package env

import (
	"os"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestGetEnvFallback_EnvironmentVariableExists(t *testing.T) {
	key := "TEST_ENV_EXISTS"
	expectedValue := "test_value"
	os.Setenv(key, expectedValue)
	defer os.Unsetenv(key)

	result := GetEnvFallback(key, "fallback")

	assert.Equal(t, expectedValue, result)
}

func TestGetEnvFallback_EnvironmentVariableNotExists(t *testing.T) {
	key := "TEST_ENV_NOT_EXISTS"
	expectedFallback := "fallback_value"

	result := GetEnvFallback(key, expectedFallback)

	assert.Equal(t, expectedFallback, result)
}

func TestGetEnvFallback_EmptyValue(t *testing.T) {
	key := "TEST_ENV_EMPTY"
	os.Setenv(key, "")
	defer os.Unsetenv(key)

	result := GetEnvFallback(key, "fallback")

	assert.Equal(t, "", result)
}

func TestMustGetEnv_EnvironmentVariableExists(t *testing.T) {
	key := "TEST_MUST_ENV_EXISTS"
	expectedValue := "must_value"
	os.Setenv(key, expectedValue)
	defer os.Unsetenv(key)

	result := MustGetEnv(key)

	assert.Equal(t, expectedValue, result)
}

func TestMustGetEnv_EnvironmentVariableNotExists(t *testing.T) {
	key := "TEST_MUST_ENV_NOT_EXISTS"

	assert.Panics(t, func() {
		MustGetEnv(key)
	}, "MustGetEnv should panic when environment variable is not set")
}

func TestMustGetEnv_EmptyValue(t *testing.T) {
	key := "TEST_MUST_ENV_EMPTY"
	os.Setenv(key, "")
	defer os.Unsetenv(key)

	result := MustGetEnv(key)

	assert.Equal(t, "", result)
}

func TestGetEnvFallback_MultipleCallsSameKey(t *testing.T) {
	key := "TEST_ENV_MULTIPLE"
	value := "initial_value"
	os.Setenv(key, value)
	defer os.Unsetenv(key)

	result1 := GetEnvFallback(key, "fallback")
	result2 := GetEnvFallback(key, "different_fallback")

	assert.Equal(t, value, result1)
	assert.Equal(t, value, result2)
}

func TestMustGetEnv_MultipleCallsSameKey(t *testing.T) {
	key := "TEST_MUST_ENV_MULTIPLE"
	value := "must_initial_value"
	os.Setenv(key, value)
	defer os.Unsetenv(key)

	result1 := MustGetEnv(key)
	result2 := MustGetEnv(key)

	assert.Equal(t, value, result1)
	assert.Equal(t, value, result2)
}
