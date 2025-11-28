package monitoring

import (
	"errors"
	"net/http"
	"testing"
	"time"

	"github.com/prometheus/client_golang/prometheus"
	dto "github.com/prometheus/client_model/go"
	"github.com/stretchr/testify/assert"
)

type mockTask struct {
	shouldFail bool
	executed   bool
}

func (m *mockTask) Execute() error {
	m.executed = true
	if m.shouldFail {
		return errors.New("mock task error")
	}
	return nil
}

func setupTest() {
	prometheus.DefaultRegisterer = prometheus.NewRegistry()
	http.DefaultServeMux = http.NewServeMux()
}

func TestNewMonitor_ShouldCreateMonitor(t *testing.T) {
	setupTest()

	monitor := NewMonitor("test-job", 9090)

	assert.NotNil(t, monitor)
	assert.Equal(t, "test-job", monitor.jobName)
	assert.Equal(t, 9090, monitor.metricsPort)

	monitor.serverMutex.Lock()
	started := monitor.serverStarted
	monitor.serverMutex.Unlock()

	assert.False(t, started)
	assert.NotNil(t, monitor.serviceUp)
	assert.NotNil(t, monitor.scrapeSuccess)
	assert.NotNil(t, monitor.scrapeFailure)
}

func TestMonitor_Start_ShouldSetServiceUpAndServerStarted(t *testing.T) {
	setupTest()

	monitor := NewMonitor("test-start", 19091)

	metric := &dto.Metric{}
	err := monitor.serviceUp.WithLabelValues("test-start").Write(metric)
	assert.NoError(t, err)
	assert.Equal(t, float64(0), metric.Gauge.GetValue())

	monitor.Start()
	time.Sleep(20 * time.Millisecond)

	monitor.serverMutex.Lock()
	started := monitor.serverStarted
	monitor.serverMutex.Unlock()

	assert.True(t, started)

	err = monitor.serviceUp.WithLabelValues("test-start").Write(metric)
	assert.NoError(t, err)
	assert.Equal(t, float64(1), metric.Gauge.GetValue())
}

func TestMonitor_Start_MultipleCallsOnlyStartOnce(t *testing.T) {
	setupTest()

	monitor := NewMonitor("test-multiple", 19092)
	monitor.Start()
	time.Sleep(20 * time.Millisecond)
	monitor.Start()
	monitor.Start()

	monitor.serverMutex.Lock()
	started := monitor.serverStarted
	monitor.serverMutex.Unlock()

	assert.True(t, started)
}

func TestMonitor_SetServiceUp_True(t *testing.T) {
	setupTest()

	monitor := NewMonitor("test-up-true", 9093)
	monitor.SetServiceUp(true)

	metric := &dto.Metric{}
	err := monitor.serviceUp.WithLabelValues("test-up-true").Write(metric)
	assert.NoError(t, err)
	assert.Equal(t, float64(1), metric.Gauge.GetValue())
}

func TestMonitor_SetServiceUp_False(t *testing.T) {
	setupTest()

	monitor := NewMonitor("test-up-false", 9094)
	monitor.SetServiceUp(false)

	metric := &dto.Metric{}
	err := monitor.serviceUp.WithLabelValues("test-up-false").Write(metric)
	assert.NoError(t, err)
	assert.Equal(t, float64(0), metric.Gauge.GetValue())
}

func TestMonitor_IncrementSuccess(t *testing.T) {
	setupTest()

	monitor := NewMonitor("test-success", 9095)
	monitor.IncrementSuccess()
	monitor.IncrementSuccess()
	monitor.IncrementSuccess()

	metric := &dto.Metric{}
	err := monitor.scrapeSuccess.WithLabelValues("test-success").Write(metric)
	assert.NoError(t, err)
	assert.Equal(t, float64(3), metric.Counter.GetValue())
}

func TestMonitor_IncrementFailure(t *testing.T) {
	setupTest()

	monitor := NewMonitor("test-failure", 9096)
	monitor.IncrementFailure()
	monitor.IncrementFailure()

	metric := &dto.Metric{}
	err := monitor.scrapeFailure.WithLabelValues("test-failure").Write(metric)
	assert.NoError(t, err)
	assert.Equal(t, float64(2), metric.Counter.GetValue())
}

func TestMonitor_MonitorTask_Success(t *testing.T) {
	setupTest()

	monitor := NewMonitor("test-monitor-success", 9097)
	task := &mockTask{shouldFail: false}

	err := monitor.MonitorTask(task)

	assert.NoError(t, err)
	assert.True(t, task.executed)

	successMetric := &dto.Metric{}
	err = monitor.scrapeSuccess.WithLabelValues("test-monitor-success").Write(successMetric)
	assert.NoError(t, err)
	assert.Equal(t, float64(1), successMetric.Counter.GetValue())

	serviceUpMetric := &dto.Metric{}
	err = monitor.serviceUp.WithLabelValues("test-monitor-success").Write(serviceUpMetric)
	assert.NoError(t, err)
	assert.Equal(t, float64(1), serviceUpMetric.Gauge.GetValue())
}

func TestMonitor_MonitorTask_Failure(t *testing.T) {
	setupTest()

	monitor := NewMonitor("test-monitor-failure", 9098)
	task := &mockTask{shouldFail: true}

	err := monitor.MonitorTask(task)

	assert.Error(t, err)
	assert.True(t, task.executed)

	failureMetric := &dto.Metric{}
	err = monitor.scrapeFailure.WithLabelValues("test-monitor-failure").Write(failureMetric)
	assert.NoError(t, err)
	assert.Equal(t, float64(1), failureMetric.Counter.GetValue())

	serviceUpMetric := &dto.Metric{}
	err = monitor.serviceUp.WithLabelValues("test-monitor-failure").Write(serviceUpMetric)
	assert.NoError(t, err)
	assert.Equal(t, float64(0), serviceUpMetric.Gauge.GetValue())
}

func TestMonitor_MonitorTask_MultipleSuccess(t *testing.T) {
	setupTest()

	monitor := NewMonitor("test-multiple-success", 9099)
	task := &mockTask{shouldFail: false}

	monitor.MonitorTask(task)
	monitor.MonitorTask(task)
	monitor.MonitorTask(task)

	successMetric := &dto.Metric{}
	err := monitor.scrapeSuccess.WithLabelValues("test-multiple-success").Write(successMetric)
	assert.NoError(t, err)
	assert.Equal(t, float64(3), successMetric.Counter.GetValue())
}

func TestMonitor_MonitorTask_MixedResults(t *testing.T) {
	setupTest()

	monitor := NewMonitor("test-mixed", 9100)
	successTask := &mockTask{shouldFail: false}
	failureTask := &mockTask{shouldFail: true}

	monitor.MonitorTask(successTask)
	monitor.MonitorTask(failureTask)
	monitor.MonitorTask(successTask)
	monitor.MonitorTask(failureTask)

	successMetric := &dto.Metric{}
	err := monitor.scrapeSuccess.WithLabelValues("test-mixed").Write(successMetric)
	assert.NoError(t, err)
	assert.Equal(t, float64(2), successMetric.Counter.GetValue())

	failureMetric := &dto.Metric{}
	err = monitor.scrapeFailure.WithLabelValues("test-mixed").Write(failureMetric)
	assert.NoError(t, err)
	assert.Equal(t, float64(2), failureMetric.Counter.GetValue())
}

func TestBtoi_True(t *testing.T) {
	result := btoi(true)
	assert.Equal(t, float64(1), result)
}

func TestBtoi_False(t *testing.T) {
	result := btoi(false)
	assert.Equal(t, float64(0), result)
}
