package controller

import (
	"encoding/json"
	"net/http"
	"strconv"
	"time"

	"github.com/gorilla/mux"
	"github.com/monmaru/reviewer/backend/repository"
	"github.com/patrickmn/go-cache"
	"go.uber.org/zap"
)

// ReviewController ...
type ReviewController struct {
	db     repository.DB
	logger *zap.Logger
	cache  *cache.Cache
}

// New ...
func New(db repository.DB, logger *zap.Logger) *ReviewController {
	return &ReviewController{
		db:     db,
		logger: logger,
		cache:  cache.New(5*time.Minute, 30*time.Second),
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

	c.logger.Info("GetIOSReviews", zap.String("app", appName), zap.Int("limit", limit))
	defer c.logger.Sync()

	cacheKey := "ios" + appName + strconv.Itoa(limit)
	if cv, found := c.cache.Get(cacheKey); found {
		c.logger.Info("Cache hit", zap.String("app", appName), zap.Int("limit", limit))
		return JSON(w, http.StatusOK, cv)
	}

	reviews, err := c.db.ReadIOSApp(appName, limit)
	if err != nil {
		return err
	}

	c.cache.Set(cacheKey, reviews, cache.DefaultExpiration)
	return JSON(w, http.StatusOK, reviews)
}

// GetAndroidReviews ...
func (c *ReviewController) GetAndroidReviews(w http.ResponseWriter, r *http.Request) error {
	appName, limit, err := readParams(r)
	if err != nil {
		return err
	}

	c.logger.Info("GetAndroidReviews", zap.String("app", appName), zap.Int("limit", limit))
	defer c.logger.Sync()

	cacheKey := "android" + appName + strconv.Itoa(limit)
	if cv, found := c.cache.Get(cacheKey); found {
		c.logger.Info("Cache hit", zap.String("app", appName), zap.Int("limit", limit))
		return JSON(w, http.StatusOK, cv)
	}

	reviews, err := c.db.ReadAndroidApp(appName, limit)
	if err != nil {
		return err
	}

	c.cache.Set(cacheKey, reviews, cache.DefaultExpiration)
	return JSON(w, http.StatusOK, reviews)
}

// JSON ...
func JSON(w http.ResponseWriter, code int, data interface{}) error {
	w.WriteHeader(code)
	return json.NewEncoder(w).Encode(data)
}
