package handlers

import (
	"log"
	"net/http"
	"os"

	"github.com/gorilla/mux"
	"github.com/julianchok25/dj_events_social_interaction/middlew"
	"github.com/julianchok25/dj_events_social_interaction/routers"
	"github.com/rs/cors"
)

/*Handlers sets the port and listen the server */
func Handlers() {
	router := mux.NewRouter()
	router.HandleFunc("/sign-ins", middlew.CheckDb(routers.SignIns)).Methods("POST")
	router.HandleFunc("/logins", middlew.CheckDb(routers.Login)).Methods("POST")
	router.HandleFunc("/view-profiles", middlew.CheckDb(middlew.CheckJwt(routers.ViewProfile))).Methods("GET")
	router.HandleFunc("/update-profiles", middlew.CheckDb(middlew.CheckJwt(routers.UpdateProfile))).Methods("PUT")

	router.HandleFunc("/upload-avatars", middlew.CheckDb(middlew.CheckJwt(routers.UploadAvatar))).Methods("POST")
	router.HandleFunc("/avatars", middlew.CheckDb(routers.GetAvatar)).Methods("GET")
	router.HandleFunc("/upload-banners", middlew.CheckDb(middlew.CheckJwt(routers.UploadBanner))).Methods("POST")
	router.HandleFunc("/banners", middlew.CheckDb(routers.GetBanner)).Methods("GET")

	router.HandleFunc("/personal-posts", middlew.CheckDb(middlew.CheckJwt(routers.PersonalPost))).Methods("POST")
	router.HandleFunc("/read-posts", middlew.CheckDb(middlew.CheckJwt(routers.ReadPosts))).Methods("GET")

	router.HandleFunc("/high-relations", middlew.CheckDb(middlew.CheckJwt(routers.HighRelation))).Methods("POST")
	router.HandleFunc("/down-relations", middlew.CheckDb(middlew.CheckJwt(routers.DownRelation))).Methods("DELETE")
	router.HandleFunc("/query-relations", middlew.CheckDb(middlew.CheckJwt(routers.QueryRelation))).Methods("GET")

	Port := os.Getenv("PORT")
	if Port == "" {
		Port = "8080"
	}
	handler := cors.AllowAll().Handler(router)
	log.Fatal(http.ListenAndServe(":"+Port, handler))
}
