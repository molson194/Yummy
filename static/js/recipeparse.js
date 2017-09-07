$('#contactForm').submit(function() {
  if (validateEmail($('#email').val())) {
    $.post("../../subscribe/" + $('#email').val());

    $('#contactDiv').empty();
    $('#contactDiv').append("<h6>Thanks for signing up!</h6>");
  } else if ($("#contactDiv p:last-child").length == 0) {
    $('#contactDiv').append("<p>Please enter valid email address</p>");
  }
  return false;
});

function buyChecked() {
  var checkboxes = $("#ingredients").find("input[type=checkbox]");
  var cartAdd = "";
  var counter = 1;
  for (i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked) {
      cartAdd += "&ASIN." + counter + "=" + checkboxes[i].dataset.asin + "&Quantity." + counter + "=" + checkboxes[i].dataset.quantity;
      counter++;
    }
  }

  if (counter > 1) {
    window.location.href = "https://www.amazon.com/gp/aws/cart/add.html?AWSAccessKeyId=AKIAJAPBFLISINTANYOA&AssociateTag=molson194-20" + cartAdd + "&add=add";
  } else if ($("#ingredientswithbutton p:last-child").length == 0) {
    $('#ingredientswithbutton').append("<p>No items selected</p>");
  }
}

function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
