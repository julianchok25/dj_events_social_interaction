package db

import (
	"context"
	"fmt"
	"time"

	"github.com/julianchok25/dj_events_social_interaction/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

/*SearchProfile query a user profile in DB*/
func SearchProfile(ID string) (models.User, error) {
	ctx, cancel := context.WithTimeout(context.Background(), time.Second*15)
	defer cancel()
	db := MongoCon.Database("dj_socialevents")
	col := db.Collection("users")

	var profile models.User
	// Parse objectID from a string
	objID, _ := primitive.ObjectIDFromHex(ID)

	condition := bson.M{
		"_id": objID,
	}

	err := col.FindOne(ctx, condition).Decode(&profile)
	// clean the password for security
	profile.Password = ""
	if err != nil {
		fmt.Println("Recrod not found", err.Error())
		return profile, err
	}
	return profile, nil

}
