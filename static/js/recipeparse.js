var myRecipe;

$(document).ready(function() {
  $.getJSON("/static/recipes.json", function(result) {
    result.forEach(function(recipe) {
      if (recipe.title == $("#title").text()) {
        myRecipe = recipe;
        $("#image").attr("src", recipe.image);
        $("#description").html(recipe.description);
        $("#time").append(recipe.time + " hr");
        $("#price").append("$" + recipe.price + " pp");
        $("#region").append(recipe.region);
        $("#meat").append(recipe.meat);
        $("#serves").append(recipe.serves);
        var ingredient0 = "<div class=\"checkbox\"><label><input type=\"checkbox\" value=\"\">&nbsp;&nbsp;";
        var ingredient1 = " ($";
        var ingredient2 = " serves ";
        var ingredient3 = ")</label></div>";
        recipe.ingredients.forEach(function(element) {
          $("#ingredients").append(ingredient0 + element.name + ingredient1 + element.price + ingredient2 + element.servings + ingredient3);
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

  $('#contactForm').submit(function() {
    // TODO: email processing
    console.log($('#email').val());
    $.post("../../subscribe/" + $('#email').val());

    $('#contactDiv').empty();
    $('#contactDiv').append("<h6>Thanks for signing up!</h6>");
    return false;
  });

});

function buyChecked() {
  var checkboxes = $("#ingredients").find("input[type=checkbox]");
  var cartAdd = "";
  var counter = 1;
  for (i = 0; i < myRecipe.ingredients.length; i++) {
    if (checkboxes[i].checked) {
      cartAdd += "&ASIN." + counter + "=" + myRecipe.ingredients[i].asin + "&Quantity." + counter + "=" + Math.ceil(1 / myRecipe.ingredients[i].servings);
      counter++;
    }
  }

  if (counter > 1) {
    window.location.href = "https://www.amazon.com/gp/aws/cart/add.html?AWSAccessKeyId=AKIAJAPBFLISINTANYOA&AssociateTag=molson194-20" + cartAdd + "&add=add";
  }
  // TODO: else notify no items selected
}
