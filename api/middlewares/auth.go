package middlewares

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"
	"strings"

	"github.com/golang-jwt/jwt/v5"
)

var jwtKey []byte

type ctxKey string

const userIDKey ctxKey = "userId"

func init() {
	secret := os.Getenv("JWT_SECRET")
	if secret == "" {
		log.Fatalln("jwt not found in .env")
	}
	jwtKey = []byte(secret)
}

func AuthMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		header := r.Header.Get("Authorization")
		if header == "" {
			http.Error(w, "unauthorized, no header", http.StatusUnauthorized)
			return
		}

		parts := strings.SplitN(header, " ", 2)
		if len(parts) != 2 || !strings.EqualFold(parts[0], "Bearer") {
			http.Error(w, "unauthorized, malformed header", http.StatusUnauthorized)
			return
		}

		tokenStr := parts[1]

		token, err := jwt.Parse(tokenStr, func(t *jwt.Token) (interface{}, error) {
			if _, ok := t.Method.(*jwt.SigningMethodHMAC); !ok {
				return nil, fmt.Errorf("invalid signing method")
			}
			return jwtKey, nil
		})
		if err != nil || !token.Valid {
			http.Error(w, "unauthorized, token invalid", http.StatusUnauthorized)
			return
		}

		claims, ok := token.Claims.(jwt.MapClaims)
		if !ok {
			http.Error(w, "unauthorized, claims", http.StatusUnauthorized)
			return
		}

		userID, ok := claims["user_id"].(string)
		if !ok || userID == "" {
			http.Error(w, "unauthorized - user_id missing", http.StatusUnauthorized)
			return
		}

		ctx := context.WithValue(r.Context(), userIDKey, userID)

		next.ServeHTTP(w, r.WithContext(ctx))
	})
}

func GetUserIDFromContext(r *http.Request) (string, bool) {
	id, ok := r.Context().Value(userIDKey).(string)
	return id, ok
}
