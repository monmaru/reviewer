package backend

import (
	"fmt"
	"io"
	"log"
	"net/http"
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
func (s *Server) Run(addr string) {
	log.Printf("start listening on %s", addr)
	db := repository.NewReviewRepository(s.dbPath)
	log.Fatal(http.ListenAndServe(addr, s.route(db)))
}

func (s *Server) route(db repository.DB) *mux.Router {
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
	})
	router.HandleFunc("/about", func(w http.ResponseWriter, r *http.Request) {
		http.Redirect(w, r, "/", http.StatusMovedPermanently)
	})
	router.PathPrefix("/static/").Handler(
		http.StripPrefix("/static/", http.FileServer(http.Dir("public"))))
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
