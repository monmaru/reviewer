package repository

import (
	"database/sql"
	"fmt"

	"github.com/monmaru/reviewer/backend/model"
	"github.com/pkg/errors"
)

// DB ...
type DB interface {
	ReadAllIOS(appName string) ([]model.Review, error)
	ReadAllAndroid(appName string) ([]model.Review, error)
}

// ReviewRepository ...
type ReviewRepository struct {
	path string
}

// NewReviewRepository ...
func NewReviewRepository(path string) *ReviewRepository {
	return &ReviewRepository{path: path}
}

// Open database
func (r *ReviewRepository) open() (*sql.DB, error) {
	return sql.Open("sqlite3", r.path)
}

// ReadAllIOS ...
func (r *ReviewRepository) ReadAllIOS(appName string) ([]model.Review, error) {
	return r.readAll("appstore", appName)
}

// ReadAllAndroid ...
func (r *ReviewRepository) ReadAllAndroid(appName string) ([]model.Review, error) {
	return r.readAll("googleplay", appName)
}

func (r *ReviewRepository) readAll(tableName, appName string) ([]model.Review, error) {
	query := fmt.Sprintf(
		"SELECT title, content, author, rating, date, version FROM %s WHERE app_name = '%s'",
		tableName,
		appName,
	)

	db, err := r.open()
	if err != nil {
		return nil, errors.WithStack(err)
	}
	defer db.Close()

	rows, err := db.Query(query)
	if err != nil {
		return nil, errors.WithStack(err)
	}
	defer rows.Close()

	reviews := []model.Review{}
	for rows.Next() {
		var title string
		var content string
		var author string
		var rating int
		var date string
		var version string
		rows.Scan(&title, &content, &author, &rating, &date, &version)

		review := model.Review{
			Title:   title,
			Comment: content,
			Author:  author,
			Star:    rating,
			Date:    date,
			Version: version,
		}
		reviews = append(reviews, review)
	}
	return reviews, nil
}
