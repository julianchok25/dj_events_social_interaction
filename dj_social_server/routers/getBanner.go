package routers

import (
	"io"
	"net/http"
	"os"

	"github.com/julianchok25/dj_events_social_interaction/db"
)

/*GetBanner is the route to get the banner from the user ID and copy to the response writer*/
func GetBanner(w http.ResponseWriter, r *http.Request) {
	ID := r.URL.Query().Get("id")
	if len(ID) < 1 {
		http.Error(w, "You should to send the Id Parametter", http.StatusBadRequest)
		return
	}
	// get the profile user
	profile, err := db.SearchProfile(ID)
	if err != nil {
		http.Error(w, "User not found", http.StatusBadRequest)
		return
	}
	// Reading the user avatar
	openFile, err := os.Open("uploads/banners/" + profile.Banner)
	if err != nil {
		http.Error(w, "Image not found", http.StatusBadRequest)
		return
	}

	_, err = io.Copy(w, openFile)
	if err != nil {
		http.Error(w, "Error copying the image", http.StatusBadRequest)
	}
}
