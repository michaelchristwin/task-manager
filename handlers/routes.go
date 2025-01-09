package handlers

import (
	"encoding/json"
	"log"
	"net/http"
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
	query := `INSERT INTO tasks (title, description, due_date, priority, completed)
	          VALUES ($1, $2, $3, $4) 
			  RETURNING id, created_at, updated_at;`
	row := db.Db.QueryRow(r.Context(), query, task.Title, task.Description, task.Due_Date, task.Priority, task.Completed)
	if err := row.Scan(&task.ID, &task.CreatedAt, &task.UpdatedAt); err != nil {
		http.Error(w, "Internal server error", http.StatusInternalServerError)
		log.Printf("Failed to insert task: %v", err) // Log the error for debugging
		return
	}
	w.WriteHeader(http.StatusCreated)
	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(task); err != nil {
		log.Printf("Failed to encode response: %v", err)
	}
}
