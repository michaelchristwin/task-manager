package handlers

import (
	"encoding/json"
	"log"
	"net/http"
	"strings"
	"time"

	"github.com/michaelchristwin/taskmanager/db"
)

type Task struct {
	ID          string    `json:"_id"`
	Title       string    `json:"title"`
	Description string    `json:"description"`
	Due_Date    time.Time `json:"due_date"`
	Priority    string    `json:"priority"`
	Completed   bool      `json:"completed"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
}

func CreateTask(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
		return
	}

	var task Task
	if err := json.NewDecoder(r.Body).Decode(&task); err != nil {
		http.Error(w, "Invalid request", http.StatusBadRequest)
		log.Printf("Error decoding JSON: %v", err)
		return
	}
	defer r.Body.Close()

	query := `
        INSERT INTO tasks (title, description, due_date, priority, completed)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id, created_at, updated_at;
    `

	row := db.Db.QueryRow(r.Context(), query,
		task.Title,
		task.Description,
		task.Due_Date,
		task.Priority,
		task.Completed,
	)

	if err := row.Scan(&task.ID, &task.CreatedAt, &task.UpdatedAt); err != nil {
		http.Error(w, "Internal server error", http.StatusInternalServerError)
		log.Printf("Failed to insert task: %v", err)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)

	if err := json.NewEncoder(w).Encode(task); err != nil {
		log.Printf("Failed to encode response: %v", err)
		http.Error(w, "Failed to encode response", http.StatusInternalServerError)
		return
	}
}

func EditTask(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPut {
		log.Printf("Invalid request method")
		http.Error(w, "Invalid request", http.StatusMethodNotAllowed)
		return
	}
	path := strings.Trim(r.URL.Path, "/")
	parts := strings.Split(path, "/")
	if len(parts) < 2 {
		http.Error(w, "Invalid path", http.StatusBadRequest)
		return
	}
	id := parts[len(parts)-1]
	if id == "" {
		log.Printf("Empty task ID")
		http.Error(w, "Invalid task ID", http.StatusBadRequest)
		return
	}

	var updatedTask Task
	if err := json.NewDecoder(r.Body).Decode(&updatedTask); err != nil {
		log.Printf("Error decoding JSON: %v", err)
		http.Error(w, "Invalid request", http.StatusBadRequest)
		return
	}
	defer r.Body.Close()

	query := "SELECT id, title, description, due_date, priority, completed, created_at, updated_at FROM tasks WHERE id = $1"
	var existingTask Task
	row := db.Db.QueryRow(r.Context(), query, id)
	if err := row.Scan(&existingTask.ID, &existingTask.Title, &existingTask.Description, &existingTask.Due_Date, &existingTask.Priority, &existingTask.Completed, &existingTask.CreatedAt, &existingTask.UpdatedAt); err != nil {
		log.Printf("Failed to find task: %v", err)
		http.Error(w, "Task not found", http.StatusNotFound)
		return
	}

	updateQuery := `
        UPDATE tasks 
        SET title = $1, description = $2, due_date = $3, priority = $4, completed = $5, updated_at = NOW()
        WHERE id = $6
        RETURNING updated_at`
	err := db.Db.QueryRow(r.Context(), updateQuery,
		updatedTask.Title,
		updatedTask.Description,
		updatedTask.Due_Date,
		updatedTask.Priority,
		updatedTask.Completed,
		id).Scan(&updatedTask.UpdatedAt)
	if err != nil {
		log.Printf("Failed to update task: %v", err)
		http.Error(w, "Failed to update task", http.StatusInternalServerError)
		return
	}
	updatedTask.ID = existingTask.ID
	updatedTask.CreatedAt = existingTask.CreatedAt

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(updatedTask); err != nil {
		log.Printf("Failed to encode response: %v", err)
		http.Error(w, "Failed to encode response", http.StatusInternalServerError)
		return
	}
}

func DeleteTask(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodDelete {
		log.Printf("Invalid request method")
		http.Error(w, "Invalid request", http.StatusMethodNotAllowed)
		return
	}
	path := strings.Trim(r.URL.Path, "/")
	parts := strings.Split(path, "/")
	if len(parts) < 2 {
		http.Error(w, "Invalid path", http.StatusBadRequest)
		return
	}
	id := parts[len(parts)-1]
	if id == "" {
		log.Printf("Empty task ID")
		http.Error(w, "Invalid task ID", http.StatusBadRequest)
		return
	}

	query := "DELETE FROM tasks WHERE id = $1"
	_, err := db.Db.Exec(r.Context(), query, id)
	if err != nil {
		log.Printf("Failed to delete task: %v", err)
		http.Error(w, "Failed to delete task", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusNoContent)
}
