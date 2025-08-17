package handlers

import (
	"log"
	"net/http"
	"encoding/json"

	"github.com/alohamat/todo-fullstack/models"
	"github.com/alohamat/todo-fullstack/db"
)

func LoginHandler (w http.ResponseWriter, r *http.Request) {
	var userData models.LoginUser
	err := json.NewDecoder(r.Body).Decode(&userData)
	if err != nil {
		log.Println("malformed data")
		return
	}
	log.Println("Email: ", userData.Email, " Password: ", userData.Password)

	usersCollection := db.Collection("todoDB", "usersCollection")
	repo := db.Repository{Collection: usersCollection}

	exists, err := repo.EmailExists(userData.Email)
	if (err != nil) {
		log.Println("error login")
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	if (!exists) {
		log.Println("email doesnt exist")
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	
	
}