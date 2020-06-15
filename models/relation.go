package models

/*Relation is the struct that allow to save the followers */
type Relation struct {
	UserID string `bson:"userId" json:"userId"`
	UserRelationID string `bson:"userRelationId" json:"userRelationId"`
}