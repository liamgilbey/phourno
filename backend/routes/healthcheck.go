// routes/healthcheck.go
package routes

import (

	"net/http"
	"github.com/gin-gonic/gin"
)

func Healthcheck(c *gin.Context){
	c.JSON(http.StatusOK, gin.H{"message": "Server is alive and well"})
}