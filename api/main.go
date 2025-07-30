package main

import (
	"net/http"
	"log"

	"github.com/alohamat/todo-fullstack/routes"
)


func main() {
	router := routes.InitRouter()
	log.Println("server running at 8080")
	log.Fatal(http.ListenAndServe(":8080", router))
}	