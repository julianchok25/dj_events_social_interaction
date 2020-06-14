package models

import (
	"time"
)

/*SavePost is the struct that represents the posts of a user in DB */
type SavePost struct {
	UserID  string    `bson:"userId" json:"userId,omitempty"`
	Message string    `bson:"message" json:"message,eomitempty"`
	Date    time.Time `bson:"date" json:"date,eomitempty"`
}
