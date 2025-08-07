package handlers

import (
	"log"
	"encoding/json"
	"net/http"

	"github.com/alohamat/todo-fullstack/models"
)

func LoginHandler(w http.ResponseWriter, r *http.Request) {
	var req models.LoginUser
	err := json.NewDecoder(r.Body).Decode(&req)
	if (err != nil) {
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	log.Println(req)
	w.WriteHeader(http.StatusAccepted)
}