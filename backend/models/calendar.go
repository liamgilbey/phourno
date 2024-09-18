// models/calendar.go
package models

import (
	"time"
)

type Calendar struct {
	CalendarID uint `gorm:"primaryKey"`
	UserID uint `gorm:"index:user_date,unique"`
	CalendarDate time.Time `gorm:"type:date;index:user_date,unique"` // Only store the date part (without time)
	PhotoID uint
}
