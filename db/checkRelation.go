package db

import (
	"context"
	"fmt"
	"time"

	"github.com/julianchok25/dj_events_social_interaction/models"
	"go.mongodb.org/mongo-driver/bson"
)

/*CheckRelation checks the relation between users */
func CheckRelation(r models.Relation) (bool, error) {
	ctx, cancel := context.WithTimeout(context.Background(), time.Second*15)
	defer cancel()

	db := MongoCon.Database("dj_socialevents")
	col := db.Collection("relations")

	condition := bson.M{
		"userID":         r.UserID,
		"userRelationID": r.UserRelationID,
	}

	var res models.Relation
	fmt.Println(res)
	err := col.FindOne(ctx, condition).Decode(&res)
	if err != nil {
		fmt.Println(err.Error())
		return false, err
	}
	return true, nil
}
