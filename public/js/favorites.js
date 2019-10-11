$(document).ready(function () {
  var userToken = $("#userToken").attr("data-token");

  $(document).on("click", ".favorite-btn", function () {
    var recipeID = $(this).attr("data-id");

    // Mark ingredient block as unchecked
    $(`.favorite-block[data-id="${recipeID}"]`).remove();

    if (userToken) {
      // Make an API DELETE request 
      $.ajax({
        url: `/api/${userToken}/favorites`,
        type: "DELETE",
        data: {
          id: recipeID
        }
      });

    }
  })
});
