package models

type RegisterUser struct {
	Email string `json:"email"`
	Password string `json:"password"`
	ConfirmPassword string `json:"confirmPassword"`
	Username string `json:"username"`
}
type LoginUser struct {
	Email string `json:"email"`
	Password string `json:"password"`
}
