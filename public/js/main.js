$(document).ready(function() {
  var currPath = window.location.pathname;

  switch (currPath) {
  case "/":
    $("#ingredients-tab").addClass("active");
      break;
  case "/recipes":
    $("#recipes-tab").addClass("active");
      break;
  case "/favorites":
    $("#favorites-tab").addClass("active");
    break;
  }

  $(".nav-link").bind("click", function(event) {
    event.preventDefault();
    var clickedItem = $(this);
    $(".nav-link").each(function() {
      $(this).removeClass("active");
    });
    clickedItem.addClass("active");
  });

  $("[data-link]").click(function() {
    window.location.href = $(this).attr("data-link");
    return false;
  });
});
