package loadb

import (
	"errors"

	"github.com/aarondl/sqlboiler/v4/types"
	"github.com/ericlagergren/decimal"
)

// Decimal represents a decimal value, abstracting away SQLBoiler's types.Decimal
type Decimal struct {
	value types.Decimal
}

// NewDecimal creates a new Decimal from a decimal.Big
func NewDecimal(d *decimal.Big) Decimal {
	return Decimal{value: types.NewDecimal(d)}
}

// NewDecimalFromString creates a new Decimal from a string
func NewDecimalFromString(s string) (Decimal, error) {
	d, ok := new(decimal.Big).SetString(s)
	if !ok {
		return Decimal{}, errors.New("invalid decimal string")
	}
	return Decimal{value: types.NewDecimal(d)}, nil
}

// Zero returns a zero Decimal
func ZeroDecimal() Decimal {
	return Decimal{value: types.Decimal{}}
}

// Big returns the underlying decimal.Big value
func (d Decimal) Big() *decimal.Big {
	return d.value.Big
}

// String returns the string representation of the decimal
func (d Decimal) String() string {
	return d.value.String()
}

// IsZero checks if the decimal is zero
func (d Decimal) IsZero() bool {
	return d.value.Big == nil || d.value.Big.Sign() == 0
}

// ToSQLBoilerDecimal converts to SQLBoiler's types.Decimal - only for loadb internal use
func (d Decimal) ToSQLBoilerDecimal() types.Decimal {
	return d.value
}

// FromSQLBoilerDecimal creates a Decimal from SQLBoiler's types.Decimal - only for loadb internal use
func FromSQLBoilerDecimal(d types.Decimal) Decimal {
	return Decimal{value: d}
}
