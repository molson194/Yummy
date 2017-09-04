package main

import "fmt"
import "net/http"
import "html/template"
import "os"

// Recipe : Title
type Recipe struct {
	Title string
}

func home(w http.ResponseWriter, r *http.Request) {
	homePage, _ := template.ParseFiles("templates/home.html")
	homePage.Execute(w, nil)
}

func recipe(w http.ResponseWriter, r *http.Request) {
	title := r.URL.Path[len("/recipe/"):]
	recipePage, _ := template.ParseFiles("templates/recipe.html")
	recipePage.Execute(w, &Recipe{Title: title})
}

func main() {
	http.HandleFunc("/", home)
	http.HandleFunc("/recipe/", recipe)
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

// TODO: 1. Email subscription. Footer. Front images
// TODO: 2. Change to server side data and templates (closer to database)
// TEST WITH AMAZON FRESH USER
// TODO: 3. Calculate price from ingredients and portion amount. Popover note about how price is calculated
// TODO: 4. Get rid of num served. Replace filter with nutrition
// TODO: 5. Search
// TODO: 6. Other tabs
// THOUGHT: Should it be a single meal or 3 meals to completely use the resources
