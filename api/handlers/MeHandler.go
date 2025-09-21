package handlers

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/alohamat/todo-fullstack/middlewares"
	"github.com/alohamat/todo-fullstack/services"
)

// MeHandler returns the authenticated user's basic info.
func MeHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	userID, ok := middlewares.GetUserIDFromContext(r)
	if !ok {
		http.Error(w, `{"error":"unauthorized"}`, http.StatusUnauthorized)
		return
	}

	userHex := userID

	user, err := services.UsersRepo().FindByID(userHex)
	if err != nil {
		log.Println("error fetching user:", err)
		http.Error(w, `{"error":"internal server error"}`, http.StatusInternalServerError)
		return
	}
	if user == nil {
		http.Error(w, `{"error":"user not found"}`, http.StatusNotFound)
		return
	}

	resp := map[string]interface{}{
		"user": map[string]string{
			"id":       userID,
			"username": user.Username,
			"email":    user.Email,
		},
	}

	if err := json.NewEncoder(w).Encode(resp); err != nil {
		log.Println("error encoding response:", err)
	}
}
