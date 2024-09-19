package routes

import (
	"net/http"
	"os"
	"github.com/liamgilbey/phourno/config"
	"github.com/liamgilbey/phourno/models"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
)

var jwtKey = []byte(os.Getenv("APP_SECRET_KEY"))

type Credentials struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

// RegisterUser registers a new user
func RegisterUser(c *gin.Context) {
	var creds Credentials
	if err := c.BindJSON(&creds); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}

	// Hash the password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(creds.Password), bcrypt.DefaultCost)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to hash password"})
		return
	}

	// Create and save the user in the database
	user := models.User{Username: creds.Username, Password: string(hashedPassword), RegistrationDatetime:time.Now()}
	if result := config.DB.Create(&user); result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to register user"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Registration successful"})
}

// LoginUser handles user login and generates JWT token
func LoginUser(c *gin.Context) {
	var creds Credentials
	if err := c.BindJSON(&creds); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}

	// Fetch user from the database
	var user models.User
	if result := config.DB.Where("username = ?", creds.Username).First(&user); result.Error != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid credentials"})
		return
	}

	// Check if the password is correct
	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(creds.Password)); err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid credentials"})
		return
	}

	// Generate JWT token
	token, err := generateJWT(user.Username)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate token"})
		return
	}

	// Save photo metadata in the database
	login := models.Login{
		UserID:    user.UserID,
		LoginDateTime: time.Now(),
	}
	if result := config.DB.Create(&login); result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to register login database record"})
		return
	}	

	c.JSON(http.StatusOK, gin.H{"token": token})
}

// generateJWT generates a new JWT token for the authenticated user
func generateJWT(username string) (string, error) {
	expirationTime := time.Now().Add(24 * time.Hour) // Token expires in 24 hours
	claims := &jwt.RegisteredClaims{
		Subject:   username,
		ExpiresAt: jwt.NewNumericDate(expirationTime),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(jwtKey)
}
