package db

import (
	"time"

	"github.com/alohamat/todo-fullstack/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type TaskRepository struct {
	Collection *mongo.Collection
}

func (r *TaskRepository) InsertTask(task *models.Task) (primitive.ObjectID, error) {
	ctx, cancel := newCtx()
	defer cancel()

	now := time.Now()
	if task.ID.IsZero() {
		task.ID = primitive.NewObjectID()
	}
	task.CreatedAt = now
	task.UpdatedAt = now

	res, err := r.Collection.InsertOne(ctx, task)
	if err != nil {
		return primitive.NilObjectID, err
	}

	oid, ok := res.InsertedID.(primitive.ObjectID)
	if !ok {
		return primitive.NilObjectID, err
	}
	return oid, nil
}

func (r *TaskRepository) GetTasksByUser(userID primitive.ObjectID) ([]models.Task, error) {
	ctx, cancel := newCtx()
	defer cancel()

	cur, err := r.Collection.Find(ctx, bson.M{"userId": userID})
	if err != nil {
		return nil, err
	}
	defer cur.Close(ctx)

	var tasks []models.Task
	if err := cur.All(ctx, &tasks); err != nil {
		return nil, err
	}
	return tasks, nil
}

func (r *TaskRepository) GetTasksByUserAndId(id primitive.ObjectID, userID primitive.ObjectID) (models.Task, error) {
	ctx, cancel := newCtx()
	defer cancel()

	var task models.Task
	err := r.Collection.FindOne(ctx, bson.M{"_id": id, "userId": userID}).Decode(&task)
	return task, err
}

func (r *TaskRepository) UpdateTask(id primitive.ObjectID, update bson.M) error {
	ctx, cancel := newCtx()
	defer cancel()

	_, err := r.Collection.UpdateOne(ctx, bson.M{"_id": id}, bson.M{"$set": update})
	return err
}

func (r *TaskRepository) DeleteTask(id primitive.ObjectID) error {
	ctx, cancel := newCtx()
	defer cancel()

	_, err := r.Collection.DeleteOne(ctx, bson.M{"_id": id})
	return err
}

func (r *TaskRepository) DeleteTaskIfOwner(id primitive.ObjectID, userID primitive.ObjectID) error {
	ctx, cancel := newCtx()
	defer cancel()

	_, err := r.Collection.DeleteOne(ctx, bson.M{"_id": id, "userId": userID})
	return err
}

func (r *TaskRepository) GetTasksByUserAndDateRange(userID primitive.ObjectID, from, to time.Time) ([]models.Task, error) {
	ctx, cancel := newCtx()
	defer cancel()

	filter := bson.M{
		"userId": userID,
		"dueDate": bson.M{
			"$gte": from,
			"$lte": to,
		},
	}

	cur, err := r.Collection.Find(ctx, filter)
	if err != nil {
		return nil, err
	}
	defer cur.Close(ctx)

	var tasks []models.Task
	if err := cur.All(ctx, &tasks); err != nil {
		return nil, err
	}
	return tasks, nil
}
