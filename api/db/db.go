package db

import (
	"context"
	"log"
	"os"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var Client *mongo.Client

var (
	TaskRepo *TaskRepository
)

func InitMongo() *mongo.Client {
	MONGO_URI := os.Getenv("MONGO_URI")
	if MONGO_URI == "" {
		log.Fatal("uri not found in .env")
	}
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	clientOptions := options.Client().ApplyURI(MONGO_URI)
	client, err := mongo.Connect(ctx, clientOptions)
	if err != nil {
		panic(err)
	}
	log.Println("connected to mongodb")
	Client = client
	return Client
}

func Collection(dbName, collName string) *mongo.Collection {
	return Client.Database(dbName).Collection(collName)
}