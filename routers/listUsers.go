package routers

import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/julianchok25/dj_events_social_interaction/db"
)

/*ListUsers reads all users created on DB */
func ListUsers(w http.ResponseWriter, r *http.Request) {
	userType := r.URL.Query().Get("type")
	page := r.URL.Query().Get("page")
	search := r.URL.Query().Get("search")

	pagTemp, err := strconv.Atoi(page)
	if err != nil {
		http.Error(w, "You must to send the page parameter like an integer > 0", http.StatusBadRequest)
		return
	}

	pag := int64(pagTemp)

	res, status := db.ReadUsers(UserID, pag, search, userType)
	if status == false {
		http.Error(w, "Error ocurred while reading users", http.StatusBadRequest)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(res)
}
