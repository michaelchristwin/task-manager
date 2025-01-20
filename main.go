package main

import (
	"fmt"
	"log"
	"net/http"
	"strings"

	"github.com/michaelchristwin/taskmanager/db"
	"github.com/michaelchristwin/taskmanager/handlers"
)

type CustomFileServer struct {
	handler http.Handler
}

func (c *CustomFileServer) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	// Set correct MIME type based on file extension
	switch {
	case strings.HasSuffix(r.URL.Path, ".js"):
		w.Header().Set("Content-Type", "application/javascript")
	case strings.HasSuffix(r.URL.Path, ".css"):
		w.Header().Set("Content-Type", "text/css")
	}
	c.handler.ServeHTTP(w, r)
}

func main() {
	if err := db.Connect(); err != nil {
		log.Fatalf("Failed to connect to the database: %v", err)
	}
	mux := http.NewServeMux()
	fs := http.FileServer(http.Dir("frontend/dist"))
	mux.Handle("/static/", http.StripPrefix("/static/", &CustomFileServer{fs}))
	mux.HandleFunc("/", handlers.ClientHandler)
	mux.HandleFunc("/api/tasks", handlers.TaskHandler)
	mux.HandleFunc("/api/tasks/{id}", handlers.TaskHandler)
	corsConfig := handlers.DefaultCORSConfig()
	corsConfig.AllowedOrigins = []string{"http://localhost:8080", "http://localhost:3000"}
	corsHandler := handlers.CORSMiddleware(corsConfig)
	fmt.Println("Server running on http://localhost:8080")
	if err := http.ListenAndServe(":8080", corsHandler(mux)); err != nil {
		log.Fatalf("Server failed to start: %v", err)
	}
}
