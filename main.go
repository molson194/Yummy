package main

import "fmt"
import "net/http"
import "html/template"
import "os"
import _ "github.com/lib/pq"
import "database/sql"
import "github.com/sendgrid/sendgrid-go"
import "github.com/sendgrid/sendgrid-go/helpers/mail"
import "encoding/json"
import "io/ioutil"
import "strings"

var db *sql.DB
var recipes []Recipe

// Ingredient : Parts of ingredient
type Ingredient struct {
	Name     string
	Price    float32
	Quantity int
	ASIN     string
}

// Recipe : Parts of a recipe
type Recipe struct {
	Title       string
	Image       string
	Description string
	Time        float32
	Price       float32
	Region      string
	Meat        string
	Servings    int
	Calories    int
	Carbs       float32
	Fat         float32
	Protein     float32
	Nutrition   string
	Equipment   string
	Ingredients []Ingredient
	Directions  []string
}

func subscribe(w http.ResponseWriter, r *http.Request) {
	email := r.URL.Path[len("/subscribe/"):]
	count, _ := db.Query("SELECT * FROM emails WHERE email = $1", email)
	defer count.Close()
	if !count.Next() {
		db.QueryRow("INSERT INTO emails(email) VALUES($1);", email)

		from := mail.NewEmail("FOOD", "food@food.com")
		subject := "Thanks for Subscribing"
		to := mail.NewEmail("New Subscriber", email)
		plainTextContent := " "
		htmlContent := "<p>We can't wait to share our favorite recipes with you!</p>"
		message := mail.NewSingleEmail(from, subject, to, plainTextContent, htmlContent)
		client := sendgrid.NewSendClient("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")
		client.Send(message)
	}
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

func noFilter(w http.ResponseWriter, r *http.Request) {
	js, _ := json.Marshal(recipes)
	w.Header().Set("Content-Type", "application/json")
	w.Write(js)
}

func filter(w http.ResponseWriter, r *http.Request) {
	active := strings.Split(r.URL.Path[len("/filter/"):], "+")
	var filteredRecipes []Recipe
	cost := active[0] == "false" && active[1] == "false" && active[2] == "false" && active[3] == "false"
	time := active[4] == "false" && active[5] == "false" && active[6] == "false"
	region := active[7] == "false" && active[8] == "false" && active[9] == "false" && active[10] == "false"
	meat := active[11] == "false" && active[12] == "false" && active[13] == "false" && active[14] == "false" && active[15] == "false"
	servings := active[15] == "false" && active[16] == "false" && active[17] == "false" && active[18] == "false"
	for k := range recipes {
		cost0 := recipes[k].Price/float32(recipes[k].Servings) >= 0 && recipes[k].Price/float32(recipes[k].Servings) < 3 && active[0] == "true"
		cost1 := recipes[k].Price/float32(recipes[k].Servings) >= 3 && recipes[k].Price/float32(recipes[k].Servings) < 6 && active[1] == "true"
		cost2 := recipes[k].Price/float32(recipes[k].Servings) >= 6 && recipes[k].Price/float32(recipes[k].Servings) < 9 && active[2] == "true"
		cost3 := recipes[k].Price/float32(recipes[k].Servings) >= 9 && active[3] == "true"
		time0 := recipes[k].Time >= 0 && recipes[k].Time <= 0.5 && active[4] == "true"
		time1 := recipes[k].Time >= 0.5 && recipes[k].Time <= 1 && active[5] == "true"
		time2 := recipes[k].Time >= 1.5 && active[6] == "true"
		regionAm := recipes[k].Region == "American" && active[7] == "true"
		regionIt := recipes[k].Region == "Italian" && active[8] == "true"
		regionCh := recipes[k].Region == "Chinese" && active[9] == "true"
		regionMx := recipes[k].Region == "Mexican" && active[10] == "true"
		meatCh := recipes[k].Meat == "Chicken" && active[11] == "true"
		meatBf := recipes[k].Meat == "Beef" && active[12] == "true"
		meatFi := recipes[k].Meat == "Fish" && active[13] == "true"
		meatPk := recipes[k].Meat == "Pork" && active[14] == "true"
		meatVg := recipes[k].Meat == "Vegetarian" && active[15] == "true"
		servings0 := recipes[k].Servings >= 1 && recipes[k].Servings <= 3 && active[16] == "true"
		servings1 := recipes[k].Servings >= 4 && recipes[k].Servings <= 6 && active[17] == "true"
		servings2 := recipes[k].Servings >= 7 && recipes[k].Servings <= 9 && active[18] == "true"
		if (cost || cost0 || cost1 || cost2 || cost3) && (time || time0 || time1 || time2) && (region || regionAm || regionIt || regionCh || regionMx) && (meat || meatCh || meatBf || meatFi || meatPk || meatVg) && (servings || servings0 || servings1 || servings2) {
			filteredRecipes = append(filteredRecipes, recipes[k])
		}
	}
	js, _ := json.Marshal(filteredRecipes)
	w.Header().Set("Content-Type", "application/json")
	w.Write(js)
}

func home(w http.ResponseWriter, r *http.Request) {
	homePage, _ := template.ParseFiles("templates/home.html")
	homePage.Execute(w, &recipes)
}

func recipe(w http.ResponseWriter, r *http.Request) {
	title := r.URL.Path[len("/recipe/"):]
	recipePage, _ := template.ParseFiles("templates/recipe.html")
	for k := range recipes {
		if title == recipes[k].Title {
			recipePage.Execute(w, &recipes[k])
		}
	}
}

func main() {
	file, _ := ioutil.ReadFile("static/recipes.json")
	json.Unmarshal(file, &recipes)
	for k := range recipes {
		price := float32(0)
		for i := range recipes[k].Ingredients {
			price += recipes[k].Ingredients[i].Price * float32(recipes[k].Ingredients[i].Quantity)
		}
		recipes[k].Price = price
	}

	db, _ = sql.Open("postgres", "postgres://nkjplgcudchzta:7d21aff54ce6c3e66f5bbd815dd29e74d442e0dd344311dde85cf10462488bae@ec2-23-21-184-113.compute-1.amazonaws.com:5432/db1605r628ae6n")
	defer db.Close()
	db.Exec("CREATE TABLE IF NOT EXISTS emails (email VARCHAR (50) NOT NULL UNIQUE)")

	http.HandleFunc("/", home)
	http.HandleFunc("/recipe/", recipe)
	http.HandleFunc("/subscribe/", subscribe)
	http.HandleFunc("/nofilter/", noFilter)
	http.HandleFunc("/filter/", filter)
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

// TODO: 1. TEST WITH FRESH USER
// TODO: 2. Create recipes

// TODO Long Term: Other tabs, Search, Link with other delivery services
