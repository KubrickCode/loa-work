// Code generated by MockGen. DO NOT EDIT.
// Source: ./market-item.go
//
// Generated by this command:
//
//	mockgen -source=./market-item.go -package=loadb -self_package=github.com/KubrickCode/loa-work/src/go/libs/loadb
//

// Package loadb is a generated GoMock package.
package loadb

import (
	reflect "reflect"

	gomock "go.uber.org/mock/gomock"
)

// MockMarketItemDB is a mock of MarketItemDB interface.
type MockMarketItemDB struct {
	ctrl     *gomock.Controller
	recorder *MockMarketItemDBMockRecorder
	isgomock struct{}
}

// MockMarketItemDBMockRecorder is the mock recorder for MockMarketItemDB.
type MockMarketItemDBMockRecorder struct {
	mock *MockMarketItemDB
}

// NewMockMarketItemDB creates a new mock instance.
func NewMockMarketItemDB(ctrl *gomock.Controller) *MockMarketItemDB {
	mock := &MockMarketItemDB{ctrl: ctrl}
	mock.recorder = &MockMarketItemDBMockRecorder{mock}
	return mock
}

// EXPECT returns an object that allows the caller to indicate expected use.
func (m *MockMarketItemDB) EXPECT() *MockMarketItemDBMockRecorder {
	return m.recorder
}

// FindAllWithLatestStats mocks base method.
func (m *MockMarketItemDB) FindAllWithLatestStats() ([]MarketItem, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "FindAllWithLatestStats")
	ret0, _ := ret[0].([]MarketItem)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// FindAllWithLatestStats indicates an expected call of FindAllWithLatestStats.
func (mr *MockMarketItemDBMockRecorder) FindAllWithLatestStats() *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "FindAllWithLatestStats", reflect.TypeOf((*MockMarketItemDB)(nil).FindAllWithLatestStats))
}

// FindByName mocks base method.
func (m *MockMarketItemDB) FindByName(name string) (MarketItem, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "FindByName", name)
	ret0, _ := ret[0].(MarketItem)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// FindByName indicates an expected call of FindByName.
func (mr *MockMarketItemDBMockRecorder) FindByName(name any) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "FindByName", reflect.TypeOf((*MockMarketItemDB)(nil).FindByName), name)
}

// FindStatScraperEnabledAll mocks base method.
func (m *MockMarketItemDB) FindStatScraperEnabledAll() ([]MarketItem, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "FindStatScraperEnabledAll")
	ret0, _ := ret[0].([]MarketItem)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// FindStatScraperEnabledAll indicates an expected call of FindStatScraperEnabledAll.
func (mr *MockMarketItemDBMockRecorder) FindStatScraperEnabledAll() *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "FindStatScraperEnabledAll", reflect.TypeOf((*MockMarketItemDB)(nil).FindStatScraperEnabledAll))
}

// UpdateStat mocks base method.
func (m *MockMarketItemDB) UpdateStat(item MarketItem) error {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "UpdateStat", item)
	ret0, _ := ret[0].(error)
	return ret0
}

// UpdateStat indicates an expected call of UpdateStat.
func (mr *MockMarketItemDBMockRecorder) UpdateStat(item any) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "UpdateStat", reflect.TypeOf((*MockMarketItemDB)(nil).UpdateStat), item)
}

// UpsertMany mocks base method.
func (m *MockMarketItemDB) UpsertMany(items []MarketItem) error {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "UpsertMany", items)
	ret0, _ := ret[0].(error)
	return ret0
}

// UpsertMany indicates an expected call of UpsertMany.
func (mr *MockMarketItemDBMockRecorder) UpsertMany(items any) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "UpsertMany", reflect.TypeOf((*MockMarketItemDB)(nil).UpsertMany), items)
}
