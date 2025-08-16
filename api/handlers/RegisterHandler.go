package handlers

import (
	"encoding/json"
	"log"
	"net/http"

	"go.mongodb.org/mongo-driver/bson"

	"github.com/alohamat/todo-fullstack/models"
	"github.com/alohamat/todo-fullstack/db"
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
	success, err := repo.Insert(bson.M{
		"email": userData.Email,
		"password": userData.Password,
		"username": userData.Username,
	})
	if (err != nil) {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte("internal server error"))
		return
	}
	if (!success) {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("email already created"))
		return
	}
	w.WriteHeader(http.StatusCreated)
	w.Write([]byte("user created"))
}