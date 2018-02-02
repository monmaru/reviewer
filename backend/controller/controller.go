package controller

import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
	"github.com/monmaru/reviewer/backend/repository"
	"go.uber.org/zap"
)

// ReviewController ...
type ReviewController struct {
	db     repository.DB
	logger *zap.Logger
}

// New ...
func New(db repository.DB, logger *zap.Logger) *ReviewController {
	return &ReviewController{
		db:     db,
		logger: logger,
	}
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
	c.logger.Info("GetIOSReviews",
		zap.String("app", appName),
		zap.Int("limit", limit),
	)
	defer c.logger.Sync()
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
	c.logger.Info("GetAndroidReviews",
		zap.String("app", appName),
		zap.Int("limit", limit),
	)
	defer c.logger.Sync()
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
