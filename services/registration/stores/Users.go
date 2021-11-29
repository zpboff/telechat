package stores

import (
	"context"
	"services/registration/db"
)

type UserEntity struct {
	Id        int
	Login     string
	Email     string
	Password  string
	FirstName string
	LastName  string
}

func UserExists(email string) (bool, error) {
	var exists bool
	connection := db.GetConnection()

	existsErr := connection.QueryRow(context.Background(), "SELECT EXISTS(SELECT 1 from users where email=$1)", &email).Scan(&exists)

	defer connection.Close()

	return exists, existsErr
}

func SaveUser(user UserEntity) *int {
	var id int
	connection := db.GetConnection()

	err := connection.QueryRow(context.Background(), `
INSERT INTO	users
	(Login, Email, Password, LastName, FirstName)
VALUES
	($1, $2, $3, $4, $5)
RETURNING id
`, user.Login, user.Email, user.Password, user.LastName, user.FirstName).Scan(&id)

	defer connection.Close()

	if err != nil {
		return nil
	}

	return &id
}
