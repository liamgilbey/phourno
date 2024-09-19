// models/login.go
package models

import (
	"time"
)

type Login struct {
	LoginID       uint   `gorm:"primaryKey"`
	UserID uint 
	LoginDateTime time.Time
}
