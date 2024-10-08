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
	photoDateStr := c.PostForm("photo_date")
	var photoDate time.Time
	var err error 

	// Parse the provided date (assuming it is in YYYY-MM-DD format)
	photoDate, err = time.Parse("2006-01-02", photoDateStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid date format. Please use YYYY-MM-DD"})
		return
	}

	// now create the updated record in the database with the removed photo link
	// photo link is removed by setting the photoID to 0
	calendar := models.Calendar{
		UserID:		user.UserID,
		CalendarDate: photoDate,
		PhotoID: 0,
	}

	// Save the updated record in the database
    if err := config.DB.Save(&calendar).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to remove photo linkage"})
        return
    }

	c.JSON(http.StatusOK, gin.H{
		"message":  "Photo deleted successfully",
	})
}