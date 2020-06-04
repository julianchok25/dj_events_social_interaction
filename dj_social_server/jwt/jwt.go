package jwt

import (
	"time"

	jwt "github.com/dgrijalva/jwt-go"
	"github.com/julianchok25/dj_events_social_interaction/models"
)

/*GenerateJwt is the function that create the json web token with the header, payload and signature*/
func GenerateJwt(u models.User) (string, error) {
	// Creating private code
	mySecret := []byte("Holberton_Cohort10_Bogota")

	payload := jwt.MapClaims{
		"email":     u.Email,
		"name":      u.Name,
		"lastName":  u.LastName,
		"birthDate": u.BirthDate,
		"bio":       u.Bio,
		"location":  u.Location,
		"webSite":   u.WebSite,
		"_id":       u.ID.Hex(),
		"exp":       time.Now().Add(time.Hour * 24).Unix(),
	}
	// Receives heade and payload; Source info: jwt.io
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, payload)
	// VERIFY SIGNATURE
	tokenStr, err := token.SignedString(mySecret)
	if err != nil {
		return tokenStr, err
	}
	return tokenStr, nil
}
