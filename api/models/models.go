package models

type RegisterUser struct {
	Name string `json:"username"`
	Email string `json:"email"`
	Password string `json:"password"`
}

type LoginUser struct {
	Email string `json:"email"`
	Password string `json:"password"`
}
