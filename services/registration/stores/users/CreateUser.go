package users

import (
	"services/registration/models"
	"services/registration/validators"
)

func CreateUser(model *models.UserCreateRequest) (*UserEntity, error) {
	if validationErr := validators.ValidateUserCreateRequest(model); validationErr != nil {
		return nil, validationErr
	}

	userEntity := UserEntity{
		Password:  model.Password,
		Email:     model.Email,
		LastName:  model.LastName,
		FirstName: model.FirstName,
		Id:        1,
		Login:     "",
	}

	return &userEntity, nil
}
