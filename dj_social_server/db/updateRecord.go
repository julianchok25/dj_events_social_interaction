package db

import (
	"context"
	"time"

	"github.com/julianchok25/dj_events_social_interaction/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

/*UpdateRecord allows to modify the user profile */
func UpdateRecord(u models.User, ID string) (bool, error) {
	ctx, cancel := context.WithTimeout(context.Background(), time.Second*15)
	defer cancel()
	db := MongoCon.Database("dj_socialevents")
	col := db.Collection("users")

	// Creating an empty interface, interface is the object
	record := make(map[string]interface{})
	if len(u.Name) > 0 {
		record["name"] = u.Name
	}
	if len(u.LastName) > 0 {
		record["lastName"] = u.LastName
	}
	record["birthDate"] = u.BirthDate
	if len(u.Avatar) > 0 {
		record["avatar"] = u.Avatar
	}
	if len(u.Banner) > 0 {
		record["banner"] = u.Banner
	}
	if len(u.Bio) > 0 {
		record["bio"] = u.Bio
	}
	if len(u.Location) > 0 {
		record["location"] = u.Location
	}
	if len(u.WebSite) > 0 {
		record["webSite"] = u.WebSite
	}

	updateString := bson.M{
		"$set": record,
	}

	objID, _ := primitive.ObjectIDFromHex(ID)
	// Setting a filter
	filter := bson.M{"_id": bson.M{"$eq": objID}}

	_, err := col.UpdateOne(ctx, filter, updateString)
	if err != nil {
		return false, err
	}
	return true, nil
}
