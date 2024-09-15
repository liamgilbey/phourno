package config

import (
	"fmt"
	"log"
	"os"
	"time"
	"github.com/liamgilbey/phourno/models"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

var DB *gorm.DB

func InitDB() {
    // Get environment variables for database configuration
    dbHost := os.Getenv("DB_HOST")
    dbUser := os.Getenv("DB_USER")
    dbPassword := os.Getenv("DB_PASSWORD")
    dbName := os.Getenv("DB_NAME")
    dbPort := os.Getenv("DB_PORT")

    // Check if any of the environment variables are not set
    if dbHost == "" || dbUser == "" || dbPassword == "" || dbName == "" || dbPort == "" {
        log.Fatalf("Missing required environment variables for DB connection")
    }	

    // Create the DSN (Data Source Name) string for PostgreSQL
    dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=disable",
        dbHost, dbUser, dbPassword, dbName, dbPort)	

	// Set up GORM logger for database query logging
	newLogger := logger.New(
		log.New(os.Stdout, "\r\n", log.LstdFlags), // Use standard Go log for output
		logger.Config{
			SlowThreshold: time.Second,   // Log queries slower than this threshold
			LogLevel:      logger.Info,   // Log level (Info, Warn, Error)
			Colorful:      true,          // Enable colored output
		},
	)

	var err error
	DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{
		Logger: newLogger,
	})
	if err != nil {
		log.Fatal("Failed to connect to the database:", err)
	}

	// Automatically migrate the schema
	err = DB.AutoMigrate(models.User{}, models.Photo{}, models.Calendar{})
	if err != nil {
		log.Fatal("Failed to migrate the database:", err)
	}

	log.Println("Successfully connected to the database!")
}
