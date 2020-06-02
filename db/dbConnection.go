package db

import (
	"context"
	"log"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

/*MongoCon is the object of connection */
var MongoCon = ConnectDb()

// Setting URL to connect mongo instance DB
var clientOptions = options.Client().ApplyURI("mongodb+srv://root:holberton2020@cluster0-keuwr.mongodb.net/test?retryWrites=true&w=majority")

/*ConnectDb is the function that allow us to connect to the DB */
func ConnectDb() *mongo.Client {
	// Create a connection with clientOptions and setting context with TODO (withouth a condition)
	client, err := mongo.Connect(context.TODO(), clientOptions)
	if err != nil {
		// Error: Catch the error and converts into string
		log.Fatal(err.Error())
		return client
	}
	//ping to database to validate de status
	err = client.Ping(context.TODO(), nil)
	if err != nil {
		log.Fatal(err.Error())
		return client
	}
	log.Println("Succesfull connection to the DB")
	return client
}

/*CheckConnection checks the DB with a PING */
func CheckConnection() int {
	err := MongoCon.Ping(context.TODO(), nil)
	if err != nil {
		return 0
	}
	return 1
}
