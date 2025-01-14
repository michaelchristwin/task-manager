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
	fs := http.FileServer(http.Dir("frontend"))
	mux.Handle("/static/", http.StripPrefix("/static/", fs))
	mux.HandleFunc("/", handlers.HomeHandler)
	mux.HandleFunc("/tasks", handlers.TaskHandler)
	mux.HandleFunc("/tasks/{id}", handlers.TaskHandler)
	fmt.Println("Server running on http://localhost:8080")
	if err := http.ListenAndServe(":8080", mux); err != nil {
		log.Fatalf("Server failed to start: %v", err)
	}
}
