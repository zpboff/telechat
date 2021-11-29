package app

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"log"
	"services/registration/configs"
	"services/registration/middlewares"
	"services/registration/routes"
)

var Run = func() {
	configs.Configs.Init()
	server := gin.Default()
	server.Use(middlewares.LoggerMiddleware)
	routes.RegisterRoutes(server)

	log.Print(fmt.Sprintf("Запуск сервиса регистрации: localhost:%d", configs.Configs.Server.Port))

	if serverErr := server.Run(fmt.Sprintf(":%d", configs.Configs.Server.Port)); serverErr != nil {
		log.Fatalf("Ошибка при запуске сервиса регистрации: %s", serverErr)
		return
	}
}
