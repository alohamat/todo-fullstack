package services

import (
	"github.com/alohamat/todo-fullstack/db"
)

func UsersRepo() *db.Repository {
	collection := db.Collection("todoDB", "usersCollection")
	return &db.Repository{Collection: collection}
}

func RefreshRepo() *db.Repository {
	collection := db.Collection("todoDB", "refreshCollection")
	return &db.Repository{Collection: collection}
}

func TasksRepo() *db.TaskRepository {
	collection := db.Collection("todoDB", "tasksCollection")
	return &db.TaskRepository{Collection: collection}
}
