// models/photo.go
package models

import "time"

type Photo struct {
	photo_id        uint      `gorm:"primaryKey"`
	user_id    uint      // Foreign key to the User model
	photo_path      string    // File path to the uploaded photo
	upload_datetime time.Time // The date when the photo was uploaded
}
