package db

import (
	"context"
	"fmt"
	"time"

	"github.com/julianchok25/dj_events_social_interaction/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo/options"
)

/*ReadUsers is a function that reads all users registered */
func ReadUsers(ID string, page int64, search string, typ string) ([]*models.User, bool) {
	ctx, cancel := context.WithTimeout(context.Background(), 15*time.Second)
	defer cancel()

	db := MongoCon.Database("dj_socialevents")
	col := db.Collection("users")

	var res []*models.User

	findOptions := options.Find()
	findOptions.SetSkip((page - 1) * 20)
	findOptions.SetLimit(20)

	condition := bson.M{
		"name": bson.M{"$regex": `(?i)` + search},
	}

	cursor, err := col.Find(ctx, condition, findOptions)
	if err != nil {
		fmt.Println(err.Error())
		return res, false
	}
	var found, include bool

	for cursor.Next(ctx) {
		var record models.User
		err := cursor.Decode(&record)
		if err != nil {
			fmt.Println(err.Error())
			return res, false
		}
		var rel models.Relation
		rel.UserID = ID
		rel.UserRelationID = record.ID.Hex()

		include = false

		found, err = CheckRelation(rel)
		if typ == "new" && found == false {
			include = true
		}
		if typ == "follow" && found == true {
			include = true
		}
		if rel.UserRelationID == ID {
			include = false
		}
		if include == true {
			record.Password = ""
			record.Bio = ""
			record.WebSite = ""
			record.Location = ""
			record.Banner = ""
			record.Email = ""

			res = append(res, &record)
		}
	}
	err = cursor.Err()
	if err != nil {
		fmt.Println(err.Error())
		return res, false
	}

	cursor.Close(ctx)
	return res, true
}
