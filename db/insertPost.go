package db

import (
	"context"
	"time"

	"github.com/julianchok25/dj_events_social_interaction/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

/*InsertPost Function that save the post in DB*/
func InsertPost(s models.SavePost) (string, bool, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 15*time.Second)
	// Drop the timeout
	defer cancel()

	db := MongoCon.Database("dj_socialevents")
	col := db.Collection("user_posts")

	record := bson.M{
		"userId":  s.UserID,
		"message": s.Message,
		"date":    s.Date,
	}
	result, err := col.InsertOne(ctx, record)
	if err != nil {
		return "", false, err
	}
	// return the ID Post
	objID, _ := result.InsertedID.(primitive.ObjectID)
	return objID.String(), true, nil
}
