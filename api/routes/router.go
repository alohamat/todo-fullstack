package routes

import (
	"github.com/alohamat/todo-fullstack/handlers"
	"github.com/alohamat/todo-fullstack/middlewares"
	"github.com/gorilla/mux"
)

func InitRouter() *mux.Router {
	router := mux.NewRouter()
	router.Use(middlewares.CorsMiddleware)

	router.HandleFunc("/api/register", handlers.RegisterHandler)
	router.HandleFunc("/api/login", handlers.LoginHandler)
	return router
}