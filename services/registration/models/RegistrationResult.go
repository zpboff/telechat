package models

type RegistrationResult int

const (
	Success RegistrationResult = iota
	InvalidRequest
	ServerError
	UserAlreadyExists
)
