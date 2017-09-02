$(document).ready(function() {
  $.getJSON("/static/recipes.json", function(result) {
    result.forEach(function(recipe) {
      if (recipe.title == $("#title").text()) {
        $("#image").attr("src", recipe.image);
        $("#description").html(recipe.description);
        $("#time").append(recipe.time + " hr");
        $("#price").append("$" + recipe.price + " pp");
        $("#region").append(recipe.region);
        $("#meat").append(recipe.meat);
        $("#serves").append(recipe.serves);
        var ingredientStart = "<div class=\"checkbox\"><label><input type=\"checkbox\" value=\"\">&nbsp;&nbsp;";
        var ingredientEnd = "</label></div>";
        recipe.ingredients.forEach(function(element) {
          $("#ingredients").append(ingredientStart + element + ingredientEnd);
        });
        recipe.directions.forEach(function(element) {
          $("#directions").append("<li>" + element + "</li>");
        });
        $("#calories").append(recipe.calories + " Cal");
        $("#carbs").append(recipe.carbs + " g");
        $("#protein").append(recipe.protein + " g");
        $("#fat").append(recipe.fat + " g");
        $("#nutrition").append(recipe.nutrition);
        return;
      }
    });
  });
});
