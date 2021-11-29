package validators

import (
	validation "github.com/go-ozzo/ozzo-validation"
	"github.com/go-ozzo/ozzo-validation/is"
	"services/registration/models"
)

func ValidateUserCreateRequest(request *models.UserCreateRequest) error {
	return validation.ValidateStruct(request,
		validation.Field(&request.FirstName, validation.Required.Error("Необходимо заполнить поле")),
		validation.Field(&request.LastName, validation.Required.Error("Необходимо заполнить поле")),
		validation.Field(&request.Email,
			validation.Required.Error("Необходимо заполнить поле"),
			is.Email.Error("Введите корректный email")),
		validation.Field(&request.Password,
			validation.Required.Error("Необходимо заполнить поле"),
			validation.Length(8, 20).Error("Длина пароля должна быть от 8 до 20 символов")),
	)
}
