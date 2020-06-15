package routers

import (
	"net/http"

	"github.com/julianchok25/dj_events_social_interaction/db"
	"github.com/julianchok25/dj_events_social_interaction/models"
)

/*HighRelation create the relation between users */
func HighRelation(w http.ResponseWriter, r *http.Request) {
	ID := r.URL.Query().Get("id")
	if len(ID) < 1 {
		http.Error(w, "ID is mandatory", http.StatusBadRequest)
		return
	}

	var mr models.Relation
	mr.UserID = UserID
	mr.UserRelationID = ID

	status, err := db.InsertRelation(mr)
	if err != nil {
		http.Error(w, "Error ocurred while trying to insert the relation"+err.Error(), http.StatusBadRequest)
		return
	}

	if status == false {
		http.Error(w, "The relationship has not been inserted", http.StatusBadRequest)
		return
	}
	w.WriteHeader(http.StatusCreated)
}
