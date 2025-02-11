package handlers

import (
	"encoding/json"
	"fmt"
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

type LoginUser struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type LoginU struct {
	ID             string `json:"id"`
	Email          string `json:"email"`
	HashedPassword string `json:"hashed_password"`
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
        INSERT INTO users (first_name, last_name, email, password)
        VALUES ($1, $2, $3, $4)
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

func Login(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		log.Printf("Invalid request method")
		http.Error(w, "Invalid reuest method", http.StatusMethodNotAllowed)
		return
	}
	var user LoginUser
	if err := json.NewDecoder(r.Body).Decode(&user); err != nil {
		http.Error(w, "Invalid request", http.StatusBadRequest)
		log.Printf("Error decoding JSON: %v", err)
		return
	}
	defer r.Body.Close()
	query := "SELECT id, email, password FROM users WHERE email = $1"
	var dbUser LoginU
	row := db.Db.QueryRow(r.Context(), query, user.Email)
	if err := row.Scan(&dbUser.ID, &dbUser.Email, &dbUser.HashedPassword); err != nil {
		log.Printf("Failed to find task: %v", err)
		http.Error(w, "Task not found", http.StatusNotFound)
		return
	}
	err := bcrypt.CompareHashAndPassword([]byte(dbUser.HashedPassword), []byte(user.Password))
	if err != nil {
		http.Error(w, "Invalid password", http.StatusInternalServerError)
		log.Printf("Invalid password: %v", err)
		return
	}
	fmt.Println("lol")
}
