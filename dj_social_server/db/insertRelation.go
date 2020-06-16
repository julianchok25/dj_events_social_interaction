package db

import (
	"context"
	"time"

	"github.com/julianchok25/dj_events_social_interaction/models"
)

/*InsertRelation is the function that returns if exists a relation wih other user and save on DB*/
func InsertRelation(r models.Relation) (bool, error) {
	ctx, cancel := context.WithTimeout(context.Background(), time.Second*15)
	defer cancel()

	db := MongoCon.Database("dj_socialevents")
	col := db.Collection("relations")

	_, err := col.InsertOne(ctx, r)
	if err != nil {
		return false, err
	}
	return true, nil
}
