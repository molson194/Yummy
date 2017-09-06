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
	Price    int
	Servings float32
	ASIN     string
}

// Recipe : Parts of a recipe
type Recipe struct {
	Title       string
	Image       string
	Description string
	Time        float32
	Price       int
	Region      string
	Meat        string
	Serves      int
	Calories    int
	Carbs       float32
	Fat         float32
	Protein     float32
	Nutrition   string
	Ingredients []Ingredient
	Directions  []string
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

func noFilter(w http.ResponseWriter, r *http.Request) {
	js, _ := json.Marshal(recipes)
	w.Header().Set("Content-Type", "application/json")
	w.Write(js)
}

func costFilter(w http.ResponseWriter, r *http.Request) {
	active := strings.Split(r.URL.Path[len("/costfilter/"):], "+")
	var filteredRecipes []Recipe
	for k := range recipes {
		cost0 := recipes[k].Price >= 0 && recipes[k].Price <= 5 && active[0] == "true"
		cost1 := recipes[k].Price >= 5 && recipes[k].Price <= 10 && active[1] == "true"
		cost2 := recipes[k].Price >= 10 && recipes[k].Price <= 15 && active[2] == "true"
		cost3 := recipes[k].Price >= 15 && active[3] == "true"
		if cost0 || cost1 || cost2 || cost3 {
			filteredRecipes = append(filteredRecipes, recipes[k])
		}
	}
	js, _ := json.Marshal(filteredRecipes)
	w.Header().Set("Content-Type", "application/json")
	w.Write(js)
}

func timeFilter(w http.ResponseWriter, r *http.Request) {
	active := strings.Split(r.URL.Path[len("/timefilter/"):], "+")
	var filteredRecipes []Recipe
	for k := range recipes {
		time0 := recipes[k].Time >= 0 && recipes[k].Time <= 0.5 && active[0] == "true"
		time1 := recipes[k].Time >= 0.5 && recipes[k].Time <= 1 && active[1] == "true"
		time2 := recipes[k].Time >= 1.5 && active[2] == "true"
		if time0 || time1 || time2 {
			filteredRecipes = append(filteredRecipes, recipes[k])
		}
	}
	js, _ := json.Marshal(filteredRecipes)
	w.Header().Set("Content-Type", "application/json")
	w.Write(js)
}

func regionFilter(w http.ResponseWriter, r *http.Request) {
	active := strings.Split(r.URL.Path[len("/regionfilter/"):], "+")
	var filteredRecipes []Recipe
	for k := range recipes {
		regionAm := recipes[k].Region == "American" && active[0] == "true"
		regionIt := recipes[k].Region == "Italian" && active[1] == "true"
		regionCh := recipes[k].Region == "Chinese" && active[2] == "true"
		regionMx := recipes[k].Region == "Mexican" && active[3] == "true"
		if regionAm || regionIt || regionCh || regionMx {
			filteredRecipes = append(filteredRecipes, recipes[k])
		}
	}
	js, _ := json.Marshal(filteredRecipes)
	w.Header().Set("Content-Type", "application/json")
	w.Write(js)
}
func meatFilter(w http.ResponseWriter, r *http.Request) {
	active := strings.Split(r.URL.Path[len("/meatfilter/"):], "+")
	var filteredRecipes []Recipe
	for k := range recipes {
		meatCh := recipes[k].Meat == "Chicken" && active[0] == "true"
		meatBf := recipes[k].Meat == "Beef" && active[1] == "true"
		meatFi := recipes[k].Meat == "Fish" && active[2] == "true"
		meatPk := recipes[k].Meat == "Pork" && active[3] == "true"
		meatVg := recipes[k].Meat == "Vegetarian" && active[4] == "true"
		if meatCh || meatBf || meatFi || meatPk || meatVg {
			filteredRecipes = append(filteredRecipes, recipes[k])
		}
	}
	js, _ := json.Marshal(filteredRecipes)
	w.Header().Set("Content-Type", "application/json")
	w.Write(js)
}

func servesFilter(w http.ResponseWriter, r *http.Request) {
	active := strings.Split(r.URL.Path[len("/servesfilter/"):], "+")
	var filteredRecipes []Recipe
	for k := range recipes {
		serves0 := recipes[k].Serves >= 1 && recipes[k].Serves <= 4 && active[0] == "true"
		serves1 := recipes[k].Serves >= 4 && recipes[k].Serves <= 8 && active[1] == "true"
		serves2 := recipes[k].Serves >= 8 && active[2] == "true"
		if serves0 || serves1 || serves2 {
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

	db, _ = sql.Open("postgres", "postgres://nkjplgcudchzta:7d21aff54ce6c3e66f5bbd815dd29e74d442e0dd344311dde85cf10462488bae@ec2-23-21-184-113.compute-1.amazonaws.com:5432/db1605r628ae6n")
	defer db.Close()
	db.Exec("CREATE TABLE IF NOT EXISTS emails (email VARCHAR (50) NOT NULL UNIQUE)")

	http.HandleFunc("/", home)
	http.HandleFunc("/recipe/", recipe)
	http.HandleFunc("/subscribe/", subscribe)
	http.HandleFunc("/nofilter/", noFilter)
	http.HandleFunc("/costfilter/", costFilter)
	http.HandleFunc("/timefilter/", timeFilter)
	http.HandleFunc("/regionfilter/", regionFilter)
	http.HandleFunc("/meatfilter/", meatFilter)
	http.HandleFunc("/servesfilter/", servesFilter)
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

// TODO: 1. Calculate price from ingredients. Popover note about how price is calculated
// TODO: 2. Get rid of num served. Replace number of meals (switch to finish perishables model). Quantity (not servings) for ingredients
// TODO: 3. Search
// TODO: 4. Other tabs
