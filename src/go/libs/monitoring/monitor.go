package monitoring

import (
	"fmt"
	"log"
	"net/http"
	"sync"
	"time"

	"github.com/prometheus/client_golang/prometheus"
	"github.com/prometheus/client_golang/prometheus/promhttp"
)

type Task interface {
	Execute() error
}

type Monitor struct {
	serviceUp     *prometheus.GaugeVec
	scrapeSuccess *prometheus.CounterVec
	scrapeFailure *prometheus.CounterVec
	jobName       string
	metricsPort   int
	serverStarted bool
	serverMutex   sync.Mutex
}

func NewMonitor(jobName string, metricsPort int) *Monitor {
	serviceUp := prometheus.NewGaugeVec(prometheus.GaugeOpts{
		Name: "service_up",
		Help: "Indicates if the service is up (1) or down (0)",
	}, []string{"job"})

	scrapeSuccess := prometheus.NewCounterVec(prometheus.CounterOpts{
		Name: "scrape_success_total",
		Help: "Total number of successful scrapes",
	}, []string{"job"})

	scrapeFailure := prometheus.NewCounterVec(prometheus.CounterOpts{
		Name: "scrape_failure_total",
		Help: "Total number of failed scrapes",
	}, []string{"job"})

	prometheus.MustRegister(serviceUp, scrapeSuccess, scrapeFailure)

	return &Monitor{
		serviceUp:     serviceUp,
		scrapeSuccess: scrapeSuccess,
		scrapeFailure: scrapeFailure,
		jobName:       jobName,
		metricsPort:   metricsPort,
	}
}

func (m *Monitor) Start() {
	m.serverMutex.Lock()
	defer m.serverMutex.Unlock()

	if !m.serverStarted {
		m.serviceUp.WithLabelValues(m.jobName).Set(1)
		go func() {
			http.Handle("/metrics", promhttp.Handler())
			log.Printf("Starting metrics server on :%d for job %s", m.metricsPort, m.jobName)
			if err := http.ListenAndServe(fmt.Sprintf(":%d", m.metricsPort), nil); err != nil {
				log.Fatalf("Failed to start metrics server: %v", err)
				m.SetServiceUp(false)
			}
		}()
		m.serverStarted = true
	}
}

func (m *Monitor) MonitorTask(task Task) error {
	startTime := time.Now()
	err := task.Execute()
	if err != nil {
		m.IncrementFailure()
		m.SetServiceUp(false)
		log.Printf("Task failed for job %s: %v", m.jobName, err)
	} else {
		m.IncrementSuccess()
		m.SetServiceUp(true)
		log.Printf("Task completed for job %s in %v", m.jobName, time.Since(startTime))
	}
	return err
}

func (m *Monitor) SetServiceUp(up bool) {
	m.serviceUp.WithLabelValues(m.jobName).Set(btoi(up))
}

func btoi(b bool) float64 {
	if b {
		return 1
	}
	return 0
}

func (m *Monitor) IncrementSuccess() {
	m.scrapeSuccess.WithLabelValues(m.jobName).Inc()
}

func (m *Monitor) IncrementFailure() {
	m.scrapeFailure.WithLabelValues(m.jobName).Inc()
}
