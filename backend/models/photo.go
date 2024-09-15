// models/photo.go
package models

import (
	"time"
)

type Photo struct {
	PhotoID        uint      `gorm:"primaryKey"`
	UserID    uint      // Foreign key to the User model
	PhotoPath      string    // File path to the uploaded photo
	UploadDatetime time.Time // The date when the photo was uploaded
}
