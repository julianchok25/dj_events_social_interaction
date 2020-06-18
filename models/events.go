package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

/*Events is a struct type to manage the fields of events */
type Events struct {
	ID          primitive.ObjectID `bson:"_id" json:"_id"`
	UserID      string             `bson:"userId" json:"userId,omitempty"`
	Name        string             `bson:"name" json:"name,omitempty"`
	Flayer      string             `bson:"flayer" json:"flayer,omitempty"`
	Location    string             `bson:"location" json:"location,omitempty"`
	Date        time.Time          `bson:"date" json:"date,omitempty"`
	ContactName string             `bson:"contactName" json:"contactName,omitempty"`
	Phone       int                `bson:"phone" json:"phone,omitempty"`
	Email       string             `bson:"email" json:"email,omitempty"`
	Website     string             `bson:"webSite" json:"webSite,omitempty"`
}
