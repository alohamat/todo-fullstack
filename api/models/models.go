package models

type RegisterUser struct {
	Email string `json:"email"`
	Password string `json:"password"`
	Username string `json:"username"`
}
type LoginUser struct {
	Email string `json:"email"`
	Password string `json:"password"`
}
