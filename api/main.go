package main

import (
	"net/http"
	"log"

	"github.com/alohamat/todo-fullstack/middlewares"
	"github.com/alohamat/todo-fullstack/handlers"
	"github.com/gorilla/mux"
)


func main() {
	r := mux.NewRouter()
	r.HandleFunc("/api/register", handlers.RegisterHandler)

	log.Println("server running at 8080")
	if err := http.ListenAndServe(":8080", middlewares.CorsMiddleware(r)); err != nil {
		log.Fatalf("could not start server: %v", err)
	}
}