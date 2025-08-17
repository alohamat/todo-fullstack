package services

import (
	"crypto/rand"
	"crypto/sha256"
	"encoding/base64"
	"encoding/hex"
	"log"
	"os"

	"github.com/joho/godotenv"
	"golang.org/x/crypto/bcrypt"
)

func generateSalt(n int) string {
	b := make([]byte, n)
	_, err := rand.Read(b)
	if err != nil {
		log.Fatal(err)
	}
	return base64.StdEncoding.EncodeToString(b)
}

func HashPassword(password string) (string, string) {
	err := godotenv.Load()
	if err != nil {
		log.Println("error loading .env")
		return "", ""
	}
	pepper := os.Getenv("PEPPER")

	salt := generateSalt(16)
	passwordWithSaltAndPepper := password + salt + pepper
	digest := sha256.Sum256([]byte(passwordWithSaltAndPepper))
	hashedInput := hex.EncodeToString(digest[:])

	hash, err := bcrypt.GenerateFromPassword([]byte(hashedInput), bcrypt.DefaultCost)
	if err != nil {
		log.Fatal(err)
	}

	return string(hash), salt
}

func CheckPassword(password, salt, hash string) bool {
	err := godotenv.Load()
	if err != nil {
		log.Println("error loading .env")
		return false
	}
	pepper := os.Getenv("PEPPER")

	passwordWithSaltAndPepper := password + salt + pepper
	digest := sha256.Sum256([]byte(passwordWithSaltAndPepper))
	hashedInput := hex.EncodeToString(digest[:])

	err = bcrypt.CompareHashAndPassword([]byte(hash), []byte(hashedInput))
	return err == nil
}

