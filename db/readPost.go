package db

import (
	"context"
	"log"
	"time"

	"github.com/julianchok25/dj_events_social_interaction/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo/options"
)

/*ReadPosts is a function that returns a list of posts with pagination */
func ReadPosts(ID string, page int64) ([]*models.ReturnPosts, bool) {
	ctx, cancel := context.WithTimeout(context.Background(), 15*time.Second)
	defer cancel()

	db := MongoCon.Database("dj_socialevents")
	col := db.Collection("user_posts")

	var res []*models.ReturnPosts
	condition := bson.M{
		"userId": ID,
	}
	//Pagination, vale -1 is desc order
	optn := options.Find()
	optn.SetLimit(20)
	optn.SetSort(bson.D{{
		Key: "date", Value: -1}})
	optn.SetSkip((page - 1) * 20)
	// cursor is like a pointer where results are saved and we can loop each one record
	cursor, err := col.Find(ctx, condition, optn)
	if err != nil {
		log.Fatal(err.Error())
		return res, false
	}
	// loop each document that is saved in the cursor
	for cursor.Next(context.TODO()) {
		var record models.ReturnPosts
		err := cursor.Decode(&record)
		if err != nil {
			return res, false
		}
		res = append(res, &record)
	}
	return res, true
}
