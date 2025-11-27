package schedule

import (
	"errors"
	"sync/atomic"
	"testing"
	"time"
)

func TestNewScheduler(t *testing.T) {
	s := NewScheduler()
	if s == nil {
		t.Fatal("expected non-nil scheduler")
	}
	if len(s.tasks) != 0 {
		t.Fatalf("expected 0 tasks, got %d", len(s.tasks))
	}
}

func TestNewTask(t *testing.T) {
	fn := func() error { return nil }
	task := NewTask("test-task", 5*time.Minute, fn)

	if task.Name != "test-task" {
		t.Errorf("expected name 'test-task', got '%s'", task.Name)
	}
	if task.Duration != 5*time.Minute {
		t.Errorf("expected duration 5m, got %v", task.Duration)
	}
	if task.Fn == nil {
		t.Error("expected non-nil function")
	}
}

func TestScheduler_AddTask(t *testing.T) {
	s := NewScheduler()

	task1 := NewTask("task1", time.Minute, func() error { return nil })
	task2 := NewTask("task2", time.Hour, func() error { return nil })

	s.AddTask(task1)
	if len(s.tasks) != 1 {
		t.Fatalf("expected 1 task, got %d", len(s.tasks))
	}

	s.AddTask(task2)
	if len(s.tasks) != 2 {
		t.Fatalf("expected 2 tasks, got %d", len(s.tasks))
	}
}

func TestTask_FunctionExecution(t *testing.T) {
	var called atomic.Bool

	task := NewTask("exec-test", time.Second, func() error {
		called.Store(true)
		return nil
	})

	err := task.Fn()
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	if !called.Load() {
		t.Error("expected function to be called")
	}
}

func TestTask_FunctionError(t *testing.T) {
	expectedErr := errors.New("task failed")

	task := NewTask("error-test", time.Second, func() error {
		return expectedErr
	})

	err := task.Fn()
	if !errors.Is(err, expectedErr) {
		t.Errorf("expected error '%v', got '%v'", expectedErr, err)
	}
}
