package routers

import (
	"net/http"

	"github.com/julianchok25/dj_events_social_interaction/db"
)

/*DeletePost is the route that allows to delete a unique post */
func DeletePost(w http.ResponseWriter, r *http.Request) {
	ID := r.URL.Query().Get("id")
	if len(ID) < 1 {
		http.Error(w, "You must to send the ID parameter", http.StatusBadRequest)
		return
	}
	err := db.DropPost(ID, UserID)
	if err != nil {
		http.Error(w, "Error ocurred while trying to delete the post"+err.Error(), http.StatusBadRequest)
		return
	}

	w.Header().Set("Content-type", "application/json")
	w.WriteHeader(http.StatusCreated)
}
