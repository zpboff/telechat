package users

import (
	"database/sql"
	"errors"
	"services/registration/models"
	"services/registration/validators"
)

func GetUsers(db *sql.DB, from, size int) ([]UserEntity, error) {
	return nil, errors.New("not implemented")
}

func CreateUser(model *models.UserCreateRequest) (*models.UserCreateRequest, error) {
	if err := validators.ValidateRequest(model); err != nil {
		return nil, err
	}

	return model, nil
}
