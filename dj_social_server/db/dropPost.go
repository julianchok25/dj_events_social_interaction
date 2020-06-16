package db

import (
	"context"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

/*DropPost deletes a unique post */
func DropPost(postID string, userID string) error {
	ctx, cancel := context.WithTimeout(context.Background(), 15*time.Second)
	defer cancel()

	db := MongoCon.Database("dj_socialevents")
	col := db.Collection("user_posts")

	// Convert incoming ID to object
	objID, _ := primitive.ObjectIDFromHex(postID)

	condition := bson.M{
		"_id":    objID,
		"userId": userID,
	}

	_, err := col.DeleteOne(ctx, condition)
	return err
}
