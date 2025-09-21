package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type RegisterUser struct {
	Email string `json:"email"`
	Password string `json:"password"`
	Username string `json:"username"`
}
type LoginUser struct {
	Email string `json:"email"`
	Password string `json:"password"`
}
type User struct {
	ID primitive.ObjectID `bson:"_id,omitempty"`
	Email string `bson:"email"`
	Username string `bson:"username"`
	Password string `bson:"password"`
	Salt string `bson:"salt"`
	CreatedAt time.Time `bson:"createdAt"`
	UpdatedAt time.Time `bson:"updatedAt"`
}
type RefreshToken struct {
	ID primitive.ObjectID `bson:"_id,omitempty"`
	UserID primitive.ObjectID `bson:"userId"`
	Token string `bson:"token"`
	CreatedAt time.Time `bson:"createdAt"`
	ExpiresAt time.Time `bson:"expiresAt"`
}
type Task struct {
	ID        primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	Text      string             `bson:"text" json:"text"`
	DueDate   *time.Time         `bson:"dueDate,omitempty" json:"dueDate,omitempty"`
	Completed bool               `bson:"completed" json:"completed"`
	UserID    primitive.ObjectID `bson:"userId,omitempty" json:"userId,omitempty"`
	CreatedAt time.Time `bson:"createdAt"`
	UpdatedAt time.Time `bson:"updatedAt"`
}