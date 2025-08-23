package routes

import (
	"github.com/alohamat/todo-fullstack/handlers"
	"github.com/alohamat/todo-fullstack/middlewares"
	"github.com/gorilla/mux"
)

func InitRouter() *mux.Router {
	router := mux.NewRouter()
	router.Use(middlewares.CorsMiddleware)

	// public routes
	router.HandleFunc("/api/register", handlers.RegisterHandler).Methods("POST")
	router.HandleFunc("/api/login", handlers.LoginHandler).Methods("POST")

	// protected routes
	protected := router.PathPrefix("/api").Subrouter()
	
	return router
}