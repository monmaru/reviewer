package main

import (
	"fmt"
	"os"

	_ "github.com/mattn/go-sqlite3"
	"github.com/monmaru/reviewer/backend"
)

func main() {
	if len(os.Args) == 1 {
		fmt.Println("Please specify the sqlite db path.")
		return
	}

	dbPath := os.Args[1]
	port := ":8080"
	if len(os.Args) >= 3 {
		port = ":" + os.Args[2]
	}
	backend.New(dbPath).Run(port)
}
