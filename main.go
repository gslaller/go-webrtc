package main

import (
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

func main() {
	// start a new gin engine
	r := gin.Default()

	// define a route

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

	// define a route to a static file
	r.Static("/assets", "./frontend/public/assets")
	r.GET("/", func(c *gin.Context) {
		c.File("./frontend/public/index.html")
	})
	r.GET("/index", func(c *gin.Context) {
		c.File("./frontend/public/index.html")
	})
	r.GET("/room/:id", func(c *gin.Context) {
		c.File("./frontend/public/room.html")
	})

	r.Run()
}
