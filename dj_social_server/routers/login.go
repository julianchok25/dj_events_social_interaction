package routers

import (
	"encoding/json"
	"net/http"
	"time"

	"github.com/julianchok25/dj_events_social_interaction/db"
	"github.com/julianchok25/dj_events_social_interaction/jwt"
	"github.com/julianchok25/dj_events_social_interaction/models"
)

/*Login is a function that validate the login of a user, call the jwt and sets the response*/
func Login(w http.ResponseWriter, r *http.Request) {
	w.Header().Add("content-type", "application/json")

	var u models.User

	err := json.NewDecoder(r.Body).Decode(&u)
	if err != nil {
		http.Error(w, "Invalid User or Password"+err.Error(), 400)
		return
	}
	if len(u.Email) == 0 {
		http.Error(w, "Email is required", 400)
		return
	}
	obj, exist := db.TrytoLogin(u.Email, u.Password)
	if exist == false {
		http.Error(w, "Invalid user or password", 400)
		return
	}

	jwtkey, err := jwt.GenerateJwt(obj)
	if err != nil {
		http.Error(w, "Error ocurred while try to generate the token"+err.Error(), 400)
	}

	res := models.LoginResponse{
		Token: jwtkey,
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	// Setting the body response
	json.NewEncoder(w).Encode(res)

	// Saving a cookie - Optional
	expirationTime := time.Now().Add(24 * time.Hour)
	http.SetCookie(w, &http.Cookie{
		Name:    "token",
		Value:   jwtkey,
		Expires: expirationTime,
	})
}
