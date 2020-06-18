package routers

import (
	"encoding/json"
	"net/http"
	"time"

	"github.com/julianchok25/dj_events_social_interaction/db"
	"github.com/julianchok25/dj_events_social_interaction/models"
)

/*CreateEvent receives the request body and decode data on the event model*/
func CreateEvent(w http.ResponseWriter, r *http.Request) {
	var ev models.Events
	err := json.NewDecoder(r.Body).Decode(&ev)
	if err != nil {
		http.Error(w, "Error in received data"+err.Error(), 400)
		return
	}
	// Saving UserID global variable in struct type
	ev.UserID = UserID

	if ev.Date.IsZero() {
		ev.Date = time.Now()
	}

	_, status, err := db.InsertEvent(ev)
	if err != nil {
		http.Error(w, "Error ocurred while trying to insert the event record"+err.Error(), 400)
		return
	}

	if status == false {
		http.Error(w, "Failed to insert record", 400)
		return
	}
	w.WriteHeader(http.StatusCreated)
}
