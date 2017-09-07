$(document).ready(function() {
  $(".recipePrice").each(function() {
    $(this).html(getDollars($(this)[0].dataset.price, $(this)[0].dataset.servings));
  });
});

$("#cost0,#cost1,#cost2,#cost3,#time0,#time1,#time2,#regionUs,#regionIt,#regionCh,#regionMx,#meatCh,#meatBf,#meatFi,#meatPk,#meatVg,#servings0,#servings1,#servings2").change(function() {
  $("#recipelist").empty();

  var costChecks = $("#cost0").is(":checked") + $("#cost1").is(":checked") + $("#cost2").is(":checked") + $("#cost3").is(":checked");
  if (costChecks == 0) {
    $("#priceButton").html("Price");
  } else {
    $("#priceButton").html("Price(" + costChecks + ")");
  }

  var timeChecks = $("#time0").is(":checked") + $("#time1").is(":checked") + $("#time2").is(":checked");
  if (timeChecks == 0) {
    $("#timeButton").html("Time");
  } else {
    $("#timeButton").html("Time(" + timeChecks + ")");
  }

  var regionChecks = $("#regionUs").is(":checked") + $("#regionIt").is(":checked") + $("#regionCh").is(":checked") + $("#regionMx").is(":checked");
  if (regionChecks == 0) {
    $("#regionButton").html("Region");
  } else {
    $("#regionButton").html("Region(" + regionChecks + ")");
  }

  var meatChecks = $("#meatCh").is(":checked") + $("#meatBf").is(":checked") + $("#meatFi").is(":checked") + $("#meatPk").is(":checked") + $("#meatVg").is(":checked");
  if (meatChecks == 0) {
    $("#meatButton").html("Meat");
  } else {
    $("#meatButton").html("Meat(" + meatChecks + ")");
  }

  var servingsChecks = $("#servings0").is(":checked") + $("#servings1").is(":checked") + $("#servings2").is(":checked");
  if (servingsChecks == 0) {
    $("#servingsButton").html("Servings");
  } else {
    $("#servingsButton").html("Servings(" + servingsChecks + ")");
  }

  var costUrl = $("#cost0").is(":checked") + "+" + $("#cost1").is(":checked") + "+" + $("#cost2").is(":checked") + "+" + $("#cost3").is(":checked");
  var timeUrl = $("#time0").is(":checked") + "+" + $("#time1").is(":checked") + "+" + $("#time2").is(":checked");
  var regionUrl = $("#regionUs").is(":checked") + "+" + $("#regionIt").is(":checked") + "+" + $("#regionCh").is(":checked") + "+" + $("#regionMx").is(":checked");
  var meatUrl = $("#meatCh").is(":checked") + "+" + $("#meatBf").is(":checked") + "+" + $("#meatFi").is(":checked") + "+" + $("#meatPk").is(":checked") + "+" + $("#meatVg").is(":checked");
  var servingsUrl = $("#servings0").is(":checked") + "+" + $("#servings1").is(":checked") + "+" + $("#servings2").is(":checked");
  populateRecipes("/filter/" + costUrl + "+" + timeUrl + "+" + regionUrl + "+" + meatUrl + "+" + servingsUrl);
});

$("#resetButton").click(function() {
  var changed = false;
  if ($("#cost0,#cost1,#cost2,#cost3").is(":checked")) {
    $("#cost0,#cost1,#cost2,#cost3").prop('checked', false);
    $("#priceButton").html("Price");
    changed = true;
  }
  if ($("#time0,#time1,#time2").is(":checked")) {
    $("#time0,#time1,#time2").prop('checked', false);
    $("#timeButton").html("Time");
    changed = true;
  }

  if ($("#regionUs,#regionIt,#regionCh,#regionMx").is(":checked")) {
    $("#regionUs,#regionIt,#regionCh,#regionMx").prop('checked', false);
    $("#regionButton").html("Region");
    changed = true;
  }
  if ($("#meatCh,#meatBf,#meatFi,#meatPk,#meatVg").is(":checked")) {
    $("#meatCh,#meatBf,#meatFi,#meatPk,#meatVg").prop('checked', false);
    $("#meatButton").html("Meat");
    changed = true;
  }
  if ($("#servings0,#servings1,#servings2").is(":checked")) {
    $("#servings0,#servings1,#servings2").prop('checked', false);
    $("#servingsButton").html("Servings");
    changed = true;
  }

  if (changed) {
    $("#recipelist").empty();
    populateRecipes("/nofilter");
  }
});

function populateRecipes(url) {
  var text1a = "<div class=\"col-lg-4 col-sm-6 portfolio-item\"><div class=\"card h-100\"><a href=\"";
  var text1b = "\"><img class=\"card-img-top\" src=\"";
  var text2a = "\" alt=\"\"></a><div class=\"card-body\"><h4 class=\"card-title\"><a href=\"";
  var text2b = "\">";
  var text3 = "</a></h4><p class=\"card-text\">";
  var text4 = "</p><div class=\"container-fluid bottom-align-text\"><p class=\"font-weight-bold\"><span style=\"float:left;\">&#128336; &nbsp; ";
  var text5 = " hr</span><span style=\"float:right;\">";
  var text6 = "</span></p></div></div></div></div>";
  $.get(url, function(recipes) {
    recipes.forEach(function(element) {
      $("#recipelist").append(text1a + "recipe/" + element.Title + text1b + element.Image + text2a + "recipe/" + element.Title + text2b + element.Title + text3 + element.Description + text4 + element.Time + text5 + getDollars(element.Price, element.Servings) + text6);
    });
  });
}

function getDollars(price, servings) {
  var dollars = "$";
  var ppm = Math.min(Math.floor(price / servings / 4.0), 3);
  for (i = 0; i < ppm; i++) {
    dollars += "$";
  }
  return dollars;
}

$('#contactForm').submit(function() {
  // TODO: email processing
  console.log($('#email').val());
  $.post("/subscribe/" + $('#email').val());

  $('#contactDiv').empty();
  $('#contactDiv').append("<h6>Thanks for signing up!</h6>");
  return false;
});
