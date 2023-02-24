package main

import (
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

func main() {
	// start a new gin engine
	r := gin.Default()

	// define a route
	r.GET("/", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "Hello World",
		})
	})

	r.POST("/room/:id", func(c *gin.Context) {
		// get query string
		roomname := c.Param("id")
		username := c.DefaultQuery("name", "anonymous")
		user_id := uuid.New()
		// return a json object with room id

		c.JSON(200, gin.H{
			"roomname": roomname,
			"user_id":  user_id,
			"username": username,
		})

	})

	// start the server

	r.Run()
}
