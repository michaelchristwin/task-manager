package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"strings"

	"github.com/gorilla/mux"
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
	case strings.HasSuffix(r.URL.Path, ".html"):
		w.Header().Set("Content-Type", "text/html")
	case strings.HasSuffix(r.URL.Path, ".json"):
		w.Header().Set("Content-Type", "application/json")
	case strings.HasSuffix(r.URL.Path, ".png"):
		w.Header().Set("Content-Type", "image/png")
	case strings.HasSuffix(r.URL.Path, ".jpg"), strings.HasSuffix(r.URL.Path, ".jpeg"):
		w.Header().Set("Content-Type", "image/jpeg")
	case strings.HasSuffix(r.URL.Path, ".svg"):
		w.Header().Set("Content-Type", "image/svg+xml")
	}
	c.handler.ServeHTTP(w, r)
}

func main() {
	if err := db.Connect(); err != nil {
		log.Fatalf("Failed to connect to the database: %v", err)
	}

	r := mux.NewRouter()

	// Serve the frontend/dist directory directly
	fs := http.FileServer(http.Dir("frontend/dist"))
	customFs := &CustomFileServer{handler: fs}

	// API routes
	r.HandleFunc("/api/tasks", handlers.TaskHandler)
	r.HandleFunc("/api/tasks/{id}", handlers.TaskHandler)

	r.PathPrefix("/").Handler(customFs)
	if os.Getenv("ENV") == "production" {
		// In production, allow only the same origin
		fmt.Println("Server running on http://localhost:8080")
		if err := http.ListenAndServe(":8080", r); err != nil {
			log.Fatalf("Server failed to start: %v", err)
		}
	} else {
		// In development, allow localhost:3000
		corsConfig := handlers.DefaultCORSConfig()

		corsConfig.AllowedOrigins = []string{"http://localhost:3000"}
		handlerWithCORS := handlers.CORSMiddleware(corsConfig)(r)
		fmt.Println("Server running on http://localhost:8080")
		if err := http.ListenAndServe(":8080", handlerWithCORS); err != nil {
			log.Fatalf("Server failed to start: %v", err)
		}
	}

}
