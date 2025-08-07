package middlewares

import (
	"github.com/rs/cors"
	"net/http"
)

func CorsMiddleware(handler http.Handler) http.Handler {
	return cors.New(cors.Options{
		AllowedOrigins: []string{"*"}, // permite que todo mundo chama a api
		AllowedMethods: []string{"POST", "GET", "PUT", "DELETE", "OPTIONS"}, // permite metodos que a api aceita
		AllowedHeaders: []string{"*"}, // permite headers
		AllowCredentials: true, // permite credenciais como cookies
	}).Handler(handler)
}