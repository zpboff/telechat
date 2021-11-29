package models

type UserCreateRequest struct {
	Email  string  `json:"email"`
	Password string `json:"password"`
	FirstName string  `json:"firstName"`
	LastName string `json:"lastName"`
}