package handlers

import (
	"encoding/json"
	"log"
	"net/http"
	"github.com/alohamat/todo-fullstack/models"
)


func RegisterHandler(w http.ResponseWriter, r *http.Request) {
	var userData models.RegisterUser
	err := json.NewDecoder(r.Body).Decode(&userData)
	if err != nil {
		log.Fatal("malformed data")
	}
	log.Println("Email: ", userData.Email, "\nPassword: ", userData.Password, "\nConfirmPassword: ",userData.ConfirmPassword, "\nUsername: ", userData.Username)
}