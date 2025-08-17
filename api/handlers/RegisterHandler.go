package handlers

import (
	"encoding/json"
	"log"
	"net/http"

	"go.mongodb.org/mongo-driver/bson"

	"github.com/alohamat/todo-fullstack/models"
	"github.com/alohamat/todo-fullstack/db"
	"github.com/alohamat/todo-fullstack/services"
)


func RegisterHandler(w http.ResponseWriter, r *http.Request) {
	var userData models.RegisterUser
	err := json.NewDecoder(r.Body).Decode(&userData)
	if err != nil {
		log.Println("malformed data")
		return
	}
	log.Println("Email: ", userData.Email, "\nPassword: ", userData.Password, "\nUsername: ", userData.Username)

	usersCollection := db.Collection("todoDB", "usersCollection")
	repo := db.Repository{Collection: usersCollection}
	hash, salt := services.HashPassword(userData.Password)

	success, err := repo.Insert(bson.M{
		"email": userData.Email,
		"username": userData.Username,
		"password": hash,
		"salt": salt,
	})
	if (!success) {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("email already created"))
		return
	}
	if (err != nil) {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte("internal server error"))
		return
	}

	w.WriteHeader(http.StatusCreated)
	w.Write([]byte("user created"))
}