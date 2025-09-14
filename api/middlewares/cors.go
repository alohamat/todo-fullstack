package middlewares

import (
	"github.com/rs/cors"
	"net/http"
)

func CorsMiddleware(handler http.Handler) http.Handler {
	return cors.New(cors.Options{
		AllowedOrigins: []string{"http://localhost:5173"},
		AllowedMethods: []string{"POST", "GET", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders: []string{"Content-Type", "Authorization", "Access-Control-Allow-Origin"},
		AllowCredentials: true,
	}).Handler(handler)
}