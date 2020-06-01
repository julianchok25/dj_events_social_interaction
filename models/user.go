package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

/*User is the struct user model that represents the profile in DB*/
type User struct {
	ID        primitive.ObjectID `bson:"_id, omitempty" json:"id"`
	Name      string             `bson:"name" json:"name,omitempty"`
	LastName  string             `bson:"lastName" json:"lastName,omitempty"`
	BirthDate time.Time          `bson:"birthDate" json:"birthDate,omitempty"`
	Email     string             `bson:"email" json:"email"`
	Password  string             `bson:"password" json:"password,omitempty"`
	Avatar    string             `bson:"avatar" json:"avatar,omitempty"`
	Banner    string             `bson:"banner" json:"banner,omitempty"`
	Bio       string             `bson:"bio" json:"bio,omitempty"`
	Location  string             `bson:"location" json:"location,omitempty"`
	WebSite   string             `bson:"webSite" json:"webSite,omitempty"`
}
