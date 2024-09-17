package routes

import (
	"fmt"
	"path/filepath"
	"net/http"
	"github.com/liamgilbey/phourno/config"
	"github.com/liamgilbey/phourno/models"
	"time"
	"os"

	"github.com/gin-gonic/gin"
)

// UploadPhoto handles the photo upload for authenticated users
func UploadPhoto(c *gin.Context) {
	username := c.GetString("username")

	// Fetch the user from the database
	var user models.User
	if result := config.DB.Where("username = ?", username).First(&user); result.Error != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "User not found"})
		return
	}

	// Retrieve the expected_date from the form (optional)
	photoDateStr := c.PostForm("photo_date")
	var photoDate time.Time
	var err error // Declare err here so it's accessible in both branches

	// If no date is provided, use today's date
	if photoDateStr == "" {
		photoDate = time.Now() // Default to today's date
	} else {
		// Parse the provided date (assuming it is in YYYY-MM-DD format)
		photoDate, err = time.Parse("2006-01-02", photoDateStr)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid date format. Please use YYYY-MM-DD"})
			return
		}
	}	

	// Retrieve the uploaded file
	file, err := c.FormFile("photo")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "No file uploaded"})
		return
	}

	// Save the file to disk
	filePath := fmt.Sprintf("/uploads/%d/%s%s", user.UserID, photoDate.Format("20060102"), filepath.Ext(file.Filename))

	// Check if the file already exists
	if _, err := os.Stat(filePath); err == nil {
		// If the file exists, return an error
		c.JSON(http.StatusConflict, gin.H{"error": "Photo for this day already exists"})
		return
	} else if !os.IsNotExist(err) {
		// If there's an error other than "file not exists", return a server error
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to check file existence"})
		return
	}

	// save file to disk
	if err := c.SaveUploadedFile(file, filePath); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save file"})
		return
	}

	// Save photo metadata in the database
	photo := models.Photo{
		UserID:    user.UserID,
		PhotoPath:      filePath,
		UploadDatetime: time.Now(),
	}
	config.DB.Create(&photo)

	var uploadedPhoto models.Photo
	if result := config.DB.Where("user_id = ? AND PhotoPath= ?", user.UserID, filePath).First(&uploadedPhoto); result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Photo not found"})
		return
	}

	calendar := models.Calendar{
		UserID:		user.UserID,
		CalendarDate: photoDate,
		PhotoID: uploadedPhoto.PhotoID,
	}
	config.DB.Create(&calendar)

	c.JSON(http.StatusOK, gin.H{
		"message":  "Photo uploaded successfully",
		"new-filePath": filePath,
	})
}
