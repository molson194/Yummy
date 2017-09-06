$("#cost0,#cost1,#cost2,#cost3").change(function() {
  $("#recipelist").empty();
  var numChecks = $("#cost0").is(":checked") + $("#cost1").is(":checked") + $("#cost2").is(":checked") + $("#cost3").is(":checked");
  if (numChecks == 0) {
    $("#priceButton").html("Price");
    populateRecipes("/nofilter");
  } else {
    $("#priceButton").html("Price(" + numChecks + ")");
    populateRecipes("/costfilter/" + $("#cost0").is(":checked") + "+" + $("#cost1").is(":checked") + "+" + $("#cost2").is(":checked") + "+" + $("#cost3").is(":checked"));
  }
});

$("#time0,#time1,#time2").change(function() {
  $("#recipelist").empty();
  var numChecks = $("#time0").is(":checked") + $("#time1").is(":checked") + $("#time2").is(":checked");
  if (numChecks == 0) {
    $("#timeButton").html("Time");
    populateRecipes("/nofilter");
  } else {
    $("#timeButton").html("Time(" + numChecks + ")");
    populateRecipes("/timefilter/" + $("#time0").is(":checked") + "+" + $("#time1").is(":checked") + "+" + $("#time2").is(":checked"));
  }
});

$("#regionUs,#regionIt,#regionCh,#regionMx").change(function() {
  $("#recipelist").empty();
  var numChecks = $("#regionUs").is(":checked") + $("#regionIt").is(":checked") + $("#regionCh").is(":checked") + $("#regionMx").is(":checked");
  if (numChecks == 0) {
    $("#regionButton").html("Region");
    populateRecipes("/nofilter");
  } else {
    $("#regionButton").html("Region(" + numChecks + ")");
    populateRecipes("/regionfilter/" + $("#regionUs").is(":checked") + "+" + $("#regionIt").is(":checked") + "+" + $("#regionCh").is(":checked") + "+" + $("#regionMx").is(":checked"));

  }
});

$("#meatCh,#meatBf,#meatFi,#meatPk,#meatVg").change(function() {
  $("#recipelist").empty();
  var numChecks = $("#meatCh").is(":checked") + $("#meatBf").is(":checked") + $("#meatFi").is(":checked") + $("#meatPk").is(":checked") + $("#meatVg").is(":checked");
  if (numChecks == 0) {
    $("#meatButton").html("Meat");
    populateRecipes("/nofilter");
  } else {
    $("#meatButton").html("Meat(" + numChecks + ")");
    populateRecipes("/meatfilter/" + $("#meatCh").is(":checked") + "+" + $("#meatBf").is(":checked") + "+" + $("#meatFi").is(":checked") + "+" + $("#meatPk").is(":checked") + "+" + $("#meatVg").is(":checked"));
  }

});

$("#serves0,#serves1,#serves2").change(function() {
  $("#recipelist").empty();
  var numChecks = $("#serves0").is(":checked") + $("#serves1").is(":checked") + $("#serves2").is(":checked");
  if (numChecks == 0) {
    $("#servesButton").html("Serves");
    populateRecipes("/nofilter");
  } else {
    $("#servesButton").html("Serves(" + numChecks + ")");
    populateRecipes("/servesfilter/" + $("#serves0").is(":checked") + "+" + $("#serves1").is(":checked") + "+" + $("#serves2").is(":checked"));
  }
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
  if ($("#serves0,#serves1,#serves2").is(":checked")) {
    $("#serves0,#serves1,#serves2").prop('checked', false);
    $("#servesButton").html("Serves");
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
  var text5 = " hr</span><span style=\"float:right;\">$";
  var text6 = " pp</span></p></div></div></div></div>";
  $.get(url, function(recipes) {
    recipes.forEach(function(element) {
      $("#recipelist").append(text1a + "recipe/" + element.Title + text1b + element.Image + text2a + "recipe/" + element.Title + text2b + element.Title + text3 + element.Description + text4 + element.Time + text5 + element.Price + text6);
    });
  });
}

$('#contactForm').submit(function() {
  // TODO: email processing
  console.log($('#email').val());
  $.post("/subscribe/" + $('#email').val());

  $('#contactDiv').empty();
  $('#contactDiv').append("<h6>Thanks for signing up!</h6>");
  return false;
});
