package handlers

import (
	"encoding/json"
	"log"
	"net/http"
	"time"

	"github.com/alohamat/todo-fullstack/services"
	//"github.com/alohamat/todo-fullstack/db"
)

type tokenRequest struct {
	Token string `json:"refresh_token"`
}

func RefreshHandler(w http.ResponseWriter, r *http.Request) {
	refreshRepo := services.RefreshRepo()

	var req tokenRequest
	err := json.NewDecoder(r.Body).Decode(&req)
	if (err != nil) {
		log.Println("error decodifying token")	
		http.Error(w, "error with token decodification", http.StatusBadRequest)
		return
	}

	tokenDoc, err := refreshRepo.FindRefreshToken(req.Token)
	if (err != nil) || (tokenDoc == nil) {
		http.Error(w, "invalid refresh token", http.StatusUnauthorized)
		return
	}
	if (time.Now().After(tokenDoc.ExpiresAt)) {
		http.Error(w, "refresh token expired", http.StatusUnauthorized)
		return
	}

	// generate a new access token

	accessToken, err := services.GenerateAccessToken(tokenDoc.UserID.Hex())

	if (err != nil) {
		http.Error(w, "error generating acess token", http.StatusInternalServerError)
		return
	}
	json.NewEncoder(w).Encode(map[string]string{
		"access_token": accessToken,
	})

}