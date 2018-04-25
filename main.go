package main

import (
	"flag"
	"fmt"

	_ "github.com/mattn/go-sqlite3"
	"github.com/monmaru/reviewer/backend"
)

var dbPath, reportDir, port string

func main() {
	flag.StringVar(&dbPath, "db", "", "sqlite database path")
	flag.StringVar(&dbPath, "d", "", "sqlite database path")
	flag.StringVar(&reportDir, "report", "", "location of the report")
	flag.StringVar(&reportDir, "r", "", "location of the report")
	flag.StringVar(&port, "port", "8080", "server port")
	flag.StringVar(&port, "p", "8080", "server port")
	flag.Parse()

	if len(dbPath) == 0 {
		fmt.Println("Please specify the sqlite db path.")
		return
	}

	if len(reportDir) == 0 {
		fmt.Println("Please specify the report directory.")
		return
	}

	backend.New(dbPath).Run(":"+port, reportDir)
}
