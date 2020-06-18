package db

import (
	"context"
	"time"

	"github.com/julianchok25/dj_events_social_interaction/models"
	"go.mongodb.org/mongo-driver/bson"
)

/*ReadPublicPosts is a function that reads the user posts that the user follows */
func ReadPublicPosts(ID string, page int) ([]models.ReturnPublicPosts, bool) {
	ctx, cancel := context.WithTimeout(context.Background(), 15*time.Second)
	defer cancel()

	db := MongoCon.Database("dj_socialevents")
	col := db.Collection("relations")

	skip := (page - 1) * 20
	conditions := make([]bson.M, 0)
	// framework aggregate
	conditions = append(conditions, bson.M{"$match": bson.M{"userId": ID}})
	conditions = append(conditions, bson.M{
		// Join  two tables
		"$lookup": bson.M{
			"from":         "user_posts",
			"localField":   "userRelationId",
			"foreignField": "userId",
			"as":           "relPosts",
		}})
	conditions = append(conditions, bson.M{"$unwind": "$relPosts"})
	conditions = append(conditions, bson.M{"$sort": bson.M{"relPosts.date": -1}})
	conditions = append(conditions, bson.M{"$skip": skip})
	conditions = append(conditions, bson.M{"$limit": 20})
	// cursor with aggregate is builtin, no loop needed
	cursor, err := col.Aggregate(ctx, conditions)
	var res []models.ReturnPublicPosts
	err = cursor.All(ctx, &res)
	if err != nil {
		return res, false
	}
	return res, true
}
