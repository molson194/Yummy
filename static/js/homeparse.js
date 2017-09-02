$(document).ready(function() {
  var text1a = "<div class=\"col-lg-4 col-sm-6 portfolio-item\"><div class=\"card h-100\"><a href=\"";
  var text1b = "\"><img class=\"card-img-top\" src=\"";
  var text2a = "\" alt=\"\"></a><div class=\"card-body\"><h4 class=\"card-title\"><a href=\"";
  var text2b = "\">";
  var text3 = "</a></h4><p class=\"card-text\">";
  var text4 = "</p><div class=\"container-fluid bottom-align-text\"><p class=\"font-weight-bold\"><span style=\"float:left;\">&#128336; &nbsp; ";
  var text5 = " hr</span><span style=\"float:right;\">$";
  var text6 = " pp</span></p></div></div></div></div>";


  $.getJSON("/static/recipes.json", function(result) {
    result.forEach(function(element) {
      $("#recipelist").append(text1a + "recipe/" + element.title + text1b + element.image + text2a + "recipe/" + element.title + text2b + element.title + text3 + element.description + text4 + element.time + text5 + element.price + text6);
    });
  });
});
