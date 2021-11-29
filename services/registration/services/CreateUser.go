package services

import (
	"errors"
	"github.com/nu7hatch/gouuid"
	"services/registration/models"
	"services/registration/stores"
	"services/registration/validators"
)

func CreateUser(user *models.UserCreateRequest) (*stores.UserEntity, models.RegistrationResult, error) {
	if validationErr := validators.ValidateUserCreateRequest(user); validationErr != nil {
		return nil, models.InvalidRequest, validationErr
	}

	isExists := stores.GetUser(user.Email) != nil

	if isExists {
		return nil, models.UserAlreadyExists, errors.New("пользователь уже существует")
	}

	login, _ := uuid.NewV4()

	userEntity := stores.UserEntity{
		Password:  user.Password,
		Email:     user.Email,
		LastName:  user.LastName,
		FirstName: user.FirstName,
		Login:     login.String(),
	}

	stores.SaveUser(userEntity)

	return &userEntity, models.Success, nil
}
