// Code generated by MockGen. DO NOT EDIT.
// Source: ./auction-item-category.go
//
// Generated by this command:
//
//	mockgen -source=./auction-item-category.go -package=loadb -self_package=github.com/KubrickCode/loa-work/src/go/libs/loadb
//

// Package loadb is a generated GoMock package.
package loadb

import (
	reflect "reflect"

	gomock "go.uber.org/mock/gomock"
)

// MockAuctionItemCategoryDB is a mock of AuctionItemCategoryDB interface.
type MockAuctionItemCategoryDB struct {
	ctrl     *gomock.Controller
	recorder *MockAuctionItemCategoryDBMockRecorder
	isgomock struct{}
}

// MockAuctionItemCategoryDBMockRecorder is the mock recorder for MockAuctionItemCategoryDB.
type MockAuctionItemCategoryDBMockRecorder struct {
	mock *MockAuctionItemCategoryDB
}

// NewMockAuctionItemCategoryDB creates a new mock instance.
func NewMockAuctionItemCategoryDB(ctrl *gomock.Controller) *MockAuctionItemCategoryDB {
	mock := &MockAuctionItemCategoryDB{ctrl: ctrl}
	mock.recorder = &MockAuctionItemCategoryDBMockRecorder{mock}
	return mock
}

// EXPECT returns an object that allows the caller to indicate expected use.
func (m *MockAuctionItemCategoryDB) EXPECT() *MockAuctionItemCategoryDBMockRecorder {
	return m.recorder
}

// FindByID mocks base method.
func (m *MockAuctionItemCategoryDB) FindByID(id int) (*AuctionItemCategory, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "FindByID", id)
	ret0, _ := ret[0].(*AuctionItemCategory)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// FindByID indicates an expected call of FindByID.
func (mr *MockAuctionItemCategoryDBMockRecorder) FindByID(id any) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "FindByID", reflect.TypeOf((*MockAuctionItemCategoryDB)(nil).FindByID), id)
}
