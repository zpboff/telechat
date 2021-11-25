package models

type Service struct {
	ConnectionString string `yaml:"connectionString"`
}

type Configs struct {
	Logger Service `yaml:"logger"`
	Db     Service `yaml:"db"`
	Server struct {
		Port int `yaml:"port"`
	} `yaml:"server"`
}
