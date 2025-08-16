package db

import (
	"context"
	"fmt"
	"log"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

type Repository struct {
	Collection *mongo.Collection
}

func ctx() (context.Context, context.CancelFunc) {
    return context.WithTimeout(context.Background(), 5*time.Second)
}

func (r *Repository) Insert(doc bson.M) (bool, error) {
	ctx, cancel := ctx()
	defer cancel()
	emailVal, ok := doc["email"].(string)
	
	if (!ok) {
		return false, fmt.Errorf("document missing email")
	}

	exists, err := r.Exists(emailVal)
	if (err != nil) {
		return false, err
	}

	if (exists) {
		return false, fmt.Errorf("user with email %s already exists", emailVal)
	}

	res, err := r.Collection.InsertOne(ctx, doc)
	if (err != nil) {
		return false, err
	}

	log.Println("new user created ", res.InsertedID)
	return true, nil
}

func (r *Repository) Exists (email string) (bool, error) {
	ctx, cancel := ctx()
	defer cancel()
	filter := bson.M{"email" : email}
	err := r.Collection.FindOne(ctx, filter).Err()
	if (err == mongo.ErrNoDocuments) {
		return false, nil
	}
	if (err != nil) {
		return false, err
	}
	return true, nil
}