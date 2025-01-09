package db

import (
	"context"
	"fmt"
	"os"

	"github.com/jackc/pgx/v5/pgxpool"
)

var Db *pgxpool.Pool

func Connect() error {
	// Connect to the database
	var err error
	Db, err = pgxpool.New(context.Background(), os.Getenv("DATABASE_URL"))
	if err != nil {
		return fmt.Errorf("Failed to connect to the database: %w", err)
	}
	fmt.Println("Connected to the database")
	return nil
}
