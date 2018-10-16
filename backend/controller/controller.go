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

type parameter struct {
	limit int
	name  string
}

// New ...
func New(db repository.DB, logger *zap.Logger) *ReviewController {
	return &ReviewController{
		db:     db,
		logger: logger,
		cache:  cache.New(5*time.Minute, 30*time.Second),
	}
}

func readParams(r *http.Request) (parameter, error) {
	p := parameter{}
	q := r.URL.Query()
	limit, err := strconv.Atoi(q.Get("limit"))
	if err != nil {
		return p, err
	}
	appName := mux.Vars(r)["name"]
	p.limit = limit
	p.name = appName
	return p, nil
}

// GetIOSReviews ...
func (c *ReviewController) GetIOSReviews(w http.ResponseWriter, r *http.Request) error {
	p, err := readParams(r)
	if err != nil {
		return err
	}

	c.logger.Info("GetIOSReviews", zap.String("app", p.name), zap.Int("limit", p.limit))
	defer c.logger.Sync()

	cacheKey := "ios" + p.name + strconv.Itoa(p.limit)
	if cv, found := c.cache.Get(cacheKey); found {
		c.logger.Info("Cache hit", zap.String("app", p.name), zap.Int("limit", p.limit))
		return JSON(w, http.StatusOK, cv)
	}

	reviews, err := c.db.ReadIOSApp(p.name, p.limit)
	if err != nil {
		return err
	}

	c.cache.Set(cacheKey, reviews, cache.DefaultExpiration)
	return JSON(w, http.StatusOK, reviews)
}

// GetAndroidReviews ...
func (c *ReviewController) GetAndroidReviews(w http.ResponseWriter, r *http.Request) error {
	p, err := readParams(r)
	if err != nil {
		return err
	}

	c.logger.Info("GetAndroidReviews", zap.String("app", p.name), zap.Int("limit", p.limit))
	defer c.logger.Sync()

	cacheKey := "android" + p.name + strconv.Itoa(p.limit)
	if cv, found := c.cache.Get(cacheKey); found {
		c.logger.Info("Cache hit", zap.String("app", p.name), zap.Int("limit", p.limit))
		return JSON(w, http.StatusOK, cv)
	}

	reviews, err := c.db.ReadAndroidApp(p.name, p.limit)
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
