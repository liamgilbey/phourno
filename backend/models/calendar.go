// models/calendar.go
package models

import (
	"time"
)

type Calendar struct {
	CalendarID uint `gorm:"primaryKey"`
	UserID uint
	CalendarDate time.Time `gorm:"type:date"` // Only store the date part (without time)
	PhotoID uint
}
