package db

import (
	"context"
	"github.com/jackc/pgx/v4/pgxpool"
	"log"
	"services/registration/configs"
)

func GetConnection() *pgxpool.Pool {
	pool, dbError := pgxpool.Connect(context.Background(), configs.Configs.Db.ConnectionString)

	if dbError != nil {
		log.Fatalf("Ошибка подключения к базе: %s", dbError)
		return nil
	}

	return pool
}
