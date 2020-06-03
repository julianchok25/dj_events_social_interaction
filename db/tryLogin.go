package db

import (
	"github.com/julianchok25/dj_events_social_interaction/models"
	"golang.org/x/crypto/bcrypt"
)

/*TrytoLogin perform the checking of loggin to the DB*/
func TrytoLogin(email string, password string) (models.User, bool) {
	us, found, _ := CheckUserExists(email)
	if found == false {
		return us, false
	}
	// Validate password
	passByte := []byte(password)
	passBd := []byte(us.Password)
	// first goes pass encrypted and afer the normal
	err := bcrypt.CompareHashAndPassword(passBd, passByte)
	if err != nil {
		return us, false
	}
	return us, true

}
