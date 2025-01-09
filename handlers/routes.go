package handlers

import "net/http"

type Task struct {
	ID          string `bson:"_id"`
	Title       string `bson:"title"`
	Description string `bson:"description"`
	Due_Date    string `bson:"due_date"`
	Priority    string `bson:"priority"`
	Completed   bool   `bson:"completed"`
}

func CreateTask(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
		return
	}
}
