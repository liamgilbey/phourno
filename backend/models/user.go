// models/user.go
package models

import (
	"time"
)

type User struct {
	user_id       uint   `gorm:"primaryKey"`
	username string `gorm:"unique"`
	password string
	registration_datetime time.Time 
}
