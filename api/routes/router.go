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
	router.HandleFunc("/api/register", handlers.RegisterHandler).Methods("POST", "OPTIONS")
	router.HandleFunc("/api/login", handlers.LoginHandler).Methods("POST", "OPTIONS")

	// protected routes
	protected := router.PathPrefix("/api").Subrouter()
	protected.Use(middlewares.AuthMiddleware)

	protected.HandleFunc("/api/tasks", handlers.TasksHandler).Methods("GET")
	
	return router
}