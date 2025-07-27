package handlers

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"github.com/alohamat/todo-fullstack/models"
)


func RegisterHandler(w http.ResponseWriter, r *http.Request) {
	var userData models.User
	err := json.NewDecoder(r.Body).Decode(&userData)
	if err != nil {
		log.Fatal("malformed data")
	}
	fmt.Println("Email: ", userData.Email, "\nPassword: ", userData.Password, "\nConfirmPassword: ",userData.ConfirmPassword, "\nUsername: ", userData.Username)
}