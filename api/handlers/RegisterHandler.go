package handlers

import (
	"encoding/json"
	"errors"
	"log"
	"net/http"
	"time"

	"github.com/alohamat/todo-fullstack/db"
	"github.com/alohamat/todo-fullstack/models"
	"github.com/alohamat/todo-fullstack/services"
	"go.mongodb.org/mongo-driver/mongo"
)

func RegisterHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	var userData models.RegisterUser
	if err := json.NewDecoder(r.Body).Decode(&userData); err != nil {
		http.Error(w, `{"error":"malformed request"}`, http.StatusBadRequest)
		return
	}

	if userData.Email == "" || userData.Password == "" || userData.Username == "" {
		http.Error(w, `{"error":"email, username and password are required"}`, http.StatusBadRequest)
		return
	}

	// debug
	log.Println("Register attempt for:", userData.Email, " username:", userData.Username)

	// hash + salt
	hash, salt := services.HashPassword(userData.Password)

	usersCollection := db.Collection("todoDB", "usersCollection")
	repo := db.Repository{Collection: usersCollection}

	user := &models.User{
		Email:     userData.Email,
		Username:  userData.Username,
		Password:  hash,
		Salt:      salt,
		CreatedAt: time.Now(),
		UpdatedAt: time.Now(),
	}

	_, err := repo.InsertUser(user)
	if err != nil {
		// try duplicate key (11000)
		var we mongo.WriteException
		if errors.As(err, &we) {
			for _, e := range we.WriteErrors {
				if e.Code == 11000 {
					http.Error(w, `{"error":"email already registered"}`, http.StatusConflict) // 409
					return
				}
			}
		}

		// generic db error
		log.Println("error inserting user:", err)
		http.Error(w, `{"error":"internal server error"}`, http.StatusInternalServerError)
		return
	}

	// success
	w.WriteHeader(http.StatusCreated)
	_ = json.NewEncoder(w).Encode(map[string]string{"message": "user created"})
}
