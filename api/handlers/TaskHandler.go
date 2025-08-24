package handlers

import (
	"net/http"
	"log"
)

func TasksHandler(w http.ResponseWriter, r *http.Request) {
	log.Println("task handler")
}