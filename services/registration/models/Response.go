package models

type Response struct {
	Entity interface{} `json:"entity"`
	Errors interface{} `json:"errors"`
}
