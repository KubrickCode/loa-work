package schedule

import (
	"time"

	"github.com/k0kubun/pp"
	"github.com/pkg/errors"
)

type Scheduler struct {
	tasks []*Task
}

type Task struct {
	name   string
	d      time.Duration
	fn     func() error
	ticker *time.Ticker
}

func NewScheduler() *Scheduler {
	return &Scheduler{}
}

func (s *Scheduler) AddTask(t *Task) {
	if s.tasks == nil {
		s.tasks = []*Task{}
	}
	s.tasks = append(s.tasks, t)
}

func (s *Scheduler) Run() error {
	errChan := make(chan error)

	for _, task := range s.tasks {
		go func(t *Task) {
			pp.Println(t.name + " started.")
			defer t.ticker.Stop()

			// 스케줄러 실행 시 모든 작업 한 번씩 먼저 실행하고 다음 작업 대기함.
			err := t.fn()
			if err != nil {
				errChan <- errors.Wrapf(err, "error executing task %s", t.name)
			}

			for range t.ticker.C {
				if err := t.fn(); err != nil {
					errChan <- errors.Wrapf(err, "error executing task %s", t.name)
				}
			}
		}(task)
	}

	if err := <-errChan; err != nil {
		return err
	}

	return nil
}

func NewTask(name string, d time.Duration, fn func() error) *Task {
	ticker := time.NewTicker(d)
	return &Task{name: name, d: d, fn: fn, ticker: ticker}
}
