package main

import "fmt"
import "net/http"
import "html/template"
import "os"
import _ "github.com/lib/pq"
import "database/sql"
import "github.com/sendgrid/sendgrid-go"
import "github.com/sendgrid/sendgrid-go/helpers/mail"

var db *sql.DB

// Recipe : Title
type Recipe struct {
	Title string
}

func subscribe(w http.ResponseWriter, r *http.Request) {
	email := r.URL.Path[len("/subscribe/"):]
	// TODO: if email isn't in db yet
	db.QueryRow("INSERT INTO emails(email) VALUES($1);", email)

	from := mail.NewEmail("FOOD", "food@food.com")
	subject := "Thanks for Subscribing"
	to := mail.NewEmail("New Subscriber", email)
	plainTextContent := " "
	htmlContent := "<p>We can't wait to share our favorite recipes with you!</p>"
	message := mail.NewSingleEmail(from, subject, to, plainTextContent, htmlContent)
	client := sendgrid.NewSendClient("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")
	client.Send(message)
	/*
		rows, _ := db.Query("SELECT * FROM emails")

		defer rows.Close()
		for rows.Next() {
			var email string
			rows.Scan(&email)
			fmt.Println(email)
		}
	*/
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
	db, _ = sql.Open("postgres", "postgres://nkjplgcudchzta:7d21aff54ce6c3e66f5bbd815dd29e74d442e0dd344311dde85cf10462488bae@ec2-23-21-184-113.compute-1.amazonaws.com:5432/db1605r628ae6n")
	defer db.Close()
	db.Exec("CREATE TABLE IF NOT EXISTS emails (email VARCHAR (50) NOT NULL UNIQUE)")

	http.HandleFunc("/", home)
	http.HandleFunc("/recipe/", recipe)
	http.HandleFunc("/subscribe/", subscribe)
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

// TODO: 1. Change to server side data and templates (closer to database)
// TEST WITH AMAZON FRESH USER
// TODO: 2. Calculate price from ingredients and portion amount. Popover note about how price is calculated
// TODO: 3. Get rid of num served. Replace filter with nutrition
// TODO: 4. Search
// TODO: 5. Other tabs
// THOUGHT: Should it be a single meal or 3 meals to completely use the resources
