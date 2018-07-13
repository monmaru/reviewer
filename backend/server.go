package backend

import (
	"fmt"
	"io"
	"io/ioutil"
	"log"
	"net/http"
	"path/filepath"
	"strings"
	"time"

	"github.com/gorilla/mux"
	"github.com/monmaru/reviewer/backend/controller"
	"github.com/monmaru/reviewer/backend/repository"
	"go.uber.org/zap"
	"go.uber.org/zap/zapcore"
	lumberjack "gopkg.in/natefinch/lumberjack.v2"
)

var logger *zap.Logger

func init() {
	config := zap.NewProductionConfig()
	config.EncoderConfig.EncodeTime = jstTimeEncoder
	enc := zapcore.NewJSONEncoder(config.EncoderConfig)
	sink := zapcore.AddSync(
		&lumberjack.Logger{
			Filename:   "./reviewer.log",
			MaxSize:    500,
			MaxBackups: 3,
			MaxAge:     30,
		},
	)
	logger = zap.New(zapcore.NewCore(enc, sink, config.Level))
}

func jstTimeEncoder(t time.Time, enc zapcore.PrimitiveArrayEncoder) {
	const layout = "2006-01-02 15:04:05"
	jst := time.FixedZone("Asia/Tokyo", 9*60*60)
	enc.AppendString(t.In(jst).Format(layout))
}

// Server ...
type Server struct {
	dbPath string
}

// New ...
func New(dbPath string) *Server {
	return &Server{dbPath: dbPath}
}

// Run ...
func (s *Server) Run(addr, reportDir string) {
	log.Printf("start listening on %s", addr)
	db := repository.NewReviewRepository(s.dbPath)
	log.Fatal(http.ListenAndServe(addr, s.route(db, reportDir)))
}

func (s *Server) route(db repository.DB, reportDir string) *mux.Router {
	router := mux.NewRouter()
	// Health check
	router.HandleFunc("/ping", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		io.WriteString(w, "pong")
	}).Methods("GET")

	// REST API
	c := controller.New(db, logger)
	router.Handle("/api/reviews/ios/{name}", try(c.GetIOSReviews)).Methods("GET")
	router.Handle("/api/reviews/android/{name}", try(c.GetAndroidReviews)).Methods("GET")

	// Static files
	router.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "public/index.html")
	}).Methods("GET")
	router.HandleFunc("/about", func(w http.ResponseWriter, r *http.Request) {
		http.Redirect(w, r, "/", http.StatusMovedPermanently)
	}).Methods("GET")
	router.HandleFunc("/report", func(w http.ResponseWriter, r *http.Request) {
		http.Redirect(w, r, "/", http.StatusMovedPermanently)
	}).Methods("GET")
	router.PathPrefix("/static/").Handler(http.StripPrefix("/static/", http.FileServer(http.Dir("public")))).Methods("GET")
	router.PathPrefix("/download/").HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		paths := strings.Split(r.URL.Path, "/")
		data, err := ioutil.ReadFile(filepath.Join(reportDir, paths[len(paths)-1]))
		if err != nil {
			w.WriteHeader(http.StatusNotFound)
			return
		}

		if strings.HasSuffix(r.URL.Path, ".xlsx") {
			w.Header().Set("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
		}
		w.Write(data)
	}).Methods("GET")
	return router
}

type try func(w http.ResponseWriter, r *http.Request) error

func (fn try) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	defer func() {
		if rv := recover(); rv != nil {
			logger.Fatal(fmt.Sprintf("Handle panic %s: %+v\n", r.URL, rv))
			defer logger.Sync()
			w.WriteHeader(http.StatusInternalServerError)
		}
	}()
	if err := fn(w, r); err != nil {
		logger.Error(fmt.Sprintf("Error serving %s: %+v\n", r.URL, err))
		defer logger.Sync()
		w.WriteHeader(http.StatusInternalServerError)
	}
}
