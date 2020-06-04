package middlew

import (
	"net/http"

	"github.com/julianchok25/dj_events_social_interaction/db"
)

/*CheckDb receives the connection and returns the same type connection, it returns functions */
func CheckDb(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		if db.CheckConnection() == 0 {
			http.Error(w, "Lost connection with Data base", 500)
			return
		}
		next.ServeHTTP(w, r)
	}
}
