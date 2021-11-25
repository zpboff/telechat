package main

import (
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"log"
	"services/registration/routes"
)

func main() {
	server := gin.Default()
	if envErr := godotenv.Load(); envErr != nil {
		log.Print("No .env file found")
	}

	server.POST("/", routes.RegisterUser)

	if serverErr := server.Run(); serverErr != nil {
		log.Print("Server did not running")
	}
}
