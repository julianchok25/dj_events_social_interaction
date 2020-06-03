package routers

import (
	"encoding/json"
	"net/http"

	"github.com/julianchok25/dj_events_social_interaction/db"
)

/*ViewProfile call the searchprofile function and serialize to json the user found
- this method doesn't return any value*/
func ViewProfile(w http.ResponseWriter, r *http.Request) {
	// First, we validate if the request has the ID as params
	ID := r.URL.Query().Get("id")
	if len(ID) < 1 {
		http.Error(w, "You should send the ID value", http.StatusBadRequest)
		return
	}

	profile, err := db.SearchProfile(ID)
	if err != nil {
		http.Error(w, "Record not found"+err.Error(), 400)
		return
	}
	w.Header().Set("content-type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(profile)
}
