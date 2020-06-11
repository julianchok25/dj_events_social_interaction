package routers

import (
	"io"
	"net/http"
	"os"
	"strings"

	"github.com/julianchok25/dj_events_social_interaction/db"
	"github.com/julianchok25/dj_events_social_interaction/models"
)

/*UploadAvatar is the route to upload the picture to the user profile*/
func UploadAvatar(w http.ResponseWriter, r *http.Request) {
	file, handler, err := r.FormFile("avatar")
	// extract the extention of the file
	var ext = strings.Split(handler.Filename, ".")[1]
	// Setting a file name with unique ID
	var avFile string = "uploads/avatars/" + UserID + "." + ext

	f, err := os.OpenFile(avFile, os.O_WRONLY|os.O_CREATE, 0666)
	if err != nil {
		http.Error(w, "Error while image was opening"+err.Error(), http.StatusBadRequest)
		return
	}

	_, err = io.Copy(f, file)
	if err != nil {
		http.Error(w, "Error error copying image"+err.Error(), http.StatusBadRequest)
		return
	}

	// Modify the record in DB
	var u models.User
	var status bool
	u.Avatar = UserID + "." + ext
	status, err = db.UpdateRecord(u, UserID)
	if err != nil || status == false {
		http.Error(w, "Error error writing to database"+err.Error(), http.StatusBadRequest)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
}
