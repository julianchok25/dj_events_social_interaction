package db

import (
	"context"
	"time"

	"github.com/julianchok25/dj_events_social_interaction/models"
)

/*DeleteRelation deletes the relation of a follower in DB */
func DeleteRelation(r models.Relation) (bool, error) {
	ctx, cancel := context.WithTimeout(context.Background(), time.Second*15)
	defer cancel()

	db := MongoCon.Database("dj_socialevents")
	col := db.Collection("relations")

	_, err := col.DeleteOne(ctx, r)
	if err != nil {
		return false, err
	}
	return true, nil
}
