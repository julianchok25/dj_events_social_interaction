package db

import (
	"context"
	"time"

	"github.com/julianchok25/dj_events_social_interaction/models"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

/*InsertRecord is the function that insert a record in the data base */
func InsertRecord(u models.User) (string, bool, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 15*time.Second)
	// Drop the timeout
	defer cancel()

	db := MongoCon.Database("dj_socialevents")
	col := db.Collection("users")

	u.Password, _ = EncryptPass(u.Password)

	result, err := col.InsertOne(ctx, u)
	if err != nil {
		return "", false, err
	}

	ObjID, _ := result.InsertedID.(primitive.ObjectID)
	return ObjID.String(), true, nil
}
