package routers

import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/julianchok25/dj_events_social_interaction/db"
)

/*PublicPosts is a route function that reads all posts that user follows */
func PublicPosts(w http.ResponseWriter, r *http.Request) {
	page := r.URL.Query().Get("page")
	if len(page) < 1 {
		http.Error(w, "You must to send the page parameter", http.StatusBadRequest)
		return
	}

	pageInt, err := strconv.Atoi(page)
	if err != nil {
		http.Error(w, "You must to send the page parameter as a integer > 0", http.StatusBadRequest)
		return
	}

	res, status := db.ReadPublicPosts(UserID, pageInt)
	if status == false {
		http.Error(w, "Error ocurred while trying to read posts", http.StatusBadRequest)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(res)
}
