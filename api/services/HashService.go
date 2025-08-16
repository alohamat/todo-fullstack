package services

import (
	"crypto/rand"
	"encoding/base64"
	"log"
	"os"

	"github.com/joho/godotenv"
	"golang.org/x/crypto/bcrypt"
)

func GenerateSalt(n int) string {
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

	salt := GenerateSalt(16)
	passwordWithSaltAndPepper := password + salt + pepper

	hash, err := bcrypt.GenerateFromPassword([]byte(passwordWithSaltAndPepper), bcrypt.DefaultCost)
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

	err = bcrypt.CompareHashAndPassword([]byte(hash), []byte(passwordWithSaltAndPepper))
	return err == nil
}

