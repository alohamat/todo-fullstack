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
	router.Handle("/api/me", middlewares.AuthMiddleware(http.HandlerFunc(handlers.MeHandler))).Methods("GET", "OPTIONS")

	// protected routes (require authentication)
	protected := router.PathPrefix("/api").Subrouter()
	protected.Use(middlewares.AuthMiddleware)

	// Task routes
	protected.HandleFunc("/tasks", handlers.TasksHandler).Methods("GET", "OPTIONS")
	protected.HandleFunc("/tasks", handlers.CreateTaskHandler).Methods("POST", "OPTIONS")
	protected.HandleFunc("/tasks/{id}", handlers.UpdateTaskHandler).Methods("PUT", "OPTIONS")
	protected.HandleFunc("/tasks/{id}", handlers.DeleteTaskHandler).Methods("DELETE", "OPTIONS")

	return router
}
