package main

import (
	"log"
	"github.com/alohamat/todo-fullstack/router"
	"net/http"
)


func main() {
	r := router.InitRouter()
	log.Println("servidor rodando em :8080")
	log.Fatal(http.ListenAndServe(":8080", r))
}