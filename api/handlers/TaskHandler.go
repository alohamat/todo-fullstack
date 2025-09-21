package handlers

import (
	"encoding/json"
	"net/http"
	"time"
	"log"

	"github.com/alohamat/todo-fullstack/middlewares"
	"github.com/alohamat/todo-fullstack/models"
	"github.com/alohamat/todo-fullstack/services"
	"github.com/gorilla/mux"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

// GET /api/tasks
// Returns all tasks for the authenticated user.
func TasksHandler(w http.ResponseWriter, r *http.Request) {
	// Get userId injected by auth middleware (should be a primitive.ObjectID)
	userIDStr, ok := middlewares.GetUserIDFromContext(r)
	if !ok || userIDStr == "" {
		http.Error(w, "unauthorized - missing user id", http.StatusUnauthorized)
		return
	}

	// Convert to Mongo ObjectID
	userId, err := primitive.ObjectIDFromHex(userIDStr)
	if err != nil {
		log.Println("TasksHandler: invalid user id:", userIDStr, err)
		http.Error(w, "invalid user id", http.StatusBadRequest)
		return
	}

	// Fetch tasks from repo (expects primitive.ObjectID)
	tasks, err := services.TasksRepo().GetTasksByUser(userId)
	if err != nil {
		log.Println("TasksHandler: error fetching tasks for user", userId.Hex(), err)
		http.Error(w, "error fetching tasks", http.StatusInternalServerError)
		return
	}

	writeJSON(w, http.StatusOK, tasks)
}

// POST /api/tasks
// Create a new task for the authenticated user.
// Accepts JSON: { text: string, dueDate?: string (RFC3339 or "YYYY-MM-DD"), completed?: bool }
func CreateTaskHandler(w http.ResponseWriter, r *http.Request) {
	userIDStr, ok := middlewares.GetUserIDFromContext(r)
if !ok {
    http.Error(w, "unauthorized to create", http.StatusUnauthorized)
    return
}

log.Println("UserIDStr from context:", userIDStr)
userId, err := primitive.ObjectIDFromHex(userIDStr)
if err != nil {
    log.Println("ObjectIDFromHex failed:", err)
    http.Error(w, "invalid user id", http.StatusBadRequest)
    return
}

	var payload struct {
		Text      string  `json:"text"`
		DueDate   *string `json:"dueDate,omitempty"`
		Completed *bool   `json:"completed,omitempty"`
	}

	if err := json.NewDecoder(r.Body).Decode(&payload); err != nil {
		http.Error(w, "invalid json", http.StatusBadRequest)
		return
	}
	if payload.Text == "" {
		http.Error(w, "text is required", http.StatusBadRequest)
		return
	}

	var duePtr *time.Time
	if payload.DueDate != nil && *payload.DueDate != "" {
		if t, err := time.Parse(time.RFC3339, *payload.DueDate); err == nil {
			duePtr = &t
		} else if t2, err2 := time.Parse("2006-01-02", *payload.DueDate); err2 == nil {
			t2 = time.Date(t2.Year(), t2.Month(), t2.Day(), 0, 0, 0, 0, time.Local)
			duePtr = &t2
		} else {
			http.Error(w, "invalid dueDate format", http.StatusBadRequest)
			return
		}
	}

	task := &models.Task{
		Text:      payload.Text,
		DueDate:   duePtr,
		Completed: false,
		UserID:    userId,
	}

	log.Println("about to insert task", task)
	oid, err := services.TasksRepo().InsertTask(task)
	if err != nil {
		http.Error(w, "error inserting task", http.StatusInternalServerError)
		return
	}

	task.ID = oid
	writeJSON(w, http.StatusCreated, task)
}

func UpdateTaskHandler(w http.ResponseWriter, r *http.Request) {
    	userIDStr, ok := middlewares.GetUserIDFromContext(r)
if !ok {
    http.Error(w, "unauthorized to update", http.StatusUnauthorized)
    return
}

log.Println("UserIDStr from context:", userIDStr)
userId, err := primitive.ObjectIDFromHex(userIDStr)
if err != nil {
    log.Println("ObjectIDFromHex failed:", err)
    http.Error(w, "invalid user id", http.StatusBadRequest)
    return
}

    idStr := mux.Vars(r)["id"]
    objID, err := primitive.ObjectIDFromHex(idStr)
    if err != nil {
        http.Error(w, "invalid task id", http.StatusBadRequest)
        return
    }


	// Read optional fields from body
	var payload struct {
		Text      *string `json:"text,omitempty"`
		DueDate   *string `json:"dueDate,omitempty"`
		Completed *bool   `json:"completed,omitempty"`
	}

	if err := json.NewDecoder(r.Body).Decode(&payload); err != nil {
		http.Error(w, "invalid json", http.StatusBadRequest)
		return
	}

	// Ownership check: ensure the task belongs to this user
	_, err = services.TasksRepo().GetTasksByUserAndId(objID, userId)
	if err != nil {
		// Not found or not owner
		http.Error(w, "task not found or not allowed", http.StatusNotFound)
		return
	}

	update := bson.M{}
	if payload.Text != nil {
		update["text"] = *payload.Text
	}
	if payload.Completed != nil {
		update["completed"] = *payload.Completed
	}
	if payload.DueDate != nil {
		if *payload.DueDate == "" {
			// set dueDate to null (optional semantics)
			update["dueDate"] = nil
		} else if t, err := time.Parse(time.RFC3339, *payload.DueDate); err == nil {
			update["dueDate"] = t
		} else if t2, err2 := time.Parse("2006-01-02", *payload.DueDate); err2 == nil {
			t2 = time.Date(t2.Year(), t2.Month(), t2.Day(), 0, 0, 0, 0, time.Local)
			update["dueDate"] = t2
		} else {
			http.Error(w, "invalid dueDate format", http.StatusBadRequest)
			return
		}
	}

	if len(update) == 0 {
		http.Error(w, "no fields to update", http.StatusBadRequest)
		return
	}

	// Perform update (update by id)
	if err := services.TasksRepo().UpdateTask(objID, update); err != nil {
		http.Error(w, "error updating task", http.StatusInternalServerError)
		return
	}

	// Fetch and return the updated document (ensuring ownership)
	updated, err := services.TasksRepo().GetTasksByUserAndId(objID, userId)
	if err != nil {
		http.Error(w, "task not found after update", http.StatusNotFound)
		return
	}

	writeJSON(w, http.StatusOK, updated)
}

// DELETE /api/tasks/{id}
// Delete a task only if the authenticated user owns it.
func DeleteTaskHandler(w http.ResponseWriter, r *http.Request) {
   	userIDStr, ok := middlewares.GetUserIDFromContext(r)
if !ok {
    http.Error(w, "unauthorized to delete", http.StatusUnauthorized)
    return
}

	log.Println("UserIDStr from context:", userIDStr)
	userId, err := primitive.ObjectIDFromHex(userIDStr)
	if err != nil {
    	log.Println("ObjectIDFromHex failed:", err)
    	http.Error(w, "invalid user id", http.StatusBadRequest)
    	return
}

    idStr := mux.Vars(r)["id"]
    objID, err := primitive.ObjectIDFromHex(idStr)
    if err != nil {
        http.Error(w, "invalid task id", http.StatusBadRequest)
        return
    }

    if err := services.TasksRepo().DeleteTaskIfOwner(objID, userId); err != nil {
        http.Error(w, "error deleting task", http.StatusInternalServerError)
        return
    }

    w.WriteHeader(http.StatusNoContent)
}

// writeJSON is a small helper to always respond with proper JSON header and status.
func writeJSON(w http.ResponseWriter, status int, v interface{}) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	_ = json.NewEncoder(w).Encode(v)
}
