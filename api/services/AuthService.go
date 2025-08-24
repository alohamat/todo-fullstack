package services

import (
	"log"
	"os"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/joho/godotenv"
	"github.com/google/uuid"
)

var (
	jwtKey []byte
	AccessExpiry = 15 * time.Minute
	RefreshExpiry = 24 * 7 * time.Hour
)

func init() {
	err := godotenv.Load()
	if (err != nil) {
		log.Fatalln("failed to load .env")
	}
	secret := os.Getenv("JWT_SECRET")
	if (secret == "") {
		log.Println("jwt not found in .env")
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