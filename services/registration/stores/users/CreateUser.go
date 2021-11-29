package users

import (
	"errors"
	"services/registration/models"
)

var users []UserEntity

func CreateUser(model *models.UserCreateRequest) (*UserEntity, models.RegistrationResult, error) {
	userEntity := UserEntity{
		Password:  model.Password,
		Email:     model.Email,
		LastName:  model.LastName,
		FirstName: model.FirstName,
		Id:        1,
		Login:     "",
	}

	var isExists = false

	for _, user := range users {
		if user.Id == userEntity.Id {
			isExists = true
			break
		}
	}

	if isExists {
		users = append(users, userEntity)

		return nil, models.UserAlreadyExists, errors.New("пользователь уже существует")
	}

	return nil, models.Success, errors.New("пользователь существует")
}
