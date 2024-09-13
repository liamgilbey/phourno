package config

import (
	"log"
	"github.com/liamgilbey/phourno/models"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func InitDB() {
	var err error
	dsn := "host=localhost user=postgres password=mysecretpassword dbname=photo_journal port=5432 sslmode=disable"
	DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect to the database:", err)
	}

	// Automatically migrate the schema
	err = DB.AutoMigrate(&models.User{}, &models.Photo{})
	if err != nil {
		log.Fatal("Failed to migrate the database:", err)
	}
}
