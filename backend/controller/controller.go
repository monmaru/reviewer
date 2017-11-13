package controller

import (
	"encoding/json"
	"net/http"

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

// GetAllIOSReviews ...
func (c *ReviewController) GetAllIOSReviews(w http.ResponseWriter, r *http.Request) error {
	reviews, err := c.db.ReadAllIOS(mux.Vars(r)["name"])
	if err != nil {
		return err
	}
	return JSON(w, http.StatusOK, reviews)
}

// GetAllAndroidReviews ...
func (c *ReviewController) GetAllAndroidReviews(w http.ResponseWriter, r *http.Request) error {
	reviews, err := c.db.ReadAllAndroid(mux.Vars(r)["name"])
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
