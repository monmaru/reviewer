package repository

import "github.com/monmaru/reviewer/backend/model"

// DB ...
type DB interface {
	ReadIOSApp(appName string, limit int) ([]model.Review, error)
	ReadAndroidApp(appName string, limit int) ([]model.Review, error)
}
