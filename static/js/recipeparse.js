$(document).ready(function() {
  $.getJSON("/static/recipes.json", function(result) {
    console.log(JSON.stringify(result[0]));
    $("#title").html(result[0].title);
    $("#description").html(result[0].description);
    $("#time").append(result[0].time + " hr");
    $("#price").append("$" + result[0].price + " pp");
    $("#region").append(result[0].region);
    $("#meat").append(result[0].meat);
    $("#serves").append(result[0].serves);
    var ingredientStart = "<div class=\"checkbox\"><label><input type=\"checkbox\" value=\"\">&nbsp;&nbsp;";
    var ingredientEnd = "</label></div>";
    result[0].ingredients.forEach(function(element) {
      $("#ingredients").append(ingredientStart + element + ingredientEnd);
    });
    result[0].directions.forEach(function(element) {
      $("#directions").append("<li>" + element + "</li>");
    });
    $("#calories").append(result[0].calories + " Cal");
    $("#carbs").append(result[0].carbs + " g");
    $("#protein").append(result[0].protein + " g");
    $("#fat").append(result[0].fat + " g");
    $("#nutrition").append(result[0].nutrition);
  });
});
