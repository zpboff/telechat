package routes

import (
	"fmt"
	"github.com/gin-gonic/gin"
	validation "github.com/go-ozzo/ozzo-validation"
	"log"
	"services/registration/models"
	"services/registration/stores"
)

func RegisterUser(context *gin.Context)  {
	request := models.UserCreateRequest{}
	if err := context.BindJSON(&request); err != nil {
		log.Print(err)
	}

	result, err := stores.CreateUser(&request)
	response := models.Response{
		Entity: result,
		Errors: err,
	}

	if err == nil {
		context.JSON(200, response)
		return
	}

	if e, ok := err.(validation.InternalError); ok {
		fmt.Println(e.InternalError())
		context.Status(500)
		return
	}

	context.JSON(403, response)
}
