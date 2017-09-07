$('#contactForm').submit(function() {
  // TODO: email processing
  console.log($('#email').val());
  $.post("../../subscribe/" + $('#email').val());

  $('#contactDiv').empty();
  $('#contactDiv').append("<h6>Thanks for signing up!</h6>");
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
  }
  // TODO: else notify no items selected
}
