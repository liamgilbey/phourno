package routes

import (
	"net/http"
	"github.com/gin-gonic/gin"
)

// VerifyTokenEndpoint is an example endpoint that verifies a token and returns the user's info
func VerifyTokenEndpoint(c *gin.Context) {
	// Since VerifyToken middleware already checks and sets the username, we can simply retrieve it
	username, exists := c.Get("username")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "User not found"})
		return
	}

	// Return the user's information if the token is valid
	c.JSON(http.StatusOK, gin.H{
		"message":  "Token is valid",
		"username": username,
	})
}
