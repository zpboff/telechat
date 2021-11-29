package services

import (
	"services/registration/models"
	"services/registration/stores/users"
	"services/registration/validators"
)

func CreateUser(model *models.UserCreateRequest) (*users.UserEntity, models.RegistrationResult, error) {
	if validationErr := validators.ValidateUserCreateRequest(model); validationErr != nil {
		return nil, models.InvalidRequest, validationErr
	}

	return users.CreateUser(model)
}
