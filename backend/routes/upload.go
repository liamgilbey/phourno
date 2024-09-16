package routes

import (
	"fmt"
	"path/filepath"
	"net/http"
	"github.com/liamgilbey/phourno/config"
	"github.com/liamgilbey/phourno/models"
	"time"

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

	// Retrieve the uploaded file
	file, err := c.FormFile("photo")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "No file uploaded"})
		return
	}

	// Save the file to disk
	filePath := fmt.Sprintf("/uploads/%d/%d%s", user.UserID, time.Now().Unix(), filepath.Ext(file.Filename))
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

	c.JSON(http.StatusOK, gin.H{
		"message":  "Photo uploaded successfully",
		"new-filePath": filePath,
	})
}
