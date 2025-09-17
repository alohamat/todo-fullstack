package routes

import (
	"github.com/alohamat/todo-fullstack/handlers"
	"github.com/alohamat/todo-fullstack/middlewares"
	"github.com/gorilla/mux"
	"net/http"
)

func InitRouter() *mux.Router {
	router := mux.NewRouter()
	router.Use(middlewares.CorsMiddleware)

	// public routes
	router.HandleFunc("/api/register", handlers.RegisterHandler).Methods("POST", "OPTIONS")
	router.HandleFunc("/api/login", handlers.LoginHandler).Methods("POST", "OPTIONS")
	router.HandleFunc("/api/refresh", handlers.RefreshHandler).Methods("POST", "OPTIONS")
	router.Handle("/api/me", middlewares.AuthMiddleware(http.HandlerFunc(handlers.MeHandler)))

	// protected routes
	protected := router.PathPrefix("/api").Subrouter()
	protected.Use(middlewares.AuthMiddleware)

	protected.HandleFunc("/tasks", handlers.TasksHandler).Methods("GET")
	
	return router
}