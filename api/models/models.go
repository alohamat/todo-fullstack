package models

type RegisterUser struct {
	Nome string `json:"nome"`
	Email string `json:"email"`
	Password string `json:"password"`
}

type LoginUser struct {
	Email string `json:"email"`
	Password string `json:"password"`
}
