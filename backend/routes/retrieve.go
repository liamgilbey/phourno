package routes

import (
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/liamgilbey/phourno/config"
	"github.com/liamgilbey/phourno/models"
)

func GetPhotoData(c *gin.Context) (*models.Photo, error) {

	// Retrieve user ID and photo date from URL parameters
	username := c.GetString("username")

	// Fetch the user from the database
	var user models.User
	if result := config.DB.Where("username = ?", username).First(&user); result.Error != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "User not found"})
		return nil, result.Error
	}
	photoDateStr := c.Param("photo_date")


	// Fetch the photo from the database
	var calendar models.Calendar
	if result := config.DB.Where("user_id = ? AND TO_CHAR(calendar_date, 'YYYYMMDD') = ?", user.UserID, photoDateStr).First(&calendar); result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "No photo found associated to this calendar date"})
		return nil, result.Error
	}

	// Check if the photo file exists on disk
	var photo models.Photo
	if result := config.DB.Where("photo_id = ?", calendar.PhotoID).First(&photo); result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "No photo found associated to this calendar date"})
		return nil, result.Error
	}
	
	// Return the found photo
	return &photo, nil
}

// GetPhoto retrieves and serves a photo file for an authenticated user
func GetPhoto(c *gin.Context) {
	
	// Get the photo data
	photo, err := GetPhotoData(c)
	if err != nil {
		return // Error already handled in GetPhotoData
	}

	filePath := photo.PhotoPath
	if _, err := os.Stat(filePath); os.IsNotExist(err) {
		c.JSON(http.StatusNotFound, gin.H{"error": "File not found"})
		return
	}

	// Serve the photo file
	c.File(filePath)
}


// GetPhoto retrieves and serves a photo thumbnail for an authenticated user
func GetThumbnail(c *gin.Context) {
	
	// Get the photo data
	photo, err := GetPhotoData(c)
	if err != nil {
		return // Error already handled in GetPhotoData
	}

	filePath := photo.ThumbnailPath
	if _, err := os.Stat(filePath); os.IsNotExist(err) {
		c.JSON(http.StatusNotFound, gin.H{"error": "File not found"})
		return
	}

	// Serve the photo file
	c.File(filePath)
}
