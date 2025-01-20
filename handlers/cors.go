package handlers

import (
	"net/http"
	"strconv"
	"strings"
)

type CORSConfig struct {
	AllowedOrigins []string
	// Add other CORS settings as needed
	AllowedMethods []string
	AllowedHeaders []string
	MaxAge         int
}

func DefaultCORSConfig() CORSConfig {
	return CORSConfig{
		AllowedMethods: []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders: []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
		MaxAge:         86400, // 24 hours
	}
}

func CORSMiddleware(config CORSConfig) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			origin := r.Header.Get("Origin")

			// Check if the origin is in the whitelist
			allowed := false
			for _, allowedOrigin := range config.AllowedOrigins {
				if allowedOrigin == "*" || allowedOrigin == origin {
					allowed = true
					break
				}
				// Support wildcard subdomains (e.g., *.example.com)
				if strings.HasPrefix(allowedOrigin, "*") {
					suffix := strings.TrimPrefix(allowedOrigin, "*")
					if strings.HasSuffix(origin, suffix) {
						allowed = true
						break
					}
				}
			}

			if !allowed {
				http.Error(w, "Origin not allowed", http.StatusForbidden)
				return
			}

			// Set CORS headers
			w.Header().Set("Access-Control-Allow-Origin", origin)
			w.Header().Set("Access-Control-Allow-Methods", strings.Join(config.AllowedMethods, ", "))
			w.Header().Set("Access-Control-Allow-Headers", strings.Join(config.AllowedHeaders, ", "))
			w.Header().Set("Access-Control-Max-Age", strconv.Itoa(config.MaxAge))

			// Handle preflight requests
			if r.Method == "OPTIONS" {
				w.WriteHeader(http.StatusOK)
				return
			}

			next.ServeHTTP(w, r)
		})
	}
}
