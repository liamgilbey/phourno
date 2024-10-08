package main

import (

	"github.com/liamgilbey/phourno/config"
	"github.com/liamgilbey/phourno/routes"
	"github.com/liamgilbey/phourno/middleware"

	"github.com/gin-gonic/gin"
	"github.com/gin-contrib/cors"

	"time"
)

func main() {
	// Initialize the database
	config.InitDB()

	// Create a new Gin router
	router := gin.Default()

	// CORS middleware configuration
    router.Use(cors.New(cors.Config{
        AllowOrigins:     []string{"http://localhost:3000"}, // Replace with your frontend URL
        AllowMethods:     []string{"GET", "POST", "PUT", "DELETE"},
        AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
        ExposeHeaders:    []string{"Content-Length"},
        AllowCredentials: true,
        MaxAge:           12 * time.Hour,
    }))

	// Public Routes
	router.GET("/healthcheck", routes.Healthcheck)
	router.POST("/register", routes.RegisterUser)
	router.POST("/login", routes.LoginUser)

	// Protected routes (JWT required)
	protected := router.Group("/")
	protected.Use(middleware.AuthMiddleware())
	protected.GET("/verify-auth", routes.VerifyTokenEndpoint)
	protected.GET("/photo/:photo_date", routes.GetPhoto)
	protected.GET("/thumbnail/:photo_date", routes.GetThumbnail)
	protected.POST("/upload", routes.UploadPhoto)

	// Start the server
	router.Run(":8080")
}
