package routes

import (
	"net/http"
	"github.com/liamgilbey/phourno/config"
	"github.com/liamgilbey/phourno/models"
	"time"

	"github.com/gin-gonic/gin"
)

// function to delete a photo
// for now, does not actually delete, but unlinks the photo from this day in the database
func DeletePhoto(c *gin.Context){
	username := c.GetString("username")

	// Fetch the user from the database
	var user models.User
	if result := config.DB.Where("username = ?", username).First(&user); result.Error != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "User not found"})
		return
	}

	// Retrieve the expected_date from the form (optional)
	photoDateStr := c.Param("photo_date")
	var photoDate time.Time
	var err error 

	// Parse the provided date (assuming it is in YYYY-MM-DD format)
	photoDate, err = time.Parse("2006-01-02", photoDateStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid date format. Please use YYYY-MM-DD"})
		return
	}

	// Check if a calendar entry already exists for this user and date
	var calendar models.Calendar
	if result := config.DB.Where("user_id = ? AND calendar_date = ?", user.UserID, photoDate).First(&calendar); result.Error != nil {
		// Handle the case where no existing entry is found
		c.JSON(http.StatusNotFound, gin.H{"error": "Calendar entry not found for the specified date"})
		return
	}

	// Unlink the photo by setting the PhotoID to 0
	calendar.PhotoID = 0	

	// Save the updated record in the database
    if err := config.DB.Save(&calendar).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to remove photo linkage"})
        return
    }

	c.JSON(http.StatusOK, gin.H{
		"message":  "Photo deleted successfully",
	})
}