package models

/*Post catch the incomming message in body */
type Post struct {
	Message string `bson:"message" json:"message"`
}
