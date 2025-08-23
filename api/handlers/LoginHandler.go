package handlers

import (
	"encoding/json"
	"log"
	"net/http"
	"time"

	"github.com/alohamat/todo-fullstack/db"
	"github.com/alohamat/todo-fullstack/models"
	"github.com/alohamat/todo-fullstack/services"
	"go.mongodb.org/mongo-driver/mongo"
)

func LoginHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	var userData models.LoginUser
	if err := json.NewDecoder(r.Body).Decode(&userData); err != nil {
		http.Error(w, `{"error":"malformed request"}`, http.StatusBadRequest)
		return
	}
	log.Println("Login attempt for:", userData.Email)

	// defines db and collection

	usersCollection := db.Collection("todoDB", "usersCollection")
	repo := db.Repository{Collection: usersCollection}

	// tries to find email to check if user exists

	user, err := repo.FindByEmail(userData.Email)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			http.Error(w, `{"error":"invalid credentials"}`, http.StatusUnauthorized)
			return
		}
		log.Println("error finding user:", err)
		http.Error(w, `{"error":"internal server error"}`, http.StatusInternalServerError)
		return
	}
	if user == nil {
		http.Error(w, `{"error":"invalid credentials"}`, http.StatusUnauthorized)
		return
	}

	if !services.CheckPassword(userData.Password, user.Salt, user.Password) {
		http.Error(w, `{"error":"invalid credentials"}`, http.StatusUnauthorized)
		return
	}
	
	// token generation

	access, err := services.GenerateAccessToken(user.ID.Hex()) // confirma o nome da func no services
	if err != nil {
		log.Println("error generating access token:", err)
		http.Error(w, `{"error":"internal server error"}`, http.StatusInternalServerError)
		return
	}

	refresh, err := services.GenerateRefreshToken()
	if err != nil {
		log.Println("error generating refresh token:", err)
		http.Error(w, `{"error":"internal server error"}`, http.StatusInternalServerError)
		return
	}

	// defines a refresh token for a userid and stores it separately

	tokenDoc := models.RefreshToken{
		UserID:    user.ID,
		Token:     refresh,
		ExpiresAt: time.Now().Add(services.RefreshExpiry),
		CreatedAt: time.Now(),
	}

	if err := repo.SaveRefreshToken(r.Context(), &tokenDoc); err != nil {
		log.Println("error saving refresh token:", err)
		http.Error(w, `{"error":"internal server error"}`, http.StatusInternalServerError)
		return
	}

	http.SetCookie(w, &http.Cookie{
		Name:     "refresh_token",
		Value:    refresh,
		Expires:  tokenDoc.ExpiresAt,
		HttpOnly: true,
		Secure:   true,
		SameSite: http.SameSiteStrictMode,
		Path:     "/",
	})

	resp := map[string]string{"access_token": access}
	w.WriteHeader(http.StatusOK)
	if err := json.NewEncoder(w).Encode(resp); err != nil {
		log.Println("error encoding login response:", err)
	}
	log.Println("user logged in:", user.Email)
}
