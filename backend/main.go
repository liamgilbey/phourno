package main

import (

	"github.com/liamgilbey/phourno/config"
	"github.com/liamgilbey/phourno/routes"
	"github.com/liamgilbey/phourno/middleware"

	"github.com/gin-gonic/gin"
)

func main() {
	// Initialize the database
	config.InitDB()

	// Create a new Gin router
	router := gin.Default()

	// Public Routes
	router.GET("/healthcheck", routes.Healthcheck)
	router.POST("/register", routes.RegisterUser)
	router.POST("/login", routes.LoginUser)

	// Protected routes (JWT required)
	protected := router.Group("/")
	protected.Use(middleware.AuthMiddleware())
	protected.POST("/upload", routes.UploadPhoto)

	// Start the server
	router.Run(":8080")
}
