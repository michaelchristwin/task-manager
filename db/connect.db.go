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
	Db, err = pgxpool.New(context.Background(), os.Getenv("DATABASE_URL"))
	if err != nil {
		log.Fatalf("Failed to connect to the database: %v", err)
		return fmt.Errorf("Failed to connect to the database: %w", err)
	}
	fmt.Println("Connected to the database")
	return nil
}
