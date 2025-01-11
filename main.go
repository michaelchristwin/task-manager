package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/michaelchristwin/taskmanager/db"
	"github.com/michaelchristwin/taskmanager/handlers"
)

func main() {
	if err := db.Connect(); err != nil {
		log.Fatalf("Failed to connect to the database: %v", err)
	}
	mux := http.NewServeMux()
	mux.Handle("/tasks", http.HandlerFunc(handlers.CreateTask))
	mux.Handle("/tasks/{id}", http.HandlerFunc(handlers.EditTask))
	mux.Handle("tasks/{id}", http.HandlerFunc(handlers.DeleteTask))
	mux.Handle("tasks/{id}", http.HandlerFunc(handlers.GetTask))
	mux.Handle("tasks", http.HandlerFunc(handlers.GetTasks))
	fmt.Println("Server running on http://localhost:8080")
	if err := http.ListenAndServe(":8080", mux); err != nil {
		log.Fatalf("Server failed to start: %v", err)
	}
}
