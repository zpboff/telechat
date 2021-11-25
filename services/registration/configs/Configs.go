package configs

import (
	"gopkg.in/yaml.v3"
	"log"
	"os"
)

type Service struct {
	ConnectionString string `yaml:"connectionString"`
}

type Config struct {
	Logger Service `yaml:"logger"`
	Db     Service `yaml:"db"`
	Server struct {
		Port int `yaml:"port"`
	} `yaml:"server"`
}

var Configs = Config{}

func (config *Config) Init() {
	fileStream, fileReadErr := os.Open("configs/configs.yml")

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

	decoder := yaml.NewDecoder(fileStream)
	decodeErr := decoder.Decode(&Configs)

	if decodeErr != nil {
		log.Fatalf("Ошибка при биндинге конфигурации: %s", decodeErr)
		return
	}
}
