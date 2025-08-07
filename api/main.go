package main

import (
	"log"
	"github.com/alohamat/todo-fullstack/router"
	"github.com/alohamat/todo-fullstack/middlewares"
	"net/http"
)


func main() {
	r := router.InitRouter()
	handler := middlewares.CorsMiddleware(r)

	log.Println("servidor rodando em :8080")
	log.Fatal(http.ListenAndServe(":8080", handler))
}