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

  if(currPath.includes("/recipes")) {
    $("#recipes-tab").addClass("active");
  }

  $(".nav-link").bind("click", function(event) {
    event.preventDefault();
    var clickedItem = $(this);
    $(".nav-link").each(function() {
      $(this).removeClass("active");
    });
    clickedItem.addClass("active");
  });

  $(document).on("click", "[data-link]", function() {
    window.location.href = $(this).attr("data-link");
    return false;
  });

  $(function () {
    $('[data-toggle="popover"]').popover()
  })
});
