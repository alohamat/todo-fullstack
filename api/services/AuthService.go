package services

import (
	"log"
	"os"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/google/uuid"
)

var (
	jwtKey []byte
	AccessExpiry = 15 * time.Minute
	RefreshExpiry = 24 * 7 * time.Hour
)

func init() {
	secret := os.Getenv("JWT_SECRET")
	if (secret == "") {
		log.Println("env didnt load")
	}
	jwtKey = []byte(secret)
}


func GenerateAccessToken(userID string) (string, error) {
	claims := jwt.MapClaims {
		"user_id": userID,
		"exp": time.Now().Add(AccessExpiry).Unix(),
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(jwtKey)
}

func GenerateRefreshToken() (string, error) {
	return uuid.NewString(), nil
}