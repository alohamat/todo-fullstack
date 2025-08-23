package db

import (
	"context"
	"time"

	"github.com/alohamat/todo-fullstack/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type Repository struct {
	Collection *mongo.Collection
}

func newCtx() (context.Context, context.CancelFunc) {
	return context.WithTimeout(context.Background(), 5*time.Second)
}

func (r *Repository) InsertUser(user *models.User) (primitive.ObjectID, error) {
	ctx, cancel := newCtx()
	defer cancel()

	now := time.Now()
	if user.CreatedAt.IsZero() {
		user.CreatedAt = now
	}
	user.UpdatedAt = now

	res, err := r.Collection.InsertOne(ctx, user)
	if err != nil {
		return primitive.NilObjectID, err
	}

	oid, ok := res.InsertedID.(primitive.ObjectID)
	if !ok {
		return primitive.NilObjectID, err
	}
	return oid, nil
}

func (r *Repository) FindByEmail(email string) (*models.User, error) {
	ctx, cancel := newCtx()
	defer cancel()

	var user models.User
	err := r.Collection.FindOne(ctx, bson.M{"email": email}).Decode(&user)
	if err != nil {
		return nil, err
	}
	return &user, nil
}

func (r *Repository) SaveRefreshToken(ctx context.Context, token *models.RefreshToken) error {
	_, err := r.Collection.InsertOne(ctx, token)
	return err
}

func (r *Repository) FindRefreshToken(token string) (*models.RefreshToken, error) {
	ctx, cancel := newCtx()
	defer cancel()

	var rt models.RefreshToken
	err := r.Collection.FindOne(ctx, bson.M{"token": token}).Decode(&rt)
	if err != nil {
		return nil, err
	}
	return &rt, nil
}

func (r *Repository) DeleteRefreshToken(token string) error {
	ctx, cancel := newCtx()
	defer cancel()

	_, err := r.Collection.DeleteOne(ctx, bson.M{"token": token})
	return err
}
