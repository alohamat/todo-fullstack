package handlers

import (
	"log"
	"net/http"
	"encoding/json"

	"github.com/alohamat/todo-fullstack/models"
)

func LoginHandler (w http.ResponseWriter, r *http.Request) {
	var userData models.LoginUser
	err := json.NewDecoder(r.Body).Decode(&userData)
	if err != nil {
		log.Fatal("malformed data")
	}
	log.Println("Email: ", userData.Email, " Password: ", userData.Password)

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	/*var response = map[string]string{"Email": userData.Email, "Password": userData.Password}
	json.NewEncoder(w).Encode(response)*/
}