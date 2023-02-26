package Controller

import (
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

func roomId(c *gin.Context) {
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
}

func ping(c *gin.Context) {
	c.String(200, "pong")
}

func rooms(c *gin.Context) {
	c.JSON(200, gin.H{
		"rooms": []string{"room1", "room2"},
	})
}

func serveIndex(c *gin.Context) {
	c.File("./frontend/public/index.html")
}

func serverRoom(c *gin.Context) {
	c.File("./frontend/public/room.html")
}

func StartServer() (router *gin.Engine) {
	router = gin.Default()
	router.GET("/ping", ping)
	router.POST("/room/:id", roomId)
	router.GET("/api/rooms", rooms)

	router.Static("/assets", "./frontend/public/assets")
	router.GET("/", serveIndex)
	router.GET("/index", serveIndex)
	router.GET("/room/:id", serverRoom)
	router.GET("/room", serverRoom)

	return

}
