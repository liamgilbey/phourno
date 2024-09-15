// models/user.go
package models

import (
	"time"
)

type User struct {
	UserID       uint   `gorm:"primaryKey"`
	Username string `gorm:"unique"`
	Password string
	RegistrationDatetime time.Time 
}
