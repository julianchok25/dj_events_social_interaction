package routers

import (
	"encoding/json"
	"net/http"

	"github.com/julianchok25/dj_events_social_interaction/db"
	"github.com/julianchok25/dj_events_social_interaction/models"
)

/*SignIns is the route to save the user record and validate it*/
func SignIns(w http.ResponseWriter, r *http.Request) {
	var u models.User
	//Decoding the body json
	err := json.NewDecoder(r.Body).Decode(&u)
	if err != nil {
		http.Error(w, "Error in received data"+err.Error(), 400)
		return
	}
	// Validate fields
	if len(u.Email) == 0 {
		http.Error(w, "Email is required", 400)
		return
	}
	if len(u.Password) < 6 {
		http.Error(w, "You must specify a at least a 6 character password", 400)
		return
	}

	_, found, _ := db.CheckUserExists(u.Email)
	if found == true {
		http.Error(w, "User exists wit the same Email", 400)
		return
	}

	_, status, err := db.InsertRecord(u)
	if err != nil {
		http.Error(w, "An error ocurred while trying to register user"+err.Error(), 400)
		return
	}

	if status == false {
		http.Error(w, "Insert failed", 400)
		return
	}

	w.WriteHeader(http.StatusCreated)
}
