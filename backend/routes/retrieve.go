package routes

import (
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/liamgilbey/phourno/config"
	"github.com/liamgilbey/phourno/models"
)

// GetPhoto retrieves and serves a photo file for an authenticated user
func GetPhoto(c *gin.Context) {
	// Retrieve user ID and photo date from URL parameters
	username := c.GetString("username")

	// Fetch the user from the database
	var user models.User
	if result := config.DB.Where("username = ?", username).First(&user); result.Error != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "User not found"})
		return
	}
	photoDate := c.Param("photo_date")

	// Fetch the photo from the database
	var photo models.Photo
	if result := config.DB.Where("user_id = ? AND DATE_FORMAT(upload_datetime, '%Y%m%d') = ?", user.UserID, photoDate).First(&photo); result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Photo not found"})
		return
	}

	// Check if the photo file exists on disk
	filePath := photo.PhotoPath
	if _, err := os.Stat(filePath); os.IsNotExist(err) {
		c.JSON(http.StatusNotFound, gin.H{"error": "File not found"})
		return
	}

	// Serve the photo file
	c.File(filePath)
}
