package main

import "fmt"
import "net/http"
import "html/template"
import "os"

func home(w http.ResponseWriter, r *http.Request) {
	homePage, _ := template.ParseFiles("templates/home.html")
	homePage.Execute(w, nil)
}

func recipe(w http.ResponseWriter, r *http.Request) {
	recipePage, _ := template.ParseFiles("templates/recipe.html")
	recipePage.Execute(w, nil)
}

func main() {
	http.HandleFunc("/", home)
	http.HandleFunc("/recipe", recipe)
	http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("static"))))
	fmt.Println("Starting server...")
	http.ListenAndServe(getPort(), nil)
}

func getPort() string {
	var port = os.Getenv("PORT")
	if port == "" {
		return ":8080"
	}
	return ":" + port
}

// TODO: Email subscription
// TODO: Google Analytics
// TODO: Amazon Link with ingredients and price
