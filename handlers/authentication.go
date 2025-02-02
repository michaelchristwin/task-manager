package handlers

import (
	"encoding/json"
	"log"
	"net/http"
	"time"

	"github.com/michaelchristwin/taskmanager/db"
	"golang.org/x/crypto/bcrypt"
)

type User struct {
	ID        string    `json:"id"`
	FirstName string    `json:"first_name"`
	LastName  string    `json:"last_name"`
	Email     string    `json:"email"`
	Password  string    `json:"password"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

func Signup(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		log.Printf("Invalid request method")
		http.Error(w, "Invalid reuest method", http.StatusMethodNotAllowed)
		return
	}
	var user User

	if err := json.NewDecoder(r.Body).Decode(&user); err != nil {
		http.Error(w, "Invalid request", http.StatusBadRequest)
		log.Printf("Error decoding JSON: %v", err)
		return
	}
	defer r.Body.Close()

	// Hash the password after decoding the request body
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		http.Error(w, "Error hashing password", http.StatusInternalServerError)
		log.Printf("Error hashing password: %v", err)
		return
	}
	user.Password = string(hashedPassword)

	query := `
        INSERT INTO users (first_name, last_name, email, password, last_login)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id, created_at, updated_at;
    `
	row := db.Db.QueryRow(r.Context(), query,
		user.FirstName,
		user.LastName,
		user.Email,
		user.Password,
	)
	if err := row.Scan(&user.ID, &user.CreatedAt, &user.UpdatedAt); err != nil {
		http.Error(w, "Internal server error", http.StatusInternalServerError)
		log.Printf("Failed to insert user: %v", err)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	if err := json.NewEncoder(w).Encode(user); err != nil {
		log.Printf("Failed to encode response: %v", err)
		http.Error(w, "Failed to encode response", http.StatusInternalServerError)
		return
	}
}
