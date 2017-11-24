package controller

import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
	"github.com/monmaru/reviewer/backend/repository"
)

// ReviewController ...
type ReviewController struct {
	db repository.DB
}

// New ...
func New(db repository.DB) *ReviewController {
	return &ReviewController{db: db}
}

func readParams(r *http.Request) (string, int, error) {
	q := r.URL.Query()
	limit, err := strconv.Atoi(q.Get("limit"))
	if err != nil {
		return "", 0, err
	}
	appName := mux.Vars(r)["name"]
	return appName, limit, nil
}

// GetIOSReviews ...
func (c *ReviewController) GetIOSReviews(w http.ResponseWriter, r *http.Request) error {
	appName, limit, err := readParams(r)
	if err != nil {
		return err
	}
	reviews, err := c.db.ReadIOSApp(appName, limit)
	if err != nil {
		return err
	}
	return JSON(w, http.StatusOK, reviews)
}

// GetAndroidReviews ...
func (c *ReviewController) GetAndroidReviews(w http.ResponseWriter, r *http.Request) error {
	appName, limit, err := readParams(r)
	if err != nil {
		return err
	}
	reviews, err := c.db.ReadAndroidApp(appName, limit)
	if err != nil {
		return err
	}
	return JSON(w, http.StatusOK, reviews)
}

// JSON ...
func JSON(w http.ResponseWriter, code int, data interface{}) error {
	w.WriteHeader(code)
	return json.NewEncoder(w).Encode(data)
}
