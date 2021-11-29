package services

import (
	"errors"
	"github.com/nu7hatch/gouuid"
	"golang.org/x/crypto/bcrypt"
	"services/registration/configs"
	"services/registration/models"
	"services/registration/stores"
	"services/registration/validators"
)

func CreateUser(user *models.UserCreateRequest) (*stores.UserEntity, models.RegistrationResult, error) {
	if validationErr := validators.ValidateUserCreateRequest(user); validationErr != nil {
		return nil, models.InvalidRequest, validationErr
	}

	isExists, isExistsError := stores.UserExists(user.Email)

	if isExistsError != nil {
		return nil, models.InternalError, errors.New("ошибка сервера")
	}

	if isExists {
		return nil, models.UserAlreadyExists, errors.New("пользователь уже существует")
	}

	password, isExistsError := bcrypt.GenerateFromPassword([]byte(user.Password), configs.Configs.Security.Salt)

	if isExistsError != nil {
		return nil, models.InternalError, errors.New("ошибка сервера")
	}

	login, _ := uuid.NewV4()

	userEntity := stores.UserEntity{
		Password:  string(password),
		Email:     user.Email,
		LastName:  user.LastName,
		FirstName: user.FirstName,
		Login:     login.String(),
	}

	id := stores.SaveUser(userEntity)

	if id == nil {
		return nil, models.InternalError, errors.New("ошибка сервера")
	}

	userEntity.Id = *id

	return &userEntity, models.Success, nil
}
