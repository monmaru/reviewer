package backend

import (
	"io"
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/monmaru/reviewer/backend/controller"
	"github.com/monmaru/reviewer/backend/repository"
)

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
	c := controller.New(db)
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
			log.Printf("Handle panic %s: %+v\n", r.URL, rv)
			w.WriteHeader(http.StatusInternalServerError)
		}
	}()
	if err := fn(w, r); err != nil {
		log.Printf("Error serving %s: %+v\n", r.URL, err)
		w.WriteHeader(http.StatusInternalServerError)
	}
}
