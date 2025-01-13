package db

import (
	"context"
	"fmt"
	"log"
	"os"

	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/joho/godotenv"
)

var Db *pgxpool.Pool

func Connect() error {
	// Connect to the database
	var err error
	err = godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
	DB_USER := os.Getenv("DB_USER")
	DB_PASSWORD := os.Getenv("DB_PASSWORD")
	DB_HOST := os.Getenv("DB_HOST")
	DB_NAME := os.Getenv("DB_NAME")
	database_url := fmt.Sprintf("postgresql://%s:%s@%s/%s", DB_USER, DB_PASSWORD, DB_HOST, DB_NAME)
	Db, err = pgxpool.New(context.Background(), database_url)
	if err != nil {
		log.Fatalf("Failed to connect to the database: %v", err)
		return fmt.Errorf("Failed to connect to the database: %w", err)
	}
	fmt.Println("Connected to the database")
	return nil
}
