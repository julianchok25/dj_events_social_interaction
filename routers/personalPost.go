package routers

import (
	"encoding/json"
	"net/http"
	"time"

	"github.com/julianchok25/dj_events_social_interaction/db"
	"github.com/julianchok25/dj_events_social_interaction/models"
)

/*PersonalPost is the endpoint that allows to save the post in DB*/
func PersonalPost(w http.ResponseWriter, r *http.Request) {
	var message models.Post
	err := json.NewDecoder(r.Body).Decode(&message)

	record := models.SavePost{
		UserID:  UserID,
		Message: message.Message,
		Date:    time.Now(),
	}

	_, status, err := db.InsertPost(record)
	if err != nil {
		http.Error(w, "Error ocurred while trying to insert the record"+err.Error(), 400)
		return
	}

	if status == false {
		http.Error(w, "Failed to insert record", 400)
		return
	}

	w.WriteHeader(http.StatusCreated)
}
