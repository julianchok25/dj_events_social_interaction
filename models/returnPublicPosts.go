package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

/*ReturnPublicPosts is a struct type that defines relations with other collections */
type ReturnPublicPosts struct {
	// All json format is for how to send data to http and bson is for mongo format
	ID             primitive.ObjectID `bson:"_id" json:"_id,omitempty"`
	UserID         string             `bson:"userId" json:"userId,omitempty"`
	UserRelationID string             `bson:"userRelationId" json:"userRelationId,omitempty"`
	Post           struct {
		Message string    `bson:"message" json:"message"`
		Date    time.Time `bson:"date" json:"date,omitempty"`
		ID      string    `bson:"_id" json:"_id"`
	}
}
