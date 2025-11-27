package schedule

import (
	"log/slog"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/go-co-op/gocron/v2"
	"github.com/google/uuid"
)

type Scheduler struct {
	s     gocron.Scheduler
	tasks []*Task
}

type Task struct {
	Name     string
	Duration time.Duration
	Fn       func() error
}

func NewScheduler() *Scheduler {
	return &Scheduler{
		tasks: make([]*Task, 0),
	}
}

func NewTask(name string, d time.Duration, fn func() error) *Task {
	return &Task{
		Name:     name,
		Duration: d,
		Fn:       fn,
	}
}

func (s *Scheduler) AddTask(t *Task) {
	s.tasks = append(s.tasks, t)
}

func (s *Scheduler) Run() error {
	scheduler, err := gocron.NewScheduler(gocron.WithStopTimeout(30 * time.Second))
	if err != nil {
		return err
	}
	s.s = scheduler

	for _, task := range s.tasks {
		_, err := s.s.NewJob(
			gocron.DurationJob(task.Duration),
			gocron.NewTask(task.Fn),
			gocron.WithName(task.Name),
			gocron.WithStartAt(gocron.WithStartImmediately()),
			gocron.WithEventListeners(
				gocron.AfterJobRunsWithError(func(jobID uuid.UUID, jobName string, err error) {
					slog.Error("job failed", "name", jobName, "error", err)
				}),
			),
		)
		if err != nil {
			return err
		}
		slog.Info("job started", "name", task.Name)
	}

	s.s.Start()

	sigChan := make(chan os.Signal, 1)
	signal.Notify(sigChan, syscall.SIGTERM, syscall.SIGINT)
	<-sigChan

	slog.Info("shutting down scheduler...")
	return s.s.Shutdown()
}
