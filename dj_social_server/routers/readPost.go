package routers

import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/julianchok25/dj_events_social_interaction/db"
)

/*ReadPosts is the method that controls all the read posts endpoint */
func ReadPosts(w http.ResponseWriter, r *http.Request) {
	ID := r.URL.Query().Get("id")
	if len(ID) < 1 {
		http.Error(w, "You must to send the ID parametter", http.StatusBadRequest)
		return
	}
	if len(r.URL.Query().Get("page")) < 1 {
		http.Error(w, "You must to send the page parametter", http.StatusBadRequest)
		return
	}
	page, err := strconv.Atoi(r.URL.Query().Get("page"))
	if err != nil {
		http.Error(w, "You must to send the page parametter with a value grater than 0", http.StatusBadRequest)
		return
	}
	pag := int64(page)
	res, status := db.BringPosts(ID, pag)
	if status == false {
		http.Error(w, "Error reading the posts", http.StatusBadRequest)
		return
	}
	w.Header().Set("Content-type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(res)
}
