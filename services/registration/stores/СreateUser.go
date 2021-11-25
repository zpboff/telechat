package stores

import (
	"services/registration/models"
	"services/registration/validators"
)

func CreateUser(model *models.UserCreateRequest) (*models.UserCreateRequest, error) {
	if err := validators.ValidateRequest(model); err != nil {
		return nil, err
	}

	return model, nil
}