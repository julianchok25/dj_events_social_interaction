package main

import (
	"log"

	"github.com/julianchok25/dj_events_social_interaction/db"
	"github.com/julianchok25/dj_events_social_interaction/handlers"
)

func main() {
	if db.CheckConnection() == 0 {
		log.Fatal("No connection to data base")
		return
	}
	handlers.Handlers()
}
