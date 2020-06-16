package routers

import (
	"net/http"

	"github.com/julianchok25/dj_events_social_interaction/db"
	"github.com/julianchok25/dj_events_social_interaction/models"
)

/*DownRelation deletes the relation between users */
func DownRelation(w http.ResponseWriter, r *http.Request) {
	ID := r.URL.Query().Get("id")
	var mr models.Relation
	mr.UserID = UserID
	mr.UserRelationID = ID

	status, err := db.DeleteRelation(mr)
	if err != nil {
		http.Error(w, "Error ocurred while trying to delete the relation"+err.Error(), http.StatusBadRequest)
		return
	}

	if status == false {
		http.Error(w, "The relationship has not been deleted", http.StatusBadRequest)
		return
	}
	w.WriteHeader(http.StatusCreated)
}