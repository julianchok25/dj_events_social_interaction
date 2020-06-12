package routers

import (
	"encoding/json"
	"net/http"

	"github.com/julianchok25/dj_events_social_interaction/db"
	"github.com/julianchok25/dj_events_social_interaction/models"
)

/*UpdateProfile is the route to update the user profile record and validate it */
func UpdateProfile(w http.ResponseWriter, r *http.Request) {
	var u models.User

	err := json.NewDecoder(r.Body).Decode(&u)
	if err != nil {
		http.Error(w, "Invalid Data"+err.Error(), 400)
		return
	}

	var status bool
	status, err = db.UpdateRecord(u, UserID)
	if err != nil {
		http.Error(w, "Error ocurred while try to modify the record"+err.Error(), 400)
		return
	}

	if status == false {
		http.Error(w, "User record has not been modified", 400)
		return
	}

	w.WriteHeader(http.StatusCreated)
}
