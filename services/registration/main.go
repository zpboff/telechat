package main

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"gopkg.in/Graylog2/go-gelf.v2/gelf"
	"gopkg.in/yaml.v2"
	"io"
	"log"
	"os"
	"services/registration/middlewares"
	"services/registration/models"
	"services/registration/routes"
)

func main() {
	fileStream, fileReadErr := os.Open("configs.yml")

	if fileReadErr != nil {
		log.Fatalf("Ошибка при чтении файла конфигурации: %s", fileReadErr)
		return
	}

	defer func(fileStream *os.File) {
		closeStreamErr := fileStream.Close()
		if closeStreamErr != nil {
			log.Fatalf("Ошибка при прекращении чтения файла конфигурации: %s", closeStreamErr)
			return
		}
	}(fileStream)

	var cfg models.Configs
	decoder := yaml.NewDecoder(fileStream)
	decodeErr := decoder.Decode(&cfg)

	if decodeErr != nil {
		log.Fatalf("Ошибка при биндинге конфигурации: %s", decodeErr)
		return
	}

	var logger, loggerErr = gelf.NewUDPWriter(cfg.Logger.ConnectionString)

	if loggerErr != nil {
		log.Fatalf("Ошибка при подключении к Seq: %s", loggerErr)
		return
	}

	log.SetOutput(io.MultiWriter(os.Stderr, logger))
	server := gin.Default()
	server.Use(middlewares.LoggerMiddleware)

	server.POST("/", routes.RegisterUser)

	log.Print(fmt.Sprintf("Запуск сервиса регистрации: localhost:%d", cfg.Server.Port))

	if serverErr := server.Run(fmt.Sprintf(":%d", cfg.Server.Port)); serverErr != nil {
		log.Fatalf("Ошибка при запуске сервиса регистрации: %s", serverErr)
		return
	}
}
