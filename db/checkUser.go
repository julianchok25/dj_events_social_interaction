package db

import (
	"context"
	"time"

	"github.com/julianchok25/dj_events_social_interaction/models"
	"go.mongodb.org/mongo-driver/bson"
)

/*CheckUserExists receives an email as parametter and checks if exists*/
func CheckUserExists(email string) (models.User, bool, string) {
	ctx, cancel := context.WithTimeout(context.Background(), 15*time.Second)
	defer cancel()

	db := MongoCon.Database("dj_socialevents")
	col := db.Collection("users")

	// M = Map
	condition := bson.M{"email": email}
	var res models.User
	// Searching the email
	err := col.FindOne(ctx, condition).Decode(&res)
	ID := res.ID.Hex()
	if err != nil {
		return res, false, ID
	}
	return res, true, ID
}
