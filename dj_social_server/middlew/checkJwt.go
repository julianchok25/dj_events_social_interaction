package middlew

import (
	"net/http"

	"github.com/julianchok25/dj_events_social_interaction/routers"
)

/*CheckJwt checks the JWT that comes from the request*/
func CheckJwt(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		_, _, _, err := routers.TokenProcess(r.Header.Get("Authorization"))
		if err != nil {
			http.Error(w, "Error in token"+err.Error(), http.StatusBadRequest)
			return
		}
		next.ServeHTTP(w, r)
	}
}
