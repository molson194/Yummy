$(document).ready(function() {
  var text1a = "<div class=\"col-lg-4 col-sm-6 portfolio-item\"><div class=\"card h-100\"><a href=\"";
  var text1b = "\"><img class=\"card-img-top\" src=\"";
  var text2a = "\" alt=\"\"></a><div class=\"card-body\"><h4 class=\"card-title\"><a href=\"";
  var text2b = "\">";
  var text3 = "</a></h4><p class=\"card-text\">";
  var text4 = "</p><div class=\"container-fluid bottom-align-text\"><p class=\"font-weight-bold\"><span style=\"float:left;\">&#128336; &nbsp; ";
  var text5 = " hr</span><span style=\"float:right;\">$";
  var text6 = " pp</span></p></div></div></div></div>";

  $("#cost0,#cost1,#cost2,#cost3").change(function() {
    $("#recipelist").empty();
    var numChecks = $("#cost0").is(":checked") + $("#cost1").is(":checked") + $("#cost2").is(":checked") + $("#cost3").is(":checked");
    $.getJSON("/static/recipes.json", function(result) {
      if (numChecks == 0) {
        $("#priceButton").html("Price");
        result.forEach(function(element) {
          $("#recipelist").append(text1a + "recipe/" + element.title + text1b + element.image + text2a + "recipe/" + element.title + text2b + element.title + text3 + element.description + text4 + element.time + text5 + element.price + text6);
        });
      } else {
        $("#priceButton").html("Price(" + numChecks + ")");
        result.forEach(function(element) {
          var cost0 = $("#cost0").is(":checked") && element.price >= 0 && element.price <= 5;
          var cost1 = $("#cost1").is(":checked") && element.price >= 5 && element.price <= 10;
          var cost2 = $("#cost2").is(":checked") && element.price >= 10 && element.price <= 15;
          var cost3 = $("#cost3").is(":checked") && element.price >= 15;
          if (cost0 || cost1 || cost2 || cost3) {
            $("#recipelist").append(text1a + "recipe/" + element.title + text1b + element.image + text2a + "recipe/" + element.title + text2b + element.title + text3 + element.description + text4 + element.time + text5 + element.price + text6);
          }
        });
      }
    });
  });

  $("#time0,#time1,#time2").change(function() {
    $("#recipelist").empty();
    var numChecks = $("#time0").is(":checked") + $("#time1").is(":checked") + $("#time2").is(":checked");
    $.getJSON("/static/recipes.json", function(result) {
      if (numChecks == 0) {
        $("#timeButton").html("Time");
        result.forEach(function(element) {
          $("#recipelist").append(text1a + "recipe/" + element.title + text1b + element.image + text2a + "recipe/" + element.title + text2b + element.title + text3 + element.description + text4 + element.time + text5 + element.price + text6);
        });
      } else {
        $("#timeButton").html("Time(" + numChecks + ")");
        result.forEach(function(element) {
          var time0 = $("#time0").is(":checked") && element.time >= 0 && element.time <= 0.5;
          var time1 = $("#time1").is(":checked") && element.time >= 0.5 && element.time <= 1;
          var time2 = $("#time2").is(":checked") && element.time >= 1.5;
          if (time0 || time1 || time2) {
            $("#recipelist").append(text1a + "recipe/" + element.title + text1b + element.image + text2a + "recipe/" + element.title + text2b + element.title + text3 + element.description + text4 + element.time + text5 + element.price + text6);
          }
        });
      }
    });
  });

  $("#regionUs,#regionIt,#regionCh,#regionMx").change(function() {
    $("#recipelist").empty();
    var numChecks = $("#regionUs").is(":checked") + $("#regionIt").is(":checked") + $("#regionCh").is(":checked") + $("#regionMx").is(":checked");
    $.getJSON("/static/recipes.json", function(result) {
      if (numChecks == 0) {
        $("#regionButton").html("Region");
        result.forEach(function(element) {
          $("#recipelist").append(text1a + "recipe/" + element.title + text1b + element.image + text2a + "recipe/" + element.title + text2b + element.title + text3 + element.description + text4 + element.time + text5 + element.price + text6);
        });
      } else {
        $("#regionButton").html("Region(" + numChecks + ")");
        result.forEach(function(element) {
          var regionUs = $("#regionUs").is(":checked") && (element.region == "American");
          var regionIt = $("#regionIt").is(":checked") && (element.region == "Italian");
          var regionCh = $("#regionCh").is(":checked") && (element.region == "Chinese");
          var regionMx = $("#regionMx").is(":checked") && (element.region == "Mexican");
          if (regionUs || regionIt || regionCh || regionMx) {
            $("#recipelist").append(text1a + "recipe/" + element.title + text1b + element.image + text2a + "recipe/" + element.title + text2b + element.title + text3 + element.description + text4 + element.time + text5 + element.price + text6);
          }
        });
      }
    });
  });

  $("#meatCh,#meatBf,#meatFi,#meatPk,#meatVg").change(function() {
    $("#recipelist").empty();
    var numChecks = $("#meatCh").is(":checked") + $("#meatBf").is(":checked") + $("#meatFi").is(":checked") + $("#meatPk").is(":checked") + $("#meatVg").is(":checked");
    $.getJSON("/static/recipes.json", function(result) {
      if (numChecks == 0) {
        $("#meatButton").html("Meat");
        result.forEach(function(element) {
          $("#recipelist").append(text1a + "recipe/" + element.title + text1b + element.image + text2a + "recipe/" + element.title + text2b + element.title + text3 + element.description + text4 + element.time + text5 + element.price + text6);
        });
      } else {
        $("#meatButton").html("Meat(" + numChecks + ")");
        result.forEach(function(element) {
          var meatCh = $("#meatCh").is(":checked") && (element.meat == "Chicken");
          var meatBf = $("#meatBf").is(":checked") && (element.meat == "Beef");
          var meatFi = $("#meatFi").is(":checked") && (element.meat == "Fish");
          var meatPk = $("#meatPk").is(":checked") && (element.meat == "Pork");
          var meatVg = $("#meatVg").is(":checked") && (element.meat == "Vegetarian");
          if (meatCh || meatBf || meatFi || meatPk | meatVg) {
            $("#recipelist").append(text1a + "recipe/" + element.title + text1b + element.image + text2a + "recipe/" + element.title + text2b + element.title + text3 + element.description + text4 + element.time + text5 + element.price + text6);
          }
        });
      }
    });
  });

  $("#serves0,#serves1,#serves2").change(function() {
    $("#recipelist").empty();
    var numChecks = $("#serves0").is(":checked") + $("#serves1").is(":checked") + $("#serves2").is(":checked");
    $.getJSON("/static/recipes.json", function(result) {
      if (numChecks == 0) {
        $("#servesButton").html("Serves");
        result.forEach(function(element) {
          $("#recipelist").append(text1a + "recipe/" + element.title + text1b + element.image + text2a + "recipe/" + element.title + text2b + element.title + text3 + element.description + text4 + element.time + text5 + element.price + text6);
        });
      } else {
        $("#servesButton").html("Serves(" + numChecks + ")");
        result.forEach(function(element) {
          var serves0 = $("#serves0").is(":checked") && element.serves >= 1 && element.serves <= 4;
          var serves1 = $("#serves1").is(":checked") && element.serves >= 4 && element.serves <= 8;
          var serves2 = $("#serves2").is(":checked") && element.serves >= 8;
          if (serves0 || serves1 || serves2) {
            $("#recipelist").append(text1a + "recipe/" + element.title + text1b + element.image + text2a + "recipe/" + element.title + text2b + element.title + text3 + element.description + text4 + element.time + text5 + element.price + text6);
          }
        });
      }
    });
  });

  $("#resetButton").click(function() {
    var changed = false;
    if ($("#cost0").is(":checked") + $("#cost1").is(":checked") + $("#cost2").is(":checked") + $("#cost3").is(":checked") > 0) {
      $("#cost0").prop('checked', false);
      $("#cost1").prop('checked', false);
      $("#cost2").prop('checked', false);
      $("#cost3").prop('checked', false);
      $("#priceButton").html("Price");
      changed = true;
    }
    if ($("#time0").is(":checked") + $("#time1").is(":checked") + $("#time2").is(":checked") > 0) {
      $("#time0").prop('checked', false);
      $("#time1").prop('checked', false);
      $("#time2").prop('checked', false);
      $("#timeButton").html("Time");
      changed = true;
    }

    if ($("#regionUs").is(":checked") + $("#regionIt").is(":checked") + $("#regionCh").is(":checked") + $("#regionMx").is(":checked") > 0) {
      $("#regionUs").prop('checked', false);
      $("#regionIt").prop('checked', false);
      $("#regionCh").prop('checked', false);
      $("#regionMx").prop('checked', false);
      $("#regionButton").html("Region");
      changed = true;
    }
    if ($("#meatCh").is(":checked") + $("#meatBf").is(":checked") + $("#meatFi").is(":checked") + $("#meatPk").is(":checked") + $("#meatVg").is(":checked") > 0) {
      $("#meatCh").prop('checked', false);
      $("#meatBf").prop('checked', false);
      $("#meatFi").prop('checked', false);
      $("#meatPk").prop('checked', false);
      $("#meatVg").prop('checked', false);
      $("#meatButton").html("Meat");
      changed = true;
    }
    if ($("#serves0").is(":checked") + $("#serves1").is(":checked") + $("#serves2").is(":checked") > 0) {
      $("#serves0").prop('checked', false);
      $("#serves1").prop('checked', false);
      $("#serves2").prop('checked', false);
      $("#servesButton").html("Serves");
      changed = true;
    }

    if (changed) {
      $.getJSON("/static/recipes.json", function(result) {
        result.forEach(function(element) {
          $("#recipelist").append(text1a + "recipe/" + element.title + text1b + element.image + text2a + "recipe/" + element.title + text2b + element.title + text3 + element.description + text4 + element.time + text5 + element.price + text6);
        });
      });
    }
  });

  $.getJSON("/static/recipes.json", function(result) {
    result.forEach(function(element) {
      $("#recipelist").append(text1a + "recipe/" + element.title + text1b + element.image + text2a + "recipe/" + element.title + text2b + element.title + text3 + element.description + text4 + element.time + text5 + element.price + text6);
    });
  });
});
