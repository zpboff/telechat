package middlewares

import (
	"github.com/gin-gonic/gin"
	"log"
	"net/http"
)

type Message struct {
	Url string
	Method string
	Cookie []*http.Cookie
}

func LoggerMiddleware(context *gin.Context) {
	context.Request.Cookies()
	logEntity := Message{
		Url: context.Request.URL.RequestURI(),
		Method: context.Request.Method,
		Cookie: context.Request.Cookies(),
	}
	log.Print(logEntity)

	context.Next()
}
