package routes

import (
	"github.com/gin-gonic/gin"
	"services/registration/models"
	"services/registration/services"
)

func Registration(context *gin.Context) {
	request := models.UserCreateRequest{}

	if err := context.BindJSON(&request); err != nil {
		context.JSON(400, models.Response{
			Errors: err,
		})
		return
	}

	result, code, err := services.CreateUser(&request)

	switch code {
	case models.Success:
		context.JSON(200, models.Response{
			Entity: result,
		})
	case models.InvalidRequest:
		context.JSON(400, models.Response{
			Errors: err,
		})
	case models.UserAlreadyExists:
		context.Status(409)
	}
}
