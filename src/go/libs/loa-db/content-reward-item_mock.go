// Code generated by MockGen. DO NOT EDIT.
// Source: ./content-reward-item.go
//
// Generated by this command:
//
//	mockgen -source=./content-reward-item.go -package=loadb -self_package=github.com/KubrickCode/loa-work/src/go/libs/loadb
//

// Package loadb is a generated GoMock package.
package loadb

import (
	reflect "reflect"

	gomock "go.uber.org/mock/gomock"
)

// MockContentRewardItemDB is a mock of ContentRewardItemDB interface.
type MockContentRewardItemDB struct {
	ctrl     *gomock.Controller
	recorder *MockContentRewardItemDBMockRecorder
	isgomock struct{}
}

// MockContentRewardItemDBMockRecorder is the mock recorder for MockContentRewardItemDB.
type MockContentRewardItemDBMockRecorder struct {
	mock *MockContentRewardItemDB
}

// NewMockContentRewardItemDB creates a new mock instance.
func NewMockContentRewardItemDB(ctrl *gomock.Controller) *MockContentRewardItemDB {
	mock := &MockContentRewardItemDB{ctrl: ctrl}
	mock.recorder = &MockContentRewardItemDBMockRecorder{mock}
	return mock
}

// EXPECT returns an object that allows the caller to indicate expected use.
func (m *MockContentRewardItemDB) EXPECT() *MockContentRewardItemDBMockRecorder {
	return m.recorder
}

// FindManyByKind mocks base method.
func (m *MockContentRewardItemDB) FindManyByKind(kind string) ([]ContentRewardItem, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "FindManyByKind", kind)
	ret0, _ := ret[0].([]ContentRewardItem)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// FindManyByKind indicates an expected call of FindManyByKind.
func (mr *MockContentRewardItemDBMockRecorder) FindManyByKind(kind any) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "FindManyByKind", reflect.TypeOf((*MockContentRewardItemDB)(nil).FindManyByKind), kind)
}

// UpdateMany mocks base method.
func (m *MockContentRewardItemDB) UpdateMany(items []ContentRewardItem) error {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "UpdateMany", items)
	ret0, _ := ret[0].(error)
	return ret0
}

// UpdateMany indicates an expected call of UpdateMany.
func (mr *MockContentRewardItemDBMockRecorder) UpdateMany(items any) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "UpdateMany", reflect.TypeOf((*MockContentRewardItemDB)(nil).UpdateMany), items)
}
