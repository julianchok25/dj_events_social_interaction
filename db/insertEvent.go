package db

import (
	"context"
	"time"

	"github.com/julianchok25/dj_events_social_interaction/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

/*InsertEvent save on data base a record with values in struct type*/
func InsertEvent(ev models.Events) (string, bool, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 15*time.Second)
	defer cancel()

	db := MongoCon.Database("dj_socialevents")
	col := db.Collection("events")

	record := bson.M{
		"userId":      ev.UserID,
		"name":        ev.Name,
		"flayer":      ev.Flayer,
		"location":    ev.Location,
		"date":        ev.Date,
		"contactName": ev.ContactName,
		"phone":       ev.Phone,
		"email":       ev.Email,
		"webSite":     ev.Website,
	}

	result, err := col.InsertOne(ctx, record)
	if err != nil {
		return "", false, err
	}
	objID, _ := result.InsertedID.(primitive.ObjectID)
	return objID.String(), true, nil
}
