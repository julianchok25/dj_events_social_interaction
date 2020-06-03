package routers

import (
	"errors"
	"strings"

	jwt "github.com/dgrijalva/jwt-go"
	"github.com/julianchok25/dj_events_social_interaction/db"
	"github.com/julianchok25/dj_events_social_interaction/models"
)

/*Email is a global variable*/
var Email string

/*UserID is a global variable*/
var UserID string

/*TokenProcess is a function that extrat values of the JWT and validate credentials*/
func TokenProcess(token string) (*models.Claim, bool, string, error) {
	mySecret := []byte("Holberton_Cohort10_Bogota")
	claims := &models.Claim{}
	// split the Bearer word from string token (converts to an array)
	splitToken := strings.Split(token, "Bearer")
	if len(splitToken) != 2 {
		return claims, false, string(""), errors.New("Invalid token format")
	}
	// Delete spaces of the token and save only the string token, withouth Bearer word
	token = strings.TrimSpace(splitToken[1])
	// Now, validate the token
	tkn, err := jwt.ParseWithClaims(token, claims, func(tk *jwt.Token) (interface{}, error) {
		return mySecret, nil
	})
	if err == nil {
		_, found, _ := db.CheckUserExists(claims.Email)
		if found == true {
			Email = claims.Email
			UserID = claims.ID.Hex()
		}
		return claims, found, UserID, nil
	}
	if !tkn.Valid {
		return claims, false, string(""), errors.New("Invalid token")
	}

	return claims, false, string(""), err
}
