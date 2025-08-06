package router

import (
	"github.com/alohamat/todo-fullstack/middlewares"
	"github.com/alohamat/todo-fullstack/handlers"
	"github.com/gorilla/mux"
)

func InitRouter() *mux.Router {
	router := mux.NewRouter()
	router.Use(middlewares.CorsMiddleware)
	router.HandleFunc("/api/register/", handlers.RegisterHandler).Methods("POST")
	return router
}