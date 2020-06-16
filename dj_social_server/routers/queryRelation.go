package routers

import (
	"encoding/json"
	"net/http"

	"github.com/julianchok25/dj_events_social_interaction/db"
	"github.com/julianchok25/dj_events_social_interaction/models"
)

/*QueryRelation is the function that validate the status of the query relation between users*/
func QueryRelation(w http.ResponseWriter, r *http.Request) {
	ID := r.URL.Query().Get("id")
	var mr models.Relation
	mr.UserID = UserID
	mr.UserRelationID = ID

	var res models.StatusQueryRelation

	status, err := db.CheckRelation(mr)
	if err != nil || status == false {
		res.Status = false
	} else {
		res.Status = true
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(res)
}
