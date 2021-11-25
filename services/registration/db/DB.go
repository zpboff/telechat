package db

import (
	"context"
	"github.com/jackc/pgx/v4/pgxpool"
	"log"
	"services/registration/configs"
)

type Connector struct {
	pool *pgxpool.Pool
}

var Pool = Connector{}

func (db *Connector) Connect() {
	var dbError error
	db.pool, dbError = pgxpool.Connect(context.Background(), configs.Configs.Db.ConnectionString)

	if dbError != nil {
		log.Fatalf("Ошибка подключения к базе: %s", dbError)
		return
	}

	defer db.pool.Close()
}